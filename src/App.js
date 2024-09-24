import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductGrid from './components/ProductGrid'; // Asegúrate de tener el componente en esta ruta

function App() {
  return (
    <div className="App">
      <header className="bg-dark text-white text-center py-3">
        <h1>Fake Store</h1>
      </header>
      <main className="container my-4">
        <ProductGrid />
      </main>
      <footer className="bg-dark text-white text-center py-3">
        <p>&copy; 2024 Fake Store</p>
      </footer>
    </div>
  );
}

export default App;
