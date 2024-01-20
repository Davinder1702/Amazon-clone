import React, { useState, useEffect } from 'react';
import Product from './Product';
import "./Products.css"

const Products = ({ addToCart,searchTerm}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data); // Initialize filtered products
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Debouncing effect
    useEffect(() => {
        const handler = setTimeout(() => {
            const filtered = products.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        }, 500); // 500 ms delay

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, products]);

    return (
        <div className="products">
            {loading ? (
                <div>Loading...</div> // Replace with a better loading state if needed
            ) : (
                filteredProducts.map(product => (
                    <Product key={product.id} product={product} addToCart = {addToCart}/>
                ))
            )}
        </div>
    );
};

export default Products;
