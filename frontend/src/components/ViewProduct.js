import React, { useState, useEffect } from 'react';
import { TextField, Container, Box, Typography } from '@mui/material';

const ViewProduct = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [productId]);

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        View Product
      </Typography>
      <Box component="form" noValidate sx={{ mt: 2 }}>
        <TextField label="Title" value={product.title} fullWidth margin="normal" InputProps={{ readOnly: true }} />
        <TextField label="Description" value={product.description} fullWidth margin="normal" InputProps={{ readOnly: true }} />
        <TextField label="Category" value={product.category} fullWidth margin="normal" InputProps={{ readOnly: true }} />
        <TextField label="Price" value={product.price} fullWidth margin="normal" InputProps={{ readOnly: true }} />
        {/* Other fields as required */}
      </Box>
    </Container>
  );
};

export default ViewProduct;
