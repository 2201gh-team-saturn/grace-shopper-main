import React, { useState, useEffect, useRef } from "react";

import Navbar from './components/Navbar'
import Routes from './Routes'

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]")
export const CartContext = React.createContext();

const App = () => {
  const [cart, setCart] = useState(cartFromLocalStorage);

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }, [cart]) //can also maybe do interval, so cart is regularly updating?
  // //might want to set local storage when user 

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
