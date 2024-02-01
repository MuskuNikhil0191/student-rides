import React, { useState, useEffect } from "react";
import { useAuth } from "../Utils/Auth";
import "../Styles/showall.css";

function RideSearch() {
  const auth = useAuth();
  const [sortValue, setSortValue] = useState("");
  const [requiredSeats, setRequiredSeats] = useState("");
  const [seats, setSeats] = useState([]);
  const [button, setButton] = useState([]);
  const [rides, setRides] = useState([]);
  const [allRides, setAllRides] = useState([]);
  var cur_username = auth.logger.user["username"];
  useEffect(() => {
    let searchedRides = auth.logger.rides.filter((ride) => {
      return (
        ride.originCity === auth.logger.searchRide.originCity &&
        ride.destinationCity === auth.logger.searchRide.destinationCity &&
        auth.logger.rideRequests[[cur_username]]["rideRequestsSent"]?.[
          ride._id
        ] === undefined &&
        ride.seats > 0
      );
    });
    let temp_list = [],
      button_list = [];
    for (let i = 0; i < searchedRides.length; i++) {
      let rideId = searchedRides[i]["_id"];
      let rideExists =
        auth.logger.rideRequests[[cur_username]]["rideRequestsSent"]?.[rideId];
      if (rideExists !== undefined) temp_list[i] = rideExists["seats"];
      else temp_list[i] = 1;
      if (rideExists !== undefined) button_list[i] = true;
      else button_list[i] = false;
    }
    setSeats(temp_list);
    setButton(button_list);
    setAllRides(searchedRides);
    setRides(searchedRides);
    // return () => {
    //   auth.logger.getRideRequests();
    // }; //change back
  }, []);
  const handleRequest = (i) => {
    console.log("request", i);
    console.log("seats", seats[i]);
    let username = rides[i].username;
    let rideId = rides[i]["_id"];
    if (auth.logger.user.username === username) {
      alert("Ride is posted by you!");
      return;
    }
    if (button[i]) {
      auth.logger.deleteRideRequest(username, rideId);
      alert("Request cancelled succesfully!");
      let newButton = [...button];
      newButton[i] = !button[i];
      setButton(newButton);
    } else {
      if (seats.length === 0) {
        alert("please enter the seats required!");
      } else {
        auth.logger.updateRideRequest(username, rideId, seats[i]);
        let newButton = [...button];
        newButton[i] = !button[i];
        setButton(newButton);
      }
    }
    console.log("button", button);
    console.log("seats", seats);
  };
  const handleSeats = (e, i) => {
    console.log(e.target.value, i);
    let newarr = [...seats];
    newarr[i] = e.target.value;
    setSeats(newarr);
  };
  const handleSort = (e) => {
    setSortValue(e.target.value);
    var sortBy = allRides;
    if (e.target.value == 1) {
      sortBy = sortBy.sort((a, b) => (a.fare < b.fare ? -1 : 1));
    } else if (e.target.value == 2) {
      sortBy = sortBy.sort((a, b) => (a.fare < b.fare ? 1 : -1));
    }
    sortBy = sortBy.filter((ride) => {
      return ride.seats >= requiredSeats;
    });
    setRides(sortBy);
  };
  const filterSeats = (e) => {
    setRequiredSeats(e.target.value);
    console.log("in filter", e.target.value);
    var requiredRides = allRides.filter((ride) => {
      return ride.seats >= e.target.value;
    });
    if (sortValue == 1) {
      requiredRides = requiredRides.sort((a, b) => (a.fare < b.fare ? -1 : 1));
    } else if (sortValue == 2) {
      requiredRides = requiredRides.sort((a, b) => (a.fare < b.fare ? 1 : -1));
    }
    setRides(requiredRides);
  };
  console.log("in search", auth.logger.searchRide);

  return (
    <div className="container-fluid showall">
      <h1>Showing searched rides</h1>

      <div className="row">
        <div className="col-3"></div>
        <div className="col-2">
          <select
            className="form-select bg-info"
            aria-label="Default select example"
            value={sortValue}
            onChange={handleSort}
          >
            <option value="">Sort by fare</option>
            <option value="1">Ascending</option>
            <option value="2">Descending</option>
          </select>
        </div>
        <div className="col-1"></div>
        <div className="col-2">
          <select
            className="form-select bg-info"
            aria-label="Default select example"
            value={requiredSeats}
            onChange={filterSeats}
          >
            <option value="0">Filter by seats</option>
            <option value="1">1 seat</option>
            <option value="2">2 seats</option>
            <option value="3">3 seats</option>
            <option value="4">4 seats</option>
            <option value="5">5 seats</option>
            <option value="6">6 seats</option>
          </select>
        </div>
      </div>
      <div className="row box">
        {rides.map((r, i) => {
          const list = (
            <div className="row m-3 p-3 border border-dark" key={r._id}>
              <div className="col-1" />
              <div className="col-2">
                {r.community}
                <br />
                {r.originCity}
              </div>
              <div className="col-1">- - - - -&gt;</div>
              <div className="col-2">
                {r.location}
                <br />
                {r.destinationCity}
              </div>
              <div className="col-2">
                At {r.time}
                <br />
                On {r.date}
              </div>
              <div className="col-2">
                <input
                  type="number"
                  step={1}
                  min={1}
                  max={r.seats}
                  value={seats[i] || ""}
                  name={i}
                  onChange={(e) => handleSeats(e, i)}
                />
                ({r.fare}$ per person)
                <br />
                {r.seats} seats available
              </div>
              <div className="col-2">
                {(button[i] || "") && (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRequest(i)}
                  >
                    Cancel Request
                  </button>
                )}
                {(!button[i] || "") && (
                  <button
                    className="btn btn-success"
                    onClick={() => handleRequest(i)}
                  >
                    Send Request
                  </button>
                )}
              </div>
            </div>
          );
          return list;
        })}
      </div>
    </div>
  );
}

export default RideSearch;
