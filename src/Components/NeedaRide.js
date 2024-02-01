import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Utils/Auth";
import "../Styles/ridesearch.css";

function NeedaRide() {
  const navigate = useNavigate();
  const auth = useAuth();
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
  const [needarideValues, setNeedarideValues] = useState({
    community: "",
    street: "",
    originCity: "",
    location: "",
    destinationCity: "",
  });
  const [needarideErrors, setNeedarideErrors] = useState({});
  var handleNeedaride = (e) => {
    let { name, value } = e.target;
    setNeedarideValues({ ...needarideValues, [name]: value });
  };
  var handleSearch = (e) => {
    e.preventDefault();
    let errors = validateNeedaride(needarideValues);
    setNeedarideErrors(errors);
    if (Object.keys(errors).length === 0) {
      auth.logger.rideSearch(needarideValues);
      navigate("/search");
    }
  };
  var validateNeedaride = (values) => {
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
    return errors;
  };

  return (
    <div className="container-fluid search">
      <div className="row m-3 g-3">
        <div className="col-2"></div>
        <div className="col-8 p-2" style={{ border: "1px dashed lightgrey" }}>
          <div className="row">
            <h2>Search for Ride</h2>
          </div>
          <div className="row p-2">
            <form onSubmit={handleSearch}>
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
                        placeholder="Community"
                        name="community"
                        value={needarideValues.community}
                        onChange={handleNeedaride}
                      />
                      <p className="text-danger">{needarideErrors.community}</p>
                    </div>

                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        id="street"
                        aria-describedby="streetHelp"
                        placeholder="1234 Main street"
                        name="street"
                        value={needarideValues.street}
                        onChange={handleNeedaride}
                      />
                      <p className="text-danger">{needarideErrors.street}</p>
                    </div>
                  </div>
                  <select
                    id="state"
                    className="form-select"
                    name="originCity"
                    value={needarideValues.originCity}
                    onChange={handleNeedaride}
                  >
                    {cities.map((city) => (
                      <option value={city.value} key={city.value}>
                        {city.label}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-danger">{needarideErrors.originCity}</p>
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
                        aria-describedby="communityHelp"
                        placeholder="location"
                        name="location"
                        value={needarideValues.location}
                        onChange={handleNeedaride}
                      />
                      <p className="text-danger">{needarideErrors.location}</p>
                    </div>

                    <div className="col-4">
                      <select
                        id="state destin"
                        className="form-select"
                        name="destinationCity"
                        value={needarideValues.destinationCity}
                        onChange={handleNeedaride}
                      >
                        {cities.map((city) => (
                          <option value={city.value} key={city.value}>
                            {city.label}
                          </option>
                        ))}
                      </select>
                      <p className="text-danger">
                        {needarideErrors.destinationCity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <button className="btn btn-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NeedaRide;

//   const center = { lat: 48.8584, lng: 2.2945 };
//   const navigate = useNavigate();
//   var handleSearch = () => {
//     navigate("/search");
//   };

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//     libraries: ["places"],
//   });

//   const [map, setMap] = useState(/** @type google.maps.Map */ (null));
//   const [directionsResponse, setDirectionsResponse] = useState(null);
//   const [distance, setDistance] = useState("");
//   const [duration, setDuration] = useState("");

//   /** @type React.MutableRefObject<HTMLInputElement> */
//   const originRef = useRef();
//   /** @type React.MutableRefObject<HTMLInputElement> */
//   const destiantionRef = useRef();

//   if (!isLoaded) {
//     return <p>Loading.....</p>;
//   }

//   async function calculateRoute() {
//     if (originRef.current.value === "" || destiantionRef.current.value === "") {
//       return;
//     }
//     // eslint-disable-next-line no-undef
//     const directionsService = new google.maps.DirectionsService();
//     const results = await directionsService.route({
//       origin: originRef.current.value,
//       destination: destiantionRef.current.value,
//       // eslint-disable-next-line no-undef
//       travelMode: google.maps.TravelMode.DRIVING,
//     });
//     setDirectionsResponse(results);
//     setDistance(results.routes[0].legs[0].distance.text);
//     setDuration(results.routes[0].legs[0].duration.text);
//   }

//   function clearRoute() {
//     setDirectionsResponse(null);
//     setDistance("");
//     setDuration("");
//     originRef.current.value = "";
//     destiantionRef.current.value = "";
//   }

//   return (
//     <>
//       <h1>Search for ride</h1>
//       <div position="absolute" left={0} top={0} h="100%" w="100%">
//         {/* Google Map Box */}
//         <GoogleMap
//           center={center}
//           zoom={15}
//           mapContainerStyle={{ width: "100%", height: "100%" }}
//           options={{
//             zoomControl: false,
//             streetViewControl: false,
//             mapTypeControl: false,
//             fullscreenControl: false,
//           }}
//           onLoad={(map) => setMap(map)}
//         >
//           <Marker position={center} />
//           {directionsResponse && (
//             <DirectionsRenderer directions={directionsResponse} />
//           )}
//         </GoogleMap>
//       </div>
//       <form>
//         <div className="mb-3">
//           <label for="exampleInputEmail1" className="form-label">
//             Email address
//           </label>
//           <Autocomplete>
//             <input
//               type="email"
//               className="form-control"
//               id="exampleInputEmail1"
//               aria-describedby="emailHelp"
//               placeholder="origin"
//               ref={originRef}
//             />
//           </Autocomplete>
//           <div id="emailHelp" className="form-text">
//             We'll never share your email with anyone else.
//           </div>
//         </div>
//         <div className="mb-3">
//           <label for="exampleInputPassword1" className="form-label">
//             Password
//           </label>
//           <Autocomplete>
//             <input
//               type="password"
//               className="form-control"
//               id="exampleInputPassword1"
//               placeholder="destination"
//               ref={destiantionRef}
//             />
//           </Autocomplete>
//         </div>
//         <button
//           className="btn btn-success"
//           type="submit"
//           onClick={handleSearch}
//         >
//           Search
//         </button>
//       </form>
//     </>
//   );
// }

// export default NeedaRide;
