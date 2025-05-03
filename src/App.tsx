import React, { useEffect, useState } from 'react';
import './App.css';
import NavbarContainer from './core/views/containers/NavbarContainer/NavbarContainer';
import MenuContainer from './core/views/containers/MenuContainer/MenuContainer';
import DashboardPage from './core/views/pages/DashboardPage/DashboardPage';
import FooterContainer from './core/views/containers/FooterContainer/FooterContainer';
import { Routes, Route } from 'react-router-dom';
import BatchesPage from './core/views/pages/BatchesPage/BatchesPage';
import routerStore from './core/services/RouterService/RouterService';
import PageLayout from './core/views/layouts/PageLayout/PageLayout';
import AddCropPage from './core/views/pages/AddCropPage/AddCropPage';
import { ToastContainer } from 'react-toastify';
import WeatherReportPage from './core/views/pages/WeatherReportPage/WeatherReportPage';
import FieldsPage from './core/views/pages/FieldsPage/FieldsPage';
import TasksPage from './core/views/pages/TasksPage/TasksPage';
import AddFieldPage from './core/views/pages/AddFieldPage/AddFieldPage';
import { observer } from 'mobx-react-lite';
import NotFoundPage from './core/views/pages/NotFoundPage/NotFoundPage';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingWrapper from './core/views/reusables/LoadingWrapper/LoadingWrapper';
import LandingPage from './core/views/pages/LandingPage/LandingPage';
import fieldsStore from './core/stores/derived/FieldsStore/FieldsStore';
import batchesStore from './core/stores/derived/BatchesStore/BatchesStore';
import cropsStore from './core/stores/derived/CropsStore/CropsStore';
import taskStore from './core/stores/derived/TasksStore/TasksStore';
import weatherStore from './core/stores/derived/WeatherStore/WeatherStore';
import UpgradePage from './core/views/pages/UpgradePage/UpgradePage';
import CropsPage from './core/views/pages/CropsPage/CropsPage';
import AddTaskPage from './core/views/pages/AddTaskPage/AddTaskPage';
import AddBatchPage from './core/views/pages/AddBatchPage/AddBatchPage';
import { useLocation } from 'react-router-dom';
import MeasurementsPage from './core/views/pages/MeasurementsPage/MeasurementsPage';
import measurementsStore from './core/stores/derived/MeasurementsStore/MeasurementsStore';
import AddMeasurementPage from './core/views/pages/AddMeasurementPage/AddMeasurementPage';

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
        weatherStore.fetchData(),
        taskStore.fetchData(),
        measurementsStore.fetchData(),
        fieldsStore.fetchData(),
        batchesStore.fetchData(),
        cropsStore.fetchData(),
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
      <MenuContainer />
      <PageLayout>
        <LoadingWrapper isLoading={isLoading}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/weatherReportPage" element={<WeatherReportPage />} />
            <Route path="/tasksPage" element={<TasksPage />} />
            <Route path="/fieldsPage" element={<FieldsPage />} />
            <Route path="/measurementsPage" element={<MeasurementsPage />} />
            <Route path="/batchesPage" element={<BatchesPage />} />
            <Route path="/cropsPage" element={<CropsPage />} />
            <Route path="/upgradePage" element={<UpgradePage />} />

            <Route path="/addFieldPage" element={<AddFieldPage />} />
            <Route
              path="/addFieldPage/:id"
              element={<AddFieldPage isEditing={true} />}
            />
            <Route path="/addTaskPage" element={<AddTaskPage />} />
            <Route
              path="/addTaskPage/:id"
              element={<AddTaskPage isEditing={true} />}
            />
            <Route
              path="/addMeasurementPage"
              element={<AddMeasurementPage />}
            />
            <Route
              path="/addMeasurementsPage/:id"
              element={<AddMeasurementPage />}
            />
            <Route path="/addBatchPage" element={<AddBatchPage />} />
            <Route
              path="/addBatchPage/:id"
              element={<AddBatchPage isEditing={true} />}
            />
            <Route path="/addCropPage" element={<AddCropPage />} />
            <Route
              path="/addCropPage/:id"
              element={<AddCropPage isEditing={true} />}
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </LoadingWrapper>
      </PageLayout>
      <FooterContainer />
    </main>
  );
});

export default App;
