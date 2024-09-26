
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemListContainer = ({ greeting }) => {
    return (
        <div className="container mt-5">
            <h2 className="text-center">{greeting}</h2>
        </div>
    );
}

export default ItemListContainer;
