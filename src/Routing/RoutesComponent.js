import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Components/Home";
import About from "../Components/About";
import Login from "../Components/Login";
import Contact from "../Components/Contact";
import NotFound from "../Components/NotFound";
import NeedaRide from "../Components/NeedaRide";
import PostaRide from "../Components/PostaRide";
import ShowAllRides from "../Components/ShowAllRides";
import RideSearch from "../Components/RideSearch";
import Profile from "../Components/Profile";
import { RequireAuth } from "../Utils/RequireAuth";
import { RequireSearch } from "../Utils/RequireSearch";
import Account from "../Components/Account";

function RoutesComponent() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route
          path="profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="account"
          element={
            <RequireAuth>
              <Account />
            </RequireAuth>
          }
        />
        <Route path="contact" element={<Contact />} />
        <Route
          path="needaride"
          element={
            <RequireAuth>
              <NeedaRide />
            </RequireAuth>
          }
        />
        <Route
          path="search"
          element={
            <RequireSearch>
              <RideSearch />
            </RequireSearch>
          }
        />
        <Route
          path="postaride"
          element={
            <RequireAuth>
              <PostaRide />
            </RequireAuth>
          }
        />
        <Route
          path="showallrides"
          element={
            <RequireAuth>
              <ShowAllRides />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default RoutesComponent;
