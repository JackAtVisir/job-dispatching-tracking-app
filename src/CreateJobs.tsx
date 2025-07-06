import { useNavigate, useLocation } from 'react-router-dom'

type Asset = { name: string; id: string };

function Jobs () {

    const navigate = useNavigate()
    const location = useLocation()

    const { selectedAssets: selectedAssets } = location.state || {}

    return (

        <div>
          <ul>
            {selectedAssets.map((asset: Asset)=>(
              <li 
                key={asset.id}>
                {asset.name}
              </li>
            ))}
          </ul>
          <button onClick={()=>{navigate('/')}}>Home</button>
        </div>
    )
}

export default Jobs