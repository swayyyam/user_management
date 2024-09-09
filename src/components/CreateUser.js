import React, { useState } from "react";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); 
    const newUser = { name, email, phone };

    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('User created successfully!');
        setLoading(false); 
        setName("");
        setEmail("");
        setPhone("");
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false); 
      });
  };

  return (
    <div className="create-user-container">
      <h2>Create User</h2>
      {error && <div className="error-message">Error: {error}</div>}
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Creating User...</p>
        </div>
      ) : (
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
          <button type="submit" className="submit-btn">Create</button>
        </form>
      )}

      {/* Efficient CSS styles */}
      <style>{`
        .create-user-container {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

export default CreateUser;
