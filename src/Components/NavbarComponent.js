import "../Styles/navstyles.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Utils/Auth";

function NavbarComponent() {
  const navigate = useNavigate();
  const auth = useAuth();
  const logout = () => {
    auth.logger.logout();
    navigate("/");
  };
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg bg-dark">
        <div className="container">
          <p className="navbar-brand text-light">UCM Student Rides</p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto w-100 justify-content-end">
              <li className="nav-item active">
                <NavLink
                  className="nav-link text-light"
                  to="/"
                  style={(isActive) => ({
                    color: isActive ? "green" : "blue",
                  })}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/contact">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                {!auth.logger.user && (
                  <NavLink className="nav-link text-light" to="/login">
                    Login
                  </NavLink>
                )}
                {auth.logger.user && (
                  <NavLink className="nav-link text-light" to="/profile">
                    Profile
                  </NavLink>
                )}
              </li>
              {auth.logger.user && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-light"
                    onClick={(e) => {
                      e.preventDefault();
                      logout();
                    }}
                  >
                    Logout{" "}
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="28"
                        fill="currentColor"
                        className="bi bi-box-arrow-right"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                        <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                      </svg>
                    </span>
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavbarComponent;
