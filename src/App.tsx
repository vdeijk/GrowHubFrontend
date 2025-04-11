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
import AddCropPage from './core/views/pages/AddCropPage/AddCropPage';
import { ToastContainer } from 'react-toastify';
import WeatherReportPage from './core/views/pages/WeatherReportPage/WeatherReportPage';
import FieldsPage from './core/views/pages/FieldsPage/FieldsPage';
import TasksPage from './core/views/pages/TasksPage/TaskPage';
import AddFieldPage from './core/views/pages/AddFieldPage/AddFieldPage';

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
          <Route path="/weatherReportPage" element={<WeatherReportPage />} />
          <Route path="/tasksPage" element={<TasksPage />} />
          <Route path="/fieldsPage" element={<FieldsPage />} />
          <Route path="/addFieldPage" element={<AddFieldPage />} />
          <Route path="/editField/:id" element={<AddFieldPage isEditing />} /> 
          <Route path="/cropsPage" element={<CropsPage />} />
          <Route path="/addCropPage" element={<AddCropPage />} />
          <Route path="/editCrop/:id" element={<AddCropPage isEditing />} />
        </Routes>
      </PageLayout>
      <FooterContainer />
    </main>
  );
};

export default App;
