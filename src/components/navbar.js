import React from "react";
import "./navbar.css"; // importing the navbar css style
import { NavLink } from "react-router-dom"; // importing the Navlink component to enable navigation
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure } from "../redux/Action/useraction"; // importing the action

const Navbar = () => {
  /*the state in the argument of useSelector hook is a function which receives the current redux state  */
  const user = useSelector((state) => state.userReducer.user._id); // using the useSelector hook to get the user if from redux store
  console.log(user);
  const Dispatch = useDispatch(); // to trigger the action
  const Navigate = useNavigate(); // to navigate to the desired page

  const handlelogout = () => {
    // removing the token and the user form the local storage of the browser
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Dispatch(loginFailure()); // triggering the action of loginFailure and updating to the initial state
    Navigate("/login"); // navigating to the login page once the user is logged out
    // using the sweetalert library to alert the user that he has logged out
    Swal.fire({
      icon: "success",
      title: "user successfully logged out",
    });
  };

  return (
    <>
      {/* creating a navbar with the help of "navbar" className */}
      {/* using the "navbar-expand-md className" so that until the screen size is 768px, the "nav-item" will align itself horizontally  */}
      <nav
        className="navbar navbar-expand-lg bg-primary shadow"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <h3 className="navbar-brand brand-font">Sales App</h3>
          {/* creating  a toggle button   */}
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbar"
          >
            {/* used the "navbar-toggler-icon" to give icon   */}
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* creating a collapse element */}
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* using short circuiting to conditionally load the page  */}

              {!user && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link  fs-5" to="/login">
                      Login
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link  fs-5" to="/registration">
                      Registration
                    </NavLink>
                  </li>
                </>
              )}

              {user && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link fs-5" to="/addsales">
                      Add Sales
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link  fs-5" to="/topsales">
                      Top 5 sales
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link  fs-5" to="/revenue">
                      Today's Total Revenue
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className="nav-link fs-5"
                      onClick={handlelogout}
                      to="/login"
                    >
                      Logout
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
