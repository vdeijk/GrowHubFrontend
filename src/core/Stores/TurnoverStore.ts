import { makeAutoObservable } from "mobx";

interface Turnover {
  date: string;
  amount: number;
}

class TurnoverStore {
  turnovers: Turnover[] = [
    { date: '10-01', amount: 1500 },
    { date: '18-01', amount: 2000 },
    { date: '25-01', amount: 2200 },
    { date: '01-02', amount: 2000 },
    { date: '08-02', amount: 2600 },
    { date: '15-02', amount: 2500 },
    { date: '22-02', amount: 2800 },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  addTurnover(turnover: Turnover) {
    this.turnovers.push(turnover);
  }
}

const turnoverStore = new TurnoverStore();
export default turnoverStore;