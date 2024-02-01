import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/esm/Button";

function CarouselComponent() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      style={{ backgroundColor: "grey" }}
      interval={1000}
    >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.ridetime.ca/wp-content/uploads/2018/04/shutterstock_282033554.jpg"
          alt="First slide"
          style={{ height: "500px" }}
        />
        {/* <Carousel.Caption
          className="text-left text-light"
          style={{ textAlign: "left" }}
        >
          <h2>Freshers Event</h2>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          <Button type="submit" variant="light" size="lg">
            Register today
          </Button>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.istockphoto.com/id/1033774404/photo/ride-share-driver-in-car-using-the-rideshare-app-in-mobile-phone-new-taxi-ride-request-from.jpg?s=612x612&w=0&k=20&c=htlxTsuBq0Hc4_FFMbMnoETKfEQLWgKINg14CGFnZX8="
          alt="Second slide"
          style={{ height: "500px" }}
        />

        {/* <Carousel.Caption className="text-center text-dark">
          <h2>Vaccination schedule</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <Button variant="primary" size="lg">
            Learn more...
          </Button>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.istockphoto.com/id/1400278668/photo/taxi-phone-app-for-cab-or-car-ride-share-service-customer-waiting-driver-to-pick-up-on-city.jpg?b=1&s=170667a&w=0&k=20&c=kxkcL2nCC-kb8z4bsE-MjBz5zm5tw2VgN_f09xAlM6I="
          alt="Third slide"
          style={{ height: "500px" }}
        />

        {/* <Carousel.Caption
          className="text-right text-dark"
          style={{ textAlign: "right" }}
        >
          <h2>Help the Needy</h2>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
          <Button variant="info" size="lg">
            Donate now
          </Button>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;
