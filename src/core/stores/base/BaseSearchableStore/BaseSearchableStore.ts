import {
  makeObservable,
  runInAction,
  observable,
  action,
  computed,
} from 'mobx';
import { InputField } from '../../../../auxiliary/classes/InputField';
import { DropdownField } from '../../../../auxiliary/classes/DropdownField';
import { DateField } from '../../../../auxiliary/classes/DateField';
import EventBus from '../../../services/EventBusService/EventBusService';
import SortService from '../../../services/SortService/SortService';
import { FilterService } from '../../../services/FilterService/FilterService';
import { DateFieldModel } from '../../../../auxiliary/interfaces/DateFieldModel';
import { DropdownFieldModel } from '../../../../auxiliary/interfaces/DropdownFieldModel';
import DebounceService from '../../../services/DebounceService/DebounceService';
import { PaginationService } from '../../../services/PaginationService/PaginationService';
import { InputFieldModel } from '../../../../auxiliary/interfaces/InputFieldModel';

export abstract class SearchableStore<T> {
  public paginationService = new PaginationService();
  public sortService = new SortService<T>();
  public filterService = new FilterService();
  public items: T[] = [];
  public filteredItems: T[] = [];
  public paginatedItems: T[] = [];
  public debouncedFilterItems: () => void;
  public stringFilters: Record<string, InputField<string>> = {};
  public numberFilters: Record<string, InputField<string>> = {};
  public dropdownFilters: Record<string, DropdownField<string>> = {};
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
      if (!this.stringFilters.searchQuery.validateMaxLength()) {
        this.debouncedFilterItems();
      }
    });

    EventBus.addEventListener('dropdownFilters:updated', () => {
      this.filterItems();
    });

    EventBus.addEventListener('dateFilters:updated', () => {
      this.filterItems();
    });

    EventBus.addEventListener('filters:changed', () => {
      this.filterItems();
    });

    makeObservable(this, {
      items: observable,
      filteredItems: observable,
      paginatedItems: observable,
      stringFilters: observable,
      numberFilters: observable,
      dropdownFilters: observable,
      dateFilters: observable,
      sortField: computed,
      sortOrder: computed,
      initStringFilter: action,
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

  public initStringFilter = (field: InputFieldModel) => {
    runInAction(() => {
      if (!this.stringFilters[field.key]) {
        this.stringFilters[field.key] = new InputField<string>(
          '',
          field.label,
          field.required,
          field.placeholder,
        );
      }
    });
  };

  public initNumberFilter = (field: InputFieldModel) => {
    runInAction(() => {
      if (!this.numberFilters[field.key]) {
        this.numberFilters[field.key] = new InputField<string>(
          '',
          field.label,
          field.required,
          field.placeholder,
        );
      }
    });
  };

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
        this.dropdownFilters[field.key] = new DropdownField(
          '',
          field.label,
          false,
          typeof field.options === 'function' ? field.options() : field.options,
          field.placeholderText,
        );
      }

      const resolvedOptions =
        typeof field.options === 'function' ? field.options() : field.options;

      this.dropdownFilters[field.key].generateDropdownOptions(
        resolvedOptions,
        field.placeholderText,
      );
    });
  };

  public filterItems() {
    let filtered = FilterService.filterBySearchQuery(
      this.items,
      this.stringFilters.searchQuery.value,
      this.searchableFields,
    );
    filtered = FilterService.filterByDropdowns(filtered, this.dropdownFilters);

    runInAction(() => {
      this.filteredItems = this.sortService.sortItems(filtered);
      this.paginationService.setCurrentPage(1);
    });

    EventBus.dispatchEvent('filteredItems:updated', undefined);
  }

  public sortItems = (field: keyof T) => {
    this.sortService.setSortField(field);

    runInAction(() => {
      this.filteredItems = this.sortService.sortItems(this.filteredItems);
      this.paginationService.setCurrentPage(1);
    });

    EventBus.dispatchEvent('filteredItems:updated', undefined);
  };
}
