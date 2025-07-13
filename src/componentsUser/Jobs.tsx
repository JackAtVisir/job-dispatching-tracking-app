import { useEffect, useState } from "react"
import type { Schema } from "../../amplify/data/resource"
import { generateClient } from "aws-amplify/data"
import { useAuthenticator } from '@aws-amplify/ui-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

function Jobs () {

  const client = generateClient<Schema>()
    
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useAuthenticator()
    const [jobs, setJobs] = useState<Array<Schema["Jobs"]["type"]>>([])
    const [jobAssets, setJobAssets] = useState<Array<Schema["Assets"]["type"]>>([]);
    const [selectedJobID, setSelectedJobID] = useState('')
    const [selectedAsset, setSelectedAsset] = useState('')
    const userID = user.userId
    const refreshAssets = (location.state as { refreshAssets?: boolean } | null)?.refreshAssets

    useEffect(() => {

      const fetchJobs = async () => {

        const result = await client.models.Jobs.list({
          filter: {
            userID: {
              eq: userID
            },
            completed: {
              eq: false
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

    useEffect(() => {
      if (refreshAssets && selectedJobID) {
        handleJobSelect(selectedJobID);
        navigate(location.pathname, { replace: true, state: {} })
      }
    }, [refreshAssets])

    const handleJobSelect = (jobID: string) => {

      setSelectedJobID(jobID)
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

    const handleAssetSelect = ( id: string) => {

        setSelectedAsset(id)
        navigate('./assetForm', {
          state: {assetID: id}  
        });
    }

    const handleJobSubmit = async () => {

      const checkAssetCompletion = jobAssets.find((asset)=>(asset.completed === false))
      if (checkAssetCompletion) {
        alert('Uncompleted Assets')
      } else {
        const result = await client.models.Jobs.update({
          id: selectedJobID,
          completed: true
        })
        if (result.data) {
          alert('Job Submitted')
          navigate('/')
        } else {
          console.warn('Update failed:', result.errors) 
          alert('Something went wrong submitting the job')
        }
      }
    }

    return (

        <div>
          <h1>Jobs</h1>
          { jobs.length > 0 &&  
            <ul>
              {jobs.map((job)=>(
                  <li
                    key={job.id}
                    onClick={()=>{handleJobSelect(job.id)}}>
                    {job.name}
                  </li>
              ))}
            </ul>
          }
          { jobAssets.length > 0 && 
            <div>
              <Outlet />
              <p>Job Assets:</p>
              <ul>
                {jobAssets.map((asset)=>(
                  <li
                    key={asset.id}
                    onClick={()=>{handleAssetSelect(asset.id)}}
                    style={{
                    backgroundColor: selectedAsset === asset.id ? 'lightgreen' : 'white',
              }}>
                    {`${asset.category} ${asset.number} ${asset.completed ? '✅' : ''}`}
                  </li>
                ))}
              </ul>
              <button onClick={()=>handleJobSubmit()}>Submit Job</button>
            </div>
          } 
        </div>
    )
}

export default Jobs