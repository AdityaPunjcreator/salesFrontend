import React from "react"; // importing the React object from react library
import ReactDOM from "react-dom/client"; // importing the ReactDOM  object from react-dom/client package
import "bootstrap/dist/css/bootstrap.min.css"; // importing bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./app"; // importing  the root componeng
import store from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // passing store as prop , so that the state in the Redux is available to "App" componet, and once it is available in App componet, all the components can use it from here when needed
  <Provider store={store}>
    <App />
  </Provider>
); // rendering the root component
