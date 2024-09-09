import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
      })
      .catch((error) => setError(error.message));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { name, email, phone };

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("User updated successfully!");
      })
      .catch((error) => setError(error.message));
  };

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div className="edit-user-container">
      <h2>Edit User</h2>
      {error && <div className="error-message">Error: {error}</div>}
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="input-field"
        />
        <button type="submit" className="submit-btn">Update</button>
      </form>
      <button onClick={handleBack} className="back-btn">Back</button>

      {/* Efficient CSS styles */}
      <style>{`
        .edit-user-container {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .edit-user-container h2 {
          text-align: center;
          margin-bottom: 20px;
          font-size: 24px;
          color: #333;
        }

        .user-form {
          display: flex;
          flex-direction: column;
        }

        .input-field {
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
        }

        .input-field:focus {
          border-color: #007bff;
          outline: none;
        }

        .submit-btn {
          padding: 10px;
          font-size: 16px;
          color: white;
          background-color: #007bff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .submit-btn:hover {
          background-color: #0056b3;
        }

        .error-message {
          color: red;
          margin-bottom: 15px;
          text-align: center;
        }

        .back-btn {
          margin-top: 15px;
          padding: 10px;
          font-size: 16px;
          color: white;
          background-color: #6c757d;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .back-btn:hover {
          background-color: #5a6268;
        }

        @media (max-width: 768px) {
          .edit-user-container {
            padding: 10px;
          }

          .input-field {
            font-size: 14px;
          }

          .submit-btn, .back-btn {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default EditUser;
