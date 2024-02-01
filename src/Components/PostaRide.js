import React, { useState, useEffect } from "react";
import { useAuth } from "../Utils/Auth";
import { useNavigate } from "react-router-dom";
import "../Styles/ridepost.css";

function PostaRide() {
  const auth = useAuth();
  const navigate = useNavigate();
  // useEffect(() => {
  //   return () => {
  //     auth.logger.getRides();
  //   };
  // },[]); //change back
  const cities = [
    {
      value: "",
      label: "--Select a City",
    },
    {
      label: "Overland Park",
      value: "overlandpark",
    },
    {
      label: "Leawood",
      value: "leawood",
    },
    {
      label: "Lee's Summit",
      value: "leesummit",
    },
    {
      label: "Warrensburg",
      value: "warrensburg",
    },
    {
      label: "Olathe",
      value: "olathe",
    },
    {
      label: "Praire Village",
      value: "prairevillage",
    },
  ];
  const [postarideValues, setPostarideValues] = useState({
    community: "",
    street: "",
    originCity: "",
    location: "",
    destinationCity: "",
    date: "",
    time: "",
    seats: "",
    fare: "",
    username: auth.logger.user.username,
  });
  const [postarideErrors, setPostarideErrors] = useState({});
  var handlePostaride = (e) => {
    let { name, value } = e.target;
    setPostarideValues({ ...postarideValues, [name]: value });
  };
  var ridePost = (e) => {
    e.preventDefault();
    let errors = validatePostaride(postarideValues);
    setPostarideErrors(errors);
    if (Object.keys(errors).length === 0) {
      auth.logger.ridePost(postarideValues);
      alert("Ride posted success");
      navigate("/profile");
    }
  };
  var validatePostaride = (values) => {
    const errors = {};
    if (!values.community) {
      errors.community = "Please enter the community name!";
    }
    if (!values.street) {
      errors.street = "Please enter the street no!";
    }
    if (!values.originCity) {
      errors.originCity = "Please select the origin city!";
    }
    if (!values.location) {
      errors.location = "Please enter the destination!";
    }
    if (!values.destinationCity) {
      errors.destinationCity = "Please select the destination city!";
    }
    if (!values.date) {
      errors.date = "Please select the date!";
    }
    if (!values.time) {
      errors.time = "Please select the approx time!";
    }
    if (!values.seats) {
      errors.seats = "Please enter the seats available!";
    } else if (values.seats < 1 || values.seats > 6) {
      errors.seats = "Please enter correct no of seats!";
    }
    if (!values.fare) {
      errors.fare = "Please enter the fare!";
    }
    return errors;
  };
  return (
    <div className="container-fluid post">
      <div className="row m-3 g-3">
        <div className="col-2"></div>
        <div className="col-8 p-2" style={{ border: "1px dashed lightgrey" }}>
          <div className="row">
            <h2>Post a Ride</h2>
          </div>
          <div className="row p-2">
            <form onSubmit={ridePost}>
              <div className="row p-2">
                <div className="col-4">
                  <label htmlFor="origin" className="form-label">
                    Origin
                  </label>
                </div>
                <div className="col-8">
                  <div className="row mb-3">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        id="community"
                        aria-describedby="communityHelp"
                        name="community"
                        value={postarideValues.community}
                        onChange={handlePostaride}
                      />
                      <p className="text-danger">{postarideErrors.community}</p>
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        id="street"
                        aria-describedby="streetHelp"
                        placeholder="1234 Main street"
                        name="street"
                        value={postarideValues.street}
                        onChange={handlePostaride}
                      />
                      <p className="text-danger">{postarideErrors.street}</p>
                    </div>
                  </div>
                  <select
                    id="state"
                    className="form-select"
                    name="originCity"
                    value={postarideValues.originCity}
                    onChange={handlePostaride}
                  >
                    {cities.map((city) => (
                      <option value={city.value} key={city.value}>
                        {city.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-danger">{postarideErrors.originCity}</p>
                </div>
              </div>
              <div className="row p-2">
                <div className="col-4">
                  <label htmlFor="destination" className="form-label">
                    Destination
                  </label>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        aria-describedby="locationHelp"
                        placeholder="location"
                        name="location"
                        value={postarideValues.location}
                        onChange={handlePostaride}
                      />
                      <p className="text-danger">{postarideErrors.location}</p>
                    </div>
                    <div className="col-4">
                      <select
                        id="state destin"
                        className="form-select"
                        name="destinationCity"
                        value={postarideValues.destinationCity}
                        onChange={handlePostaride}
                      >
                        {cities.map((city) => (
                          <option value={city.value} key={city.value}>
                            {city.label}
                          </option>
                        ))}
                      </select>
                      <p className="text-danger">
                        {postarideErrors.destinationCity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row p-2">
                <div className="col-4">
                  <label htmlFor="date" className="form-label">
                    Select Date
                  </label>
                </div>
                <div className="col-6">
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    aria-describedby="dateHelp"
                    name="date"
                    value={postarideValues.date}
                    onChange={handlePostaride}
                  />
                  <p className="text-danger">{postarideErrors.date}</p>
                </div>
              </div>
              <div className="row p-2">
                <div className="col-4">
                  <label htmlFor="time" className="form-label">
                    At Time
                  </label>
                </div>
                <div className="col-6">
                  <input
                    type="time"
                    className="form-control"
                    id="time"
                    aria-describedby="timeHelp"
                    name="time"
                    value={postarideValues.time}
                    onChange={handlePostaride}
                  />
                  <p className="text-danger">{postarideErrors.time}</p>
                </div>
              </div>
              <div className="row p-2">
                <div className="col-4">
                  <label htmlFor="seats" className="form-label">
                    Number of seats available
                  </label>
                </div>
                <div className="col-4">
                  <input
                    type="number"
                    className="form-control"
                    id="seats"
                    step={1}
                    min={1}
                    max={6}
                    aria-describedby="seatsHelp"
                    name="seats"
                    value={postarideValues.seats}
                    onChange={handlePostaride}
                  />
                  <p className="text-danger">{postarideErrors.seats}</p>
                </div>
              </div>
              <div className="row p-2">
                <div className="col-4">
                  <label htmlFor="fare" className="form-label">
                    Fare per person
                  </label>
                </div>
                <div className="col-4">
                  <input
                    type="number"
                    className="form-control"
                    id="fare"
                    step={1}
                    aria-describedby="fareHelp"
                    name="fare"
                    value={postarideValues.fare}
                    onChange={handlePostaride}
                  />
                  <p className="text-danger">{postarideErrors.fare}</p>
                </div>
              </div>
              <br />
              <button className="btn btn-success" type="submit">
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostaRide;
