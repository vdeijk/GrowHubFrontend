import React from 'react';
import styles from './SearchBarCrops.module.css';
import TextInput from '../../reusables/TextInput/TextInput';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import { InputField } from '../../../../auxiliary/classes/InputField';
import { Dropdown as DropdownClass } from '../../../../auxiliary/classes/Dropdown';
import { observer } from 'mobx-react-lite';
import DateInput from '../../reusables/DateInput/DateInput';
import { DateField as DateInputClass } from '../../../../auxiliary/classes/DateField';

export interface SearchBarProps {
  location: DropdownClass<string>;
  searchQuery: InputField<string>;
  lastWatered: DateInputClass<string>;
  lastFertilized: DateInputClass<string>;
  lastPruned: DateInputClass<string>;
  lastHarvested: DateInputClass<string>;
}

const SearchBarBatches: React.FC<SearchBarProps> = observer(
  ({
    location,
    searchQuery,
    lastWatered,
    lastFertilized,
    lastPruned,
    lastHarvested,
  }) => {
    return (
      <div className={styles.container}>
        <TextInput
          label={searchQuery.label}
          value={searchQuery.value}
          onChange={searchQuery.setValue}
          placeholder={searchQuery.placeholder}
          aria-label="Search"
        />
        <div></div>
        <div></div>
        <div></div>
        <Dropdown
          value={location.value}
          onChange={(value) => location.setValue(String(value))}
          options={location.options}
          label={location.label}
          aria-label="Location"
        />
        <div></div>
        <div></div>
        <div></div>
        <DateInput
          value={lastWatered.value}
          onChange={(date) => lastWatered?.setValue(date || '')}
          label={lastWatered.label}
          aria-label="Last Watered"
        />
        <DateInput
          value={lastFertilized.value}
          onChange={(date) => lastFertilized?.setValue(date || '')}
          label={lastFertilized.label}
          aria-label="Last Fertilized"
        />
        <DateInput
          value={lastPruned.value}
          onChange={(date) => lastPruned?.setValue(date || '')}
          label={lastPruned.label}
          aria-label="Last Pruned"
        />
        <DateInput
          value={lastHarvested.value}
          onChange={(date) => lastHarvested?.setValue(date || '')}
          label={lastHarvested.label}
          aria-label="Last Harvested"
        />
      </div>
    );
  },
);

export default SearchBarBatches;
