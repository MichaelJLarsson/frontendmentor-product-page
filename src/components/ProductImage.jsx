import React, { useState, useRef, useEffect } from "react";

const ProductImage = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const slideRef = useRef(null);

  // Scroll specific slide into the viewport
  const scrollToSlide = (index) => {
    const slides = slideRef.current?.children;
    if (slides && slides[index - 1]) {
      slides[index - 1].scrollIntoView({
        behavior: "smooth",
        inline: "start",
      });
    }
  };

  // Add viewport observer and update the currentSlide index
  useEffect(() => {
    const slidesCollection = slideRef.current?.children;
    if (!slidesCollection) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            const slideIndex = entry.target.getAttribute("data-slide");
            setCurrentSlide(Number(slideIndex));
          }
        });
      },
      {
        root: slideRef.current,
        threshold: 1.0,
        rootMargin: "0px",
      }
    );
    Array.from(slidesCollection).forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  const slideLeft = () => {
    if (currentSlide > 1) {
      const nextSlide = currentSlide - 1;
      scrollToSlide(nextSlide);
    }
  };

  const slideRight = () => {
    const numSlides = 4;
    if (currentSlide < numSlides) {
      const nextSlide = currentSlide + 1;
      scrollToSlide(nextSlide);
    }
  };

  return (
    <div className="product-image">
      <div
        className="image-carousel"
        ref={slideRef}
      >
        <img
          src="/images/image-product-1.jpg"
          alt="Sneaker"
          className="slide"
          data-slide="1"
        />
        <img
          src="/images/image-product-2.jpg"
          alt="Sneaker"
          className="slide"
          data-slide="2"
        />
        <img
          src="/images/image-product-3.jpg"
          alt="Sneaker"
          className="slide"
          data-slide="3"
        />
        <img
          src="/images/image-product-4.jpg"
          alt="Sneaker"
          className="slide"
          data-slide="4"
        />
      </div>
      <nav className="flex md:hidden">
        <button
          className="product-page__image--prev"
          type="button"
          onClick={slideLeft}
        >
          <img
            src="/images/icon-previous.svg"
            alt="Previous image"
          />
        </button>
        <button
          className="product-page__image--next"
          type="button"
          onClick={slideRight}
        >
          <img
            src="/images/icon-next.svg"
            alt="Next image"
          />
        </button>
      </nav>
      <div className="thumbnails hidden md:grid">
        <a
          href="#"
          className="thumbnail active"
        >
          <img
            src="/images/image-product-1-thumbnail.jpg"
            alt="Product image"
          />
        </a>
        <a
          href="#"
          className="thumbnail"
        >
          <img
            src="/images/image-product-2-thumbnail.jpg"
            alt="Product image"
            className="thumbnail"
          />
        </a>
        <a
          href="#"
          className="thumbnail"
        >
          <img
            src="/images/image-product-3-thumbnail.jpg"
            alt="Product image"
            className="thumbnail"
          />
        </a>
        <a
          href="#"
          className="thumbnail"
        >
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
