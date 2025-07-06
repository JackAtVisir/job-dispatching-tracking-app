import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const client = generateClient<Schema>();

function CreateJobs() {

    const [image, setImage] = useState('')

    const navigate = useNavigate()

    const handleSubmit = () => {

      client.models.Jobs.create({  
        image: image,
        condition: 'none',
        time: 0,
        completed: false});     
    }

    return (

      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Image URL:
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image URL"
            />
          </label>
          <button type="submit">
            Add Job
          </button>
        </form>
        <button onClick={()=>{navigate('/')}}>Home</button>
      </div>
    )
}

export default CreateJobs