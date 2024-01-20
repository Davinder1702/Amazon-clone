import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Your CSS file to style the header
import { useCart } from '../../context/CartContext';

const Header = ({ cartItemCount,onSearch ,searchTerm }) => {

    const handleSearch = (e) => {
        onSearch(e.target.value);
        // You can perform the search or API call here using debouncedTerm
    };

    return (
        <div className="header">
            <Link to="/">
                <img 
                    className="header__logo"
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" // Replace with your own logo
                    alt="Store Logo"
                />
            </Link>
            <div className="header__search">
                <input 
                    type="text"
                    className="header__searchInput"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <i className="header__searchIcon">🔍</i>
            </div>
            <div className="header__nav">
                {/* Other navigation items */}
                
                {/* Cart Icon with item count */}
                <Link to="/cart" className="header__link">
                    <div className="header__optionBasket">
                        {/* Shopping basket icon */}
                        <i>🛒</i> 
                        <span className="header__optionLineTwo header__basketCount">
                            {cartItemCount}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Header;
