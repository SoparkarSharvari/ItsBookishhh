
import axios from "axios";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "./redux/userSlice";
import Quotebar from "./Quotebar";

function Users() {
  const [readUsers, setReadUsers] = useState([]);
  const [notReadUsers, setNotReadUsers] = useState([]);
  const users = useSelector((state) => state.users.users);
  const [filterStatus, setFilterStatus] = useState("all");
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:3001/deleteuser/${id}`)
        .then((res) => {
          console.log(res.data)
          dispatch(deleteUser({ id }));
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    // Fetch read users
    axios.get('http://localhost:3001/users/read')
      .then((res) => {
        setReadUsers(res.data);
      })
      .catch((err) => console.log(err));

    // Fetch not read users
    axios.get('http://localhost:3001/users/not-read')
      .then((res) => {
        setNotReadUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Quotebar />
      <div style={{ backgroundColor: '#f9e79f' }} className="d-flex vh-100 justify-content-center align-items-center">
        <div style={{ backgroundColor: 'white' }} className="w-50 rounded p-3">
          {/* Filter buttons */}
          <div className="mb-3">
            <button
              className={`btn btn-${filterStatus === "all" ? "primary" : "outline-primary"} btn-sm me-2`}
              onClick={() => setFilterStatus("all")}
            >
              All
            </button>
            <button
              className={`btn btn-${filterStatus === "read" ? "primary" : "outline-primary"} btn-sm me-2`}
              onClick={() => setFilterStatus("read")}
            >
              Read
            </button>
            <button
              className={`btn btn-${filterStatus === "not read" ? "primary" : "outline-primary"} btn-sm`}
              onClick={() => setFilterStatus("not read")}
            >
              Not Read
            </button>
          </div>
          <Link to="/create" className="btn btn-success btn-sm">
            Add to TBR +
          </Link>
          <table className="table">
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(filterStatus === 'read' ? readUsers : filterStatus === 'not read' ? notReadUsers : users).map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <Link
                      to={`/edit/${user.id}`}
                      className="btn btn-sm btn-success me-2"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                  <td>{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Users;
