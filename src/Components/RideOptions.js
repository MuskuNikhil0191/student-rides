import React from "react";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import DiscountsCarousel from "./DiscountsCarousel";
import { NavLink } from "react-router-dom";
import "../Styles/rideoptions.css";

function RideOptions() {
  return (
    <>
      <Row className="m-5 bb">
        <Col xs={8} className="">
          <div className="gap-5">
            <NavLink to="/needaride">
              <Button variant="outline-dark" size="xs">
                <h1>Need a Ride</h1>
              </Button>
            </NavLink>
            <br></br>
            <br></br>
            <NavLink to="/postaride">
              <Button variant="outline-dark" size="xs">
                <h1>Post a Ride</h1>
              </Button>
            </NavLink>

            <Row>
              <Col xs={6}></Col>
              <Col style={{ alignContent: "right" }}>
                <br></br>
                <NavLink to="/showallrides">
                  <Button variant="outline-success bg-light" size="sm">
                    <h1>Show all</h1>
                  </Button>
                </NavLink>
              </Col>
            </Row>
          </div>
        </Col>
        <Col>
          <DiscountsCarousel />
        </Col>
      </Row>
    </>
  );
}

export default RideOptions;
