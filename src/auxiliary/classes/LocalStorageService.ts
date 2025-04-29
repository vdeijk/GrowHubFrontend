export class LocalStorageService {
  public isFetchDue = (lastFetchKey: string, cacheDurationInDays: number) => {
    const lastFetch = localStorage.getItem(lastFetchKey);

    if (!lastFetch) return true;
    const lastFetchDate = new Date(lastFetch);
    const now = new Date();
    const cacheDurationInMs = cacheDurationInDays * 24 * 60 * 60 * 1000;

    return now.getTime() - lastFetchDate.getTime() > cacheDurationInMs;
  };

  public fetchWithCache = async <T>(
    key: string,
    fetchFunction: () => Promise<T>,
    cacheDurationInDays: number = 7,
  ): Promise<T> => {
    const lastFetchKey = `${key}_lastFetch`;
    const cachedData = localStorage.getItem(key);

    if (cachedData && !this.isFetchDue(lastFetchKey, cacheDurationInDays)) {
      return JSON.parse(cachedData) as T;
    }

    const data = await fetchFunction();
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(lastFetchKey, new Date().toISOString());
    return data;
  };

  public invalidateCache = (key: string): void => {
    localStorage.removeItem(key);
    localStorage.removeItem(`${key}_lastFetch`);
  };
}

export const localStorageService = new LocalStorageService();
