import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartPrice = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  return (
    <Modal open={userProgressCtx.progress === 'cart'}>
      <h2 className="text-2xl m-4">Your Cart</h2>
      <ul className="list-none m-2 p-0">
        {cartCtx.items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
      <p className="flex justify-end m-8 text-xl font-bold color-[#46443]">{`$ ${cartPrice}`}</p>
      <p className="flex justify-end gap-4 m-4 ">
        <button className="rounded mr-2 ml-2 ">Close</button>
        <button className="rounded ml-2 mr-2 ">Go to Checkout</button>
      </p>
    </Modal>
  );
}
