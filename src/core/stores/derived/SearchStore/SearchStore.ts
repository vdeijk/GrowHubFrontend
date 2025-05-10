import { makeAutoObservable, runInAction } from 'mobx';
import { InputField } from '../../../../auxiliary/classes/InputField';
import { DateField } from '../../../../auxiliary/classes/DateField';
import { DropdownField } from '../../../../auxiliary/classes/DropdownField';
import EventBus from '../../../services/EventBusService/EventBusService';

class SearchStore {
  isExpanded: boolean = true;

  isAnimatingLastTag: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleExpanded = (): void => {
    this.isExpanded = !this.isExpanded;
  };

  setExpanded = (expanded: boolean): void => {
    this.isExpanded = expanded;
  };

  getActiveFiltersCount = (
    inputFields: InputField<string>[],
    dateFields: DateField<string>[],
    dropdownFields: DropdownField<string>[],
  ): number => {
    return [
      ...inputFields.filter((field) => field.value !== ''),
      ...dateFields.filter((field) => field.value !== ''),
      ...dropdownFields.filter((field) => field.value !== ''),
    ].length;
  };

  clearFilter = (
    field: InputField<string> | DateField<string> | DropdownField<string>,
    inputFields: InputField<string>[],
    dateFields: DateField<string>[],
    dropdownFields: DropdownField<string>[],
  ): void => {
    const totalActiveFilters = this.getActiveFiltersCount(
      inputFields,
      dateFields,
      dropdownFields,
    );

    field.setValue('');

    if (totalActiveFilters === 1) {
      this.isAnimatingLastTag = true;

      requestAnimationFrame(() => {
        setTimeout(() => {
          runInAction(() => {
            this.isAnimatingLastTag = false;
          });
        }, 300);
      });
    }

    EventBus.dispatchEvent('filters:changed', {
      source: 'clearFilter',
    });
  };

  clearAllFilters = (
    inputFields: InputField<string>[],
    dateFields: DateField<string>[],
    dropdownFields: DropdownField<string>[],
  ): void => {
    requestAnimationFrame(() => {
      inputFields.forEach((field) => field.setValue(''));
      dateFields.forEach((field) => field.setValue(''));
      dropdownFields.forEach((field) => field.setValue(''));
    });
  };

  formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  shouldShowEmptyContainer = (activeFiltersCount: number): boolean => {
    return activeFiltersCount > 0 || this.isAnimatingLastTag;
  };
}

const searchStore = new SearchStore();
export default searchStore;
