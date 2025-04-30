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
  growthStage: DropdownClass<string>;
  healthStatus: DropdownClass<string>;
  lastWatered: DateInputClass<string>;
  lastFertilized: DateInputClass<string>;
  lastPruned: DateInputClass<string>;
  lastHarvested: DateInputClass<string>;
}

const SearchBarCrops: React.FC<SearchBarProps> = observer(
  ({
    location,
    searchQuery,
    growthStage,
    healthStatus,
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
        <Dropdown
          value={location.value}
          onChange={(value) => location.setValue(String(value))}
          options={location.options}
          label={location.label}
          aria-label="Location"
        />
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
        <Dropdown
          value={healthStatus.value}
          onChange={(value) => healthStatus.setValue(String(value))}
          options={healthStatus.options}
          label={healthStatus.label}
          aria-label="Health Status"
        />
        <Dropdown
          value={growthStage.value}
          onChange={(value) => growthStage.setValue(String(value))}
          options={growthStage.options}
          label={growthStage.label}
          aria-label="Growth Stage"
        />
      </div>
    );
  },
);

export default SearchBarCrops;
