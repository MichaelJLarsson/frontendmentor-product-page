import React from "react";
import Header from "./components/Header";
import ProductImage from "./components/ProductImage";
import ProductInfo from "./components/ProductInfo";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerClose,
} from "@/components/ui/drawer";

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
      <Drawer>
        <DrawerContent>
          <DrawerHeader>Main menu</DrawerHeader>
          <nav className="main-menu">
            <ul>
              <li>
                <a href="#">Collections</a>
              </li>
              <li>
                <a href="#">Men</a>
              </li>
              <li>
                <a href="#">Women</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </nav>
          <DrawerFooter>
            <DrawerClose asChild>
              <button type="button">Close</button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default App;
