import { useNavigate, useLocation} from "react-router"
import { generateClient } from "aws-amplify/data"
import type { Schema } from "../amplify/data/resource"
import { useEffect, useState } from "react"

const client = generateClient<Schema>()

function AssetForm () {

    const navigate = useNavigate()
    const location =useLocation()

    const assetID = location.state as string || ''
    const [asset, setAsset] = useState<Schema["Assets"]["type"] | null>(null)

    useEffect(() => {

      const getAsset = async () => {
        const result = await client.models.Assets.get({ id: assetID });
      
        if (result.data) {
          console.log("Asset found:", result.data);
          setAsset(result.data)
        } else {
          console.warn("No asset found");
        }
      }
      getAsset()
    }, [])

    return (

        <div>
          <form>
            
          </form>
          <button onClick={()=>{navigate('/jobs')}}>Back</button>
        </div>
    )
}

export default AssetForm