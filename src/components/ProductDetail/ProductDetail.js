import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./ProductDetail.css"
const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail">
            <img src={product.image} alt={product.title} />
            <div className="product-detail-info">
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p className="product-price">${product.price}</p>
                {/* ... more details and styling as needed */}
            </div>
        </div>
    );
};

export default ProductDetail;
