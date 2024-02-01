import React, { useState } from "react";
import "../Styles/formstyles.css";
import { useAuth } from "../Utils/Auth";

function Form() {
  const [displayForm, setDisplayForm] = useState({
    login: true,
    signup: false,
    forgotpwd: false,
  });
  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({});
  var auth = useAuth();
  console.log(auth);
  var redirectPath;
  var handleLoginChange = (e) => {
    let { name, value } = e.target;
    setLoginValues({ ...loginValues, [name]: value });
  };
  var handleLoginSubmit = (e) => {
    console.log("error");
    e.preventDefault();
    let errors = validateLogin(loginValues);
    setLoginErrors(errors);

    console.log(auth);
    if (Object.keys(errors).length === 0) {
      auth.logger.login(loginValues);
    }
  };
  var validateLogin = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }
    return errors;
  };

  const [signupValues, setSignupValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    number: "",
    username: "",
    password: "",
  });
  const [signupErrors, setSignupErrors] = useState({});
  var handleSignupChange = (e) => {
    let { name, value } = e.target;
    setSignupValues({ ...signupValues, [name]: value });
  };
  var handleSignupSubmit = (e) => {
    e.preventDefault();
    let errors = validateSignup(signupValues);
    setSignupErrors(errors);
    if (Object.keys(errors).length === 0) {
      auth.logger.signup(signupValues);
    }
  };
  var validateSignup = (values) => {
    let errors = {};
    if (!values.firstname) {
      errors.firstname = "First name is required!";
    }
    if (!values.lastname) {
      errors.lastname = "Last name is required!";
    }
    if (!values.username) {
      errors.username = "Username is required!";
    }
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!values.email.match(mailformat)) {
      errors.email = "Please enter a valid email!";
    }
    if (!values.gender) {
      errors.gender = "Choose a gender!";
    }
    var numberFormat = /^\d+$/; // eslint-disable-line
    if (!values.number) {
      errors.number = "Please enter your contact number!";
    } else if (values.number.length !== 10) {
      errors.number = "Contact number should be 10 digits!";
    } else if (!numberFormat.test(values.number)) {
      errors.number = "Contact number should contain only digits";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4 || values.password.length > 10) {
      errors.password = "Password must be min 4 length and max 10 length!";
    }
    return errors;
  };

  const [forgotpwdValues, setForgotpwdValues] = useState({
    email: "",
    password: "",
  });
  const [forgotpwdErrors, setForgotpwdErrors] = useState({});
  var handleForgotpwdChange = (e) => {
    let { name, value } = e.target;
    setForgotpwdValues({ ...forgotpwdValues, [name]: value });
  };
  var handleForgotpwdSubmit = (e) => {
    e.preventDefault();
    let errors = validateForgotpwd(forgotpwdValues);
    setForgotpwdErrors(errors);
    if (Object.keys(errors).length === 0) {
      auth.logger.forgotpwd(forgotpwdValues);
      console.log("forgot pwd", forgotpwdValues);
      setDisplayForm({
        login: true,
        signup: false,
        forgotpwd: false,
      });
    }
  };
  var validateForgotpwd = (values) => {
    const errors = {};
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!values.email.match(mailformat)) {
      errors.email = "Please enter a valid email!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4 || values.password.length > 10) {
      errors.password = "Password must be min 4 length and max 10 length!";
    }
    return errors;
  };

  return (
    <div className="container-fluid form">
      {displayForm.login && (
        <div className="row login m-3">
          <div className="col-2"></div>
          <div className="col-8 p-2">
            <div className="row">
              <h2>Login</h2>
            </div>
            <div className="row p-2">
              <form onSubmit={handleLoginSubmit}>
                <div className="row p-2">
                  <div className="col-4">
                    <label className="form-label">Username</label>
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      aria-describedby="usernameHelp"
                      value={loginValues.username}
                      onChange={handleLoginChange}
                    />
                  </div>
                  <p className="text-danger">{loginErrors.username}</p>
                </div>
                <div className="row p-2">
                  <div className="col-4">
                    <label className="form-label">Password</label>
                  </div>
                  <div className="col-6">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      name="password"
                      value={loginValues.password}
                      onChange={handleLoginChange}
                    />
                  </div>
                  <p className="text-danger">{loginErrors.password}</p>
                </div>

                <br />
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
            <div className="row m-2">
              <div className="col-3"></div>
              <div className="col-6">
                <p>
                  Not a member ?{" "}
                  <a
                    onClick={() =>
                      setDisplayForm({
                        login: false,
                        signup: true,
                        forgotpwd: false,
                      })
                    }
                    className="text-primary h5"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
              <div className="col-3">
                <p>
                  <a
                    onClick={() =>
                      setDisplayForm({
                        login: false,
                        signup: false,
                        forgotpwd: true,
                      })
                    }
                    className="text-primary h5"
                  >
                    Forgot password
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {displayForm.signup && (
        <div className="row signup m-3">
          <div className="col-2"></div>
          <div className="col-8 p-2">
            <div className="row">
              <h2>SignUp</h2>
            </div>
            <div className="row p-2">
              <form onSubmit={handleSignupSubmit}>
                <div className="row p-2">
                  <div className="col-4">
                    <label className="form-label">Name</label>
                  </div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col">
                        <input
                          type="text"
                          name="firstname"
                          className="form-control"
                          id="firstname"
                          placeholder="First name"
                          value={signupValues.firstname}
                          onChange={handleSignupChange}
                        />
                        <span className="text-danger">
                          {signupErrors.firstname}
                        </span>
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          name="lastname"
                          className="form-control"
                          id="lastname"
                          placeholder="Last name"
                          value={signupValues.lastname}
                          onChange={handleSignupChange}
                        />
                        <span className="text-danger">
                          {signupErrors.lastname}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row p-2">
                  <div className="col-4">
                    <label className="form-label">Username</label>
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      id="username"
                      value={signupValues.username}
                      onChange={handleSignupChange}
                    />
                  </div>
                  <p className="text-danger">{signupErrors.username}</p>
                </div>
                <div className="row p-2">
                  <div className="col-4">
                    <label className="form-label">Email</label>
                  </div>
                  <div className="col-6">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      value={signupValues.email}
                      onChange={handleSignupChange}
                    />
                  </div>
                  <p className="text-danger">{signupErrors.email}</p>
                </div>
                <div className="row p-2">
                  <div className="col-4">
                    <label className="form-label">Contact number</label>
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      name="number"
                      className="form-control"
                      id="number"
                      aria-describedby="numberHelp"
                      onChange={handleSignupChange}
                      value={signupValues.number}
                    />
                  </div>
                  <p className="text-danger">{signupErrors.number}</p>
                </div>
                <div className="row p-2">
                  <div className="col-4">
                    <label className="form-label">Gender</label>
                  </div>
                  <div className="col-6">
                    <input
                      type="radio"
                      className="btn-check"
                      name="gender"
                      id="male"
                      value="male"
                      autoComplete="off"
                      onChange={handleSignupChange}
                      checked={signupValues.gender === "male"}
                    />
                    <label className="btn btn-light" htmlFor="male">
                      Male
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="gender"
                      id="female"
                      value="female"
                      autoComplete="off"
                      onChange={handleSignupChange}
                      checked={signupValues.gender === "female"}
                    />
                    <label className="btn btn-light" htmlFor="female">
                      Female
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="gender"
                      id="others"
                      value="others"
                      autoComplete="off"
                      onChange={handleSignupChange}
                      checked={signupValues.gender === "others"}
                    />
                    <label className="btn btn-light" htmlFor="others">
                      Others
                    </label>
                  </div>
                  <p className="text-danger">{signupErrors.gender}</p>
                </div>
                <div className="row p-2">
                  <div className="col-4">
                    <label className="form-label">Password</label>
                  </div>
                  <div className="col-6">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      value={signupValues.password}
                      onChange={handleSignupChange}
                    />
                  </div>
                  <p className="text-danger">{signupErrors.password}</p>
                </div>
                <br />
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </form>
            </div>
            <div className="row m-2">
              <p>
                Already a member ?{" "}
                <a
                  onClick={() =>
                    setDisplayForm({
                      login: true,
                      signup: false,
                      forgotpwd: false,
                    })
                  }
                  className="text-primary h5"
                >
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
      {displayForm.forgotpwd && (
        <div className="row forgotpwd m-3">
          <div className="col-2"></div>
          <div className="col-8 p-2">
            <div className="row">
              <h2>Forgot Password</h2>
            </div>
            <div className="row p-2">
              <form onSubmit={handleForgotpwdSubmit}>
                <div className="row p-2">
                  <div className="col-4">
                    <label htmlFor="email" className="form-label">
                      Your Email
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      aria-describedby="emailHelp"
                      value={forgotpwdValues.email}
                      onChange={handleForgotpwdChange}
                    />
                  </div>
                  <p className="text-danger">{forgotpwdErrors.email}</p>
                </div>
                <div className="row p-2">
                  <div className="col-4">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      New Password
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      value={forgotpwdValues.number}
                      onChange={handleForgotpwdChange}
                    />
                  </div>
                  <p className="text-danger">{forgotpwdErrors.password}</p>
                </div>
                <br />
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            <div className="row m-2">
              <div className="col">
                <p>
                  Already a member ?{" "}
                  <a
                    onClick={() =>
                      setDisplayForm({
                        login: true,
                        signup: false,
                        forgotpwd: false,
                      })
                    }
                    className="text-primary h5"
                  >
                    Login
                  </a>
                </p>
              </div>
              <div className="col">
                <p>
                  Not a member ?{" "}
                  <a
                    onClick={() =>
                      setDisplayForm({
                        login: false,
                        signup: true,
                        forgotpwd: false,
                      })
                    }
                    className="text-primary h5"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;
