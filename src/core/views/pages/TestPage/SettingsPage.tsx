import React from 'react';
import { observer } from 'mobx-react-lite';
import CheckboxInput from '../../reusables/CheckboxInput/CheckboxInput';
import settingsStore from '../../../stores/SettingsStore/SettingsStore';
import Heading from '../../reusables/Heading/Heading';

const SettingsPage: React.FC = observer(() => {
  return (
    <div>
      <Heading level={1} text="Settings Page"></Heading>
      <div>
        <CheckboxInput
          label="Use Real Data (or mock data if unchecked)"
          checked={settingsStore.useRealData}
          onChange={settingsStore.setUseRealData}
        />
      </div>
    </div>
  );
});

export default SettingsPage;
