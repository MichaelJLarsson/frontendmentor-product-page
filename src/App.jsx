import React from "react";
import Header from "./components/Header";
import ProductImage from "./components/ProductImage";
import ProductInfo from "./components/ProductInfo";

function App() {
  return (
    <div className="product-page">
      <div className="page">
        <Header />
        <main className="content">
          <ProductImage />
          <ProductInfo />
        </main>
      </div>
    </div>
  );
}

export default App;
