import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../constant";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/Action/useraction"; // importing the action from redux folder
const Login = () => {
  const Navigate = useNavigate(); // used this to navigate to the desired page after login
  const Dispatch = useDispatch(); // used  the dispatch to dispatch the data to the redux store to trigger the action
  // setting up state variables
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loader, setloader] = useState(false); // for loader icon , initial value false

  // this function will be called on the submission of the form
  const handleLogin = async (event) => {
    event.preventDefault();
    setloader(true);
    const requestdata = {
      email,
      password,
    };

    try {
      const loginresult = await axios.post(
        `${API_BASE_URL}user/login`,
        requestdata
      );
      console.log(loginresult);
      if (loginresult.status === 200) {
        // firing the alert once the user is successfully logged in
        Swal.fire({
          icon: "success",
          title: loginresult.data.message,
        });
        setloader(false);
        // storing the token and the user in the browser local storage
        localStorage.setItem("token", loginresult.data.token);
        localStorage.setItem("user", JSON.stringify(loginresult.data.user));
        console.log(loginresult.data);
        Dispatch(loginSuccess(loginresult.data.user)); // using dispatch to trigger the login success action
        setemail(""); // setting the email  and password to empty string
        setpassword("");
        Navigate("/addsales"); // navigating the user to the add sales page after the successful login
      }
    } catch (error) {
      console.log(error);
      setloader(false);
      Swal.fire({
        icon: "error",
        title: error.response.data.error,
      });
      setemail(""); // setting the email  and password to empty string
      setpassword("");
    }
  };
  // created a seperate component for loader and loading it conditionally
  const Loadericon = () => {
    if (loader) {
      return (
        <div className="row">
          <div
            className="col-sm-12"
            style={{
              textAlign: "center",
              position: "relative",
              top: "7rem",
            }}
          >
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    // creating a container and giving it some shadow
    <div className="container shadow-sm my-2">
      <div className="row mt-3">
        <div className="col-sm-12">
          <h2 className="text-center my-2">LOGIN FORM</h2>
        </div>
      </div>
      <div className="row my-3 py-2">
        <div className="col-sm-12">
          {/* creating a form with the help of bootstrap */}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <Loadericon />
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                value={email}
                onChange={(event) => setemail(event.target.value)}
                // using the onChange event to set the value of the state variable when the user types in the input field
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(event) => setpassword(event.target.value)}
              />
            </div>
            <div className="row mt-2">
              {/* creating a submit button and giving it class d-grid to take the entire 12 column space */}
              <div className="col-sm-12 d-grid">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
