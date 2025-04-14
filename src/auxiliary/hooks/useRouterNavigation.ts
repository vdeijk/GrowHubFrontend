import { useNavigate } from 'react-router-dom';
import routerStore from '../../core/stores/RouterStore/RouterStore';

const useRouterNavigation = () => {
  const navigate = useNavigate();

  const navigateWithStoreUpdate = (path: string) => {
    navigate(path);
    Promise.resolve().then(() => routerStore.handleRouteChange(path));
  };

  return navigateWithStoreUpdate;
};

export default useRouterNavigation;
