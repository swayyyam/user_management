import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false); 
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false); 
      });
  }, []);

  const handleDelete = (id) => {
    setLoading(true); 
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setUsers(users.filter((user) => user.id !== id));
          setLoading(false); 
          alert("User deleted successfully!");
        }
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false); 
      });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading Users...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="users-list-container">
      <h2>Users List</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Link to={`/edit/${user.id}`} className="edit-link">Edit</Link> |{" "}
                <button onClick={() => handleDelete(user.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Efficient CSS styles */}
      <style>{`
        .users-list-container {
          margin: 20px;
        }

        .users-table {
          width: 100%;
          border-collapse: collapse;
        }

        .users-table th, .users-table td {
          padding: 10px;
          border: 1px solid #ddd;
          text-align: left;
        }

        .edit-link, .delete-btn {
          color: #007bff;
          cursor: pointer;
          text-decoration: none;
        }

        .delete-btn {
          background: none;
          border: none;
          color: #007bff;
        }

        .delete-btn:hover, .edit-link:hover {
          color: #0056b3;
        }

        .loading-container {
          text-align: center;
          margin-top: 20px;
        }

        .spinner {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #007bff;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default UsersList;
