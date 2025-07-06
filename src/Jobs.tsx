import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';

const client = generateClient<Schema>();

function Jobs() {

  const { user } = useAuthenticator();
  const [jobs, setJobs] = useState<Array<Schema["Jobs"]["type"]>>([]);

  useEffect(() => {
    client.models.Jobs.observeQuery().subscribe({
      next: (data) => setJobs([...data.items]),
    });
  }, []);
  
  return (
    <div>
      <h1>{user?.signInDetails?.loginId}'s Jobs</h1>
      <ul>
        {jobs.map((job) => (
          <li 
            key={job.id}>{job.image}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Jobs;
