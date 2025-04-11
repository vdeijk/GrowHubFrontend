import { makeAutoObservable } from 'mobx';
import { MenuLinkData } from '../../../auxiliary/interfaces/MenuLinkData';

class RouterStore {
  currentPath: string = '';
  currentLabel: string = '';
  menuLinks: MenuLinkData[] = [
    { href: '/', label: 'Dashboard' },
    { href: '/weatherReport', label: 'Weather' },
    { href: '/farmLocations', label: 'Fields' },
    { href: '/taskPage', label: 'AgriTasks' },
    { href: '/plantDatabase', label: 'Crops' },
  ];

  constructor() {
    makeAutoObservable(this);
    this.currentPath = window.location.pathname;
    this.currentLabel = this.getLabel(this.currentPath);
  }

  getLabel(path: string): string {
    const currentLink = this.menuLinks.find((link) => link.href === path);
    return currentLink ? currentLink.label : 'Unknown Page';
  }
}

const routerStore = new RouterStore();
export default routerStore;
