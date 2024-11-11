import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Input from "./UI/Input";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"}>
      <form action="">
        <h2>Checkout</h2>
        <p>Total Amount: {cartTotal.toFixed(2)}</p>

        <Input label="Name" id="name" type="text" />
        <Input label="Email" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="flex justify-start g-4">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>

        <p className="flex justify-end g-4">
          <button
            onClick={handleClose}
            type="button"
            className="rounded-xl mr-2 ml-1 text-m py-2 px-4 cursor-pointer"
          >
            Close
          </button>
          <button className="rounded-xl mr-2 ml-1 text-m py-2 px-4 ">
            Submit purchase
          </button>
        </p>
      </form>
    </Modal>
  );
}
