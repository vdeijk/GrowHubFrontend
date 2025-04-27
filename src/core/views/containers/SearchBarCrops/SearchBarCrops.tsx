import React from 'react';
import styles from './SearchBarCrops.module.css';
import TextInput from '../../reusables/TextInput/TextInput';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import { InputField } from '../../../../auxiliary/classes/InputField';
import { Dropdown as DropdownClass } from '../../../../auxiliary/classes/Dropdown';
import { observer } from 'mobx-react-lite';
import DateInput from '../../reusables/DateInput/DateInput';

export interface SearchBarProps {
  searchQuery: InputField<string>;
  genusFilter: DropdownClass<string>;
}

const SearchBarCrops: React.FC<SearchBarProps> = observer(
  ({ searchQuery, genusFilter }) => {
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
          value={genusFilter.value}
          onChange={genusFilter.setValue}
          options={genusFilter.options}
          label={'Location'}
          aria-label="Genus"
        />
        <DateInput
          label={'Last Watered'}
          value={''}
          onChange={(date) => console.log(date)}
          aria-label="End Date"
        />
        <DateInput
          label={'Last Fertilized'}
          value={''}
          onChange={(date) => console.log(date)}
          aria-label="End Date"
        />
        <DateInput
          label={'Last Pruned'}
          value={''}
          onChange={(date) => console.log(date)}
          aria-label="End Date"
        />
        <DateInput
          label={'Last Harvested'}
          value={''}
          onChange={(date) => console.log(date)}
          aria-label="End Date"
        />
        <Dropdown
          value={genusFilter.value}
          onChange={genusFilter.setValue}
          options={genusFilter.options}
          label={'Health Status'}
          aria-label="Genus"
        />
        <Dropdown
          value={genusFilter.value}
          onChange={genusFilter.setValue}
          options={genusFilter.options}
          label={'Growth Stage'}
          aria-label="Genus"
        />
      </div>
    );
  },
);

export default SearchBarCrops;
