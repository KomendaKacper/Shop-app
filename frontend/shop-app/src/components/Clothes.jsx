import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClothesItem from "./ClothesItem.jsx";
import ReactSearchBox from "react-search-box";

export default function Clothes() {
  const [loadedClothes, setLoadedClothes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [enteredFilter, setEnteredFilter] = useState("");
  const [filteredClothes, setFilteredClothes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClothes() {
      try {
        let url;
        if (enteredFilter) {
          url = `http://localhost:8765/catalog-service/api/catalog/filter-by-names/${enteredFilter}`;
        } else {
          url = `http://localhost:8765/catalog-service/api/catalog/products?page=${currentPage}&size=6`;
        }
  
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Fail to fetch items");
        }
  
        const data = await response.json();
  
        if (enteredFilter) {
          setFilteredClothes(data);
        } else {
          setLoadedClothes(data.content);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching clothes:", error);
      }
    }
  
    fetchClothes();
  }, [currentPage, enteredFilter]); 
  
  
  return (
    <>
      <div className="w-[500px] mx-auto flex justify-start gap-2">
        <div className="flex-1">
          <ReactSearchBox placeholder="Search..." onChange={(value) => setEnteredFilter(value)}/>
        </div>
        <button className="p-2  text-white rounded">
          Categories
        </button>
      </div>

      <div>
        <ul className="w-[90%] max-w-[70rem] my-8 mx-auto p-4 gap-4 flex flex-wrap justify-center">
          
          {(enteredFilter ? filteredClothes : loadedClothes).map((product) => (
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

          <span className="mx-4 text-lg font-bold mt-2">
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
    </>
  );
}
