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
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'flex-start',
      }}
    >
      {/* Jobs Column */}
      <div style={{ flex: '1 1 40%' }}>
        <h1>Jobs</h1>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            borderRight: '1px solid #ddd',
          }}
        >
          {jobs.map((job) => (
            <li
              key={job.id}
              onClick={() => handleJobSelect(job.id)}
              style={{
                padding: '0.5rem',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>
                {job.name}{" "}
                {users.find((user) => user.id === job.userID)?.username ?? ""}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(job.id)
                }}
                style={{
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ flex: '1 1 60%' }}>
        <h1>Assets</h1>
        {jobAssets.length > 0 ? (
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {jobAssets.map((asset) => (
              <li
                key={asset.id}
                style={{
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #eee',
                }}
              >
                {`${asset.category}${asset.number} ${asset.condition ?? ''} ${
                  asset.completed ? '✅' : ''
                }`}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#888' }}>Select a job to view its assets.</p>
        )}
      </div>
    </div>
  </div>
)

}

export default AllJobs