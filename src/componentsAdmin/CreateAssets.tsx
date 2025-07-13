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
      <h1 style={{ marginBottom: '1rem' }}>Create Assets</h1>
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            flex: '1 1 300px',
            maxWidth: '480px',
            padding: '1rem',
            boxSizing: 'border-box',
            borderRadius: '8px',
          }}
        >
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem' }}>
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.4rem',
                  boxSizing: 'border-box',
                }}
              >
                <option value="">-- Select Category --</option>
                {assetFilters
                  .filter((filters) => filters.category)
                  .map((category) => (
                    <option value={category.category ?? ''} key={category.id}>
                      {category.category}
                    </option>
                  ))}
              </select>
            </div>
  
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem' }}>
                Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.4rem',
                  boxSizing: 'border-box',
                }}
              >
                <option value="">-- Select Region --</option>
                {assetFilters
                  .filter((filters) => filters.region)
                  .map((region) => (
                    <option value={region.region ?? ''} key={region.id}>
                      {region.region}
                    </option>
                  ))}
              </select>
            </div>
  
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem' }}>
                Asset Amount
              </label>
              <input
                type="number"
                step="1"
                value={assetAmount}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10)
                  if (!isNaN(value)) {
                    setAssetAmount(value)
                  }
                }}
                style={{
                  width: '100%',
                  padding: '0.4rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>
  
            <button type="submit" style={{ padding: '0.4rem 0.8rem' }}>
              Add Asset
            </button>
          </form>
        </div>
  
        {/* Right: Add Category & Region forms */}
        <div
          style={{
            flex: '1 1 300px',
            maxWidth: '480px',
            padding: '1rem',
            boxSizing: 'border-box',
            borderRadius: '8px',
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleNewCategory()
            }}
            style={{ marginBottom: '1rem' }}
          >
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>
              New Asset Category
            </label>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter Asset Category"
              style={{
                width: '100%',
                padding: '0.4rem',
                marginBottom: '0.5rem',
                boxSizing: 'border-box',
              }}
            />
            <button type="submit" style={{ padding: '0.4rem 0.8rem' }}>
              Add Category
            </button>
          </form>
  
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleNewRegion()
            }}
          >
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>
              New Asset Region
            </label>
            <input
              type="text"
              value={newRegion}
              onChange={(e) => setNewRegion(e.target.value)}
              placeholder="Enter Asset Region"
              style={{
                width: '100%',
                padding: '0.4rem',
                marginBottom: '0.5rem',
                boxSizing: 'border-box',
              }}
            />
            <button type="submit" style={{ padding: '0.4rem 0.8rem' }}>
              Add Region
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateAssets