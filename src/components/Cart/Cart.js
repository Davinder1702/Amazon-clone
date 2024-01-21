import React from 'react';
import { useCart } from '../../context/CartContext';
import "./Cart.css"

// ... other imports
const Cart = ({ cart, removeFromCart, incrementQuantity, decrementQuantity }) => {
    const totalPrice = cart.reduce((total, item) => total + item.quantity * item.price, 0);

    return (
        <div className="cart-container">
     {cart.map((item) => (
                <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} className="cart-item-image" />
                    <div className="cart-item-details">
                        <h3>{item.title}</h3>
                        <p className="cart-item-price">${item.price}</p>
                        <div className="quantity-controls">
                            <button onClick={() => decrementQuantity(item.id)}>-</button>
                            <span className="quantity">{item.quantity}</span>
                            <button onClick={() => incrementQuantity(item.id)}>+</button>
                        </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="remove-item">Remove</button>
                </div>
            ))}
                <div className="cart-total">
                <strong>Total Price: </strong> ${totalPrice.toFixed(2)}
            </div>
        </div>
    );
};


export default Cart;
