

import React, { useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { CartContext } from "../App";

// const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]")

function GuestCheckout() {
    // const [cart, setCart] = useState(cartFromLocalStorage);
    const { cart } = useContext(CartContext);

    // useEffect(() => {
    //     localStorage.setItem("cart", JSON.stringify(cart));
    // }, [cart]) //can also maybe do interval, so cart is regularly updating?
    // //might want to set local storage when user 



    const cartItems = cart.map((cartItem) => {
        return (
            <div className='cart_format' key={cartItem.id}>
                <img className='cart_img' src={cartItem.room.imageUrl} />

                <div className='cartItemInfo'>
                    <p>{cartItem.room.name}</p>
                    <p> Price: ${cartItem.room.price}</p>
                    <p> Number of nights: {cartItem.numberOfNights} </p>
                    <button className='cart_btn'>Edit Dates</button>
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className='cart_container'>
                <h3> Guest Cart</h3>
                {(cart.length > 0 && cartItems) ||
                    (cart.length === 0 &&
                        <p>There are no rooms in your cart.
                            <span>
                                <Link to='/rooms'>Check out our rooms to get started!</Link>
                            </span>
                        </p>)}
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