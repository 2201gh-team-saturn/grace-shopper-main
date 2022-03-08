import React, { useState} from "react";

import Navbar from './components/Navbar'
import Routes from './Routes'

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]")
export const CartContext = React.createContext();

const App = () => {
  // JOE CR: I noticed where this context is used, setCart is not. Why have this state at all if
  // it never changes?
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
