import { useEffect, useState } from "react"
import type { Schema } from "../../amplify/data/resource"
import { generateClient } from "aws-amplify/data"

const client = generateClient<Schema>()

function AllJobs ()  {

    const [jobs, setJobs] = useState<Array<Schema["Jobs"]["type"]>>([])
    const [users, setUsers] = useState<Array<Schema["Users"]["type"]>>([]);

    useEffect(() => {
      client.models.Jobs.observeQuery().subscribe({
        next: (data) => setJobs([...data.items]),
      })
      client.models.Users.observeQuery().subscribe({
        next: (data) => setUsers([...data.items]),
      })
    }, [])

  return (

      <div>
        <h1>Jobs</h1>
        <ul>
          {jobs.map((job)=>(
            <li
            key={job.id}>
            {`${job.name} ${users.find((user)=>(user.id===job.userID))?.username}`}
            </li>
          ))}
        </ul>
          
      </div>
  )
}

export default AllJobs