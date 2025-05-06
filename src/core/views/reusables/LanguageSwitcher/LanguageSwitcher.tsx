import React from 'react';
import { observer } from 'mobx-react-lite';
import localeStore from '../../../stores/derived/LocaleStore/LocaleStore';
import { FaGlobe } from 'react-icons/fa';
import styles from './LanguageSwitcher.module.css';
import LanguageButton from '../LanguageButton/LanguageButtont';
import Flag from 'react-world-flags';

const LanguageSwitcher: React.FC = observer(() => {
  const { currentLanguage, changeLanguage } = localeStore;

  return (
    <div className={styles.container}>
      <FaGlobe size={20} title="Language" className={styles.iconGlobe} />
      <LanguageButton
        label="EN"
        isActive={currentLanguage === 'en'}
        onClick={() => changeLanguage('en')}
        icon={<Flag code="US" className={styles.flagIcon} />}
      />
      <LanguageButton
        label="NL"
        isActive={currentLanguage === 'nl'}
        onClick={() => changeLanguage('nl')}
        icon={<Flag code="NL" className={styles.flagIcon} />}
      />
    </div>
  );
});

export default LanguageSwitcher;
