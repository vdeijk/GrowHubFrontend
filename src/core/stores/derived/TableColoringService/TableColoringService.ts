import { makeAutoObservable } from 'mobx';
import dayjs from 'dayjs';

class TableColoringService {
  constructor() {
    makeAutoObservable(this);
  }

  public static getColoredDateValues<T>(items: T[], dateKeys: (keyof T)[]) {
    return items.map((item) => {
      const redColumns: string[] = [];
      const greenColumns: string[] = [];

      dateKeys.forEach((key) => {
        const dateValue = item[key] as string | null;

        if (dateValue) {
          const isPast = dayjs(dateValue).isBefore(dayjs(), 'day');
          if (isPast) {
            redColumns.push(String(key));
          } else {
            greenColumns.push(String(key));
          }
        }
      });

      return {
        ...item,
        redColumns,
        greenColumns,
      };
    });
  }

  public static getColoredNumericalValues<T>(
    items: T[],
    numericalKeys: {
      key: keyof T;
      thresholds: { red: number; yellow: number };
    }[],
  ) {
    return items.map((item) => {
      const redColumns: string[] = [];
      const yellowColumns: string[] = [];
      const greenColumns: string[] = [];

      numericalKeys.forEach(({ key, thresholds }) => {
        const value = item[key] as number | null;

        if (value !== undefined && value !== null) {
          if (value < thresholds.red) {
            redColumns.push(String(key));
          } else if (value < thresholds.yellow) {
            yellowColumns.push(String(key));
          } else {
            greenColumns.push(String(key));
          }
        }
      });

      return {
        ...item,
        redColumns,
        yellowColumns,
        greenColumns,
      };
    });
  }
}

export default TableColoringService;
