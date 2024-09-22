import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/DashboardPage';
import ProductList from './components/ProductList';
import LatestProduct from './components/LatestProduct';
import EditProduct from './components/EditProduct';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

let userInfo = {
  email: "",
  username: "",
  firstName: "",
  profileImage: "",
  token: "",
  refreshToken: ""
};

const App = () => {
  const [user, setUser] = useState(userInfo);
  
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage setUser={setUser} />} />
          <Route 
            path='/dashboard/*' 
            element={
              <ProtectedRoute user={user}>
                <Dashboard user={user} setUser={setUser} />
              </ProtectedRoute>
            }
          />
          <Route path="/edit-product/:productId" element={<EditProduct />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
