import React from 'react';

const CartWidget = () => {
    const itemCount = 5; 
    
    return (
        <div>
            <span className="material-icons">shopping_cart</span>
            <span>{itemCount}</span>
        </div>
    );
};

export default CartWidget;
