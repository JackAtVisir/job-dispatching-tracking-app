import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { userRoleAtom } from '../atoms/userAtoms' 


function CreateAssets() {

  const client = generateClient<Schema>();

  const navigate = useNavigate()
  const [userRole] = useAtom(userRoleAtom)

  useEffect(() => {
    if (userRole !== 'admin') {
      navigate('/')
    }
  }, [userRole])

  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [assetAmount, setAssetAmount] = useState(0)
  const [newCategory, setNewCategory] = useState('')
  const [newRegion, setNewRegion] = useState('')
  const [assetFilters, setAssetFilters] = useState<Array<Schema["AssetFilters"]["type"]>>([])

  useEffect(() => {
      client.models.AssetFilters.observeQuery().subscribe({
        next: (data) => setAssetFilters([...data.items]),
      });
    }, [])

  const createNewAssets = async () => {
  const result = await client.models.Assets.list({
    filter: { category: { eq: selectedCategory } }
  })

  if (result?.data) {
    const highestNumber = result.data.reduce((max, asset) => {
      const num = asset.number ?? -Infinity;
      return num > max ? num : max;
    }, -Infinity);

    const nextNumber = highestNumber === -Infinity ? 0 : highestNumber + 1;

    await Promise.all(
      Array.from({ length: assetAmount }, (_, i) =>
        client.models.Assets.create({
          category: selectedCategory,
          region: selectedRegion,
          number: nextNumber + i,
          completed: false,
        })
      )
    );

    alert(`Assets '${selectedCategory} (${nextNumber}-${nextNumber + assetAmount - 1})' Created`);
  } else {
    console.warn("No assets found or error occurred:", result?.errors);
    throw new Error("Failed to list assets");
  }
}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!selectedCategory) {
      alert("Please select a category first.")
      return
    }
    if (assetAmount <= 0) {
      alert("Please enter a positive asset amount.")
      return
      }
  
    try {
      await createNewAssets();
    } catch (error) {
      console.error("Error creating assets:", error)
      alert("Failed to create assets. See console for details.")
    }
  }


  const handleNewCategory = () => {

    if (newCategory !== '') {

       client.models.AssetFilters.create({
         category: newCategory
       })
       setNewCategory('')
    }
  }

   const handleNewRegion = () => {

    if (newRegion !== '') {

       client.models.AssetFilters.create({
         region: newRegion
       })
       setNewRegion('')
    }
  }

    return (

      <div>
        <div>
          <form onSubmit={(e)=>{
              e.preventDefault()
              handleNewCategory()
            }}>
            <label>
              New Asset Category
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter Asset Category"
              />
            </label>
            <button type="submit">
              Add Category
            </button>
          </form>
          <form onSubmit={(e)=>{
              e.preventDefault()
              handleNewRegion()
            }}>
            <label>
              New Asset Region
              <input
                type="text"
                value={newRegion}
                onChange={(e) => setNewRegion(e.target.value)}
                placeholder="Enter Asset Region"
              />
            </label>
            <button type="submit">
              Add Region
            </button>
          </form>
        </div>
        <form onSubmit={handleSubmit}>
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