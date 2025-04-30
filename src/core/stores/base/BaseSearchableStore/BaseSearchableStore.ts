import {
  makeObservable,
  runInAction,
  observable,
  action,
  computed,
} from 'mobx';
import { InputField } from '../../../../auxiliary/classes/InputField';
import { Dropdown } from '../../../../auxiliary/classes/Dropdown';
import { DateField } from '../../../../auxiliary/classes/DateField';
import EventBus from '../../../services/EventBusService/EventBusService';
import SortService from '../../../services/SortService/SortService';
import { FilterService } from '../../../services/FilterService/FilterService';
import { DateFieldModel } from '../../../../auxiliary/interfaces/DateFieldModel';
import { DropdownFieldModel } from '../../../../auxiliary/interfaces/DropdownFieldModel';
import DebounceService from '../../../services/DebounceService/DebounceService';
import { PaginationService } from '../../../services/PaginationService/PaginationService';

export abstract class SearchableStore<T> {
  public paginationService = new PaginationService();
  public sortService = new SortService<T>();
  public filterService = new FilterService();
  public items: T[] = [];
  public filteredItems: T[] = [];
  public paginatedItems: T[] = [];
  public debouncedFilterItems: () => void;
  public abstract searchQuery: InputField<string>;
  public dropdownFilters: Record<string, Dropdown<string>> = {};
  public dateFilters: Record<string, DateField<string>> = {};
  public searchableFields: (keyof T)[] = [];

  constructor(searchableFields: (keyof T)[]) {
    this.searchableFields = searchableFields;

    this.debouncedFilterItems = DebounceService.debounce(
      this.filterItems.bind(this),
      500,
    );

    EventBus.addEventListener('pagination:currentPageChanged', () => {
      runInAction(() => {
        this.paginatedItems = this.paginationService.paginateItems(
          this.filteredItems,
        );
      });
    });

    EventBus.addEventListener('filteredItems:updated', () => {
      runInAction(() => {
        this.paginatedItems = this.paginationService.paginateItems(
          this.filteredItems,
        );
      });
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
      sortField: computed,
      sortOrder: computed,
      initDropdownFilter: action,
      initDateFilter: action,
      filterItems: action,
      sortItems: action,
    });
  }

  public get sortField(): keyof T | null {
    return this.sortService.sortField;
  }

  public get sortOrder(): 'asc' | 'desc' {
    return this.sortService.sortOrder;
  }
  public initDateFilter = (field: DateFieldModel) => {
    runInAction(() => {
      if (!this.dateFilters[field.key]) {
        this.dateFilters[field.key] = new DateField<string>(
          '',
          field.label,
          false,
        );
      }

      this.dateFilters[field.key].setValue(field.defaultValue);
    });
  };

  public initDropdownFilter = (field: DropdownFieldModel) => {
    runInAction(() => {
      if (!this.dropdownFilters[field.key]) {
        this.dropdownFilters[field.key] = new Dropdown(
          field.defaultValue,
          field.label,
          false,
        );
      }

      const resolvedOptions =
        typeof field.options === 'function' ? field.options() : field.options;

      if (!resolvedOptions || !Array.isArray(resolvedOptions)) {
        console.error(
          `Dropdown options for key "${field.key}" are invalid or undefined.`,
        );
        return;
      }

      this.dropdownFilters[field.key].generateDropdownOptions(resolvedOptions);
    });
  };

  public filterItems = () => {
    let filtered = FilterService.filterBySearchQuery(
      this.items,
      this.searchQuery.value,
      this.searchableFields,
    );
    filtered = FilterService.filterByDropdowns(filtered, this.dropdownFilters);
    filtered = FilterService.filterByEndDate(filtered, this.dateFilters);
    filtered = FilterService.filterByDateRange(filtered, this.dateFilters);

    runInAction(() => {
      this.filteredItems = this.sortService.sortItems(filtered);
      this.paginationService.setCurrentPage(1);
    });

    EventBus.dispatchEvent('filteredItems:updated', undefined);
  };

  public sortItems = (field: keyof T) => {
    this.sortService.setSortField(field);

    runInAction(() => {
      this.filteredItems = this.sortService.sortItems(this.filteredItems);
      this.paginationService.setCurrentPage(1);
    });

    EventBus.dispatchEvent('filteredItems:updated', undefined);
  };
}
