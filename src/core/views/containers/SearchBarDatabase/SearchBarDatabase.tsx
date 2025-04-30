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
  climateZone: DropdownClass<string>;
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
    climateZone,
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
          onChange={(value) => sunPreference.setValue(String(value))}
          options={sunPreference.options}
          label={sunPreference.label}
          aria-label="Sun Preference'"
        />
        <Dropdown
          value={waterNeeds.value}
          onChange={(value) => waterNeeds.setValue(String(value))}
          options={waterNeeds.options}
          label={waterNeeds.label}
          aria-label="Water Needs"
        />
        <Dropdown
          value={soilType.value}
          onChange={(value) => soilType.setValue(String(value))}
          options={soilType.options}
          label={soilType.label}
          aria-label="Soil Type"
        />
        <Dropdown
          value={soilPH.value}
          onChange={(value) => soilPH.setValue(String(value))}
          options={soilPH.options}
          label={soilPH.label}
          aria-label="Soil PH"
        />
        <Dropdown
          value={pruning.value}
          onChange={(value) => pruning.setValue(String(value))}
          options={pruning.options}
          label={pruning.label}
          aria-label="Pruning"
        />
        <Dropdown
          value={climateZone.value}
          onChange={(value) => climateZone.setValue(String(value))}
          options={climateZone.options}
          label={climateZone.label}
          aria-label="Climate Zone"
        />
        <Dropdown
          value={plantType.value}
          onChange={(value) => plantType.setValue(String(value))}
          options={plantType.options}
          label={plantType.label}
          aria-label="Plant Type"
        />
        <Dropdown
          value={growthRate.value}
          onChange={(value) => growthRate.setValue(String(value))}
          options={growthRate.options}
          label={growthRate.label}
          aria-label="Growth Rate"
        />
        <Dropdown
          value={fertilizerNeeds.value}
          onChange={(value) => fertilizerNeeds.setValue(String(value))}
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
