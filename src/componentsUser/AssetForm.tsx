import { useNavigate, useLocation} from "react-router"
import { generateClient } from "aws-amplify/data"
import type { Schema } from "../../amplify/data/resource"
import { useState } from "react"

const client = generateClient<Schema>()

function AssetForm () {

    const navigate = useNavigate()
    const location = useLocation()

    const { assetID, assetName } = location.state as {
      assetID: string,
      assetName: string
    }
    const [formData, setFormData] = useState({
      condition: '',
      time: '',
      date: '',
    })

    const handleSubmit = async () => {

      const result = await client.models.Assets.update({

        id: assetID,
        condition: formData.condition,
        date: formData.date,
        time: formData.time,
        completed: true,
      })

      if (result?.data) {
        console.log('Form Submit Results: ', result.data)
      } else {
        console.warn('Error: ', result.errors)
      }
      navigate('/jobs', {
        state: { refreshAssets: true }
      })
    }

    return (

        <div>
          <p>{assetName}</p>
          <form onSubmit={(e)=>{
            e.preventDefault()
            handleSubmit()
          }}>
          <label>
            Condition
            <select
              value={formData.condition}
              onChange={(e) => {
                const newData = {
                  condition: e.target.value,
                  time: formData.time,
                  date: formData.date
                };
                setFormData(newData);
              }}
            >
              <option value="">-- Select Condition --</option>
              <option value="Fully Operational">Fully Operational</option>
              <option value="Partially Operational">Partially Operational</option>
              <option value="Maintenance Needed">Maintenance Needed</option>
              <option value="Critical">Critical - Immediate Attention</option>
              <option value="Out Of Service">Out of Service</option>
            </select>
          </label>
          <label>
            Time
            <input
              type="time"
              value={formData.time}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  time: e.target.value
                });
              }}
            />
          </label>

          <label>
            Date
            <input
              type='date'
              value={formData.date} 
              placeholder='Enter Date'
              onChange={(e) => {
                const newData = {
                  condition: formData.condition,
                  time: formData.time,
                  date: e.target.value
                }
                setFormData(newData)
              }} 
            />
          </label>
          <button type="submit">
            Submit
          </button>
        </form>
          <button onClick={()=>{navigate('/jobs')}}>Close</button>
        </div>
    )
}

export default AssetForm