import { useEffect, useState } from "react"
import type { Schema } from "../../amplify/data/resource"
import { generateClient } from "aws-amplify/data"
import { useNavigate } from "react-router"
import { useAtom } from 'jotai'
import { userRoleAtom } from '../atoms/userAtoms' 

function AllJobs ()  {

  const client = generateClient<Schema>()

    const navigate = useNavigate()
  
    const [userRole] = useAtom(userRoleAtom)
    useEffect(() => {
    if (userRole !== 'admin') {
      navigate('/')
    }
  }, [userRole])

    const [jobs, setJobs] = useState<Array<Schema["Jobs"]["type"]>>([])
    const [users, setUsers] = useState<Array<Schema["Users"]["type"]>>([])  
    const [jobAssets, setJobAssets] = useState<Array<Schema["Assets"]["type"]>>([])

    useEffect(() => {
      client.models.Jobs.observeQuery().subscribe({
        next: (data) => setJobs([...data.items]),
      })
      client.models.Users.observeQuery().subscribe({
        next: (data) => setUsers([...data.items]),
      })
    }, [])

    const handleDelete = (id: string) => {
      client.models.Jobs.delete({id})
    }

    const handleJobSelect = (jobID: string) => {

      const fetchAssets = async () => {

        const result = await client.models.Assets.list({
          filter: {
            jobID: {
              eq: jobID
            }
          }
        })

        if (result?.data) {
            setJobAssets(result.data)
        } else {
            console.warn('No assets were dound or error occurred:', result?.errors)
        }
      }
      fetchAssets()
    }

  return (

      <div>
        <h1>Jobs</h1>
        <ul>
          {jobs.map((job)=>(
            <li
              key={job.id}
              onClick={()=>{handleJobSelect(job.id)}}>
              {`${job.name} ${users.find((user)=>(user.id===job.userID))?.username}`}
              <button onClick={()=>{handleDelete(job.id)}}>Delete</button>
            </li>
          ))}
        </ul>
        { jobAssets.length > 0 && 
          <ul>
            {jobAssets.map((asset)=>(
              <li
                key={asset.id}>
              {`${asset.category}${asset.number} ${asset.condition ?? ''} ${asset.completed ? '✅' : ''}`}
              </li>
            ))}
          </ul>
        }
      </div>
  )
}

export default AllJobs