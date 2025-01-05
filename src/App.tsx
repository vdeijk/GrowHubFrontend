import React from "react";
import "./App.css";
import Navbar from "./core/Medium/Navbar/Navbar";
import Menu from "./core/Medium/Menu/Menu";
import Dashboard from "./core/Large/Dashboard/Dashboard";
import Footer from "./core/Medium/Footer/Footer";

const App: React.FC = () => {
  return (
    <>
      <Navbar userName="YourUserName" />
      <Menu userName="YourUserName" profilePicture="path/to/profilePicture.jpg" />
      <Dashboard />
      <Footer />
    </>
  );
};

export default App;

