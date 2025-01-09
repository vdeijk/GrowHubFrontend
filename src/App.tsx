import React from 'react';
import './App.css';
import Navbar from './core/views/medium/Navbar/Navbar';
import Menu from './core/views/medium/Menu/Menu';
import Dashboard from './core/views/large/Dashboard/Dashboard';
import Footer from './core/views/medium/Footer/Footer';
import profilePicture from './auxiliary/assets/profile.jpeg';

const App: React.FC = () => {
  return (
    <main className="appContainer">
      <Navbar userName="YourUserName" />
      <Menu userName="YourUserName" profilePicture={profilePicture} />
      <Dashboard />
      <Footer />
    </main>
  );
};

export default App;
