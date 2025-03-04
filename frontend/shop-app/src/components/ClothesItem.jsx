import { useContext, useState } from "react";
import CartContex from "../store/CartContext";
import "./ImageFlip.css";
import { ToastContainer, toast } from "react-toastify";

export default function ClothesItem({ product }) {
  const backendUrl = "http://localhost:8765/catalog-service/api/catalog/";

  const cartCtx = useContext(CartContex);

  const [isFlipped, setIsFilipped] = useState(false);

  const notify = () =>
    toast.success("Successfully added to cart!");

  const handleMouseEnter = () => {
    setIsFilipped(true);
  };
  const handleMouseLeave = () => {
    setIsFilipped(false);
  };

  function addToCartHandler() {
    cartCtx.addItem(product);
    notify();
  }

  return (
    <li className="w-[20rem] bg-[rgb(176,159,139)] rounded-2xl overflow-hidden text-center shadow-lg">
      <article className="h-full flex flex-col justify-between">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`image-container ${isFlipped ? "flipped" : ""}`}
        >
          <div className="image">
            <img
              src={`${backendUrl}${product.imageUrl}`}
              alt={product.name}
              className="w-full h-80 object-cover backface-hidden"
            />
            <div className="back bg-[rgb(176,159,139)] flex flex-col items-center justify-center backface-hidden rotate-y-180">
              <p className="mb-2 mt-2 block"><b><i>Product name:</i></b> {product.name}</p>
              <p className="mb-2 mt-2 block"><b><i>Description:</i></b> {product.description}</p>
              <p className="mb-2 mt-2 block"><b><i>Size:</i></b> {product.size}</p>
              <p className="mb-2 mt-2 block"><b><i>Color:</i></b> {product.color}</p>
              <p className="mb-2 mt-2 block"><b><i>Category:</i></b> {product.category}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-[bold] mx-0 my-3">{product.name}</h3>
          <p className="inline-block bg-[rgb(97,87,74)] text-[#ffc404] text-[0.9rem] font-[bold] rounded m-0 px-8 py-2 hover:bg-[rgb(82,74,63)] cursor-pointer">
            $ {product.price} 
          </p>
          <p className="mb-2 mt-2">{product.description}</p>
        </div>
        <p className="mb-6">
          <button
            onClick={addToCartHandler}
            className="bg-[rgb(97,87,74)] hover:bg-[rgb(82,74,63)] cursor-pointer rounded-md h-8 w-[8rem]"
          >
            Add to Cart
          </button>
          <ToastContainer />
        </p>
      </article>
    </li>
  );
}
