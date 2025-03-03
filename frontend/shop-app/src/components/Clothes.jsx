import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClothesItem from "./ClothesItem.jsx";

export default function Clothes({ clothes }) {
  const [loadedClothes, setLoadedClothes] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClothes() {
      try {
        const response = await fetch("http://localhost:8765/catalog-service/api/catalog/products");
        if (!response.ok) {
          throw new Error("Fail to fetch items");
        }
        const clothes = await response.json();
        setLoadedClothes(clothes);
      } catch (error) {
        console.error("Error fetching clothes:", error);
      }
    }
    fetchClothes();
  }, []);

  return (
    <div>
      <ul className="w-[90%] max-w-[70rem] my-8 mx-auto p-4 gap-4 flex flex-wrap justify-center">
        {loadedClothes.map((product) => (
          <ClothesItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}
