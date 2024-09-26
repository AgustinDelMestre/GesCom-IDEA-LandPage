import logo from './logo.svg';
import './App.css';
import React from 'react';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';

function App() {
    return (
        <div>
            <NavBar />
            <h1>Bienvenido a Mi Tienda de Camisetas</h1>
            <ItemListContainer greeting="Bienvenido a la Tienda de Camisetas" />
        </div>
    );
}

export default App;



