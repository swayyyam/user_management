import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Parent from "./components/Parent";
import EditUser from "./components/EditUser";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Parent />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
};

export default App;


