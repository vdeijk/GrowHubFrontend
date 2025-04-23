import { JSX } from 'react';

export interface Plant {
  commonName: string | boolean | string;
  genus: string | boolean | string;
  scientificName: string | boolean | string;
  id?: number;
  sunPreference?: string | boolean | string;
  waterNeeds?: string | boolean | string;
  soilType?: string | boolean | string;
  soilPH?: string | boolean | string;
  pruning?: string | boolean | string;
  temperatureRange?: string | boolean | string;
  plantType?: string | boolean | string;
  growthRate?: string | boolean | string;
  matureSize?: string | boolean | string;
  bloomTime?: string | boolean | string;
  fertilizerNeeds?: string | boolean | string;
  actions?: JSX.Element;
}
