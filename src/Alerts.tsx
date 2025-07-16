import type { Schema } from "../amplify/data/resource"
import { generateClient } from "aws-amplify/data"
import { useEffect, useState } from "react"

function Alerts () {
   
    const client = generateClient<Schema>()

    const [alertAssets, setAlertAssets] = useState<Array<Schema["Assets"]["type"]>>([])

    useEffect(()=> {

      const fetchAlertAssets = async () => {   
           
          const result = await client.models.Assets.list({
            filter: {
              or: [
                { condition: { eq: 'Critical' } },
                { condition: { eq: 'Maintenance Needed' } }
              ]
            }
          })    
          if (result?.data) {
              setAlertAssets(result.data)
          } else {
            console.warn("No assets found or error occurred:", result?.errors)
          }
      }
      fetchAlertAssets()
    }, [])

    return (

      <div>
        <h1>Alerts</h1>
      
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div
            style={{
              flex: 1,
              padding: '1rem',
              borderRadius: '8px',
              boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#ffe5e5',
            }}
          >
            <p style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Critical</p>
            {alertAssets.filter((a) => a.condition === 'Critical').length > 0 ? (
              <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                {alertAssets
                  .filter((asset) => asset.condition === 'Critical')
                  .map((asset) => (
                    <li key={asset.id}>
                      {`${asset.category} ${asset.number} ${asset.region}`}
                    </li>
                  ))}
              </ul>
            ) : (
              <p>None</p>
            )}
          </div>
      
          <div
            style={{
              flex: 1,
              padding: '1rem',
              borderRadius: '8px',
              boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff6cc',
            }}
          >
            <p style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Maintenance Needed
            </p>
            {alertAssets.filter((a) => a.condition === 'Maintenance Needed').length > 0 ? (
              <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                {alertAssets
                  .filter((asset) => asset.condition === 'Maintenance Needed')
                  .map((asset) => (
                    <li key={asset.id}>
                      {`${asset.category} ${asset.number} ${asset.region}`}
                    </li>
                  ))}
              </ul>
            ) : (
              <p>None</p>
            )}
          </div>
        </div>
      </div>
    )
}

export default Alerts