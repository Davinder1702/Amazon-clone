import React from 'react';
import './Product.css'; // Your CSS file to style each product
import { useNavigate } from 'react-router-dom';

const Product = ({ product, addToCart  }) => {
    
    const navigate = useNavigate();

    if (!product) {
        return <div>Loading...</div>;  // Shows loading until the product data is fetched
    }

    
    // Destructure the product properties you need
    const { title, image, price, category } = product;

    const handleAddToCart = (e) => {
        e.stopPropagation()
        addToCart(product);
    };


    const navigateToProductDetail = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div className="product" onClick={navigateToProductDetail}>
            <img src={image} alt={title} />
            <div className="product__info">
                <p className="product__title">{title}</p>
                <p className="product__category">{category}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
            </div>
            <button onClick={handleAddToCart}>Add to Cart</button> {/* You can integrate the Add to Cart functionality here */}
        </div>
    );
};

export default Product;
