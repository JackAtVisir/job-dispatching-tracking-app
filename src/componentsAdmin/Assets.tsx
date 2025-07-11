import { useEffect, useState } from "react"
import type { Schema } from "../../amplify/data/resource"
import { generateClient } from "aws-amplify/data"
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { userRoleAtom } from '../atoms/userAtoms' 

function Assets() {

  const client = generateClient<Schema>()

  const navigate = useNavigate()

  const [userRole] = useAtom(userRoleAtom)
  useEffect(() => {
    if (userRole !== 'admin') {
      navigate('/')
    }
  }, [userRole])

  const [assets, setAssets] = useState<Array<Schema["Assets"]["type"]>>([]);
  const [selectedAssets, setSelectedAssets] = useState<{ category: string; number: number; id: string }[]>([])

  useEffect(() => {
    client.models.Assets.observeQuery().subscribe({
      next: (data) => setAssets([...data.items]),
    });
  }, []);
  
  const handleSelect = (category: string, number: number, id: string) => {

    const isSelected = selectedAssets.some(asset => asset.id === id);
  
    if (isSelected) {
      const updatedAssets = selectedAssets.filter(asset => asset.id !== id);
      setSelectedAssets(updatedAssets);
    } else {
      const currentAsset = { category, number, id };
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

  const handleCreateJob = () => {
    navigate("/createJob", {
      state: { selectedAssets: selectedAssets }  
    });

  }

  return (
    <div>
      <h1>Assets:</h1>
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
              {`${asset.category} ${asset.number}`}
              <button onClick={() => handleSelect(asset.category ?? '', asset.number ?? 0, asset.id)}>
                {isSelected ? 'Deselect' : 'Select'}
              </button>
              <button onClick={() => handleDelete(asset.id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={()=>{handleClear()}}>Clear Selected Assets</button>
      <button onClick={()=>{handleCreateJob()}}>Create Job</button>
      <button onClick={()=>{navigate('/')}}>Home</button>
    </div>
  );
}

export default Assets;
