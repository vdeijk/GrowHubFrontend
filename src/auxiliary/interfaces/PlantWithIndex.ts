import { Plant } from './Plant';

export interface PlantWithIndex extends Plant {
  [key: string]: string | number | boolean | null | undefined;
}
