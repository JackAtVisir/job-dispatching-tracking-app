import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const client = generateClient<Schema>();

function CreateAssets() {

    const [asset, setAsset] = useState('')
    const [assetAmount, setAssetAmount] = useState(0)

    const navigate = useNavigate()

    const handleSubmit = () => {

      for (let i = 0; i < assetAmount; i++) {
        const name = `${asset}${i}`

        client.models.Assets.create({  
         name: name,
         condition: 'none',
         completed: false,
        })
      }    
      alert(`Assets '${asset}(0-${assetAmount - 1})' Created`)
    }

    return (

      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Asset Name
            <input
              type="text"
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
              placeholder="Enter Asset Name"
            />
          </label>
          <label>
            Asset Amount
            <input
              type='number'
              step='1'
              value={assetAmount}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value)) {
                  setAssetAmount(value);
                }
              }}
            />
          </label>
          <button type="submit">
            Add Asset
          </button>
        </form>
        <button onClick={()=>{navigate('/')}}>Home</button>
      </div>
    )
}

export default CreateAssets