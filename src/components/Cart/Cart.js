import React from 'react';
import { useCart } from '../../context/CartContext';
import "./Cart.css"

// ... other imports
const Cart = ({ cart, removeFromCart, incrementQuantity, decrementQuantity }) => {
    const totalPrice = cart.reduce((total, item) => total + item.quantity * item.price, 0);

    return (
        <div>
            {cart.map((item) => (
                <div key={item.id}>
                    <h3>{item.title}</h3>
                    <p>Quantity: 
                        <button onClick={() => decrementQuantity(item.id)}>-</button>
                        {item.quantity}
                        <button onClick={() => incrementQuantity(item.id)}>+</button>
                    </p>
                    <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
                </div>
            ))}
                <div className="cart-total">
                <strong>Total Price: </strong> ${totalPrice.toFixed(2)}
            </div>
        </div>
    );
};


export default Cart;
