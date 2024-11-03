import React, { useEffect, useState } from "react";
import ClothesItem from "./ClothesItem.jsx";

export default function Clothes({ clothes }) {

  const [loadedClothes, setLoadedClothes] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchClothes() {
      try{
        const response = await fetch('http://localhost:8001/api/catalog/products')
        if(!response.ok){
          throw new Error('Fail to fetch items')
        }
        const clothes = await response.json()
        setLoadedClothes(clothes);
        console.log(clothes)
      }catch(error){
        setError(error)
        console.log(error)
      }
    }
    fetchClothes()
  },[])

  return (
    <ul className="w-[90%] max-w-[70rem] my-8 mx-auto p-4 gap-4 flex flex-wrap justify-center ">
      {loadedClothes.map((product) => (
        <ClothesItem key={product.id} product={product} />
      ))}
    </ul>
  );
}
