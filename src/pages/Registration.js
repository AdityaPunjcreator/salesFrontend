import React, { useState } from "react"; // importing useState hook to manage the state
import axios from "axios"; // importing axios library to send the http request
import API_BASE_URL from "../constant";
import Swal from "sweetalert2"; // importing this library to send the alert to user 
import { useNavigate } from "react-router-dom"; // importing this to enable navigation

const Registration = () => {
  const Navigate = useNavigate();

  // here i am declaring the state variables to manage the state
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [loader, setloader] = useState(false); // creating a state variable for loader to toggle it when the form is submitted

  // this function will be called when the form is submitted
  const handleRegistration = async (event) => {
    event.preventDefault(); // this is to prevent the default behavior of the browser, when submit event is fired
    setloader(true); // when the onSubmit event is fired, the loader will start running
    const requestdata = {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
    };
    // using the try catch block to handle the async function
    try {
      const registrationdata = await axios.post(
        `${API_BASE_URL}user/registration`,
        requestdata
      ); // sending the data to the server
      console.log(registrationdata.data);
      if (registrationdata.status === 201) {
        setloader(false);
        Swal.fire({
          icon: "success",
          title: registrationdata.data.message,
        });
        // calling the function to set the input value to empty once the form is submitted successfully
        setfirstname("");
        setlastname("");
        setemail("");
        setpassword("");
        setconfirmPassword("");
        Navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setloader(false);
      // using the sweetalert to show alert to the user
      Swal.fire({
        icon: "Error",
        title: error.response.data.error,
      });
      setfirstname("");
      setlastname("");
      setemail("");
      setpassword("");
      setconfirmPassword("");
    }
  };
  // created a seperate component for loader and loading it conditionally
  const Loader = () => {
    if (loader) {
      <div className="row">
        <div
          className="col-sm-12"
          style={{
            textAlign: "center",
            position: "relative",
            top: "13rem",
          }} // setting up style for the spinner
        >
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>;
    }
  };

  return (
    <div className="container shadow-sm my-2">
      <div className="row mt-3">
        <div className="col-sm-12">
          <h2 className="text-center">REGISTRATION FORM</h2>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-sm-12">
          <form onSubmit={handleRegistration}>
            <div className="mb-3">
              <Loader />
              <label htmlFor="first-name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="first-name"
                value={firstname}
                onChange={(event) => setfirstname(event.target.value)} 
                // using the onChange event to set the value of the state variable when the user types in the input field
              />
            </div>
            <div className="mb-3">
              <label htmlFor="last-name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="last-name"
                value={lastname}
                onChange={(event) => setlastname(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                value={email}
                onChange={(event) => setemail(event.target.value)}
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
              <small>(password must be 8 characters)</small>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                ConfirmPassword
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={confirmPassword}
                onChange={(event) => setconfirmPassword(event.target.value)}
              />
            </div>
            <div className="row mt-2">
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

export default Registration; // exporting the component as default
