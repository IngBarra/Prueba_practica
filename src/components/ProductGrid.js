import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleLoadMore = () => {
    setVisible(prev => prev + 10);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Form className="my-4">
        <Form.Control
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </Form>
      <Row>
        {filteredProducts.slice(0, visible).map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.image} style={{ height: '200px', objectFit: 'contain' }} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Card.Text>{product.description.substring(0, 100)}...</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {visible < filteredProducts.length && (
        <div className="text-center my-4">
          <Button onClick={handleLoadMore}>Ver más</Button>
        </div>
      )}
    </Container>
  );
};

export default ProductGrid;
