import React from 'react';
import './App.css';
import Navbar from './core/views/containers/Navbar/Navbar';
import Menu from './core/views/containers/Menu/Menu';
import Dashboard from './core/views/pages/Dashboard/Dashboard';
import Footer from './core/views/containers/Footer/Footer';
import profilePicture from './auxiliary/assets/profile.jpeg';
import { Routes, Route } from 'react-router-dom';
import PlantDatabase from './core/views/pages/PlantDatabase/PlantDatabase';
import routerStore from './core/stores/RouterStore';
import PageLayout from './core/views/reusables/PageLayout/PageLayout';
//import AddPlant from './core/views/pages/AddPlant/AddPlant';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <main className="appContainer">
      {' '}
      <ToastContainer />
      <Navbar userName="YourUserName" />
      <Menu
        userName="YourUserName"
        profilePicture={profilePicture}
        menuLinks={routerStore.menuLinks}
        curPageTitle={routerStore.currentLabel}
      />
      <PageLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/plantDatabase" element={<PlantDatabase />} />
          {/* <Route path="/add-plant" element={<AddPlant />} /> */}
        </Routes>
      </PageLayout>
      <Footer />
    </main>
  );
};

export default App;
