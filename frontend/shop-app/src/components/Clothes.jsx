import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClothesItem from "./ClothesItem.jsx";

export default function Clothes() {
  const [loadedClothes, setLoadedClothes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClothes() {
      try {
        const response = await fetch(`http://localhost:8765/catalog-service/api/catalog/products?page=${currentPage}&size=6`);
        if (!response.ok) {
          throw new Error("Fail to fetch items");
        }
        const data = await response.json();
        setLoadedClothes(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching clothes:", error);
      }
    }
    fetchClothes();
  }, [currentPage]);

  return (
    <div>
      <ul className="w-[90%] max-w-[70rem] my-8 mx-auto p-4 gap-4 flex flex-wrap justify-center">
        {loadedClothes.map((product) => (
          <ClothesItem key={product.id} product={product} />
        ))}
      </ul>

      {/* PAGINACJA */}
      <div className="flex justify-center mt-4">
        <button 
          className="mx-2 px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span className="mx-4 text-lg font-bold">
          {currentPage + 1} / {totalPages}
        </span>

        <button 
          className="mx-2 px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
          disabled={currentPage + 1 >= totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
