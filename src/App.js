import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Products from './components/Products/Products';
import Product from './components/Products/Product';
import Cart from './components/Cart/Cart';
import Header from './components/Header/Header';
import ProductDetail from './components/ProductDetail/ProductDetail';

function App() {
  const [cart, setCart] = useState([]);
  const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);


  const addToCart = (product) => {
      setCart((prevCart) => {
          // Check if the product is already in the cart
          const isProductInCart = prevCart.find(item => item.id === product.id);
          if (isProductInCart) {
              // Increase the quantity
              return prevCart.map((item) =>
                  item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              );
          }
          // If not in the cart, add the product to the cart
          return [...prevCart, { ...product, quantity: 1 }];
      });
      setShowAddToCartMessage(true);
        setTimeout(() => setShowAddToCartMessage(false), 3000);
  };

  const incrementQuantity = (productId) => {
    setCart((prevCart) =>
        prevCart.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
    );
};

const decrementQuantity = (productId) => {
    setCart((prevCart) => {
        // Find the item to decrement
        const itemToDecrement = prevCart.find((item) => item.id === productId);
        if (itemToDecrement.quantity > 1) {
            return prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            );
        } else {
            // If quantity is 1, remove the item
            return prevCart.filter((item) => item.id !== productId);
        }
    });
};

  const removeFromCart = (productId) => {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const [searchTerm, setSearchTerm] = useState('');


  return (
      <Router>
          <Header cartItemCount={cart.length} onSearch={(term)=>{
            setSearchTerm(term)
          }} searchTerm={searchTerm}/>
          {showAddToCartMessage && <div className="add-to-cart-message">Item added to cart!</div>}
        <Routes>
          <Route path="/" exact element={<Products addToCart={addToCart} searchTerm={searchTerm}/>} />
          <Route path="/product/:id" element={<ProductDetail/>} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity}/>} /> {/* Cart page */}
        </Routes>
      </Router>
  );
}

export default App;
