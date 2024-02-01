import React from "react";
import "../Styles/about.css";

function About() {
  return (
    <>
      <div className="container" style={{ maxWidth: "1200px" }}>
        <div className="row">
          <div className="col-xs-12" style={{ textAlign: "center" }}>
            <h2>– About Us –</h2>
          </div>
          <div className="col-xs-12 col-sm-8 col-md-6">
            <div className="info-text">
              <p>
                UCM Student Rides app is a website where the users can search
                for the required ride for a particular day at certain time and
                can book their rides.
              </p>
            </div>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-6">
            <div className="col-xs-12" style={{ marginTop: "40px" }}>
              <figure className="snip1374">
                <a href="#">
                  <img
                    src="http://modernhire.com/wp-content/uploads/2019/06/better-interview-experience.png"
                    alt="sample66"
                  />
                </a>
              </figure>
            </div>
          </div>
          <div style={{ clear: "both" }}></div>
          <div className="row">
            <div className="col-xs-12 col-sm-8 col-sm-push-4 col-md-6 col-md-push-6">
              <div className="info-text right">
                <p>
                  Users can post the rides according to their availability and
                  the students who require rides can raise a ride request
                  through website.
                </p>{" "}
              </div>
            </div>
            <div className="col-xs-12 col-sm-4 col-sm-pull-8 col-md-6 col-md-pull-6">
              <div className="col-xs-12 col-sm-12">
                <figure className="snip1374">
                  <a href="#">
                    <img
                      src="https://cdn.shopify.com/s/files/1/2204/2817/files/featurette-5-1000x1000.jpg?98122347912348223"
                      alt="sample57"
                    />
                  </a>
                </figure>
              </div>
            </div>
          </div>
          <div style={{ clear: "both" }}></div>
        </div>
      </div>
    </>
  );
}

export default About;
