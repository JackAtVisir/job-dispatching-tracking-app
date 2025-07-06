import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom'

const client = generateClient<Schema>();

function Jobs() {

  const { user } = useAuthenticator();
  const navigate = useNavigate()
  const [jobs, setJobs] = useState<Array<Schema["Jobs"]["type"]>>([]);

  useEffect(() => {
    client.models.Jobs.observeQuery().subscribe({
      next: (data) => setJobs([...data.items]),
    });
  }, []);
  
  const handleClick = () => {


  }

  return (
    <div>
      <h1>{user?.signInDetails?.loginId}'s Jobs</h1>
      <ul>
        {jobs.map((job) => (
          <li 
            onClick={()=>{handleClick()}}
            key={job.id}>{job.image}
          </li>
        ))}
      </ul>
      <button onClick={()=>{navigate('/')}}>Home</button>
    </div>
  );
}

export default Jobs;
