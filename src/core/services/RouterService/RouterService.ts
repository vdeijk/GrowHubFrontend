import { makeAutoObservable } from 'mobx';
import { MenuLinkData } from '../../../auxiliary/interfaces/MenuLinkData';
import { toast } from 'react-toastify';
import { matchRoutes, NavigateFunction } from 'react-router-dom';
import { RouteObject } from 'react-router-dom';

class RouterService {
  currentLabel: string = '';
  menuLinks: MenuLinkData[] = [
    {
      path: '/',
      label: 'Dashboard',
      hidden: false,
      isDynamic: false,
      tooltip:
        'Use this page to get an overview of both your farm and your crops',
    },

    {
      path: '/weatherReportPage',
      label: 'Weather',
      hidden: false,
      isDynamic: false,
      tooltip:
        'Use this page to get an overview of the weather around your fields',
    },
    {
      path: '/fieldsPage',
      label: 'Fields',
      hidden: false,
      isDynamic: false,
      tooltip: 'Use this page add, edit or delete your fields',
    },
    {
      path: '/tasksPage',
      label: 'Tasks',
      hidden: false,
      isDynamic: false,
      tooltip: 'Use this page add, edit or delete farm tasks',
    },
    {
      path: '/measurementsPage',
      label: 'Readings',
      hidden: false,
      isDynamic: false,
      tooltip:
        'Use this page add, edit or delete readings of your crop batches',
    },
    {
      path: '/producePage',
      label: 'Produce',
      hidden: false,
      isDynamic: false,
      tooltip: 'Use this page add, edit or delete produce',
    },
    {
      path: '/batchesPage',
      label: 'Batches',
      hidden: false,
      isDynamic: false,
      tooltip: 'Use this page add, edit or delete your crop batches',
    },
    {
      path: '/cropsPage',
      label: 'Crops',
      hidden: false,
      isDynamic: false,
      tooltip: 'Use this page add, edit or delete your crop types',
    },
    // { path: '/upgrade', label: 'Upgrade', hidden: false, isDynamic: false },
    {
      path: '/addBatchPage',
      label: 'Add Batch',
      hidden: true,
      isDynamic: false,
      tooltip: 'Add a new crop batch',
    },
    {
      path: '/addBatchPage/:id',
      label: 'Edit Batch',
      hidden: true,
      isDynamic: true,
      tooltip: 'Edit an existing crop batch',
    },
    {
      path: '/addCropPage',
      label: 'Add Crop',
      hidden: true,
      isDynamic: false,
      tooltip: 'Add a new crop type',
    },
    {
      path: '/addCropPage/:id',
      label: 'Edit Crop',
      hidden: true,
      isDynamic: true,
      tooltip: 'Edit an existing crop type',
    },
    {
      path: '/addFieldPage',
      label: 'Add Field',
      hidden: true,
      isDynamic: false,
      tooltip: 'Add a new farm field',
    },
    {
      path: '/addFieldPage/:id',
      label: 'Edit Field',
      hidden: true,
      isDynamic: true,
      tooltip: 'Edit an existing farm field',
    },
    {
      path: '/addTaskPage',
      label: 'Add Task',
      hidden: true,
      isDynamic: false,
      tooltip: 'Add a new task',
    },
    {
      path: '/addTaskPage/:id',
      label: 'Edit Task',
      hidden: true,
      isDynamic: false,
      tooltip: 'Edit an existing task',
    },
    {
      path: '/addMeasurementPage/',
      label: 'Add Reading',
      hidden: true,
      isDynamic: true,
      tooltip: 'Add a new reading',
    },
    {
      path: '/addMeasurementPage/:id',
      label: 'Edit Reading',
      hidden: true,
      isDynamic: true,
      tooltip: 'Edit an existing reading',
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
    const path = window.location.hash.replace('#', '');
    this.currentLabel = this.getLabel(path);
  };

  public handleRouteChange = (path: string, navigate?: NavigateFunction) => {
    try {
      const adjustedPath = path.replace('/growhub', '');
      this.currentLabel = this.getLabel(adjustedPath);
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

const routerService = new RouterService();
export default routerService;
