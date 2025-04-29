import React from 'react';
import styles from './SearchBarDatabase.module.css';
import TextInput from '../../reusables/TextInput/TextInput';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import { InputField } from '../../../../auxiliary/classes/InputField';
import { Dropdown as DropdownClass } from '../../../../auxiliary/classes/Dropdown';
import { observer } from 'mobx-react-lite';
import SyncButton from '../../reusables/SyncButton/SyncButton';

export interface SearchBarDatabaseProps {
  searchQuery: InputField<string>;
  sunPreference: DropdownClass<string>;
  waterNeeds: DropdownClass<string>;
  soilType: DropdownClass<string>;
  soilPH: DropdownClass<string>;
  pruning: DropdownClass<string>;
  temperatureRange: DropdownClass<string>;
  plantType: DropdownClass<string>;
  growthRate: DropdownClass<string>;
  fertilizerNeeds: DropdownClass<string>;
  isLoading: boolean;
  handleSync: () => void;
}

const SearchBarDatabase: React.FC<SearchBarDatabaseProps> = observer(
  ({
    searchQuery,
    sunPreference,
    waterNeeds,
    soilType,
    soilPH,
    pruning,
    temperatureRange,
    plantType,
    growthRate,
    fertilizerNeeds,
    isLoading,
    handleSync,
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
          value={sunPreference.value}
          onChange={sunPreference.setValue}
          options={sunPreference.options}
          label={sunPreference.label}
          aria-label="Sun Preference'"
        />
        <Dropdown
          value={waterNeeds.value}
          onChange={waterNeeds.setValue}
          options={waterNeeds.options}
          label={waterNeeds.label}
          aria-label="Water Needs"
        />
        <Dropdown
          value={soilType.value}
          onChange={soilType.setValue}
          options={soilType.options}
          label={soilType.label}
          aria-label="Soil Type"
        />
        <Dropdown
          value={soilPH.value}
          onChange={soilPH.setValue}
          options={soilPH.options}
          label={soilPH.label}
          aria-label="Soil PH"
        />
        <Dropdown
          value={pruning.value}
          onChange={pruning.setValue}
          options={pruning.options}
          label={pruning.label}
          aria-label="Pruning"
        />
        <Dropdown
          value={temperatureRange.value}
          onChange={temperatureRange.setValue}
          options={temperatureRange.options}
          label={temperatureRange.label}
          aria-label="Temperature Range"
        />
        <Dropdown
          value={plantType.value}
          onChange={plantType.setValue}
          options={plantType.options}
          label={plantType.label}
          aria-label="Plant Type"
        />
        <Dropdown
          value={growthRate.value}
          onChange={growthRate.setValue}
          options={growthRate.options}
          label={growthRate.label}
          aria-label="Growth Rate"
        />
        <Dropdown
          value={fertilizerNeeds.value}
          onChange={fertilizerNeeds.setValue}
          options={fertilizerNeeds.options}
          label={fertilizerNeeds.label}
          aria-label="Fertilizer Needs"
        />
        <SyncButton onClick={handleSync} isSyncing={isLoading} />
      </div>
    );
  },
);

export default SearchBarDatabase;
