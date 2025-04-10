import React from 'react';
import './App.css';
import Navbar from './core/views/containers/Navbar/Navbar';
import Menu from './core/views/containers/Menu/Menu';
import Dashboard from './core/views/pages/Dashboard/Dashboard';
import Footer from './core/views/containers/Footer/Footer';
import profilePicture from './auxiliary/assets/profile.jpeg';
import { Routes, Route } from 'react-router-dom';
import PlantDatabase from './core/views/pages/PlantDatabase/PlantDatabase';
import routerStore from './core/stores/RouterStore/RouterStore';
import PageLayout from './core/views/reusables/PageLayout/PageLayout';
//import AddPlant from './core/views/pages/AddPlant/AddPlant';
import { ToastContainer } from 'react-toastify';
import WeatherReport from './core/views/pages/WeatherReport/WeatherReport';
import FarmLocations from './core/views/pages/FarmLocations/FarmLocations';
import TaskPage from './core/views/pages/TaskPage/TaskPage';

const App: React.FC = () => {
  return (
    <main className="appContainer">
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
          <Route path="/weatherReport" element={<WeatherReport />} />
          <Route path="/plantDatabase" element={<PlantDatabase />} />
          <Route path="/taskPage" element={<TaskPage />} />
          {/* <Route path="/settings" element={<SettingsPage />} /> */}
          <Route path="/farmLocations" element={<FarmLocations />} />
        </Routes>
      </PageLayout>
      <Footer />
    </main>
  );
};

export default App;
