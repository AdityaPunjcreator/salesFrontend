import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import API_BASE_URL from "../constant";

const AddSale = () => {
  // declaring the state variable
  const [productname, setproductname] = useState("");
  const [quantity, setquantity] = useState("");
  const [price, setprice] = useState("");

  // this function will be called on the submit of the form
  const handleAddSale = async (event) => {
    event.preventDefault();
    const requestdata = {
      productname,
      quantity,
      price,
    };
    try {
      // posting the data on the server
      const addSaleResult = await axios.post(
        `${API_BASE_URL}addsales`,
        requestdata,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          }, // sending the authorization header with the post request
        }
      );
      // firing the alert once the state is successful
      if (addSaleResult.status === 201) {
        Swal.fire({
          icon: "success",
          title: addSaleResult.data.message,
        });
        // making the input field empty once the item is added
        setproductname("");
        setquantity("");
        setprice("");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.error,
      });
    }
  };

  return (
    <div className="container shadow-sm my-2">
      <div className="row mt-3">
        <div className="col-sm-12">
          <h2 className="text-center">ADD SALE ENTRY</h2>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-12">
          {/* creating a form with the help of bootstrap and calling the "handleAddSale" function once the form is submitted */}
          <form onSubmit={handleAddSale}>
            <div className="mb-3">
              <label htmlFor="product" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                id="product"
                value={productname}
                onChange={(event) => setproductname(event.target.value)}
                // using the onChange event to set the value of the state variable to whatever the user types in the input box
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                min="0.1"
                step="0.1"
                value={quantity}
                onChange={(event) => setquantity(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                price
              </label>
              <input
                type="number"
                className="form-control"
                id="amount"
                min="0"
                value={price}
                onChange={(event) => setprice(event.target.value)}
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

export default AddSale; // exporting the AddSale component
