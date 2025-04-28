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
import { DateField } from '../../../auxiliary/classes/DateField';
import EventBus from '../../../auxiliary/utils/EventTarget';
import { PaginationStore } from '../PaginationStore/PaginationStore';

export abstract class SearchableStore<T> {
  public paginationStore = new PaginationStore();
  items: T[] = [];
  filteredItems: T[] = [];
  paginatedItems: T[] = [];
  debouncedFilterItems: () => void;
  searchQuery = new InputField<string>(
    '',
    'Search',
    false,
    'Enter search query',
    50,
  );
  dropdownFilters: Record<string, Dropdown<string>> = {};
  dateFilters: Record<string, DateField<string>> = {};
  sortField: keyof T | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';
  searchableFields: (keyof T)[] = [];

  constructor(searchableFields: (keyof T)[]) {
    this.searchableFields = searchableFields;

    EventBus.addEventListener('pagination:currentPageChanged', () => {
      this.paginatedItems = this.paginationStore.paginateItems(
        this.filteredItems,
      );
    });

    EventBus.addEventListener('filteredItems:updated', () => {
      this.paginatedItems = this.paginationStore.paginateItems(
        this.filteredItems,
      );
    });

    makeObservable(this, {
      items: observable,
      filteredItems: observable,
      searchQuery: observable,
      dropdownFilters: observable,
      dateFilters: observable,
      sortField: observable,
      sortOrder: observable,
      setDropdownFilters: action,
      setDateFilters: action,
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
        Object.values(this.dropdownFilters).map((dropdown) => dropdown.value),
      () => {
        this.filterItems();
      },
    );

    reaction(
      () =>
        Object.values(this.dateFilters).map((dateFilter) => dateFilter.value),
      () => {
        this.filterItems();
      },
    );
  }

  abstract matchesFilterCriteria(item: T): boolean;

  public setDateFilters = (key: string, criteria: string, label: string) => {
    runInAction(() => {
      if (!this.dateFilters[key]) {
        this.dateFilters[key] = new DateField<string>('', label, false);
      }

      this.dateFilters[key].setValue(criteria);
    });
  };

  public setDropdownFilters = (
    key: string,
    criteria: string,
    label: string,
  ) => {
    runInAction(() => {
      if (!this.dropdownFilters[key]) {
        this.dropdownFilters[key] = new Dropdown<string>('', label, false);
      }

      this.dropdownFilters[key].setValue(criteria);
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
    EventBus.dispatchEvent(new Event('filteredItems:updated'));
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
      EventBus.dispatchEvent(new Event('filteredItems:updated'));
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
