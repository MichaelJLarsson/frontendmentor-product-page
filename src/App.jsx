import React, { useState } from "react";
import Header from "./components/Header";
import ProductImage from "./components/ProductImage";
import ProductInfo from "./components/ProductInfo";
import ViewBox from "./components/ViewBox";

function App() {
  const [isViewBoxOpen, setIsViewBoxOpen] = useState(false);

  return (
    <div className="product-page">
      <div className="page">
        <Header />
        <main className="content">
          <ProductImage
            openViewBox={() => {
              setIsViewBoxOpen(true);
            }}
            isOpen={isViewBoxOpen}
          />
          <ProductInfo />
        </main>
      </div>
      <ViewBox
        isOpen={isViewBoxOpen}
        close={() => {
          setIsViewBoxOpen(false);
        }}
      >
        <ProductImage />
      </ViewBox>
    </div>
  );
}

export default App;
