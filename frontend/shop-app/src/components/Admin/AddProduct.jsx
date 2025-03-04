import { useState } from "react";
import Navbar from "../Navbar";
import ImagePicker from "../ImagePicker";


export default function AddProduct() {
  console.log('Welcome to AddProduct.jsx');

  const [formData, setFormData] = useState({
    name: "string",
    description: "string",
    size: "string",
    color: "string",
    price: 0,
    category: "string",
    imageFile: null,
  });
  
  const [error, setError] = useState();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (file) => {
    setFormData({ ...formData, imageFile: file });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center mt-none ">
        <div className=" w-3/5 p-8 rounded-lg shadow-2xl h-auto border-2 border-gray-600">
          <div className="flex justify-between border-b pb-4 border-gray-800 mb-6 text-2xl">
            <h1 className="text-black "><b>Add product</b></h1>
          </div>

          <form className="space-y-6" >
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Name"
                className="border p-3 w-full rounded-md text-black"
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="flex space-x-4">
              <textarea
                type="text"
                placeholder="Description"
                className="border p-3 w-full rounded-md text-black"
                name="description"
                onChange={handleChange}
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Size"
                className="border w-1/3 p-3 rounded-md text-black"
                name="size"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Color"
                className="border w-1/3 p-3 rounded-md text-black"
                name="color"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Price"
                className="border w-1/3 p-3 rounded-md text-black"
                name="price"
                onChange={handleChange}
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Category"
                className="border p-3 w-full rounded-md text-black"
                name="category"
                onChange={handleChange}
              />
            </div>

            <ImagePicker onImageSelect={handleImageSelect} />

            <button
              type="button"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              onClick={handleSubmit}
            >
              Add product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
