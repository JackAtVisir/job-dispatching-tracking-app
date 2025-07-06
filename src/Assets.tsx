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
  const [selectedAssets, setSelectedAssets] = useState<{ name: string; id: string }[]>([])

  useEffect(() => {
    client.models.Assets.observeQuery().subscribe({
      next: (data) => setAssets([...data.items]),
    });
  }, []);
  
  const handleSelect = (name: string, id: string) => {

    const isSelected = selectedAssets.some(asset => asset.id === id);
  
    if (isSelected) {
      const updatedAssets = selectedAssets.filter(asset => asset.id !== id);
      setSelectedAssets(updatedAssets);
    } else {
      const currentAsset = { name, id };
      setSelectedAssets([...selectedAssets, currentAsset]);
    }
  };


  const handleDelete = (id: string) => {

    const isSelected = selectedAssets.some(asset => asset.id === id)

    if (isSelected) {
      const updatedAssets = selectedAssets.filter(asset => asset.id !== id);
      setSelectedAssets(updatedAssets)
    }
    client.models.Assets.delete({id})
  }

  const handleClear = () => {

    setSelectedAssets([])
  }

  return (
    <div>
      <h1>{user?.signInDetails?.loginId}'s Assets</h1>
      <ul>
        {assets.map((asset) => {
          const isSelected = selectedAssets.some((selected) => selected.id === asset.id);
      
          return (
            <li
              key={asset.id}
              style={{
                backgroundColor: isSelected ? 'lightgreen' : 'white',
              }}
            >
              {asset.name}
              <button onClick={() => handleSelect(asset.name ?? 'unnamed asset', asset.id)}>
                {isSelected ? 'Deselect' : 'Select'}
              </button>
              <button onClick={() => handleDelete(asset.id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={()=>{handleClear()}}>Clear</button>
      <button onClick={()=>{navigate('/')}}>Home</button>
    </div>
  );
}

export default Assets;
