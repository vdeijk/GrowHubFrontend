import React, { useEffect, useState } from 'react';
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
import { observer } from 'mobx-react-lite';
import NotFoundPage from './core/views/pages/NotFoundPage/NotFoundPage';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingWrapper from './core/views/reusables/LoadingWrapper/LoadingWrapper';
import LandingPage from './core/views/pages/LandingPage/LandingPage';
import fieldsStore from './core/stores/FieldsStore/FieldsStore';
import appointmentStore from './core/stores/AppointmentsStore/AppointmentStore';
import cropsStore from './core/stores/CropsStore/CropsStore';
import taskStore from './core/stores/TaskStore/TaskStore';
import weatherStore from './core/stores/WeatherStore/WeatherStore';

const App: React.FC = observer(() => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [isFetched, setIsFetched] = useState(false);

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
        appointmentStore.fetchData(),
        cropsStore.fetchData(),
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
      <NavbarContainer userName="YourUserName" />
      <MenuContainer
        userName="YourUserName"
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
            <Route
              path="/addCropPage/:id"
              element={<AddCropPage isEditing={true} />}
            />
            <Route path="/addCropPage" element={<AddCropPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </LoadingWrapper>
      </PageLayout>
      <FooterContainer />
    </main>
  );
});

export default App;
