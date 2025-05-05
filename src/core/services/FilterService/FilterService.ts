import { makeAutoObservable } from 'mobx';
import { DropdownField } from '../../../auxiliary/classes/DropdownField';
import { DateField } from '../../../auxiliary/classes/DateField';

export class FilterService {
  constructor() {
    makeAutoObservable(this);
  }

  public static filterByGreaterThan<T>(
    items: T[],
    minNumber: number,
    property: string,
  ): T[] {
    if (!minNumber) return items;

    return items.filter((item) => {
      // @ts-ignore
      const itemNumber = item[property];
      if (!itemNumber) return false;

      return itemNumber >= minNumber;
    });
  }

  public static filterBySmallerThan<T>(
    items: T[],
    maxNumber: number,
    property: string,
  ): T[] {
    if (!maxNumber) return items;

    return items.filter((item) => {
      // @ts-ignore
      const itemNumber = item[property];
      if (!itemNumber) return false;

      return itemNumber <= maxNumber;
    });
  }

  public static filterBySearchQuery<T>(
    items: T[],
    searchQuery: string,
    searchableFields: (keyof T)[],
  ): T[] {
    if (!searchQuery || searchQuery.trim() === '') return items;

    const lowerCaseQuery = searchQuery.toLowerCase();

    return items.filter((item) =>
      searchableFields.some((field) => {
        const fieldValue = item[field];
        return (
          typeof fieldValue === 'string' &&
          fieldValue.toLowerCase().includes(lowerCaseQuery)
        );
      }),
    );
  }

  public static filterByDropdowns<T>(
    items: T[],
    dropdownFilters: Record<string, DropdownField<string>>,
  ): T[] {
    return items.filter((item) =>
      Object.keys(dropdownFilters).every((key) => {
        const filterValue = dropdownFilters[key].value;
        const itemValue = (item as any)[key];
        if (!filterValue || filterValue.trim() === '') return true;
        if (!itemValue) return false;
        return itemValue.toLowerCase() === filterValue.toLowerCase();
      }),
    );
  }

  public static filterByStartDate<T>(
    items: T[],
    startDate: string,
    property: string,
  ): T[] {
    if (!startDate) return items;

    return items.filter((item) => {
      // @ts-ignore
      const itemDate = item[property];
      if (!itemDate) return false;

      return new Date(itemDate) >= new Date(startDate);
    });
  }

  public static filterByEndDate<T>(
    items: T[],
    endDate: string,
    property: string,
  ): T[] {
    if (!endDate) return items;

    return items.filter((item) => {
      // @ts-ignore
      const itemDate = item[property];
      if (!itemDate) return false;

      return new Date(itemDate) <= new Date(endDate);
    });
  }

  public static filterByDateRange<T>(
    items: T[],
    dateFilters: Record<string, DateField<string>>,
  ): T[] {
    const startDate = dateFilters['startDate']?.value;
    const endDate = dateFilters['endDate']?.value;

    if (!startDate && !endDate) return items;

    return items.filter((item) => {
      const dueDate = (item as any).dueDate;
      if (!dueDate) return false;

      const taskDate = new Date(dueDate);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const isAfterStartDate = !start || taskDate >= start;
      const isBeforeEndDate = !end || taskDate <= end;

      return isAfterStartDate && isBeforeEndDate;
    });
  }
}
