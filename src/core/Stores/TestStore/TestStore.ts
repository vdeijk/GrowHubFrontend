import { makeAutoObservable, runInAction } from 'mobx';
import plantsStore from '../PlantsStore/PlantsStore';

class TestStore {
  useRealData: boolean = false;

  constructor() {
    makeAutoObservable(this);

    this.loadFromLocalStorage();
  }

  public setUseRealData = (value: boolean) => {
    runInAction(() => {
      this.useRealData = value;
    });

    localStorage.setItem('useRealData', JSON.stringify(value));
  };

  public loadFromLocalStorage = () => {
    const storedValue = localStorage.getItem('useRealData');
    if (storedValue !== null) {
      runInAction(() => {
        this.useRealData = JSON.parse(storedValue);
      });
    }
  };

  public initialize = () => {
    plantsStore.fetchData();
  };
}

const testStore = new TestStore();
export default testStore;
