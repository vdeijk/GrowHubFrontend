import { makeAutoObservable } from 'mobx';

class MenuService {
  isMenuOpen: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  openMenu = () => {
    this.isMenuOpen = true;
  };

  closeMenu = () => {
    this.isMenuOpen = false;
  };

  toggleMenu = () => {
    this.isMenuOpen = !this.isMenuOpen;
  };
}

const menuService = new MenuService();
export default menuService;
