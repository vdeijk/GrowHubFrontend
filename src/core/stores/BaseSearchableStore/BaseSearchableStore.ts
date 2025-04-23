import {
  makeObservable,
  runInAction,
  observable,
  action,
  reaction,
} from 'mobx';
import { debounce } from '../../../auxiliary/utils/debounce';
import { InputField } from '../../../auxiliary/classes/InputField';
import { Dropdown } from '../../../auxiliary/classes/Dropdown';

export abstract class SearchableStore<T> {
  items: T[] = [];
  filteredItems: T[] = [];
  debouncedFilterItems: () => void;
  searchQuery = new InputField<string>(
    '',
    'Search',
    false,
    'Enter search query',
    50,
  );
  filterCriteria: Record<string, Dropdown<string>> = {};
  sortField: keyof T | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';
  searchableFields: (keyof T)[] = [];

  constructor(searchableFields: (keyof T)[]) {
    this.searchableFields = searchableFields;

    makeObservable(this, {
      items: observable,
      filteredItems: observable,
      searchQuery: observable,
      filterCriteria: observable,
      sortField: observable,
      sortOrder: observable,
      setFilterCriteria: action,
      filterItems: action,
      setSortField: action,
      sortItems: action,
    });

    this.debouncedFilterItems = debounce(this.filterItems.bind(this), 500);

    reaction(
      () => this.searchQuery.value,
      () => {
        if (!this.searchQuery.validateMaxLength()) {
          this.debouncedFilterItems();
        }
      },
    );

    reaction(
      () =>
        Object.values(this.filterCriteria).map((dropdown) => dropdown.value),
      () => {
        this.filterItems();
      },
    );
  }

  abstract matchesFilterCriteria(item: T): boolean;

  public setFilterCriteria = (key: string, criteria: string) => {
    runInAction(() => {
      if (!this.filterCriteria[key]) {
        this.filterCriteria[key] = new Dropdown<string>(
          '',
          `Filter by ${key}`,
          false,
        );
      }

      this.filterCriteria[key].setValue(criteria);
    });
  };

  public filterItems = () => {
    this.filteredItems = this.items.filter((item) => {
      const matchesQuery =
        this.searchQuery.value === '' ||
        this.searchableFields.some((field) => {
          const fieldValue = item[field];
          return (
            typeof fieldValue === 'string' &&
            fieldValue
              .toLowerCase()
              .includes(this.searchQuery.value.toLowerCase())
          );
        });

      const matchesCriteria = this.matchesFilterCriteria(item);

      return matchesQuery && matchesCriteria;
    });

    this.sortItems();
  };

  public setSortField = (field: keyof T) => {
    runInAction(() => {
      if (this.sortField === field) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortField = field;
        this.sortOrder = 'asc';
      }
      this.sortItems();
    });
  };

  public sortItems = () => {
    runInAction(() => {
      this.filteredItems = this.filteredItems.slice().sort((a, b) => {
        const fieldA = this.sortField ? (a[this.sortField] as any) : null;
        const fieldB = this.sortField ? (b[this.sortField] as any) : null;

        if (fieldA === undefined || fieldB === undefined) {
          return 0;
        }

        if (fieldA < fieldB) {
          return this.sortOrder === 'asc' ? -1 : 1;
        }

        if (fieldA > fieldB) {
          return this.sortOrder === 'asc' ? 1 : -1;
        }

        return 0;
      });
    });
  };
}

/*
  public setSearchQuery = (query: string) => {
    runInAction(() => {
      if (this.searchQuery.validateMaxLength()) return;

      this.searchQuery.setValue(query);

      this.debouncedFilterItems();
    });
  };*/
