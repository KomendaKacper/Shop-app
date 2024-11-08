import Cart from './components/Cart.jsx';
import Clothes from './components/Clothes'
import Navbar from './components/Navbar';
import {CartContextProvider} from './store/CartContext.jsx';
import { UserProgressContextProvider } from './store/UserProgressContext.jsx';


function App() {

  return (
    <>
      <UserProgressContextProvider>
        <CartContextProvider>
          <Navbar />
          <Clothes/>
          <Cart />
        </CartContextProvider>
      </UserProgressContextProvider>
    </>
  )
}

export default App
