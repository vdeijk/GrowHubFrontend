import { makeObservable, runInAction, observable, action } from 'mobx';
import { debounce } from '../../../auxiliary/utils/debounce';
import { InputField } from '../../../auxiliary/classes/InputField';
import { Dropdown } from '../../../auxiliary/classes/Dropdown';
import { DateField } from '../../../auxiliary/classes/DateField';
import EventBus from '../../../auxiliary/utils/EventTarget';
import { PaginationStore } from '../PaginationStore/PaginationStore';
import SortService from '../../apis/SortService';
import { FilterService } from '../../apis/FilterService';

export abstract class SearchableStore<T> {
  public paginationStore = new PaginationStore();
  public sortService = new SortService<T>();
  public filterService = new FilterService();
  public items: T[] = [];
  public filteredItems: T[] = [];
  public paginatedItems: T[] = [];
  public debouncedFilterItems: () => void;
  public abstract searchQuery: InputField<string>;
  public dropdownFilters: Record<string, Dropdown<string>> = {};
  public dateFilters: Record<string, DateField<string>> = {};
  public sortField: keyof T | null = null;
  public sortOrder: 'asc' | 'desc' = 'asc';
  public searchableFields: (keyof T)[] = [];

  constructor(searchableFields: (keyof T)[]) {
    this.searchableFields = searchableFields;

    this.debouncedFilterItems = debounce(this.filterItems.bind(this), 500);

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

    EventBus.addEventListener('searchQuery:updated', () => {
      if (!this.searchQuery.validateMaxLength()) {
        this.debouncedFilterItems();
      }
    });

    EventBus.addEventListener('dropdownFilters:updated', () => {
      this.filterItems();
    });

    EventBus.addEventListener('dateFilters:updated', () => {
      this.filterItems();
    });

    makeObservable(this, {
      items: observable,
      filteredItems: observable,
      paginatedItems: observable,
      dropdownFilters: observable,
      dateFilters: observable,
      sortField: observable,
      sortOrder: observable,
      initDropdownFilter: action,
      initDateFilter: action,
      filterItems: action,
      sortItems: action,
    });
  }

  public initDateFilter = (key: string, criteria: string, label: string) => {
    runInAction(() => {
      if (!this.dateFilters[key]) {
        this.dateFilters[key] = new DateField<string>('', label, false);
      }

      this.dateFilters[key].setValue(criteria);
    });
  };

  public initDropdownFilter = <T>(
    key: string,
    criteria: string,
    label: string,
    options: T[],
    allLabel: string = 'All',
  ) => {
    runInAction(() => {
      if (!this.dropdownFilters[key]) {
        this.dropdownFilters[key] = new Dropdown<string>('', label, false);
      }

      this.dropdownFilters[key].setValue(criteria);
      this.dropdownFilters[key].generateDropdownOptions(
        options.map((option) => String(option)),
        allLabel,
      );
    });
  };

  public filterItems = () => {
    let filtered = FilterService.filterBySearchQuery(
      this.items,
      this.searchQuery.value,
      this.searchableFields,
    );
    filtered = FilterService.filterByDropdowns(filtered, this.dropdownFilters);
    filtered = FilterService.filterByDateRange(filtered, this.dateFilters);

    runInAction(() => {
      this.filteredItems = this.sortService.sortItems(filtered);
    });

    EventBus.dispatchEvent(new Event('filteredItems:updated'));
  };

  public sortItems = (field: keyof T) => {
    this.sortService.setSortField(field);

    runInAction(() => {
      this.filteredItems = this.sortService.sortItems(this.filteredItems);
    });

    EventBus.dispatchEvent(new Event('filteredItems:updated'));
  };
}
