import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getCategories,
  getProduct,
  updateProduct
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    Price: "",
    stock: "",
    photo: "",
    categoryies: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: "",
    formData: ""
  });

  const {
    name,
    description,
    Price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData
  } = values;

  const preload = productId => {
    getProduct(productId).then(data => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategories();
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          Price: data.Price,
          category: data.category,
          stock: data.stock,
          formData: new FormData()
        });

        console.log(categories);
      }
    });
  };

  const preloadCategories = () => {
    getCategories().then(data => {
      if (data.err) {
        setValues({ ...values, error: data.err });
      } else {
        setValues({ categories: data, formData: new FormData() });
      }
    });
  };
  useEffect(() => {
    preload(match.params.productId);
  }, []);
  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(match.params.productId, user._id, token, formData).then(
      data => {
        console.log(data);
        if (data.err) {
          setValues({ ...values, error: data.err });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            Price: "",
            photo: "",
            stock: "",
            loading: false,
            createdProduct: data.name
          });
        }
      }
    );
  };
  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-center"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>{createdProduct}</h4> updated Successfully
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-center"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };
  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };
  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("Price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={Price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Update Product
      </button>
    </form>
  );
  return (
    <Base
      title="Add Product here!"
      description="Welcome to Product Creation Section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {errorMessage()}
          {successMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
