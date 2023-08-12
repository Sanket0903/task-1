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
import Title from 'react-bootstrap/Alert';
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
    setShowAlert(false); 
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
      setShowAlert(true); 
    }
  };
  const calculateTotalPrice = (product) => {
    return (parseFloat(product.productPrice) * product.quantity).toFixed(2);
  };
  const calculateTotalQuantity = (product) =>{
    return (parseFloat(product.quantity)).toFixed(2);
  }
  const handleQuantityChange = (index, newQuantity) => {
  if (newQuantity >= 0) {
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
  }
};

const calculateOverallTotal = () => {
  const total = productList.reduce((acc, product) => {
    return acc + parseFloat(calculateTotalPrice(product));
  }, 0);
  return total.toFixed(2);
};

const calculateOverallQuantity = () => {
  const total1 = productList.reduce((acc, product) => {
    return acc + parseFloat(calculateTotalQuantity(product));
  }, 0);
  return total1.toFixed(2);
};

  return (
    <div>
      <div id="buttonWrapper" className="container-fluid">
        <Button variant="primary" onClick={handleDialogOpen}>Buy Now</Button>
      </div>

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
                <Form.Control type="number" value={productPrice} onChange={handleProductPriceChange} required />
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
                  <Card.Body style={{textAlign:'center'}}>
                    <Card.Title >{product.name}</Card.Title>
                    <Card.Text>{product.productPrice}</Card.Text>
                  </Card.Body>
                  <Card.Footer style={{textAlign:'center'}}>
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
      <Title><h5>My Shopping Bag</h5> </Title>
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
                <td>{calculateTotalQuantity(product)}</td>
                <td>{calculateTotalPrice(product)}</td>
              </tr>
            ))}
          </tbody>
          <thead>
            <tr>
              <th>Total</th>
              <th></th>
              <th>{calculateOverallQuantity()}</th>
              <th>{calculateOverallTotal()}</th>
            </tr>
          </thead>
        </Table>
      </Container>
    </div>
    
  );
};

export default Product;
