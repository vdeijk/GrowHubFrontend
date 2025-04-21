import { makeAutoObservable } from 'mobx';
import { MenuLinkData } from '../../../auxiliary/interfaces/MenuLinkData';
import { toast } from 'react-toastify';
import { matchRoutes, NavigateFunction } from 'react-router-dom';
import { RouteObject } from 'react-router-dom';

class RouterStore {
  currentLabel: string = '';
  menuLinks: MenuLinkData[] = [
    { path: '/', label: 'Dashboard', hidden: false, isDynamic: false },

    {
      path: '/weatherReportPage',
      label: 'Weather',
      hidden: false,
      isDynamic: false,
    },
    { path: '/fieldsPage', label: 'Fields', hidden: false, isDynamic: false },
    { path: '/tasksPage', label: 'AgriTasks', hidden: false, isDynamic: false },
    // { path: '/cropsPage', label: 'Crops', hidden: false, isDynamic: false },
    {
      path: '/cropsDatabase',
      label: 'Crops dababase',
      hidden: false,
      isDynamic: false,
    },
    { path: '/upgrade', label: 'Upgrade', hidden: false, isDynamic: false },
    { path: '/addCropPage', label: 'Add Crop', hidden: true, isDynamic: false },
    {
      path: '/addFieldPage',
      label: 'Add Field',
      hidden: true,
      isDynamic: false,
    },
    {
      path: '/addCropPage/:id',
      label: 'Edit Crop',
      hidden: true,
      isDynamic: true,
    },
    {
      path: '/addFieldPage/:id',
      label: 'Edit Field',
      hidden: true,
      isDynamic: true,
    },
    {
      path: '/addTaskPage',
      label: 'Add AgriTask',
      hidden: true,
      isDynamic: false,
    },
    {
      path: '/addTaskPage/:id',
      label: 'Edit AgriTask',
      hidden: true,
      isDynamic: false,
    },
  ];

  private routeDefs: RouteObject[] = [];

  constructor() {
    makeAutoObservable(this);

    this.routeDefs = this.menuLinks.map((link) => ({
      path: link.path,
      handle: { label: link.label },
    }));

    window.addEventListener('popstate', this.handlePopState);
  }

  destroy() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  private handlePopState = () => {
    const path = window.location.pathname;
    this.currentLabel = this.getLabel(path);
  };

  public handleRouteChange = (path: string, navigate?: NavigateFunction) => {
    try {
      this.currentLabel = this.getLabel(path);
      if (this.currentLabel === 'Unknown Page' && navigate) {
        navigate('/404');
      }
    } catch {
      toast.error('An unexpected error occurred. Redirecting to 404...');
      if (navigate) navigate('/404');
    }
  };

  public getVisibleLinks(): MenuLinkData[] {
    return this.menuLinks.filter((link) => !link.hidden);
  }

  private getLabel(path: string): string {
    const matches = matchRoutes(this.routeDefs, path);
    if (!matches || matches.length === 0) {
      console.warn(`No route matched for path: ${path}`);
      return 'Unknown Page';
    }

    const match = matches[matches.length - 1];
    const label = match.route.handle?.label;

    return typeof label === 'string' ? label : 'Unknown Page';
  }
}

const routerStore = new RouterStore();
export default routerStore;
