import React, { useState, useRef, useEffect} from "react";

import Navbar from './components/Navbar'
import Routes from './Routes'

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]")
export const CartContext = React.createContext();

const App = () => {
  const [cart, setCart] = useState(cartFromLocalStorage);

  // const cartRef = useRef([]);

//   useEffect(() => {
//     // if (localStorage.cart !== null)
//     // const cartFromLocalStorage = setInterval(() => {
//     //   JSON.parse(localStorage.getItem("cart") || "[]")
//     // }, 1000)
//     cartRef.current = setInterval(() => {
//       JSON.parse(localStorage.cart);
//     }, 1000)
// }, [cart])

  /**
   useEffect but setting an interval, so that every __ time it checks local stroage
   and will put localstorage into variable
   or will setCart? can put line 6 into function of useEffect

   set that as cartFromLocalStorage = interval that's happening
   no dependcies because we just want it to run to ensure most up-t-date version
   should make cart variable update properly on line 10

   */

  // console.log("this is the cart -------->", cartRef.current);

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
