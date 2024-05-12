import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../constant";

const Revenue = () => {
  // declaring the state variable
  const [revenue, setrevenue] = useState([]); // setting the initial value as an empty array

  const getrevenue = async () => {
    try {
      // using the get method to fetch the data along with sending header having token in it
      const revenuedata = await axios.get(`${API_BASE_URL}revenue`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setrevenue(revenuedata.data.totalrevenue); // storing the array in the "revenue state"
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getrevenue();
  }, []); // using the use effect hook to call the function as the component mounts (on the load of the page basically)

  return (
    <div className="container shadow-sm my-4">
      <div className="row mt-5">
        <div className="col">
          {/* using the map function to iterate over each item in the array  */}
          {revenue.map((item) => {
            return (
              <h1
                className="text-center" // aligning the item at the center
                // applying the google font
                style={{ fontFamily: "'Merriweather', serif" }}
                key={item._id} // using the "key prop" to uniquely identify the item
              >
                TODAY'S REVENUE IS: {item.totalrevenue}
              </h1>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Revenue;
