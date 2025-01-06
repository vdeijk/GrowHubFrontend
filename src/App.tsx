import React from "react";
import "./App.css";
import Navbar from "./core/Medium/Navbar/Navbar";
import Menu from "./core/Medium/Menu/Menu";
import Dashboard from "./core/Large/Dashboard/Dashboard";
import Footer from "./core/Medium/Footer/Footer";
import profilePicture from "./auxiliary/assets/profile.jpeg";

const App: React.FC = () => {
  return (
    <div className="appContainer">
      <Navbar userName="YourUserName" />
      <Menu userName="YourUserName" profilePicture={profilePicture} />
      <Dashboard />
      <Footer />
    </div>
  );
};

export default App;
