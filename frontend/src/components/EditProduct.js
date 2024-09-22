import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Typography, Snackbar, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';

const EditProduct = ({ productId, onClose }) => {
  const [product, setProduct] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://dummyjson.com/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(() => {
        setSuccess(true);
        onClose(); // Close the edit form after successful update
      })
      .catch(() => {
        setError(true);
      });
  };

  if (!product) return <div>Loading...</div>;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Edit Product
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <TextField label="Title" name="title" fullWidth margin="normal" required value={product.title} onChange={handleChange} />
        <TextField label="Description" name="description" fullWidth margin="normal" required value={product.description} onChange={handleChange} />
        <TextField label="Category" name="category" fullWidth margin="normal" required value={product.category} onChange={handleChange} />
        <TextField label="Price" name="price" fullWidth margin="normal" required type="number" value={product.price} onChange={handleChange} />
        <TextField label="Stock" name="stock" fullWidth margin="normal" required type="number" value={product.stock} onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Update Product
        </Button>
        <Button variant="outlined" color="secondary" sx={{ mt: 3, ml: 2 }} onClick={onClose}>
          Cancel
        </Button>
      </Box>

      <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success">
          Product updated successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={() => setError(false)}>
        <Alert onClose={() => setError(false)} severity="error">
          Failed to update product.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditProduct;
