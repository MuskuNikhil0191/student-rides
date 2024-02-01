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
  var _users = [
    {
      _id: "644475c68c1f994981fd7470",
      firstname: "thanu",
      lastname: "rajaramgari",
      email: "thanurajaramgari@gmail.com",
      gender: "male",
      number: "9999999999",
      username: "rajaramgari",
      password: "thanu",
    },
    {
      _id: "6444adff8213c589893f4b3a",
      username: "nick2",
      password: "nick2",
      number: "9876543211",
      email: "varshab@gmail.com",
      firstname: "varsha",
      gender: "female",
      lastname: "baddam",
    },
    {
      _id: "64445ad166cecbb1eaaf13c2",
      firstname: "sohith",
      lastname: "soma",
      email: "sohithsoma@gmail.com",
      gender: "male",
      number: "9999999999",
      username: "soma",
      password: "sohith",
    },
    {
      _id: "64442b76f42b5f49a01a30af",
      firstname: "nikhil",
      lastname: "musku",
      email: "nikhilreddy3111@gmail.com",
      gender: "male",
      number: "9707373773",
      username: "nxm56340",
      password: "nikhil",
    },
    {
      _id: "644427c01dd2cce177c52be4",
      username: "nick1",
      password: "nick1",
      email: "ruchimusku@gmail.com",
      firstname: "ruchi",
      gender: "female",
      lastname: "musku",
      number: "9701364119",
    },
    {
      _id: "6444209d75cec45c6df1d5ba",
      username: "nick",
      password: "nick",
      number: "1234567899",
      email: "sruthibondam.gmail.com",
      firstname: "sruthi",
      gender: "female",
      lastname: "bondam",
    },
  ];
  var _rides = [
    {
      _id: "644448aca12aa0643e64a5fe",
      community: "Lexington",
      street: "121",
      originCity: "overlandpark",
      location: "mic",
      destinationCity: "leesummit",
      date: "2023-04-01",
      time: "00:02",
      seats: "3",
      username: "nick2",
      fare: "5",
    },
    {
      _id: "644449c9a12aa0643e64a5ff",
      community: "lionsgate",
      originCity: "overlandpark",
      date: "2023-04-01",
      time: "11:30",
      seats: "1",
      location: "mic",
      destinationCity: "leesummit",
      username: "nick",
      fare: "5",
    },
    {
      _id: "64444a03a12aa0643e64a600",
      community: "pointroyal",
      originCity: "leawood",
      date: "2023-04-02",
      time: "14:30",
      seats: { $numberInt: "1" },
      location: "mic",
      destinationCity: "leesummit",
      username: "nick2",
      fare: "10",
    },
    {
      _id: "64444a1ea12aa0643e64a601",
      community: "lionsgate",
      originCity: "overlandpark",
      date: "2023-04-01",
      time: "8:30",
      seats: "1",
      location: "mic",
      destinationCity: "leesummit",
      username: "nick3",
      fare: "5",
    },
    {
      _id: "64444a3ba12aa0643e64a602",
      community: "firefax",
      originCity: "overlandpark",
      date: "2023-04-02",
      time: "22:30",
      seats: "3",
      location: "mic",
      destinationCity: "warrensburg",
      username: "nick4",
      password: "nick4",
      fare: "15",
    },
    {
      _id: "64444a51a12aa0643e64a603",
      community: "westonpoint",
      originCity: "overlandpark",
      date: "2023-04-02",
      time: "15:30",
      seats: "3",
      location: "mic",
      destinationCity: "leesummit",
      username: "nick5",
      fare: "8",
    },
    {
      _id: "64444a69a12aa0643e64a604",
      community: "pointroyale",
      originCity: "leawood",
      date: "2023-04-01",
      time: "9:30",
      seats: "3",
      location: "mic",
      destinationCity: "leesummit",
      username: "nick6",
      fare: "6",
    },
    {
      _id: "6444569fb8e1158aab174ec6",
      community: "AMC",
      street: "312",
      originCity: "overlandpark",
      location: "Fairfax",
      destinationCity: "leawood",
      date: "2023-04-08",
      time: "12:02",
      seats: "1",
      username: "nick",
      fare: "4",
    },
    {
      _id: "64449c8d7c498f82fd1af287",
      community: "sandstone",
      street: "231",
      originCity: "overlandpark",
      location: "dq",
      destinationCity: "leawood",
      date: "2023-04-02",
      time: "08:03",
      seats: "2",
      username: "nick",
      fare: "6",
    },
  ];
  var _requests = {
    nick: { rideRequestsReceived: {}, rideRequestsSent: {} },
    nick1: { rideRequestsReceived: {}, rideRequestsSent: {} },
    nick2: { rideRequestsReceived: {}, rideRequestsSent: {} },
    nick3: {
      rideRequestsReceived: {},
      rideRequestsSent: {},
    },
    nick4: { rideRequestsReceived: {}, rideRequestsSent: {} },
    nick5: { rideRequestsReceived: {}, rideRequestsSent: {} },
    nick6: { rideRequestsReceived: {}, rideRequestsSent: {} },
  };
  const login = (user) => {
    let flag = 0;
    getUsers();
    getRides();
    getRideRequests();
    for (let i = 0; i < _users.length; i++) {
      let u = _users[i];
      console.log(user, u);

      if (u["username"] === user.username) {
        if (u["password"] === user.password) {
          flag = 1;
          setUser(user);
          getUsers();
          getRides();
          getRideRequests();
          navigate(redirectPath, { replace: true });
          alert("succesfully logged in!");
        } else {
          alert("invalid password");
        }
      }
    }
    if (flag != 1) {
      alert("no user");
    }
  };
  const signup = (user) => {
    let flag = 0;
    getUsers();
    getRides();
    getRideRequests();
    for (let i = 0; i < _users.length; i++) {
      let u = _users[i];
      if (u["username"] === user.username) {
        flag = 1;
        break;
      }
      if (flag !== 1) {
        _users.push(user);
        setUser(user);
        _requests[[user.username]] = {
          rideRequestsReceived: {},
          rideRequestsSent: {},
        };
        getUsers();
        getRides();
        getRideRequests();
        navigate(redirectPath, { replace: true });
        alert("succesfully registers!");
      } else {
        alert("username already exists");
      }
    }
  };
  const forgotpwd = (details) => {
    let flag = 0;
    for (let i = 0; i < _users.length; i++) {
      let u = _users[i];
      if (u["email"] === details.email) {
        flag = 1;
        _users[i]["password"] = details.password;
        getUsers();
        break;
      }
    }
    if (flag != 1) {
      alert("Email does not exists!");
    }
  };
  const logout = () => {
    setUser(null);
  };
  const getUsers = () => {
    try {
      setUsers(_users);
      console.log("get users response", users);
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
  const ridePost = (ride) => {
    setPostRide(ride);
    _rides.push(ride);
    getRides();
  };
  const updateRide = (rideId, seats) => {
    console.log("in updateRide", rideId, seats);

    for (let i = 0; i < _rides.length; i++) {
      let _ride = _rides[i];
      if (_ride["_id"] === rideId) {
        _rides[i]["seats"] = seats;
      }
    }
    getRides();
  };

  const getRides = () => {
    try {
      setRides(_rides);
    } catch (err) {
      console.error(err);
    }
  };
  const getRideRequests = () => {
    try {
      setRideRequests(_requests);
    } catch (err) {
      console.error(err);
    }
  };

  const updateRideRequest = (username, rideId, seats) => {
    try {
      console.log("updateRiderequest", user.username, username);
      _requests[[user.username]] = {
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
      };

      _requests[[username]] = {
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
      };
    } catch (err) {
      console.error(err);
    }
    console.log("updaterequest", _requests);
    setRideRequests(_requests);
  };
  const deleteRideRequest = (username, rideId) => {
    try {
      let newUsers = { ...rideRequests };
      delete newUsers[[user.username]]["rideRequestsSent"][[rideId]];
      delete newUsers[[username]]["rideRequestsReceived"][[rideId]][
        [user.username]
      ];
      _requests[[user.username]] = {
        ...newUsers[[user.username]],
      };
      _requests[[username]] = {
        ...newUsers[[username]],
      };
    } catch (err) {
      console.error(err);
    }
    setRideRequests(_requests);
  };

  const updateRequestStatus = (rideId, username, stat) => {
    try {
      _requests[[user.username]] = {
        ...rideRequests[[user.username]],
        rideRequestsReceived: {
          ...rideRequests[[user.username]]["rideRequestsReceived"],
          [rideId]: {
            ...rideRequests[[user.username]]["rideRequestsReceived"][[rideId]],
            [username]: {
              ...rideRequests[[user.username]]["rideRequestsReceived"][
                [rideId]
              ][[username]],
              status: stat,
            },
          },
        },
      };
    } catch (err) {
      console.error(err);
    }
    try {
      _requests[[username]] = {
        ...rideRequests[[username]],
        rideRequestsSent: {
          ...rideRequests[[username]]["rideRequestsSent"],
          [rideId]: {
            ...rideRequests[[username]]["rideRequestsSent"][[rideId]],
            status: stat,
          },
        },
      };
    } catch (err) {
      console.error(err);
    }
    setRideRequests(_requests);
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
