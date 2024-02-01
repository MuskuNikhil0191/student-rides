import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../Utils/Auth";
import "../Styles/showall.css";

function ShowAllRides() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter");
  const [seats, setSeats] = useState([]);
  const [button, setButton] = useState([]);
  const [allRides, setAllRides] = useState([]);
  const auth = useAuth();
  var cur_username = auth.logger.user["username"];
  useEffect(() => {
    let ar = auth.logger.rides.filter((ride) => {
      return (
        auth.logger.rideRequests[[cur_username]]["rideRequestsSent"]?.[
          ride._id
        ] === undefined && ride.seats > 0
      );
    });
    console.log("before all rides", ar);
    setAllRides(ar);
    console.log("after all rides", allRides);
    console.log("rides in show all rides", allRides, allRides.length);
    console.log(
      "ride requests in showallrides",
      auth.logger.rideRequests,
      auth.logger.rideRequests.length
    );
    let temp_list = [],
      button_list = [];
    for (let i = 0; i < allRides.length; i++) {
      let rideId = allRides[i]["_id"];
      let rideExists =
        auth.logger.rideRequests[[cur_username]]["rideRequestsSent"]?.[rideId];
      if (rideExists !== undefined) temp_list.push(rideExists["seats"]);
      else temp_list.push(1);
      if (rideExists !== undefined) button_list.push(true);
      else button_list.push(false);
    }
    setSeats(temp_list);
    setButton(button_list);
    auth.logger.emptySearchRide();
    console.log("temp list button_list", seats, button);
    // return () => {
    //   auth.logger.getRideRequests();
    // }; //change back for backend use
  }, []);
  const handleRequest = (i) => {
    console.log("request", i);
    console.log("seats", seats, seats[i]);
    console.log("ride requests in showall rides", auth.logger.rideRequests);
    let username = allRides[i].username;
    if (auth.logger.user.username === username) {
      alert("Ride is posted by you!");
      return;
    }
    let rideId = allRides[i]["_id"];
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
  return (
    <div className="container-fluid showall">
      {/* <div className="row">
        <div className="col-3" />
        <div className="col-6 g-4">
          <button
            className="btn btn-lg btn-primary"
            onClick={() => setSearchParams({ filter: "filter" })}
          >
            filter
          </button>
          <button
            className="btn btn-lg btn-primary"
            onClick={() => setSearchParams({})}
          >
            reset
          </button>
          {filter ? <p>showing filtered rides</p> : <p>Showing all rides</p>}
        </div>
      </div> */}
      <div className="row">
        <h1 id="table">Showing all available Rides</h1>
        {allRides.map((r, i) => {
          const list = (
            <div className="row m-3 p-3 border border-dark box" key={r._id}>
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

export default ShowAllRides;
