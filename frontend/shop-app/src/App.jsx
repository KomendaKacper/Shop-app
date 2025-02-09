import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import Clothes from "./components/Clothes";
import Navbar from "./components/Navbar";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";
import { AuthContextProvider } from "./store/AuthContext.jsx";

function App() {
  return (
    <>
      <AuthContextProvider>
        <UserProgressContextProvider>
          <CartContextProvider>
            <Navbar />
            <Clothes />
            <Cart />
            <Checkout />
          </CartContextProvider>
        </UserProgressContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
