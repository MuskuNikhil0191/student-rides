import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const [postRide, setPostRide] = useState(null);
  const [searchRide, setSearchRide] = useState({
    community: "",
    street: "",
    originCity: "",
    location: "",
    destinationCity: "",
  });
  const [rides, setRides] = useState([]);
  const [rideRequests, setRideRequests] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";
  const login = async (user) => {
    try {
      let response = await axios.post("http://localhost:4002/getUser", user);
      console.log(response);
      if (response.data.message === "success") {
        setUser(user);
        getUsers();
        getRides();
        getRideRequests();
        navigate(redirectPath, { replace: true });
        alert("succesfully logged in!");
      } else if (response.data.message === "invalidusername") {
        alert("invalid username");
      } else if (response.data.message === "invalidpwd") {
        alert("invalid password");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const signup = async (user) => {
    try {
      let response = await axios.post("http://localhost:4002/createUser", user);
      console.log(response);
      if (response.data === "success") {
        setUser(user);
        const res = await axios.post("http://localhost:4002/addRideRequest", {
          key: user.username,
          value: {
            rideRequestsReceived: {},
            rideRequestsSent: {},
          },
        });
        getUsers();
        getRides();
        getRideRequests();
        console.log("add request res", res);
        navigate(redirectPath, { replace: true });
        alert("succesfully registers!");
      } else {
        alert("username already exists");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const forgotpwd = async (details) => {
    try {
      let response = await axios.put(
        "http://localhost:4002/updatePwd",
        details
      );
      if (response.data === "success") {
        alert("succesfully updated password!");
      } else {
        alert("Email does not exists!");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const logout = async () => {
    setUser(null);
  };
  const getUsers = async () => {
    try {
      let response = await axios.get("http://localhost:4002/getUsers");

      setUsers(response.data);
      console.log("get users response", response);
    } catch (err) {
      console.error(err);
    }
  };
  const rideSearch = (ride) => {
    setSearchRide(ride);
  };
  const emptySearchRide = () => {
    setSearchRide({
      community: "",
      street: "",
      originCity: "",
      location: "",
      destinationCity: "",
    });
  };
  const ridePost = async (ride) => {
    setPostRide(ride);
    try {
      let response = await axios.post("http://localhost:4002/postRide", ride);
      if (response.data === "success") {
        alert("succesfully posted ride!");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const updateRide = async (rideId, seats) => {
    console.log("in updateRide", rideId, seats);
    try {
      let response = await axios.put("http://localhost:4002/updateRide", {
        id: rideId,
        seats: seats,
      });
      console.log("update ride response", response);
    } catch (err) {
      console.log(err);
    }
    getRides();
  };

  const getRides = async () => {
    try {
      let response = await axios.get("http://localhost:4002/getRides");
      setRides(response.data);
      console.log("get rides resposne", response);
    } catch (err) {
      console.error(err);
    }
  };
  const getRideRequests = async () => {
    try {
      let response = await axios.get("http://localhost:4002/getRideRequests");

      setRideRequests(response.data);
      console.log("get ride request response", response);
    } catch (err) {
      console.error(err);
    }
  };
  const updateRideRequest = async (username, rideId, seats) => {
    try {
      console.log("updateRiderequest", user.username, username);
      let sent_response = await axios.put(
        "http://localhost:4002/updateRideRequest",
        {
          key: user.username,
          value: {
            ...rideRequests[[user.username]],
            rideRequestsSent: {
              ...rideRequests[[user.username]]["rideRequestsSent"],
              [rideId]: {
                sentTo: username,
                seats: seats,
                community: searchRide.community,
                street: searchRide.street,
                location: searchRide.location,
                status: "unknown",
              },
            },
          },
        }
      );
      console.log("sent request ", sent_response);
      let received_response = await axios.put(
        "http://localhost:4002/updateRideRequest",
        {
          key: username,
          value: {
            ...rideRequests[[username]],
            rideRequestsReceived: {
              ...rideRequests[[username]]["rideRequestsReceived"],
              [rideId]: {
                ...rideRequests[[username]]["rideRequestsReceived"][[rideId]],
                [user.username]: {
                  seats: seats,
                  community: searchRide.community,
                  street: searchRide.street,
                  location: searchRide.location,
                  status: "unknown",
                },
              },
            },
          },
        }
      );
      console.log("recieved request", received_response);
    } catch (err) {
      console.error(err);
    }
    getRideRequests();
  };
  const deleteRideRequest = async (username, rideId) => {
    try {
      let newUsers = { ...rideRequests };
      delete newUsers[[user.username]]["rideRequestsSent"][[rideId]];
      delete newUsers[[username]]["rideRequestsReceived"][[rideId]][
        [user.username]
      ];
      let delete_response = await axios.put(
        "http://localhost:4002/updateRideRequest",
        {
          key: user.username,
          value: {
            ...newUsers[[user.username]],
          },
        }
      );
      console.log("delete request 1", delete_response);
      delete_response = await axios.put(
        "http://localhost:4002/updateRideRequest",
        {
          key: username,
          value: {
            ...newUsers[[username]],
          },
        }
      );
      console.log("delete request 2", delete_response);
    } catch (err) {
      console.error(err);
    }
    getRideRequests();
  };

  const updateRequestStatus = async (rideId, username, stat) => {
    try {
      let received_response = await axios.put(
        "http://localhost:4002/updateRideRequest",
        {
          key: user.username,
          value: {
            ...rideRequests[[user.username]],
            rideRequestsReceived: {
              ...rideRequests[[user.username]]["rideRequestsReceived"],
              [rideId]: {
                ...rideRequests[[user.username]]["rideRequestsReceived"][
                  [rideId]
                ],
                [username]: {
                  ...rideRequests[[user.username]]["rideRequestsReceived"][
                    [rideId]
                  ][[username]],
                  status: stat,
                },
              },
            },
          },
        }
      );

      console.log("update sent request status resposne", received_response);
    } catch (err) {
      console.error(err);
    }
    try {
      let sent_response = await axios.put(
        "http://localhost:4002/updateRideRequest",
        {
          key: username,
          value: {
            ...rideRequests[[username]],
            rideRequestsSent: {
              ...rideRequests[[username]]["rideRequestsSent"],
              [rideId]: {
                ...rideRequests[[username]]["rideRequestsSent"][[rideId]],
                status: stat,
              },
            },
          },
        }
      );

      console.log("update sent request status resposne", sent_response);
    } catch (err) {
      console.error(err);
    }
    getRideRequests();
  };
  const logger = {
    user,
    postRide,
    searchRide,
    login,
    signup,
    rideSearch,
    ridePost,
    logout,
    forgotpwd,
    getRides,
    rides,
    getRideRequests,
    rideRequests,
    updateRideRequest,
    deleteRideRequest,
    users,
    emptySearchRide,
    updateRequestStatus,
    updateRide,
  };
  return (
    <AuthContext.Provider value={{ logger }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
