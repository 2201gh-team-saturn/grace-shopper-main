

import React, { useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { CartContext } from "../App";

// const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]")

function GuestCheckout() {
    // const [cart, setCart] = useState(cartFromLocalStorage);
    const { cart, setCart } = useContext(CartContext);
    // const cartRef = useRef([]);

    // useEffect(() => {
    //     let cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
        
    //     setCart(uniqueCartArr);
    // }, [cart])

    let uniqueObjArray = [
        ...new Map(cart.map((item) => [item["id"], item])).values(),
    ];

    // uniqueObjArray = uniqueObjArray.filter(object => object.length > 0);
    

    const setQuantity = (product, amount) => {
        const newCart = [...cart];
        newCart.find(
            (item) => item.id === product.id
        ).quantity = amount;
        setCart(newCart);
    };

    const removeFromCart = (productToRemove) => {
        setCart(
            cart.filter((product) => product !== productToRemove)
        );
    };

    const cartItems = uniqueObjArray.map((cartItem) => {
        if(cartItem.length === 0){

        }
        return (
            <div className='cart_format' key={cartItem.id}>
                <img className='cart_img' src={cartItem.imageUrl} />

                <div className='cartItemInfo'>
                    <p>{cartItem.name}</p>
                    <p> Price: ${cartItem.price}</p>
                    {/* <p> Number of nights: {setQuantity(cartItem.id, 1)} </p> */}
                    {/* <button className='cart_btn'>Edit Dates</button> */}
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className='cart_container'>
                <h3> Guest Cart</h3>
                {(uniqueObjArray.length > 0 && cartItems) ||
                    (uniqueObjArray.length === 0 &&
                        <p>There are no rooms in your cart.
                            <span>
                                <Link to='/rooms'>Check out our rooms to get started!</Link>
                            </span>
                        </p>)}
                {/* <p>There are no rooms in your cart.
                    <span>
                        <Link to='/rooms'> Check out our rooms to get started!</Link>
                    </span>
                </p>) */}
                {/* {totalItems ? (
                    <div className="cart_summary">
                        <h4> Total Amount of Days: {
                            items.reduce((total, item) => {
                                return total + item.numberOfNights
                            }, 0)
                        }
                            <br />
                            Total Price: ${
                                items.reduce((total, item) => {
                                    return total + item.room.price
                                }, 0)
                            }
                        </h4>
                        <button>Check Out</button>
                    </div>
                ) : (
                    ''
                )} */}
            </div>
        </div>
    );
};

export default GuestCheckout;