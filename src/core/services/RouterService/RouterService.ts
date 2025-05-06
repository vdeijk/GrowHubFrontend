import { makeAutoObservable } from 'mobx';
import { MenuLinkData } from '../../../auxiliary/interfaces/MenuLinkData';
import { toast } from 'react-toastify';
import { matchRoutes, NavigateFunction } from 'react-router-dom';
import { RouteObject } from 'react-router-dom';
import i18next from 'i18next';

class RouterService {
  public currentLabel: string = '';
  public menuLinks: MenuLinkData[] = [];
  private routeDefs: RouteObject[] = [];

  constructor() {
    makeAutoObservable(this);

    this.initializeMenuLinks();

    i18next.on('languageChanged', () => {
      this.initializeMenuLinks();
      
      const path = window.location.hash.replace('#', '');
      this.currentLabel = this.getLabel(path);
    });

    window.addEventListener('popstate', this.handlePopState);
  }

  destroy() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  private initializeMenuLinks() {
    this.menuLinks = [
      {
        path: '/',
        label: i18next.t('router.menuLinks.dashboard.label'),
        hidden: false,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.dashboard.tooltip'),
      },
      {
        path: '/weatherReportPage',
        label: i18next.t('router.menuLinks.weather.label'),
        hidden: false,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.weather.tooltip'),
      },
      {
        path: '/fieldsPage',
        label: i18next.t('router.menuLinks.fields.label'),
        hidden: false,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.fields.tooltip'),
      },
      {
        path: '/tasksPage',
        label: i18next.t('router.menuLinks.tasks.label'),
        hidden: false,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.tasks.tooltip'),
      },
      {
        path: '/measurementsPage',
        label: i18next.t('router.menuLinks.readings.label'),
        hidden: false,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.readings.tooltip'),
      },
      {
        path: '/producePage',
        label: i18next.t('router.menuLinks.produce.label'),
        hidden: false,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.produce.tooltip'),
      },
      {
        path: '/batchesPage',
        label: i18next.t('router.menuLinks.batches.label'),
        hidden: false,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.batches.tooltip'),
      },
      {
        path: '/cropsPage',
        label: i18next.t('router.menuLinks.crops.label'),
        hidden: false,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.crops.tooltip'),
      },
      {
        path: '/addBatchPage',
        label: i18next.t('router.menuLinks.addBatch.label'),
        hidden: true,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.addBatch.tooltip'),
      },
      {
        path: '/addBatchPage/:id',
        label: i18next.t('router.menuLinks.editBatch.label'),
        hidden: true,
        isDynamic: true,
        tooltip: i18next.t('router.menuLinks.editBatch.tooltip'),
      },
      {
        path: '/addCropPage',
        label: i18next.t('router.menuLinks.addCrop.label'),
        hidden: true,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.addCrop.tooltip'),
      },
      {
        path: '/addCropPage/:id',
        label: i18next.t('router.menuLinks.editCrop.label'),
        hidden: true,
        isDynamic: true,
        tooltip: i18next.t('router.menuLinks.editCrop.tooltip'),
      },
      {
        path: '/addFieldPage',
        label: i18next.t('router.menuLinks.addField.label'),
        hidden: true,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.addField.tooltip'),
      },
      {
        path: '/addFieldPage/:id',
        label: i18next.t('router.menuLinks.editField.label'),
        hidden: true,
        isDynamic: true,
        tooltip: i18next.t('router.menuLinks.editField.tooltip'),
      },
      {
        path: '/addTaskPage',
        label: i18next.t('router.menuLinks.addTask.label'),
        hidden: true,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.addTask.tooltip'),
      },
      {
        path: '/addTaskPage/:id',
        label: i18next.t('router.menuLinks.editTask.label'),
        hidden: true,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.editTask.tooltip'),
      },
      {
        path: '/addMeasurementPage/',
        label: i18next.t('router.menuLinks.addReading.label'),
        hidden: true,
        isDynamic: true,
        tooltip: i18next.t('router.menuLinks.addReading.tooltip'),
      },
      {
        path: '/addMeasurementPage/:id',
        label: i18next.t('router.menuLinks.editReading.label'),
        hidden: true,
        isDynamic: true,
        tooltip: i18next.t('router.menuLinks.editReading.tooltip'),
      },
    ];

    this.routeDefs = this.menuLinks.map((link) => ({
      path: link.path,
      handle: { label: link.label },
    }));
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
