import React from 'react';
import { observer } from 'mobx-react-lite';
import styles from './SearchBar.module.css';
import searchStore from '../../../stores/derived/SearchStore/SearchStore';
import { InputField } from '../../../../auxiliary/classes/InputField';
import { DateField } from '../../../../auxiliary/classes/DateField';
import { DropdownField } from '../../../../auxiliary/classes/DropdownField';
import FilterHeader from '../../reusables/FilterHeader/FilterHeader';
import FilterTags from '../../reusables/FilterTags/FilterTags';
import FilterContent from '../../reusables/FilterContent/FilterContent';
import Divider from '../../reusables/Divider/Divider';

export interface SearchBarProps {
  inputFields: InputField<string>[];
  dateFields: DateField<string>[];
  dropdownFields: DropdownField<string>[];
}

const SearchBar: React.FC<SearchBarProps> = observer(
  ({ inputFields, dateFields, dropdownFields }) => {
    const activeFiltersCount = searchStore.getActiveFiltersCount(
      inputFields,
      dateFields,
      dropdownFields,
    );

    const filterHeaderModel = {
      activeFiltersCount,
      setIsExpanded: searchStore.setExpanded,
      isExpanded: searchStore.isExpanded,
      toggleExpand: searchStore.toggleExpanded,
    };

    const filterTagsModel = {
      activeFiltersCount,
      inputFields,
      dateFields,
      dropdownFields,
      clearFilter: (
        field: InputField<string> | DateField<string> | DropdownField<string>,
      ) =>
        searchStore.clearFilter(field, inputFields, dateFields, dropdownFields),
      formatDate: searchStore.formatDate,
      isAnimatingLastTag: searchStore.isAnimatingLastTag,
    };

    const filterContentModel = {
      inputFields,
      dateFields,
      dropdownFields,
      isCollapsed: !searchStore.isExpanded,
    };

    return (
      <section
        className={`${styles.container} ${!searchStore.isExpanded ? styles.collapsed : ''}`}
      >
        <FilterHeader {...filterHeaderModel} />
        {searchStore.isExpanded && <Divider color="primary" />}
        <FilterContent {...filterContentModel} />
        {searchStore.isExpanded && (
          <>
            <Divider color="primary" />
            <FilterTags {...filterTagsModel} />
            <Divider color="primary" />
          </>
        )}
      </section>
    );
  },
);

export default SearchBar;
