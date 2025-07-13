import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";  
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';

function FinishedJobs () {

  const client = generateClient<Schema>()

    const { user } = useAuthenticator()
    const [jobs, setJobs] = useState<Array<Schema["Jobs"]["type"]>>([])
    const userID = user.userId

    useEffect(() => {
    
          const fetchJobs = async () => {
    
            const result = await client.models.Jobs.list({
              filter: {
                userID: {
                  eq: userID
                },
                completed: {
                  eq: true
                }
              }
            })
    
            if (result?.data) {
              setJobs(result.data)
            } else {
              console.warn("No jobs found or error occurred:", result?.errors)
            }
          }
          fetchJobs()
        }, [])

        const handleDelete = (id: string) => {
        client.models.Jobs.delete({id})
    }

    return (

        <div>
          <h1>Completed Jobs</h1>
          <ul>
            {jobs.map((job)=>(
                <li
                  key={job.id}>
                  {job.name}
                  <button onClick={()=>{handleDelete(job.id)}}>Delete</button>
                </li>
            ))}
          </ul>
        </div>
    )
}

export default FinishedJobs