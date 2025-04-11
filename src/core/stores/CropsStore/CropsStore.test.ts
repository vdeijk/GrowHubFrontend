import plantsStore from './CropsStore';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('../../apis/plants', () => ({
  getPlantData: vi.fn(),
}));

describe('PlantsStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with an empty plants array and loading set to false', () => {
    expect(plantsStore.plants).toEqual([]);
    expect(plantsStore.isLoading).toBe(false);
  });
});
