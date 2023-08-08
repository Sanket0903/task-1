import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import './Task1.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Product = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productList, setProductList] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
    setShowAlert(false); // Hide the alert when opening the dialog
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const handleProductImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
    } else {
      setProductImage(null);
      console.log('Invalid file size');
    }
  };

  const handleAddProduct = () => {
    if (productName.trim() && productPrice.trim() && productImage) {
      const newProduct = {
        name: productName,
        productPrice: productPrice,
        image: productImage,
        quantity: quantity,
        price: (parseFloat(productPrice) * quantity).toFixed(2),
      };
      setProductList([...productList, newProduct]);
      setProductName('');
      setProductPrice('');
      setProductImage(null);
      setQuantity(1);
      handleDialogClose();
    } else {
      setShowAlert(true); // Show the alert when form validation fails
    }
  };

  const handleQuantityChange = (index, newQuantity) => {
    setProductList((prevProducts) =>
      prevProducts.map((product, i) => {
        if (i === index) {
          const updatedProduct = { ...product, quantity: newQuantity };
          updatedProduct.price = (parseFloat(product.productPrice) * newQuantity).toFixed(2);
          return updatedProduct;
        }
        return product;
      })
    );
  };

  return (
    <div>
      <Container id="buttonWrapper" className="mt-3">
        <Button variant="primary" onClick={handleDialogOpen}>Buy Now</Button>
      </Container>

      <Modal show={openDialog} onHide={handleDialogClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" value={productName} onChange={handleProductNameChange} required />
              </Col>
              <Col>
                <Form.Label>Product Price</Form.Label>
                <Form.Control type="text" value={productPrice} onChange={handleProductPriceChange} required />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Form.Label>Product Image</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleProductImageChange} required />
              </Col>
            </Row>
          </Form>
          {showAlert && (
            <Alert variant="danger" className="mt-3">
              Please fill in all details.
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDialogClose}>Cancel</Button>
          <Button variant="primary" onClick={handleAddProduct}>Add Product</Button>
        </Modal.Footer>
      </Modal>
      <div>
        <Container className="mt-3">
          <Row>
            {productList.map((product, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3">
                <Card>
                  <Card.Img variant="top" src={product.image && URL.createObjectURL(product.image)} alt={product.name} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.productPrice}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="danger" onClick={() => handleQuantityChange(index, product.quantity - 1)}>-</Button>
                    <span className="mx-2">{product.quantity}</span>
                    <Button variant="success" onClick={() => handleQuantityChange(index, product.quantity + 1)}>+</Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <Container className="mt-3">
        <Table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.productPrice}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Product;
