import { makeAutoObservable } from "mobx";
import { Plant } from "../../auxiliary/interfaces/Plant";

class PlantsStore {
  plants: Plant[] = [
    {
      name: "Rose",
      sunPreference: "Full Sun",
      waterNeeds: "Moderate",
      soilType: "Loamy",
      soilPH: "6.0 - 7.0",
      pruning: "Spring",
      temperatureRange: "15°C - 25°C",
      plantType: "Perennial",
      growthRate: "Moderate",
      matureSize: "3-8 feet tall, 2-3 feet wide",
      bloomTime: "Spring to Fall",
      fertilizerNeeds: "Monthly during growing season",
    },
    {
      name: "Fern",
      sunPreference: "Shade",
      waterNeeds: "High",
      soilType: "Rich, well-drained",
      soilPH: "5.0 - 6.5",
      pruning: "Remove dead fronds",
      temperatureRange: "18°C - 24°C",
      plantType: "Perennial",
      growthRate: "Slow to Moderate",
      matureSize: "1-3 feet tall, 1-2 feet wide",
      bloomTime: "N/A",
      fertilizerNeeds: "Monthly during growing season",
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }
}

const plantsStore = new PlantsStore();
export default plantsStore;