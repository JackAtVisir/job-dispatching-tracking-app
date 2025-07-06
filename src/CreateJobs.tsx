import { useNavigate, useLocation } from 'react-router-dom'

type Asset = { name: string; id: string };

function Jobs () {

    const navigate = useNavigate()
    const location = useLocation()

    const { selectedAssets }: { selectedAssets?: Asset[] } = location.state || {};

    return (

        <div>
          {selectedAssets && selectedAssets.length > 0 ? (
            <ul>
              {selectedAssets.map((asset: Asset)=>(
                <li 
                  key={asset.id}>
                  {asset.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No assets selected</p>
          )}
          
          <button onClick={()=>{navigate('/assets')}}>Back</button>
          <button onClick={()=>{navigate('/')}}>Home</button>
        </div>
    )
}

export default Jobs