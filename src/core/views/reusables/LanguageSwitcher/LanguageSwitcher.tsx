import React from 'react';
import { observer } from 'mobx-react-lite';
import localeStore from '../../../stores/derived/LocaleStore/LocaleStore';
import { FaGlobe } from 'react-icons/fa';
import styles from './LanguageSwitcher.module.css';
import LanguageButton from '../LanguageButton/LanguageButtont';

const LanguageSwitcher: React.FC = observer(() => {
  const { currentLanguage, changeLanguage } = localeStore;

  return (
    <div className={styles.container}>
      <FaGlobe size={20} title="Language" className={styles.iconGlobe} />
      <LanguageButton
        languageCode="en"
        label="English"
        isActive={currentLanguage === 'en'}
        onClick={() => changeLanguage('en')}
        icon={
          <span role="img" aria-label="USA Flag">
            🇺🇸
          </span>
        }
      />
      <LanguageButton
        languageCode="nl"
        label="Nederlands"
        isActive={currentLanguage === 'nl'}
        onClick={() => changeLanguage('nl')}
        icon={
          <span role="img" aria-label="Netherlands Flag">
            🇳🇱
          </span>
        }
      />
    </div>
  );
});

export default LanguageSwitcher;
