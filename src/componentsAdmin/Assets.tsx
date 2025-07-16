import { useEffect, useState } from "react"
import type { Schema } from "../../amplify/data/resource"
import { generateClient } from "aws-amplify/data"
import { useNavigate } from 'react-router-dom'
import { useAtom, useSetAtom } from 'jotai'
import { userRoleAtom } from '../atoms/userAtoms' 
import { selectedAssetsAtom } from "../atoms/assetAtoms";

function Assets() {

  const client = generateClient<Schema>()

  const navigate = useNavigate()

  const [userRole] = useAtom(userRoleAtom)
  useEffect(() => {
    if (userRole !== 'admin') {
      navigate('/')
    }
  }, [userRole])

  const [selectedAssets] = useAtom(selectedAssetsAtom)
  const setSelectedAssets = useSetAtom(selectedAssetsAtom)

  const [assets, setAssets] = useState<Array<Schema["Assets"]["type"]>>([]);
  const [assetFilters, setAssetFilters] = useState<Array<Schema["AssetFilters"]["type"]>>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')

  useEffect(() => {

    client.models.AssetFilters.observeQuery().subscribe({
      next: (data) => setAssetFilters([...data.items]),
    });
    
    const fetchAssets = async () => {

      const result = await client.models.Assets.list()

      if (result?.data) {
        const sortedAssets = result.data.sort((a, b) => {
        const categoryCompare = (a.category ?? '').localeCompare(b.category ?? '')
        if (categoryCompare !== 0) return categoryCompare
        return (a.number ?? 0) - (b.number ?? 0)
      })

        setAssets(sortedAssets);
      } else {
        console.warn('No Assets found or error occurred:', result?.errors)
      }
    }
    fetchAssets()
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
    navigate("/createJob")

  }

  const handleFilterSelect = () => {

  }

  return (
    <div>
      <h1>Assets</h1>
      <div>
        <form onSubmit={handleFilterSelect}>
          <label>
            Select Category
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">-- Select Category --</option>
              {assetFilters
              .filter((filters) => filters.category)
              .map((category)=>(
                <option 
                  value={category.category ?? ''}
                  key={category.id}>
                  {category.category}
                </option>
              ))}
            </select>
          </label>
          <label>
            Select Region
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="">-- Select Region --</option>
              {assetFilters
              .filter((filters) => filters.region)
              .map((region)=>(
                <option 
                  value={region.region ?? ''}
                  key={region.id}>
                  {region.region}
                </option>
              ))}
            </select>
          </label>
        </form>
      </div>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {assets
            .filter((asset) =>
              (selectedCategory === '' || asset.category === selectedCategory) &&
              (selectedRegion === '' || asset.region === selectedRegion)
            )
            .map((asset) => {
              const isSelected = selectedAssets.some((selected) => selected.id === asset.id);
      
              return (
                <li
                  key={asset.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '4px 0',
                    backgroundColor: isSelected ? 'lightgreen' : undefined,
                  }}
                >
                  <span style={{ flex: 1 }}>
                    {asset.category} {asset.number}
                  </span>
                  <span style={{ flex: 1, textAlign: 'center' }}>
                    {asset.region ?? ''}
                  </span>
                  <span style={{ flex: 1, textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button onClick={() => handleSelect(asset.category ?? '', asset.number ?? 0, asset.id)}>
                      {isSelected ? 'Deselect' : 'Select'}
                    </button>
                    <button onClick={() => handleDelete(asset.id)} style={{ marginLeft: '8px' }}>
                      Delete
                    </button>
                  </span>
                </li>
              );
            })}
        </ul>
      </div>
      <button onClick={()=>{handleClear()}}>Clear Selected Assets</button>
      <button onClick={()=>{handleCreateJob()}}>Create Job</button>
    </div>
  );
}

export default Assets;
