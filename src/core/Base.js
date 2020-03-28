import React from "react";
import Menu from "./menu";

const Base = ({
  title = "My Title",
  description = "My description",
  className = "bg-dark text-white py-0",
  children
}) => {
  return (
    <div>
      <Menu></Menu>
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center py-1">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center py-2">
          <h4>If you Got any Questions, feel free to to reach out!</h4>
          <button className="btn btn-warning btn-lg">Contact us</button>
        </div>
        <div className="container">
          <span className="text-muted">
            Made By <span className="text-white"> Devansh Kumar Sharma</span>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Base;
