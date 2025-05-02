import React from 'react';
import styles from './SearchBarDatabase.module.css';
import TextInput from '../../reusables/TextInput/TextInput';
import DateInput from '../../reusables/DateInput/DateInput';
import { InputField } from '../../../../auxiliary/classes/InputField';
import { DateField } from '../../../../auxiliary/classes/DateField';
import { observer } from 'mobx-react-lite';
import SyncButton from '../../reusables/SyncButton/SyncButton';

export interface SearchBarDatabaseProps {
  searchQuery: InputField<string>;
  harvestStart: DateField<string>;
  harvestEnd: DateField<string>;
  pruningStart: DateField<string>;
  pruningEnd: DateField<string>;
  fertilizingStart: DateField<string>;
  fertilizingEnd: DateField<string>;
  isLoading: boolean;
  handleSync: () => void;
}

const SearchBarCrops: React.FC<SearchBarDatabaseProps> = observer(
  ({
    searchQuery,
    harvestStart,
    harvestEnd,
    pruningStart,
    pruningEnd,
    fertilizingStart,
    fertilizingEnd,
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
        <div></div>
        <div></div>
        <div></div>
        <DateInput
          value={harvestStart.value}
          onChange={(date) => harvestStart?.setValue(date || '')}
          label={harvestStart.label}
          aria-label="Harvest Start"
        />
        <DateInput
          value={harvestEnd.value}
          onChange={(date) => harvestEnd?.setValue(date || '')}
          label={harvestEnd.label}
          aria-label="Harvest End"
        />
        <DateInput
          value={pruningStart.value}
          onChange={(date) => pruningStart?.setValue(date || '')}
          label={pruningStart.label}
          aria-label="Pruning Start"
        />
        <DateInput
          value={pruningEnd.value}
          onChange={(date) => pruningEnd?.setValue(date || '')}
          label={pruningEnd.label}
          aria-label="Pruning End"
        />
        <DateInput
          value={fertilizingStart.value}
          onChange={(date) => fertilizingStart?.setValue(date || '')}
          label={fertilizingStart.label}
          aria-label="Fertilizing Start"
        />
        <DateInput
          value={fertilizingEnd.value}
          onChange={(date) => fertilizingEnd?.setValue(date || '')}
          label={fertilizingEnd.label}
          aria-label="Fertilizing End"
        />
        <div></div>
        <div></div>
        <SyncButton onClick={handleSync} isSyncing={isLoading} />
      </div>
    );
  },
);

export default SearchBarCrops;
