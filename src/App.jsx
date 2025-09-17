import React from "react";
import Header from "./components/Header";
import ProductImage from "./components/ProductImage";
import ProductInfo from "./components/ProductInfo";
import ViewBox from "./components/ViewBox";

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
      <ViewBox>
        <ProductImage />
      </ViewBox>
    </div>
  );
}

export default App;
