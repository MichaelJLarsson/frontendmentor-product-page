import React from 'react';

const ProductImage = () => {
  return (
    <div className="product-image">
      <div className="image-carousel hero-image">
        <img
          src="/images/image-product-1.jpg"
          alt="Sneaker"
          className="slide"
        />
        <img
          src="/images/image-product-2.jpg"
          alt="Sneaker"
          className="slide"
        />
        <img
          src="/images/image-product-3.jpg"
          alt="Sneaker"
          className="slide"
        />
      </div>
      <nav className="flex md:hidden">
        <button className="product-page__image--prev" type="button">
          <img src="/images/icon-previous.svg" alt="Previous image" />
        </button>
        <button className="product-page__image--next" type="button">
          <img src="/images/icon-next.svg" alt="Next image" />
        </button>
      </nav>
      <div className="thumbnails hidden md:grid">
        <a href="#" className="thumbnail active">
          <img
            src="/images/image-product-1-thumbnail.jpg"
            alt="Product image"
          />
        </a>
        <a href="#" className="thumbnail">
          <img
            src="/images/image-product-2-thumbnail.jpg"
            alt="Product image"
            className="thumbnail"
          />
        </a>
        <a href="#" className="thumbnail">
          <img
            src="/images/image-product-3-thumbnail.jpg"
            alt="Product image"
            className="thumbnail"
          />
        </a>
        <a href="#" className="thumbnail">
          <img
            src="/images/image-product-4-thumbnail.jpg"
            alt="Product image"
            className="thumbnail"
          />
        </a>
      </div>
    </div>
  );
};

export default ProductImage;