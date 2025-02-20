import { FaCartShopping } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io"; 
import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import AuthContext from "../store/AuthContext";

export default function Navbar() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();  
  const location = useLocation(); 

  const totalCartItems = cartCtx.items.reduce((total, item) => total + item.quantity, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  const handleAuthAction = () => {
    console.log("handleAuthAction triggered. isLoggedIn:", isLoggedIn);
    if (isLoggedIn) {
      authCtx.logout(); 
    } else {
      navigate("/login");  
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");
    const usernameFromUrl = queryParams.get("username");
    const roleFromUrl = queryParams.get("role");

    if (tokenFromUrl && usernameFromUrl && roleFromUrl) {
      console.log("Token from URL:", tokenFromUrl);
      authCtx.login(tokenFromUrl, [roleFromUrl]);
    }
  }, [location.search, authCtx]);

  const isLoggedIn = authCtx.token;

  return (
    <div id="nav-container" className="p-5 ml-6 mr-6 ">
      <nav className="flex justify-between items-center">
        <h1 id="nav-header" className="text-[2rem] m-0 float-left">
          <a
            className="no-underline text-white hover:text-[rgb(156,140,121)]"
            href="/"
          >
            Clothes Shop
          </a>
        </h1>
        <ul className="list-none p-0 flex">
          <li className="ml-[20px] mr-[20px] cursor-pointer hover:text-[rgb(183,164,143)] hover:scale-150">
            <a href="/home">
              <IoHome size={25} />
            </a>
          </li>
          <li className="ml-[20px] mr-[20px] cursor-pointer hover:text-[rgb(183,164,143)] hover:scale-150">
            <a>
              {isLoggedIn ? (
                <IoIosLogOut size={25} onClick={handleAuthAction} />
              ) : (
                <CgProfile size={25} onClick={handleAuthAction} />
              )}
            </a>
          </li>
          <li className="ml-[20px] mr-[20px] cursor-pointer hover:text-[rgb(183,164,143)] hover:scale-150 flex items-center">
            <FaCartShopping size={25} onClick={handleShowCart} />
            <p className="ml-1 text-l">({totalCartItems})</p>
          </li>
        </ul>
      </nav>
      <hr className="mt-4" />
    </div>
  );
}
