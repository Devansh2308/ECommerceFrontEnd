import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div>
      <Link className="btn btn-sm btn-success mb-2" to="/admin/dashboard">
        Admin DashBoard
      </Link>
    </div>
  );

  const handleChange = event => {
    setError("");
    setName(event.target.value);
  };
  const onSubmit = event => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name })
      .then(data => {
        console.log(data);
        if (data.error) {
          setError(true);
        } else {
          setError("false");
          setSuccess(true);
          setName("");
        }
      })
      .catch();
  };

  const successMessage = () => {
    if (success) {
      return (
        <h4 className="text-success bg-white">Category created Successfully</h4>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return <h4 className="text-danger">Category creation failed</h4>;
    }
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the Category</p>
          <input
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="Category"
          ></input>
          <button className="btn-iutlined-info" onClick={onSubmit}>
            Create Caategory
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create a category here"
      Description="Add new Category for your product"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
