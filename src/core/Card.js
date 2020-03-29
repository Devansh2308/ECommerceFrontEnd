import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect, Link } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { isAuthenticated } from "../auth/helper";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = f => f,
  reload = undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(product.count);

  const cardTitle = product ? product.name : "Product cant Load";
  const cardDescription = product ? product.description : "Default Price";
  const cardPrice = product ? product.Price : "Default Price";

  const ErrorMessage = () => {
    return (
      <div
        className="row mt-2
      "
      >
        <div className="col-md-6 offset-sm-3  text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            Please <Link to="/signup">Login</Link> to Add Products in Cart
          </div>
        </div>
      </div>
    );
  };

  const addToCart = () => {
    if (!isAuthenticated()) {
      setError(true);
    }
    isAuthenticated() &&
      addItemToCart(product, () => {
        setRedirect(true);
      });
  };

  const getARedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart"></Redirect>;
    }
  };

  const showAddToCart = addtoCart => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = removeFromCart => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div className="card text-white bg-dark border border-info ">
      {ErrorMessage()}
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
