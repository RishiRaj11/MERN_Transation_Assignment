import React, { useState } from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";

const App = () => {
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: "Product 1", image: "./image/prod1.jpg", height: 100, width: 50, price: 10 },
    { id: 2, name: "Product 2", image: "./image/prod2.jpeg", height: 120, width: 60, price: 15 },
    { id: 3, name: "Product 3", image: "./image/prod3.jpeg", height: 90, width: 45, price: 20 },
  ];

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const clearCart = () => setCart([]);

  return (
    <div>
      <ProductList products={products} addToCart={addToCart} />
      <Cart cart={cart} clearCart={clearCart} />
    </div>
  );
};

export default App;
