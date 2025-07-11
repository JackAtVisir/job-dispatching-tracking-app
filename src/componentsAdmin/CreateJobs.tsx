import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from "react"
import type { Schema } from "../../amplify/data/resource"
import { generateClient } from "aws-amplify/data"
import { useAtom } from 'jotai'
import { userRoleAtom } from '../atoms/userAtoms' 

type Asset = { category: string; number: number; id: string }

function Jobs () {

  const client = generateClient<Schema>()

    const navigate = useNavigate()
    const location = useLocation()
    const [userRole] = useAtom(userRoleAtom)
    
      useEffect(() => {
        if (userRole !== 'admin') {
          navigate('/')
        }
      }, [userRole])

    const { selectedAssets }: { selectedAssets?: Asset[] } = location.state || {};
    const [users, setUsers] = useState<Array<Schema["Users"]["type"]>>([]);
    const [jobName, setJobName] = useState('')
    const [selectedUserID, setSelectedUserID] = useState('')
    const [selectedUsername, setSelectedUsername] = useState('')

     useEffect(() => {
        client.models.Users.observeQuery().subscribe({
          next: (data) => setUsers([...data.items]),
        });
      }, []);

    const handleSelectUser = ( user: string, id: string) => {

        setSelectedUsername(user)
        setSelectedUserID(id)
    }

    const handleCreateJob = async () => {

      try {
        const result = await client.models.Jobs.create({
          name: jobName,
          completed: false,
          userID: selectedUserID,
        });
    
        const jobID = result.data?.id;
        if (!jobID) {
          console.error("Failed to get job ID");
          return;
        }

        if (!selectedAssets) {
            console.log('No Selected Assets') 
            return
        }

        await Promise.all(
          selectedAssets.map((asset) =>
            client.models.Assets.update({
              id: asset.id,
              jobID: jobID,
            })
          )
        );
    
        console.log("Job created and assets updated!");
      } catch (error) {
        console.error("Error creating job or updating assets:", error);
      }
      alert(`Job '${jobName}' has been assigned to ${selectedUsername}`)
      navigate('/assets')
    };


    return (

        <div>
         <form>
           <input
             type="text"
             name="jobName"
             value={jobName}
             onChange={(e) => setJobName(e.target.value)}
             placeholder="Job Name"
           />
          </form>
          {selectedAssets && selectedAssets.length > 0 ? (
            <ul>
              {selectedAssets.map((asset: Asset)=>(
                <li 
                  key={asset.id}>
                  {`${asset.category} ${asset.number}`}
                </li>
              ))}
            </ul>
          ) : (
            <p>No assets selected</p>
          )}
          <div>
            <p>Job Assigned to: {selectedUsername}</p>
            <ul>
              {users.map((user)=>(
                <li 
                  key={user.id}
                  onClick={()=>{handleSelectUser(user.username ?? "unnamed", user.id)}}>
                  {user.username}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={()=>{handleCreateJob()}}>Create Job</button>
          <button onClick={()=>{navigate('/assets')}}>Back</button>
          <button onClick={()=>{navigate('/')}}>Home</button>
        </div>
    )
}

export default Jobs