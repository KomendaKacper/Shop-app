import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartPrice = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  function handleCloseCart(){
    userProgressCtx.hideCart();
  }

  function handleGoToCheckout(){
    userProgressCtx.showCheckout();
  }

  return (
    <Modal open={userProgressCtx.progress === "cart"} onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}>
      <h2 className="text-2xl m-4">Your Cart</h2>
      <ul className="list-none m-2 p-0">
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onDecrease={() => cartCtx.removeItem(item.id)}
            onIcrease={() => cartCtx.addItem(item)}
          />
        ))}
      </ul>
      <p className="flex justify-end m-8 text-xl font-bold text-black">{`$ ${cartPrice.toFixed(
        2
      )}`}</p>
      <p className="flex justify-end gap-4 m-4 ">
        <button onClick={handleCloseCart} className="rounded-xl mr-2 ml-1 text-m py-2 px-4  hover:bg-[#33312e57]">
          Close
        </button>
        {cartCtx.items.length > 0 && (
          <button onClick={handleGoToCheckout} className="rounded-xl ml-2 mr-1 bg-[#FFBF00] hover:bg-[#ffab04] text-m py-2 px-4">
            Go to Checkout
          </button>
        )}
      </p>
    </Modal>
  );
}
