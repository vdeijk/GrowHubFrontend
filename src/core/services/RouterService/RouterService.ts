import { makeAutoObservable } from 'mobx';
import { MenuLinkData } from '../../../auxiliary/interfaces/MenuLinkData';
import { toast } from 'react-toastify';
import { matchRoutes, NavigateFunction } from 'react-router-dom';
import { RouteObject } from 'react-router-dom';
import i18next from 'i18next';
import dashboard from '../../../auxiliary/assets/dashboard.jpg';
import readings from '../../../auxiliary/assets/readings.jpg';
import tasks from '../../../auxiliary/assets/tasks.jpg';
import weather from '../../../auxiliary/assets/weather.jpg';
import batches from '../../../auxiliary/assets/batches.jpg';
import crops from '../../../auxiliary/assets/crops.jpg';
import fields from '../../../auxiliary/assets/fields.jpg';
import produce from '../../../auxiliary/assets/produce.jpg';

class RouterService {
  public currentLabel: string = '';
  public menuLinks: MenuLinkData[] = [];
  private routeDefs: RouteObject[] = [];
  public currentImageUrl: string = dashboard;

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
        imageUrl: dashboard,
      },
      {
        path: '/weatherReportPage',
        label: i18next.t('router.menuLinks.weather.label'),
        hidden: false,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.weather.tooltip'),
        imageUrl: weather,
      },
      {
        path: '/fieldsPage',
        label: i18next.t('router.menuLinks.fields.label'),
        hidden: false,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.fields.tooltip'),
        imageUrl: fields,
      },
      {
        path: '/tasksPage',
        label: i18next.t('router.menuLinks.tasks.label'),
        hidden: false,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.tasks.tooltip'),
        imageUrl: tasks,
      },
      {
        path: '/measurementsPage',
        label: i18next.t('router.menuLinks.readings.label'),
        hidden: false,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.readings.tooltip'),
        imageUrl: readings,
      },
      {
        path: '/producePage',
        label: i18next.t('router.menuLinks.produce.label'),
        hidden: false,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.produce.tooltip'),
        imageUrl: produce,
      },
      {
        path: '/batchesPage',
        label: i18next.t('router.menuLinks.batches.label'),
        hidden: false,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.batches.tooltip'),
        imageUrl: batches,
      },
      {
        path: '/cropsPage',
        label: i18next.t('router.menuLinks.crops.label'),
        hidden: false,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.crops.tooltip'),
        imageUrl: crops,
      },
      {
        path: '/addBatchPage',
        label: i18next.t('router.menuLinks.addBatch.label'),
        hidden: true,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.addBatch.tooltip'),
        imageUrl: batches,
      },
      {
        path: '/addBatchPage/:id',
        label: i18next.t('router.menuLinks.editBatch.label'),
        hidden: true,
        isDynamic: true,
        tooltip: i18next.t('router.menuLinks.editBatch.tooltip'),
        imageUrl: batches,
      },
      {
        path: '/addCropPage',
        label: i18next.t('router.menuLinks.addCrop.label'),
        hidden: true,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.addCrop.tooltip'),
        imageUrl: crops,
      },
      {
        path: '/addCropPage/:id',
        label: i18next.t('router.menuLinks.editCrop.label'),
        hidden: true,
        isDynamic: true,
        tooltip: i18next.t('router.menuLinks.editCrop.tooltip'),
        imageUrl: crops,
      },
      {
        path: '/addFieldPage',
        label: i18next.t('router.menuLinks.addField.label'),
        hidden: true,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.addField.tooltip'),
        imageUrl: fields,
      },
      {
        path: '/addFieldPage/:id',
        label: i18next.t('router.menuLinks.editField.label'),
        hidden: true,
        isDynamic: true,
        tooltip: i18next.t('router.menuLinks.editField.tooltip'),
        imageUrl: fields,
      },
      {
        path: '/addTaskPage',
        label: i18next.t('router.menuLinks.addTask.label'),
        hidden: true,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.addTask.tooltip'),
        imageUrl: tasks,
      },
      {
        path: '/addTaskPage/:id',
        label: i18next.t('router.menuLinks.editTask.label'),
        hidden: true,
        isDynamic: false,
        tooltip: i18next.t('router.menuLinks.editTask.tooltip'),
        imageUrl: tasks,
      },
      {
        path: '/addMeasurementPage/',
        label: i18next.t('router.menuLinks.addReading.label'),
        hidden: true,
        isDynamic: true,
        tooltip: i18next.t('router.menuLinks.addReading.tooltip'),
        imageUrl: readings,
      },
      {
        path: '/addMeasurementPage/:id',
        label: i18next.t('router.menuLinks.editReading.label'),
        hidden: true,
        isDynamic: true,
        tooltip: i18next.t('router.menuLinks.editReading.tooltip'),
        imageUrl: readings,
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

      const matchingLink = this.menuLinks.find(
        (link) => link.path === adjustedPath,
      );
      this.currentImageUrl = matchingLink?.imageUrl || dashboard;

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
