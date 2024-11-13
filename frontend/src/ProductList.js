import React, { useState } from "react";

const ProductList = ({ products, addToCart }) => {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
          <img
  src={product.image}
  alt={product.name}
  style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
/>

            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
