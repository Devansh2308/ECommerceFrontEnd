import React, { useState } from "react";
import Base from "../core/Base";
import { getCategories, deleteCategory } from "./helper/adminapicall";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

const ManageCategories = () => {
  const { user, token } = isAuthenticated();
  const [loading, setLoading] = useState(false);

  const Loader = () => (
    <div class="d-flex justify-content-center">
      <div className="spinner-border text-warning" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );

  const deleteThisCategory = categoryId => {
    setLoading(true);
    deleteCategory(categoryId, user._id, token).then(data => {
      setLoading(false);
      console.log(data);
      if (data.eror) {
        console.log(data.eror);
      } else {
        getAllCategories();
      }
    });
  };
  const [categories, setcategories] = useState([]);
  const getAllCategories = () => {
    getCategories().then(data => {
      if (data.err) {
        console.log(data.err);
      } else {
        setcategories(data);
      }
    });
  };

  return (
    <Base title="Welcome admin" description="Manage categories here">
      <h2 className="mb-4">All Categories:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      {getAllCategories()}

      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="text-white">
              Categories
            </th>
            <th scope="col" className="text-white">
              Property
            </th>
            <th scope="col" className="text-white">
              Property
            </th>
          </tr>
        </thead>
        {loading ? Loader() : ""}
        <tbody>
          {categories.map((category, index) => {
            return (
              <tr key={index}>
                <td className="text-white">{category.name}</td>
                <td className="text-white">
                  <button className="btn btn-success">
                    <Link
                      className="btn btn-success"
                      to={`/admin/category/update/${category._id}`}
                    >
                      update
                    </Link>
                  </button>
                </td>
                <td className="text-white">
                  {" "}
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteThisCategory(category._id);
                    }}
                  >
                    {" "}
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Base>
  );
};

export default ManageCategories;
