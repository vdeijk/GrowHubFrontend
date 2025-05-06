import { makeAutoObservable } from 'mobx';
import i18n from '../../../../i18n';

class LocaleStore {
  public currentLanguage: string = i18n.language;

  constructor() {
    makeAutoObservable(this);
  }

  public changeLanguage = (lng: string): void => {
    i18n.changeLanguage(lng);
    this.currentLanguage = lng;
  };
}

const localeStore = new LocaleStore();
export default localeStore;
