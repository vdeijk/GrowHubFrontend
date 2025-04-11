import { makeAutoObservable } from 'mobx';
import { MenuLinkData } from '../../../auxiliary/interfaces/MenuLinkData';

class RouterStore {
  currentLabel: string = '';
  menuLinks: MenuLinkData[] = [
    { href: '/', label: 'Dashboard', hidden: false },
    { href: '/weatherReportPage', label: 'Weather', hidden: false },
    { href: '/fieldsPage', label: 'Fields', hidden: false },
    { href: '/tasksPage', label: 'AgriTasks', hidden: false },
    { href: '/cropsPage', label: 'Crops', hidden: false },
    { href: '/addCropPage', label: 'Add Crop', hidden: true },
    { href: '/addFieldPage', label: 'Add Field', hidden: true },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  public handleRouteChange = (path: string ) => {
    this.currentLabel = this.getLabel(path);
    console.log(this.currentLabel);
  };

  public getVisibleLinks(): MenuLinkData[] {
    return this.menuLinks.filter((link) => !link.hidden);
  }

  private getLabel(path: string): string {
    const currentLink = this.menuLinks.find((link) => link.href === path);
    return currentLink ? currentLink.label : 'Unknown Page';
  }
}

const routerStore = new RouterStore();
export default routerStore;
