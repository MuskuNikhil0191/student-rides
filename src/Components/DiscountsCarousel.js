import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function DiscountsCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        style={{ backgroundColor: "grey" }}
        interval={5000}
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.easemytrip.com/images/offer-img/cab-250-lp.png"
            alt="First slide"
            style={{ height: "25rem" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.easemytrip.com/images/offer-img/cab-free-cancellation-5-lp.png"
            alt="Second slide"
            style={{ height: "25rem" }}
          />
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default DiscountsCarousel;
