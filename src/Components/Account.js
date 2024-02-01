import React, { useEffect, useState } from "react";
import { useAuth } from "../Utils/Auth";
import "../Styles/account.css";

function Account() {
  const auth = useAuth();
  const [user, setUser] = useState(null);
  useEffect(() => {
    let cu = auth.logger.users.filter((u) => {
      return u.username === auth.logger.user.username;
    });
    console.log(auth.logger.users);
    console.log(auth.logger.user);
    setUser(cu[0]);
    console.log("cu", cu);
  }, []);
  return (
    <div className="container-fluid user">
      <h1>Your Account</h1>
      {user && (
        <div className="container bootstrap snippets bootdey">
          <div className="panel-body inf-content">
            <div className="row">
              <div className="col-md-4">
                <img
                  alt=""
                  style={{ width: "600px" }}
                  title=""
                  className="img-circle img-thumbnail isTooltip"
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  data-original-title="Usuario"
                />
              </div>
              <div className="col-md-6">
                <strong>Your Details</strong>
                <br />
                <div className="table-responsive">
                  <table className="table table-user-information">
                    <tbody>
                      <tr>
                        <td>
                          <strong>
                            <span className="text-dark"></span>
                            Username
                          </strong>
                        </td>
                        <td className="text-dark">
                          {user.username.toUpperCase()}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            <span className="text-dark"></span>
                            First Name
                          </strong>
                        </td>
                        <td className="text-dark">
                          {user.firstname.toUpperCase()}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            <span className="text-dark"></span>
                            Lastname
                          </strong>
                        </td>
                        <td className="text-dark">
                          {user.lastname.toUpperCase()}
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <strong>
                            <span className="text-dark"></span>
                            Email
                          </strong>
                        </td>
                        <td className="text-dark">{user.email}</td>
                      </tr>

                      <tr>
                        <td>
                          <strong>
                            <span className="text-dark"></span>
                            Gender
                          </strong>
                        </td>
                        <td className="text-dark">
                          {user.gender.toUpperCase()}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            <span className="text-dark"></span>
                            Contact Number
                          </strong>
                        </td>
                        <td className="text-dark">{user.number}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            <span className="text-dark"></span>
                            Password
                          </strong>
                        </td>
                        <td className="text-dark">{user.password}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            <span className="text-dark"></span>
                            Modified
                          </strong>
                        </td>
                        <td className="text-dark">20 jul 20014 20:00:00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
