import { makeAutoObservable } from 'mobx';
import { Dropdown } from '../../auxiliary/classes/Dropdown';
import { DateField } from '../../auxiliary/classes/DateField';

export class FilterService {
  constructor() {
    makeAutoObservable(this);
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
    dropdownFilters: Record<string, Dropdown<string>>,
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

  public static filterByEndDate<T>(
    items: T[],
    dateFilters: Record<string, DateField<string>>,
  ): T[] {
    return items.filter((item) => {
      return Object.keys(dateFilters).every((key) => {
        const filterValue = dateFilters[key].value;
        if (!filterValue) return true;

        const itemDate = (item as any)[key];
        if (!itemDate) return true;

        const itemDateObj = new Date(itemDate);
        const filterDateObj = new Date(filterValue);

        return itemDateObj <= filterDateObj;
      });
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
