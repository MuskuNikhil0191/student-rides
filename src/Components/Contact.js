import React from "react";
import "../Styles/contact.css";

function Contact() {
  return (
    <>
      <div className="container-fluid contact">
        <div className="col-xs-12" style={{ textAlign: "center" }}>
          <h2>– Contact Us –</h2>
        </div>

        <h1 className="brand">
          <span>UCM Student Rides</span>
        </h1>

        <div className="company-info">
          <h3>UCM Student Rides</h3>

          <ul>
            <li>
              <i className="fa fa-phone"></i> (+1) 9993773434
            </li>
            <li>
              <i className="fa fa-envelope"></i> student@ucmo.edu
            </li>
          </ul>
        </div>
        <div className="contact">
          <form id="contact-form" post="">
            <p>
              <label>Name</label>
              <input type="text" name="name" id="name" />
            </p>

            <p>
              <label>E-mail Address</label>
              <input type="email" name="email" id="email" />
            </p>

            <p>
              <label>Phone Number</label>
              <input type="text" name="phone" id="phone" />
            </p>

            <p className="full">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="please send any queries if you have"
                rows="5"
                id="message"
              ></textarea>
            </p>

            <p className="full">
              <button type="submit">Submit</button>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
