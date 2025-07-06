import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom'

const client = generateClient<Schema>();

function Assets() {

  const { user } = useAuthenticator();
  const navigate = useNavigate()
  const [assets, setAssets] = useState<Array<Schema["Assets"]["type"]>>([]);

  useEffect(() => {
    client.models.Assets.observeQuery().subscribe({
      next: (data) => setAssets([...data.items]),
    });
  }, []);
  
  const handleClick = () => {


  }

  return (
    <div>
      <h1>{user?.signInDetails?.loginId}'s Assets</h1>
      <ul>
        {assets.map((asset) => (
          <li 
            onClick={()=>{handleClick()}}
            key={asset.id}>{asset.name}
          </li>
        ))}
      </ul>
      <button onClick={()=>{navigate('/')}}>Home</button>
    </div>
  );
}

export default Assets;
