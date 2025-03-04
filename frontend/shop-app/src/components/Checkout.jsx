import { useContext, useState } from "react";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import UserProgressContext from "../store/UserProgressContext.jsx";
import { useNavigate } from "react-router-dom";
import CartContext from "../store/CartContext.jsx";
import AuthContext from "../store/AuthContext.jsx";
import { ToastContainer, toast } from "react-toastify";

export default function Checkout() {
  const navigate = useNavigate();
  const userProgressCtx = useContext(UserProgressContext);
  const authCtx = useContext(AuthContext);

  const cartContext = useContext(CartContext);
  const cartTotal = cartContext.totalPrice;
  console.log(cartTotal);

  const notify = () =>
    toast.error("You have to be logged in to finalize your purchase!");

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    street: "",
    postalCode: "",
    city: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handlePurchase(e) {
    if (!authCtx.isUserLoggedIn) {
      e.preventDefault();
      notify();
      return;
    } else {
      e.preventDefault();
      navigate("/payment", { state: { totalPrice: cartTotal } });
    }
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"}>
      <form className="flex flex-col">
        <h2 className="justify-center flex text-2xl m-4" onClick={handleClose}>
          <b>Checkout</b>
        </h2>
        <div className="w-[600px] h-max">
          <Input
            label="Name"
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
          />
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            label="Street"
            id="street"
            name="street"
            type="text"
            value={formData.street}
            onChange={handleInputChange}
          />
          <div className="flex justify-start gap-4">
            <Input
              label="Postal Code"
              id="postalCode"
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
            />
            <Input
              label="City"
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-12">
            <p className="float-right mt-1 mb-1 p-2">
              <b>Total Amount: {cartTotal} $</b>
            </p>
          </div>
          <div>
            <p className="float-right m-1 p-1">
              <button
                onClick={handleClose}
                type="button"
                className="rounded-xl mr-2 ml-1 text-m py-1 px-4 cursor-pointer hover:bg-[#33312e57]"
              >
                Close
              </button>
              <button
                className="rounded-xl ml-2  bg-[#FFBF00] text-m py-1 px-4 cursor-pointer hover:bg-[#ffab04]"
                onClick={handlePurchase}
              >
                Submit purchase
              </button>
              <ToastContainer />
            </p>
          </div>
        </div>
      </form>
    </Modal>
  );
}
