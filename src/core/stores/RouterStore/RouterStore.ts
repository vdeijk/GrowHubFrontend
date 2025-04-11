import { makeAutoObservable } from 'mobx';
import { MenuLinkData } from '../../../auxiliary/interfaces/MenuLinkData';
import { toast } from 'react-toastify';

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
    { path: '/cropsPage', label: 'Crops', hidden: false, isDynamic: false },
    { path: '/addCropPage', label: 'Add Crop', hidden: true, isDynamic: false },
    {
      path: '/addFieldPage',
      label: 'Add Field',
      hidden: true,
      isDynamic: false,
    },
    { path: '/editCrop:id', label: 'Edit Crop', hidden: true, isDynamic: true },
    {
      path: '/editField:id',
      label: 'Edit Field',
      hidden: true,
      isDynamic: true,
    },
  ];

  private routeMap: Map<string, MenuLinkData> = new Map();
  private dynamicRoutes: MenuLinkData[] = [];

  constructor() {
    makeAutoObservable(this);

    this.menuLinks.forEach((link) => {
      if (link.isDynamic) {
        this.dynamicRoutes.push(link);
      } else {
        this.routeMap.set(link.path, link);
      }
    });

    window.addEventListener('popstate', this.handlePopState);
  }

  destroy() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  private handlePopState = () => {
    const path = window.location.pathname;
    this.currentLabel = this.getLabel(path);
  };

  public handleRouteChange = (path: string) => {
    try {
      this.currentLabel = this.getLabel(path);
      if (this.currentLabel === 'Unknown Page') {
        window.location.href = '/404';
      }
    } catch {
      toast.error('An unexpected error occurred. Redirecting to 404...');
      window.location.href = '/404';
    }
  };

  public getVisibleLinks(): MenuLinkData[] {
    return this.menuLinks.filter((link) => !link.hidden);
  }

  private getLabel(path: string): string {
    const staticRoute = this.routeMap.get(path);
    if (staticRoute) {
      return staticRoute.label;
    }

    const dynamicRoute = this.dynamicRoutes.find((route) => {
      const dynamicPattern = new RegExp(
        `^${route.path.replace(':id', '\\d+')}$`,
      );
      return dynamicPattern.test(path);
    });

    if (dynamicRoute) {
      return dynamicRoute.label;
    }

    console.warn(`No route matched for path: ${path}`);
    return 'Unknown Page';
  }
}

const routerStore = new RouterStore();
export default routerStore;
