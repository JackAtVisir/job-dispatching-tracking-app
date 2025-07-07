import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom'

const client = generateClient<Schema>()

function Jobs () {
    
    const navigate = useNavigate()
    const { user } = useAuthenticator()
    const [jobs, setJobs] = useState<Array<Schema["Jobs"]["type"]>>([])
    const [jobAssets, setJobAssets] = useState<Array<Schema["Assets"]["type"]>>([]);


    const userID = user.userId

    useEffect(() => {

      const fetchJobs = async () => {

        const result = await client.models.Jobs.list({
          filter: {
            userID: {
              eq: userID
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

    const handleDelete = (id: string) => {

        client.models.Jobs.delete({id})
    }

    const handleAssetSelect = ( id: string ) => {

        navigate('./AssetForm', {
          state: { assetID: id }  
        });
    }

    return (

        <div>
          <h1>{user?.signInDetails?.loginId}'s Jobs</h1>
          { jobs.length > 0 &&  
            <ul>
              {jobs.map((job)=>(
                  <li
                    key={job.id}
                    onClick={()=>{handleJobSelect(job.id)}}>
                    {job.name}
                    <button onClick={()=>{handleDelete(job.id)}}>Delete</button>
                  </li>
              ))}
            </ul>
          }
          { jobAssets.length > 0 && 
            <div>
              <p>Job Assets:</p>
              <ul>
                {jobAssets.map((asset)=>(
                  <li
                    key={asset.id}
                    onClick={()=>{handleAssetSelect(asset.id)}}>
                    {asset.name}
                  </li>
                ))}
              </ul>
            </div>
          } 
          <button onClick={()=>{navigate('/')}}>Home</button>
        </div>
    )
}

export default Jobs