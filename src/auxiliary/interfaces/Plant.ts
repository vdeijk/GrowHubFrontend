import { JSX } from 'react';

export interface Plant {
  commonName: string;
  genus: string;
  scientificName: string;
  id?: number;
  sunPreference?: string;
  waterNeeds?: string;
  soilType?: string;
  soilPH?: string;
  pruning?: string;
  temperatureRange?: string;
  plantType?: string;
  growthRate?: string;
  matureSize?: string;
  bloomTime?: string;
  fertilizerNeeds?: string;
  actions?: JSX.Element;
}
