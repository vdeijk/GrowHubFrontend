import React, { useEffect, useState } from 'react';
import './App.css';
import NavbarContainer from './core/views/containers/NavbarContainer/NavbarContainer';
import MenuContainer from './core/views/containers/MenuContainer/MenuContainer';
import DashboardPage from './core/views/pages/DashboardPage/DashboardPage';
import FooterContainer from './core/views/containers/FooterContainer/FooterContainer';
import profilePicture from './auxiliary/assets/cropGrowHub.jpg';
import { Routes, Route } from 'react-router-dom';
import CropsPage from './core/views/pages/YourCropsPage/YourCropsPage';
import routerStore from './core/services/RouterService/RouterService';
import PageLayout from './core/views/layouts/PageLayout/PageLayout';
import AddCropPage from './core/views/pages/AddCropPage/AddCropPage';
import { ToastContainer } from 'react-toastify';
import WeatherReportPage from './core/views/pages/WeatherReportPage/WeatherReportPage';
import FieldsPage from './core/views/pages/FieldsPage/FieldsPage';
import TasksPage from './core/views/pages/TasksPage/TaskPage';
import AddFieldPage from './core/views/pages/AddFieldPage/AddFieldPage';
import { observer } from 'mobx-react-lite';
import NotFoundPage from './core/views/pages/NotFoundPage/NotFoundPage';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingWrapper from './core/views/reusables/LoadingWrapper/LoadingWrapper';
import LandingPage from './core/views/pages/LandingPage/LandingPage';
import fieldsStore from './core/stores/FieldsStore/FieldsStore';
import yourCropsStore from './core/stores/YourCropsStore/YourCropsStore';
import cropsDatabaseStore from './core/stores/CropsDatabaseStore/CropsDatabaseStore';
import taskStore from './core/stores/TaskStore/TaskStore';
import weatherStore from './core/stores/WeatherStore/WeatherStore';
import UpgradePage from './core/views/pages/UpgradePage/UpgradePage';
import CropsDatabasePage from './core/views/pages/CropsDatabasePage/CropsDatabasePage';
import AddTaskPage from './core/views/pages/AddTaskPage/AddTaskPage';
import AddYourCropPage from './core/views/pages/AddYourCropPage/AddYourCropPage';
import { useLocation } from 'react-router-dom';

const App: React.FC = observer(() => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [isFetched, setIsFetched] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    routerStore.handleRouteChange(currentPath);
  }, [location]);

  useEffect(() => {
    if (!isFetched && isAuthenticated) {
      setIsFetched(true);

      fetchAllData();
    }
  }, [isAuthenticated, isFetched]);

  const fetchAllData = async () => {
    try {
      await Promise.all([
        fieldsStore.fetchData(),
        yourCropsStore.fetchData(),
        cropsDatabaseStore.fetchData(),
        taskStore.fetchData(),
        weatherStore.fetchData(),
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <main className="appContainer">
      <ToastContainer style={{ zIndex: 9999 }} />
      <NavbarContainer userName={user?.name || ''} />
      <MenuContainer
        userName={user?.name || ''}
        profilePicture={profilePicture}
        menuLinks={routerStore.getVisibleLinks()}
        curPageTitle={routerStore.currentLabel}
      />
      <PageLayout>
        <LoadingWrapper isLoading={isLoading}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/weatherReportPage" element={<WeatherReportPage />} />
            <Route path="/tasksPage" element={<TasksPage />} />
            <Route path="/fieldsPage" element={<FieldsPage />} />
            <Route
              path="/addFieldPage/:id"
              element={<AddFieldPage isEditing={true} />}
            />
            <Route path="/addFieldPage" element={<AddFieldPage />} />
            <Route path="/cropsPage" element={<CropsPage />} />
            <Route path="/upgrade" element={<UpgradePage />} />
            <Route path="/cropsDatabase" element={<CropsDatabasePage />} />
            <Route
              path="/addCropPage/:id"
              element={<AddCropPage isEditing={true} />}
            />
            <Route path="/addCropPage" element={<AddCropPage />} />{' '}
            <Route
              path="/addYourCropPage/:id"
              element={<AddYourCropPage isEditing={true} />}
            />
            <Route path="/addYourCropPage" element={<AddYourCropPage />} />
            <Route
              path="/addTaskPage/:id"
              element={<AddTaskPage isEditing={true} />}
            />
            <Route path="/addTaskPage" element={<AddTaskPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </LoadingWrapper>
      </PageLayout>
      <FooterContainer />
    </main>
  );
});

//AddYourCropPage

export default App;
