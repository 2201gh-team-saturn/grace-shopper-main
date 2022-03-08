import React, { useState} from "react";

import Navbar from './components/Navbar'
import Routes from './Routes'

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]")
export const CartContext = React.createContext();

const App = () => {
  const [cart, setCart] = useState(cartFromLocalStorage);
  return (
    <div>
      <CartContext.Provider
        value={{
          cart,
          // setCartOnLocalStorage: () => {
          //   setCart(localStorage.setItem("cart", JSON.stringify(cart)))
          // }
          setCart,
          // useEffect
        }}>
        <Navbar />
        <Routes />
      </CartContext.Provider>
    </div>
  )
}

export default App
