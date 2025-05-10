import React from 'react';
import styles from './FilterHeader.module.css';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import Heading from '../Heading/Heading';

export interface FilterHeaderProps {
  activeFiltersCount: number;
  toggleExpand: () => void;
  isExpanded: boolean;
}

const FilterHeader: React.FC<FilterHeaderProps> = observer(
  ({ activeFiltersCount, isExpanded, toggleExpand }) => {
    const headingContent = (
      <>
        Filters{' '}
        {activeFiltersCount > 0 && (
          <span className={styles.filterCount}>({activeFiltersCount})</span>
        )}
      </>
    );

    return (
      <div className={styles.searchHeader}>
        <div className={styles.searchTitle}>
          <FontAwesomeIcon icon={faFilter} className={styles.filterIcon} />
          <Heading level={3}>{headingContent}</Heading>
        </div>
        <button
          className={styles.collapseButton}
          onClick={toggleExpand}
          aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
          title={isExpanded ? 'Collapse filters' : 'Expand filters'}
        >
          <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
        </button>
      </div>
    );
  },
);

export default FilterHeader;
