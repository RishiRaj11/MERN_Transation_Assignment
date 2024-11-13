import React from "react";

const Cart = ({ cart, clearCart }) => {
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <div className="cart-grid">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Qty: {item.qty}</p>
            <p>Price: ${item.price}</p>
            <p>Total: ${item.price * item.qty}</p>
          </div>
        ))}
      </div>
      <h3>Total Amount: ${totalAmount}</h3>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
