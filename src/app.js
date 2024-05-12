import React from "react";
import Navbar from "./components/navbar"; // importing the Navbar component
import Login from "./pages/Login"; // importing the Login component
import AddSale from "./components/AddSales"; // importing the AddSales component
import Topsales from "./components/Top5sales"; // importing the Top5sales component
import Registration from "./pages/Registration"; // importing the Registration component
import Revenue from "./components/Revenue"; // importing the revenue component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // importing the BrowserRouter as Router, Route, Routes to allow navigation to different componet as we are creating a "SPA"

const App = () => {
  return (
    <>
      {/* creating the routes */}
      <Router>
        <Navbar />
        <Routes>
          {/* using the "exact" to match the exact route */}
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/registration" element={<Registration />}></Route>
          <Route exact path="/addsales" element={<AddSale />}></Route>
          <Route exact path="/topsales" element={<Topsales />}></Route>
          <Route exact path="/revenue" element={<Revenue />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
