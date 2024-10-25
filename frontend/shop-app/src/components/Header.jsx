import { FaCartShopping } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import '../index.css'

export default function Header() {

  return (
    <div id="nav-container" className="mt-[1.5rem] ml-6 mr-6">
      <nav className="flex justify-between items-center">
        <h1 id="nav-header" className="text-[2rem] m-0 float-left">
          <a className=" no-underline text-white " href="/">
            Clothes Shop
          </a>
        </h1>
        <ul className="list-none p-0 flex">
          <li
            id="nav-el"
            className="mt-0 ml-[20px] mr-[20px] cursor-pointer float-right hover:text-[rgb(202,_182,_159)] hover:scale-150"
          >
            <IoHome size={25} />
          </li>
          <li
            id="nav-el"
            className="mt-0 ml-[20px] mr-[20px] cursor-pointer float-right hover:text-[rgb(202,_182,_159)] hover:scale-150"
          >
            <CgProfile size={25} />
          </li>
          <li
            id="nav-el"
            className="mt-0 ml-[20px] mr-[20px] cursor-pointer float-right hover:text-[rgb(202,_182,_159)] hover:scale-150"
          >
            <FaCartShopping size={25} />
          </li>
        </ul>
      </nav>
    </div>
  );
}
