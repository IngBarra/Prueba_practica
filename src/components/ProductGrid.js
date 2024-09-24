import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import '../styles/customStyles.css';  // Asegúrate de agregar tus estilos personalizados

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadMoreProducts = () => {
    setLimit(prevLimit => prevLimit + 10);
  };

  return (
    <Container>
      {/* Barra de Búsqueda */}
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </Form>

      {/* Grilla de Productos */}
      <Row>
        {filteredProducts.slice(0, limit).map(product => (
          <Col sm={12} md={6} lg={4} className="mb-4" key={product.id}>
            <Card className="h-100 product-card">
              <Card.Img variant="top" src={product.image} alt={product.title} className="product-image" />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Card.Text className="product-description">
                  {product.description.substring(0, 100)}...
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Botón Ver Más */}
      {limit < filteredProducts.length && (
        <div className="text-center mt-4">
          <Button onClick={loadMoreProducts} variant="primary">
            Ver Más
          </Button>
        </div>
      )}
    </Container>
  );
};

export default ProductGrid;
