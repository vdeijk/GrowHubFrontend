import React from 'react';
import './App.css';
import Navbar from './core/views/containers/Navbar/Navbar';
import Menu from './core/views/containers/Menu/Menu';
import DashboardPage from './core/views/pages/DashboardPage/DashboardPage';
import Footer from './core/views/containers/Footer/Footer';
import profilePicture from './auxiliary/assets/profile.jpeg';
import { Routes, Route } from 'react-router-dom';
import CropsPage from './core/views/pages/CropsPage/CropsPage';
import routerStore from './core/stores/RouterStore/RouterStore';
import PageLayout from './core/views/reusables/PageLayout/PageLayout';
import AddPlant from './core/views/pages/AddPlantPage/AddPlantPage';
import { ToastContainer } from 'react-toastify';
import WeatherReportPage from './core/views/pages/WeatherReportPage/WeatherReportPage';
import FarmLocationsPage from './core/views/pages/FarmLocationsPage/FarmLocationsPage';
import TaskPage from './core/views/pages/TaskPage/TaskPage';
import AddLocationPage from './core/views/pages/AddLocationPage/AddLocationPage';

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
          <Route path="/" element={<DashboardPage />} />
          <Route path="/weatherReport" element={<WeatherReportPage />} />
          <Route path="/plantDatabase" element={<CropsPage />} />
          <Route path="/taskPage" element={<TaskPage />} />
          {/* <Route path="/settings" element={<SettingsPage />} /> */}
          <Route path="/farmLocations" element={<FarmLocationsPage />} />
          <Route path="/addPlant" element={<AddPlant />} />
          <Route path="/addLocation" element={<AddLocationPage />} />
        </Routes>
      </PageLayout>
      <Footer />
    </main>
  );
};

export default App;
