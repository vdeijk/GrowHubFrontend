import { makeAutoObservable } from 'mobx';
import { MenuLinkData } from '../../auxiliary/interfaces/MenuLinkData';

class RouterStore {
  currentPath: string = '';
  currentLabel: string = '';
  menuLinks: MenuLinkData[] = [
    { href: '/', label: 'Dashboard' },
    { href: '/about', label: 'Calendar' },
    { href: '/services', label: 'Task Manager' },
    { href: '/services', label: 'Weather Report' },
    { href: '/services', label: 'Statistics' },
    { href: '/services', label: 'Finance' },
    { href: '/plantDatabase', label: 'Plant Database' },
    { href: '/add-plant', label: 'Add Plant' },
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
