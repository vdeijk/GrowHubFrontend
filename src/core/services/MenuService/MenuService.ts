import { makeAutoObservable } from 'mobx';

class MenuService {
  isMenuOpen: boolean = true;

  constructor() {
    makeAutoObservable(this);

    this.checkScreenWidth();

    window.addEventListener('resize', this.checkScreenWidth);
  }

  public openMenu = () => {
    this.isMenuOpen = true;
  };

  public closeMenu = () => {
    this.isMenuOpen = false;
  };

  public toggleMenu = () => {
    this.isMenuOpen = !this.isMenuOpen;
  };

  public checkScreenWidth = () => {
    const isMobile = window.innerWidth < 768;
    this.isMenuOpen = !isMobile;
  };
}

const menuService = new MenuService();
export default menuService;
