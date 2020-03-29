import React, { useState, useEffect } from "react";
import Base from "./../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getUserInfo, updateUser } from "./helper/userapicalls";

const UserDashBoard = () => {
  const [disable, setDisable] = useState(true);
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({ email: "", name: "" });
  const [success, setSuccess] = useState(false);

  const successMessage = () => {
    return (
      success && (
        <div>
          <div className="container">
            <div className="alert alert-primary" role="alert">
              Updation Successfully!
            </div>
          </div>
        </div>
      )
    );
  };

  const UpdateCurrentUser = (userId, token, user) => {
    updateUser(userId, token, user).then(data => {
      if (data.err) {
        console.log(data.err);
      } else {
        setSuccess(true);
      }
    });
  };

  const onSubmit = event => {
    event.preventDefault();
    UpdateCurrentUser(user._id, token, values);
    console.log(values);
  };

  const preload = (userId, token) => {
    getUserInfo(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };
  const handleChange = event => {
    setValues({ ...values, name: event.target.value });
  };
  useEffect(() => {
    preload(user._id, token);
  }, []);
  const enable = () => {
    setDisable(false);
  };
  return (
    <Base title="User DashBoard Page">
      <div className="container">
        {successMessage()}
        <form>
          <div className="form-group">
            <div className="row m3 p1">
              <div className="col-3">
                <div className="container">
                  <label for="exampleInputEmail1">
                    <h5>Email address</h5>
                  </label>
                </div>
              </div>
              <div className="col-6">
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  disabled="false"
                  value={values.email}
                ></input>
                <small id="emailHelp" class="form-text text-white">
                  We'll never share your email with anyone else.
                </small>
              </div>
            </div>
            <div className="row mt-5 p1 mb-5 ">
              <div className="col-3">
                <div className="container">
                  <label for="exampleInputEmail1">
                    <h5>Name</h5>
                  </label>
                </div>
              </div>
              <div className="col-6">
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={values.name}
                  disabled={disable}
                  onChange={handleChange}
                ></input>
                <br></br>
                <br></br>
                <div className="row">
                  <div className="col-6">
                    <div className="container">
                      <button
                        type="button"
                        className="btn btn-primary rounded ,mt-2"
                        onClick={enable}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="container">
                      <button
                        type="button"
                        className="btn btn-primary rounded ,mt-2"
                        onClick={onSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Base>
  );
};

export default UserDashBoard;
