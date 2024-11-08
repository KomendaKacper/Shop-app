import Clothes from './components/Clothes'
import Navbar from './components/Navbar';
import {CartContextProvider} from './store/CartContext.jsx';


function App() {

  return (
    <>
      <CartContextProvider>
        <Navbar />
        <Clothes/>
      </CartContextProvider>
    </>
  )
}

export default App
