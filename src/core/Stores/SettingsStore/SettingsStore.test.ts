import { mockLocalStorage } from '../../../auxiliary/utils/mockLocalStorage';
import settingsStore from './SettingsStore';
import { vi, describe, it, expect, beforeEach } from 'vitest';

Object.defineProperty(globalThis, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

describe('SettingsStore', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(localStorage, 'setItem');
    vi.spyOn(localStorage, 'getItem');
  });

  it('should initialize with useRealData set to false', () => {
    expect(settingsStore.useRealData).toBe(false);
  });

  it('should set useRealData and store it in localStorage', () => {
    settingsStore.setUseRealData(true);
    expect(settingsStore.useRealData).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('useRealData', 'true');
  });

  it('should load useRealData from localStorage', () => {
    vi.spyOn(localStorage, 'getItem').mockReturnValue('true');
    settingsStore.loadFromLocalStorage();
    expect(settingsStore.useRealData).toBe(true);
  });
});
