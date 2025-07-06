import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

type Asset = { name: string; id: string };

const client = generateClient<Schema>();

function Jobs () {

    const navigate = useNavigate()
    const location = useLocation()

    const { selectedAssets }: { selectedAssets?: Asset[] } = location.state || {};
    const [users, setUsers] = useState<Array<Schema["Users"]["type"]>>([]);

     useEffect(() => {
        client.models.Users.observeQuery().subscribe({
          next: (data) => setUsers([...data.items]),
        });
      }, []);
      

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
          <div>
            <p>Assign Job:</p>
            <ul>
              {users.map((user)=>(
                <li
                  key={user.id}>
                  {user.username}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={()=>{navigate('/assets')}}>Back</button>
          <button onClick={()=>{navigate('/')}}>Home</button>
        </div>
    )
}

export default Jobs