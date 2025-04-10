import { makeAutoObservable } from 'mobx';
import { Turnover } from '../../../auxiliary/interfaces/Turnover';
import { getData } from '../../apis/getData';
import { runInAction } from 'mobx';

class TurnoverStore {
  turnovers: Turnover[] = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);

    this.fetchData();
  }

  public addTurnover(turnover: Turnover) {
    this.turnovers.push(turnover);
  }

  private async fetchData() {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      const turnovers = await getData('/Turnover');

      runInAction(() => {
        this.turnovers = turnovers;
        this.isLoading = false;
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

const turnoverStore = new TurnoverStore();
export default turnoverStore;
