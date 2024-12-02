import { FaCartShopping } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import "../index.css";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Navbar() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0)

  function handleShowCart(){
    userProgressCtx.showCart()
  }

  return (
    <div id="nav-container" className="p-5 ml-6 mr-6 ">
      <nav className="flex justify-between items-center">
        <h1 id="nav-header" className="text-[2rem] m-0 float-left">
          <a className=" no-underline text-white hover:text-[rgb(156,140,121)]" href="/">
            Clothes Shop
          </a>
        </h1>
        <ul className="list-none p-0 flex">
          <li
            id="nav-el"
            className=" ml-[20px] mr-[20px] cursor-pointer float-right hover:text-[rgb(183,164,143)] hover:scale-150"
          >
            <a href="/home"><IoHome size={25} /></a>
          </li>
          <li
            id="nav-el"
            className="ml-[20px] mr-[20px] cursor-pointer float-right hover:text-[rgb(183,164,143)] hover:scale-150"
          >
            <a href="/login"><CgProfile size={25} /></a>
          </li>
          <li
            id="nav-el"
            className="ml-[20px] mr-[20px] cursor-pointer float-right hover:text-[rgb(183,164,143)] hover:scale-150 flex items-center"
          >
            <FaCartShopping size={25} onClick={handleShowCart}/> <p className="ml-1 text-l">({totalCartItems})</p>
          </li>
        </ul>
      </nav>
      <hr className="mt-4"/>
    </div>
  );
}
