import React from 'react';
import './App.css';
import NavbarContainer from './core/views/containers/NavbarContainer/NavbarContainer';
import MenuContainer from './core/views/containers/MenuContainer/MenuContainer';
import DashboardPage from './core/views/pages/DashboardPage/DashboardPage';
import FooterContainer from './core/views/containers/FooterContainer/FooterContainer';
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
      <NavbarContainer userName="YourUserName" />
      <MenuContainer
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
      <FooterContainer />
    </main>
  );
};

export default App;
