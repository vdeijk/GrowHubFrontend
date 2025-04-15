import React, { useEffect } from 'react';
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

const App: React.FC = observer(() => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

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
