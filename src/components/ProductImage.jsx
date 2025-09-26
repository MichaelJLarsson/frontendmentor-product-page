import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";

const ProductImage = ({ openViewBox, isOpen }) => {
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
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slideIndex = entry.target.getAttribute("data-slide");
            setCurrentSlide(Number(slideIndex));
          }
        });
      },
      {
        root: slideRef.current,
        threshold: 0.5,
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

  const activeClass = (slideNum) =>
    slideNum === currentSlide ? "active" : null;

  const handleImageClick = () => {
    if (window.innerWidth > 768 && isOpen === false) openViewBox();
  };

  return (
    <div className="product-image">
      {/* Image carousel */}
      <div
        className="image-carousel no-focus"
        ref={slideRef}
      >
        {[1, 2, 3, 4].map((num) => (
          <button
            type="button"
            aria-label="Enlarge picture"
            onClick={handleImageClick}
            key={num}
            className="shrink-0 basis-[100%] slide"
          >
            <img
              src={`/images/image-product-${num}.jpg`}
              alt="Sneaker"
              className="slide no-focus"
              data-slide={num}
            />
          </button>
        ))}
      </div>
      {/* Navigation buttons */}
      <nav className="carousel-navigation flex">
        <button
          className="nav-prev"
          type="button"
          onClick={slideLeft}
        >
          <img
            src="/images/icon-previous.svg"
            alt="Previous image"
          />
        </button>
        <button
          className="nav-next"
          type="button"
          onClick={slideRight}
        >
          <img
            src="/images/icon-next.svg"
            alt="Next image"
          />
        </button>
      </nav>
      {/* Thumbnails */}
      <div className="thumbnails hidden md:grid">
        {[1, 2, 3, 4].map((num) => (
          <a
            key={num}
            href="#"
            className={clsx("thumbnail", activeClass(num))}
            onClick={(e) => {
              e.preventDefault();
              scrollToSlide(num);
            }}
          >
            <img
              src={`/images/image-product-${num}-thumbnail.jpg`}
              alt={`Product image ${num}`}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
