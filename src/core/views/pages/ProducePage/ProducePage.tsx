import React from 'react';
import styles from './ProducePage.module.css';
import { observer } from 'mobx-react-lite';
import Heading from '../../reusables/Heading/Heading';

interface AddMeasurementPageProps {
  isEditing?: boolean;
}

const ProducePage: React.FC<AddMeasurementPageProps> = observer(() => {
  return (
    <section className={styles.section}>
      <Heading level={2}>Coming soon...</Heading>
    </section>
  );
});

export default ProducePage;
