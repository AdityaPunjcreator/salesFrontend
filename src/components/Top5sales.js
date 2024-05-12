import React, { useState, useEffect } from "react"; // importing the useState and useEffect hook
import axios from "axios";
import API_BASE_URL from "../constant";

const Topsales = () => {
  const [topsales, settopsales] = useState([]); // setting the initial value of the state variable to empty array

  const gettopsales = async (state) => {
    try {
      // fetching the data from the server
      const salesresult = await axios.get(`${API_BASE_URL}getsales`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // sending the token in the header
        },
      });

      settopsales(salesresult.data.saledata); // setting the the data received in the state variable
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gettopsales();
  }, []); // using the use effect hook to call the function as the component mounts (on the load of the page basically)

  return (
    <div className="container shadow-sm my-4">
      <div className="row mt-2">
        <div className="col-sm-12">
          <h2 className="text-center">TOP 5 SALES</h2>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-12">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Sales Id:</th>
                <th scope="col">Product Name</th>
                <th scope="col">Ouantity</th>
                <th scope="col">price</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* using the map function to iterate over each item in the array  */}
              {topsales.map((items) => {
                return (
                  // using the "key prop" to uniquely identify the items
                  <tr key={items._id}>
                    <th scope="row">{items._id}</th>
                    <td>{items.productname}</td>
                    <td>{items.quantity}</td>
                    <td>{items.price}</td>
                    <td>{items.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Topsales;
