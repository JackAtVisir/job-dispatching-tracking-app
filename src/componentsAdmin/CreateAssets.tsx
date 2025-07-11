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
  const [assetAmount, setAssetAmount] = useState(0)
  const [newCategory, setNewCategory] = useState('')
  const [categories, setCategories] = useState<Array<Schema["AssetCategories"]["type"]>>([]);

  useEffect(() => {
      client.models.AssetCategories.observeQuery().subscribe({
        next: (data) => setCategories([...data.items]),
      });
    }, []);

  // const handleSubmit = () => {

  //   const createNewAssets = async () => {
  //     const result = await client.models.Assets.list({
  //       filter: {
  //         category: {
  //           eq: selectedCategory
  //         }
  //       }
  //     })

  //     if (result?.data) {

  //       const highestNumber = result.data.reduce((max, asset) => {
  //         const num = asset.number ?? -Infinity
  //         return num > max ? num : max
  //       }, -Infinity)

  //       const nextNumber = highestNumber === -Infinity ? 0 : highestNumber + 1

  //       for (let i = 0; i < assetAmount; i++) {
  //         client.models.Assets.create({  
  //          category: selectedCategory,
  //          number: nextNumber + i,
  //          completed: false,
  //         })
  //       }    
  //       alert(`Assets '${selectedCategory} (${nextNumber}-${nextNumber + assetAmount - 1})' Created`)

  //     } else {
  //       console.warn('No assets dound or error occurred:', result?.errors)
  //     }

  //   }
  //   createNewAssets()
  // }

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


  const handleNewType = () => {

    if (newCategory !== '') {

       client.models.AssetCategories.create({
         category: newCategory
       })
       setNewCategory('')
    }
  }

    return (

      <div>
        <form onSubmit={(e)=>{
            e.preventDefault()
            handleNewType()
          }}>
          <label>
            New Asset Category
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter Asset Type"
            />
          </label>
          <button type="submit">
            Add Category
          </button>
        </form>
        <form onSubmit={handleSubmit}>
          <label>
            Select Category
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">-- Select Category --</option>
              {categories.map((category)=>(
                <option 
                  value={category.category ?? ''}
                  key={category.id}>
                  {category.category}
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