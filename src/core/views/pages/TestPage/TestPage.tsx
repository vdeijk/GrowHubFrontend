import React from 'react';
import { observer } from 'mobx-react-lite';
import CheckboxInput from '../../reusables/CheckboxInput/CheckboxInput';
import testStore from '../../../stores/TestStore';
import Heading from '../../reusables/Heading/Heading';

const TestPage: React.FC = observer(() => {
  return (
    <div>
      <Heading level={1} text="Test Page"></Heading>
      <div>
        <CheckboxInput
          label="Use Real Data"
          checked={testStore.useRealData}
          onChange={testStore.setUseRealData}
        />
      </div>
    </div>
  );
});

export default TestPage;
