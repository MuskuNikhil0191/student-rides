import React, { useState, useEffect } from "react";
import { useAuth } from "../Utils/Auth";
import { Link, Outlet } from "react-router-dom";
import "../Styles/profile.css";

function Profile() {
  const [displayRides, setDisplayRides] = useState([]);
  const [displayingRides, setDisplayingRides] = useState(null);
  const auth = useAuth();
  var cur_user = auth.logger.user.username;
  console.log("in profile user", auth.logger.user);
  console.log("in profile users", auth.logger.users);
  console.log("in profile rides", auth.logger.rides);
  console.log("in profile ride requests", auth.logger.rideRequests);
  useEffect(() => {
    handlePostedRides();
    // return () => {
    //   auth.logger.getRideRequests();
    //   auth.logger.getRides();
    // }; //change back
  }, []);
  // useEffect(() => {
  //   auth.logger.getRideRequests();
  //   auth.logger.getRides();
  // }, [displayRides]); //change back
  const handleMyRequests = () => {
    console.log("in my requests");
    let mr = auth.logger.rideRequests[[cur_user]]["rideRequestsSent"];
    console.log("mr", mr);
    var seats,
      sentTo,
      sentRides = [];
    for (let id in mr) {
      seats = mr[[id]]["seats"];
      sentTo = mr[[id]]["sentTo"];
      if (
        auth.logger.rideRequests[[sentTo]]["rideRequestsReceived"]?.[id] !==
          undefined &&
        auth.logger.rideRequests[[sentTo]]["rideRequestsReceived"][[id]]?.[
          cur_user
        ] !== undefined
      ) {
        let mrride = auth.logger.rides.filter((r) => {
          return r._id === id;
        });
        // if (mrride[0].seats == 0 && mr[[id]]["status"] !== "accepted")
        //   mrride[0].available = false;
        // else mrride[0].available = true;
        mrride[0].seats = seats;
        let user = auth.logger.users.filter((u) => {
          return u.username === sentTo;
        });
        mrride[0].name = user[0].firstname;
        mrride[0].number = user[0].number;
        mrride[0].community = !mr[[id]]["community"]
          ? mrride[0].community
          : mr[[id]]["community"];
        mrride[0].location = !mr[[id]]["location"]
          ? mrride[0].location
          : mr[[id]]["location"];
        mrride[0].status = mr[[id]]["status"];
        mrride[0].fare = parseInt(mrride[0].fare) * parseInt(seats);
        sentRides.push(mrride[0]);
      }
    }
    setDisplayRides(sentRides);
    setDisplayingRides("myRequests");
    console.log("sent rides", sentRides);
  };
  const handlePostedRides = () => {
    let pr = auth.logger.rides.filter((ride) => {
      return ride.username === auth.logger.user.username;
    });
    setDisplayRides(pr);
    setDisplayingRides("postedRides");
    console.log("rides", auth.logger.rides);
    console.log("in getPostedRides ", pr);
  };
  const handleRideRequests = () => {
    let rr = auth.logger.rideRequests[[cur_user]]["rideRequestsReceived"];
    var receivedRides = [];
    console.log("rr", rr);
    for (let id in rr) {
      let ride = auth.logger.rides.filter((r) => {
        return r._id === id;
      });
      for (const [uu, value] of Object.entries(rr[[id]])) {
        console.log(`${uu}: ${value}`, ride);
        var seats = value["seats"];
        var receivedBy = uu;
        console.log("id uu receivedby ride", id, uu, receivedBy, ride);
        if (
          auth.logger.rideRequests[[receivedBy]]["rideRequestsSent"]?.[id] !==
            undefined &&
          auth.logger.rideRequests[[receivedBy]]["rideRequestsSent"][[id]][
            "sentTo"
          ] === cur_user
        ) {
          ride[0].seats = seats;
          let user = auth.logger.users.filter((u) => {
            return u.username === receivedBy;
          });
          console.log("functioin ride user", ride, user);
          ride[0].name = user[0].firstname;
          ride[0].number = user[0].number;
          ride[0].username = receivedBy;
          ride[0].community = !value["community"]
            ? ride[0].community
            : value["community"];
          ride[0].location = !value["location"]
            ? ride[0].location
            : value["location"];
          ride[0].status = value["status"];
          ride[0].fare = parseInt(ride[0].fare) * parseInt(seats);
        }
        console.log("ride[0]", ride[0]);
        receivedRides.push(ride[0]);
      }
    }
    setDisplayRides(receivedRides);
    setDisplayingRides("rideRequests");
    // auth.logger.getRides(); //change back
    console.log("ride requests received", receivedRides);
  };
  const deleteRide = (i) => {};
  const acceptRide = (i) => {
    let curRide = displayRides[i];
    let ride = auth.logger.rides.filter((r) => {
      return r._id === curRide._id;
    });
    if (parseInt(ride[0].seats) >= parseInt(curRide.seats)) {
      auth.logger.updateRequestStatus(
        curRide._id,
        curRide.username,
        "accepted"
      );
      // auth.logger.getRides(); //change back
      auth.logger.updateRide(
        curRide._id,
        String(parseInt(ride[0].seats) - parseInt(curRide.seats))
      );
      displayRides[i].status = "accepted";
      setDisplayRides(displayRides);
      console.log(
        "in accept request",
        auth.logger.rideRequests,
        auth.logger.rides
      );
    } else {
      alert(
        "Your posted seats availability is less than the required seats! Please update your posted ride"
      );
    }
  };
  const rejectRide = (i) => {
    let curRide = displayRides[i];
    auth.logger.updateRequestStatus(curRide._id, curRide.username, "rejected");
    if (curRide.status === "accepted") {
      let ride = auth.logger.rides.filter((r) => {
        return r._id === curRide._id;
      });
      // auth.logger.getRides(); // change back
      auth.logger.updateRide(
        curRide._id,
        String(parseInt(ride[0].seats) + parseInt(curRide.seats))
      );
    }
    displayRides[i].status = "rejected";
    setDisplayRides(displayRides);
    console.log(
      "in reject request",
      auth.logger.rideRequests,
      auth.logger.rides,
      displayRides
    );
  };
  const cancelRide = (i) => {
    let cr = displayRides[i];
    console.log("In cancel request");
    auth.logger.deleteRideRequest(cr.username, cr._id);
    if (cr.status === "accepted") {
      let ride = auth.logger.rides.filter((r) => {
        return r._id === cr._id;
      });
      // auth.logger.getRides(); //change back
      auth.logger.updateRide(
        cr._id,
        String(parseInt(ride[0].seats) + parseInt(cr.seats))
      );
    }
    handleMyRequests();
    alert("ride request cancelled!");
    console.log("after", auth.logger.rideRequests);
  };
  return (
    <div className="container-fluid profile">
      <div className="row m-4">
        <div className="col-8">
          <div className="row">
            {displayingRides === "postedRides" && <h2>Your Posted Rides</h2>}
            {displayingRides === "rideRequests" && (
              <h2>Ride Requests Received</h2>
            )}
            {displayingRides === "myRequests" && <h2>Ride Requests Sent</h2>}
          </div>
          <div className="row box1">
            {displayRides.map((r, i) => {
              const list = (
                <div className="row m-3 p-3 border border-dark" key={i}>
                  {displayingRides === "rideRequests" && (
                    <div className="row text-start badge p-3 fs-3 text-light">
                      Ride Requested By: <br /> name: {r.name}
                      <br /> contact : {r.number}
                    </div>
                  )}
                  {displayingRides === "myRequests" && (
                    <div className="row badge text-start p-3 fs-3 text-light">
                      Ride Requested To: <br /> name: {r.name}
                      <br /> contact : {r.number}
                    </div>
                  )}
                  <hr></hr>
                  <div className="row">
                    <div className="col-2">
                      {r.community}
                      <br />
                      {r.originCity}
                    </div>
                    <div className="col-2">- - - - -&gt;</div>
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
                    <div className="col-1">
                      {r.seats} seats
                      <br />({r.fare}$)
                    </div>
                    <div className="col-2 m-4">
                      {displayingRides === "postedRides" && (
                        <button className="btn btn-light" disabled>
                          Ride Posted
                        </button>
                      )}
                      {displayingRides === "rideRequests" && (
                        <div className="d-flex">
                          {r.status === "accepted" && (
                            <React.Fragment>
                              <button className="btn btn-success" disabled>
                                |Accepted|
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => rejectRide(i)}
                              >
                                Reject
                              </button>
                            </React.Fragment>
                          )}
                          {r.status === "rejected" && (
                            <button className="btn btn-danger" disabled>
                              |Rejected|
                            </button>
                          )}
                          {r.status === "unknown" && (
                            <>
                              <button
                                className="btn btn-success"
                                onClick={() => acceptRide(i)}
                              >
                                Accept
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => rejectRide(i)}
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      )}
                      {displayingRides === "myRequests" && (
                        <div className="d-flex">
                          {r.status === "accepted" && (
                            <button className="btn btn-success" disabled>
                              |Accepted|
                            </button>
                          )}
                          {r.status === "rejected" && (
                            <button className="btn btn-danger" disabled>
                              |Rejected|
                            </button>
                          )}
                          {r.status === "unknown" && (
                            <button className="btn btn-success" disabled>
                              Request Pending
                            </button>
                          )}
                          <button
                            className="btn btn-danger"
                            onClick={() => cancelRide(i)}
                          >
                            Cancel Request
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="col-1" />
                  </div>
                  {/* {!r.available && (
                    <p className="text-danger">
                      This ride is no longer available!
                    </p>
                  )} */}
                </div>
              );
              return list;
            })}
          </div>
        </div>
        <div className="col-4">
          <div className="row mb-4">
            <div className="d-flex justify-content-around">
              <button className="btn btn-info" onClick={handleMyRequests}>
                My requests
              </button>
              <button className="btn btn-info" onClick={handlePostedRides}>
                Posted rides
              </button>
              <button className="btn btn-info" onClick={handleRideRequests}>
                Ride Requests
              </button>
              <nav className="text-dark">
                <Link to="/account">
                  <span className="tex-dark m-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="42"
                      height="42"
                      fill="currentColor"
                      className="bi bi-person-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                  </span>
                </Link>
              </nav>
            </div>
          </div>
          <div className="row">
            <div className="row">
              <div className="col-sm-10">
                <h4 className="text-muted">Your Earnings</h4>
              </div>
              <div className="col-sm-2">
                <div className="bg-secondary rounded-pill text-center text-white">
                  <p>
                    <b>100$</b>
                  </p>
                </div>
              </div>
            </div>
            <div className="row m-4">
              <table className="table">
                <tbody>
                  <tr className="border">
                    <td>
                      <h6>Ride for 4</h6>
                      <p className="text-muted">OP to MIC</p>
                    </td>
                    <td className="float-right">
                      <h6 className="text-muted">$20</h6>
                    </td>
                  </tr>
                  <tr className="border">
                    <td>
                      <h6>Ride for 2</h6>
                      <p className="text-muted">MIC to Warrensburg</p>
                    </td>
                    <td className="float-right text-muted">
                      <h6>$15</h6>
                    </td>
                  </tr>
                  <tr className="border">
                    <td>
                      <h6>Return ride for 3</h6>
                      <p className="text-muted">PT to OP</p>
                    </td>
                    <td className="text-muted float-right">
                      <h6>$15</h6>
                    </td>
                  </tr>
                  <tr className="border bg-light">
                    <td className="text-success">
                      <h6>Ride for 5</h6>
                      <p>OP to Independence</p>
                    </td>
                    <td className="text-success float-right">
                      <h6>$50</h6>
                    </td>
                  </tr>
                  <tr className="border">
                    <td>Total (USD)</td>
                    <td className="float-right">
                      <h6>$100</h6>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
