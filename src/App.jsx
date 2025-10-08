import React, { useState, createContext } from "react";
import Header from "./components/Header";
import ProductImage from "./components/ProductImage";
import ProductInfo from "./components/ProductInfo";
import ViewBox from "./components/ViewBox";

export const ShoppingCartContext = createContext([[], function () {}]);

function App() {
  const [isViewBoxOpen, setIsViewBoxOpen] = useState(false);
  const cartItems = useState([]);

  return (
    <div className="product-page">
      <ShoppingCartContext value={cartItems}>
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
      </ShoppingCartContext>
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
