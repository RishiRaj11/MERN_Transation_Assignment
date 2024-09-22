import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Avatar, Container, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ReportPage from './ReportPage';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import LatestProduct from './LatestProduct';
import EditProduct from './EditProduct'; // Import the EditProduct component
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const DashboardPage = ({ user, setUser }) => { // Accept setUser prop to clear user data
  const [view, setView] = useState('report');
  const [showLatestProducts, setShowLatestProducts] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null); // State for the editing product
  const navigate = useNavigate(); // Initialize navigate

  const handleViewExistingProducts = () => {
    setView('productList');
    setShowLatestProducts(false);
  };

  const handleAddNewProduct = () => {
    setView('addProduct');
    setShowLatestProducts(false);
  };

  const handleGoToDashboard = () => {
    setView('report');
    setShowLatestProducts(false);
  };

  const handleViewLatestProducts = () => {
    setShowLatestProducts(true);
    setView('latestProducts');
  };

  const handleEditProduct = (id) => {
    setEditingProductId(id); // Set the ID of the product to be edited
    setView('editProduct'); // Change the view to editProduct
  };

  const handleCloseEdit = () => {
    setEditingProductId(null);
    setView('productList'); // Return to the product list after editing
  };

  const handleLogout = () => {
    let userInfo = {
      email: "",
      username: "",
      firstName: "",
      profileImage: "",
      token: "",
      refreshToken: ""
    };
    setUser(userInfo); // Clear user data
    navigate('/'); // Redirect to login page
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#667eea' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={handleGoToDashboard}>
            Dashboard
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ mr: 2 }}>
              {user.firstName}
            </Typography>
            <Avatar alt={user.username} src={user.profileImage} />
            <Button
              variant="outlined"
              color="inherit"
              sx={{ ml: 2 }} // Add some left margin
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: '#f4f6f8', minHeight: '100vh', pt: 8 }}
      >
        <Container maxWidth="lg">
          {view === 'report' && (
            <>
              <ReportPage onViewExistingProducts={handleViewExistingProducts} handleViewLatestProducts={handleViewLatestProducts} />
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddNewProduct}
                >
                  Add New Product
                </Button>
              </Box>
            </>
          )}
          {view === 'productList' && <ProductList onEditProduct={handleEditProduct} />} {/* Pass the edit handler */}
          {view === 'addProduct' && <AddProduct />}
          {view === 'latestProducts' && <LatestProduct show={showLatestProducts} />}
          {view === 'editProduct' && <EditProduct productId={editingProductId} onClose={handleCloseEdit} />} {/* Render EditProduct */}
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardPage;
