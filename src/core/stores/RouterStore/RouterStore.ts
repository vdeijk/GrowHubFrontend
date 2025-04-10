import { makeAutoObservable } from 'mobx';
import { MenuLinkData } from '../../../auxiliary/interfaces/MenuLinkData';

class RouterStore {
  currentPath: string = '';
  currentLabel: string = '';
  menuLinks: MenuLinkData[] = [
    { href: '/', label: 'Dashboard' },
    { href: '/plantDatabase', label: 'Plants' },
    { href: '/farmLocations', label: 'Farm Locations' },
    { href: '/farmLocations', label: 'Tasks' },
    { href: '/farmLocations', label: 'Turnover' },
    // { href: '/add-plant', label: 'Add Plant' },
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
