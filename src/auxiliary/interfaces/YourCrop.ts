import { JSX } from 'react';

export interface YourCrop {
  id?: number;
  commonName: string;
  location: string;
  lastWatered: string;
  lastFertilized: string;
  lastPruned: string;
  lastHarvested: string;
  healthStatus: string;
  growthStage: string;
  actions?: JSX.Element;
}
