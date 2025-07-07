import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom'

const client = generateClient<Schema>()

type Asset = { 

    name: string,
    id: string, 
    condition: string, 
    completed: string 
}

function Jobs () {
    
    const navigate = useNavigate()
    const { user } = useAuthenticator()
    const [jobs, setJobs] = useState<Array<Schema["Jobs"]["type"]>>([])
    const [jobAssets, setJobAssets] = useState<Asset[]>([])

    const userID = user.userId

    useEffect(() => {
      const fetchJobs = async () => {
        const result = await client.models.Jobs.list({
          filter: {
            userID: {
              eq: userID,
            },
          },
        });

        if (result?.data) {
          setJobs(result.data)
        } else {
          console.warn("No jobs found or error occurred:", result?.errors)
        }
      }

      fetchJobs()
    }, [])

    const handleJobSelect = () => {


    }

    return (

        <div>
          <h1>{user?.signInDetails?.loginId}'s Jobs</h1>
          <ul>
            {jobs.map((job)=>(
                <li
                  key={job.id}
                  onClick={()=>{handleJobSelect()}}>
                  {job.name}
                </li>
            ))}
          </ul>
          <button onClick={()=>{navigate('/')}}>Home</button>
        </div>
    )
}

export default Jobs