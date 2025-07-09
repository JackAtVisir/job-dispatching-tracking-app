import { useNavigate, useLocation} from "react-router"
import { generateClient } from "aws-amplify/data"
import type { Schema } from "../amplify/data/resource"
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
            <input
              type="text"
              value={formData.condition}
              placeholder={"Enter Asset Condition"}
              onChange={(e) => {
                const newData = {
                  condition: e.target.value,
                  time: formData.time,
                  date: formData.date
                }
                setFormData(newData)
              }}
            />
          </label>
          <label>
            Time
            <input
              type='text'
              value={formData.time} 
              placeholder='Enter Time' 
              onChange={(e) => {
                const newData = {
                  condition: formData.condition,
                  time: e.target.value,
                  date: formData.date
                }
                setFormData(newData)
              }}
            />
          </label>
          <label>
            Date
            <input
              type='text'
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