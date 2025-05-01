import React from 'react';
import styles from './SearchBarMeasurements.module.css';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import { Dropdown as DropdownClass } from '../../../../auxiliary/classes/Dropdown';
import { observer } from 'mobx-react-lite';
import { InputField } from '../../../../auxiliary/classes/InputField';
import TextInput from '../../reusables/TextInput/TextInput';

export interface SearchBarMeasurementsProps {
  searchQuery: InputField<string>;
  soilDryness: DropdownClass<string>;
  lightLevel: DropdownClass<string>;
  growthStage: DropdownClass<string>;
  healthStatus: DropdownClass<string>;
}

const SearchBarMeasurements: React.FC<SearchBarMeasurementsProps> = observer(
  ({ searchQuery, growthStage, healthStatus, soilDryness, lightLevel }) => {
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
          value={soilDryness.value}
          onChange={(value) => soilDryness.setValue(String(value))}
          options={soilDryness.options}
          label={soilDryness.label}
          aria-label="Growth Stage"
        />
        <Dropdown
          value={lightLevel.value}
          onChange={(value) => lightLevel.setValue(String(value))}
          options={lightLevel.options}
          label={lightLevel.label}
          aria-label="Growth Stage"
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

export default SearchBarMeasurements;
