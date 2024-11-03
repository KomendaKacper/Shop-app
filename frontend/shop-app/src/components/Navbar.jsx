import { FaCartShopping } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import "../index.css";

export default function Navbar() {
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
            className="ml-[20px] mr-[20px] cursor-pointer float-right hover:text-[rgb(183,164,143)] hover:scale-150"
          >
            <FaCartShopping size={25} />
          </li>
        </ul>
      </nav>
      <hr className="mt-4"/>
    </div>
  );
}
