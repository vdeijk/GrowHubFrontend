import React from 'react';
import { observer } from 'mobx-react-lite';
import localeStore from '../../../stores/derived/LocaleStore/LocaleStore';

const LanguageSwitcher: React.FC = observer(() => {
  const { currentLanguage, changeLanguage } = localeStore;

  return (
    <div>
      <button
        onClick={() => changeLanguage('en')}
        disabled={currentLanguage === 'en'} 
      >
        English
      </button>
      <button
        onClick={() => changeLanguage('nl')}
        disabled={currentLanguage === 'nl'} 
      >
        Nederlands
      </button>
    </div>
  );
});

export default LanguageSwitcher;