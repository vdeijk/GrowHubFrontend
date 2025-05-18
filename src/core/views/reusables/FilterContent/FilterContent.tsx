import React from 'react';
import styles from './FilterContent.module.css';
import TextInput from '../../reusables/TextInput/TextInput';
import DateInput from '../../reusables/DateInput/DateInput';
import { InputField } from '../../../../auxiliary/classes/InputField';
import { DateField } from '../../../../auxiliary/classes/DateField';
import { observer } from 'mobx-react-lite';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import { DropdownField } from '../../../../auxiliary/classes/DropdownField';
import Divider from '../../reusables/Divider/Divider';

export interface FilterContentProps {
  inputFields: InputField<string>[];
  dateFields: DateField<string>[];
  dropdownFields: DropdownField<string>[];
  isCollapsed?: boolean;
}

const FilterContent: React.FC<FilterContentProps> = observer(
  ({ inputFields, dateFields, dropdownFields, isCollapsed = false }) => {
    const searchField = inputFields.find(
      (field) =>
        field.label.toLowerCase() === 'search' ||
        field.placeholder?.toLowerCase().includes('search'),
    );

    const otherInputFields = inputFields.filter(
      (field) => field !== searchField && field.label.toLowerCase() !== 'notes',
    );

    const sections = [
      {
        content: searchField && (
          <div className={styles.subContainer}>
            <TextInput
              label={searchField.label}
              value={searchField.value}
              onChange={searchField.setValue}
              placeholder={searchField.placeholder}
              aria-label={searchField.label}
            />
          </div>
        ),
        alwaysShow: true,
      },
      {
        content: otherInputFields.length > 0 && (
          <div className={styles.subContainer}>
            {otherInputFields.map((field, index) => (
              <TextInput
                key={`input-${index}`}
                label={field.label}
                value={field.value}
                onChange={field.setValue}
                placeholder={field.placeholder}
                aria-label={field.label}
              />
            ))}
          </div>
        ),
      },
      {
        content: dropdownFields.length > 0 && (
          <div className={styles.subContainer}>
            {dropdownFields.map((field, index) => (
              <Dropdown
                key={`dropdown-${index}`}
                value={field.value}
                onChange={(value) => field.setValue(String(value))}
                options={field.options}
                aria-label={field.label}
                label={field.label}
              />
            ))}
          </div>
        ),
      },
      {
        content: dateFields.length > 0 && (
          <div className={styles.subContainer}>
            {dateFields.map((field, index) => (
              <DateInput
                key={`date-${index}`}
                value={field.value}
                onChange={(date) => field.setValue(date || '')}
                label={field.label}
                aria-label={field.label}
              />
            ))}
          </div>
        ),
      },
    ];

    const visibleSections = sections.filter(
      (section) => section.content && (section.alwaysShow || !isCollapsed),
    );

    return (
      <div className={`${styles.searchContent}`}>
        {isCollapsed && visibleSections.length > 0 && <Divider />}

        {sections.map((section, index) => {
          if (!section.content) return null;
          if (isCollapsed && !section.alwaysShow) return null;

          const visibleSectionIndex = visibleSections.findIndex(
            (s) => s === section,
          );

          const needsDivider = visibleSectionIndex > 0 && !isCollapsed;

          return (
            <React.Fragment key={index}>
              {needsDivider && <Divider />}
              {section.content}
            </React.Fragment>
          );
        })}
      </div>
    );
  },
);

export default FilterContent;
