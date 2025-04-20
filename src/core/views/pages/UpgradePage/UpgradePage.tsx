import React from 'react';
import styles from './UpgradePage.module.css';
import Heading from '../../reusables/Heading/Heading';
import Button from '../../reusables/Button/Button';
import upgradeStore from '../../../stores/UpgradeStore/UpgradeStore';
import { observer } from 'mobx-react-lite';

const UpgradePage: React.FC = observer(() => {
  const { plans } = upgradeStore;

  return (
    <div className={styles.page}>
      <div className={styles.cards}>
        {plans.map((plan, index) => (
          <div key={index} className={styles.card}>
            <Heading
              level={2}
              text={plan.title}
              customStyles={{ marginBottom: '2rem' }}
            />
            <Heading
              level={4}
              text={plan.price}
              customStyles={{ marginBottom: '1rem' }}
            />
            <ul className={styles.cardFeatures}>
              {plan.features.map((feature, idx) => (
                <li key={idx} className={styles.cardFeature}>
                  {feature}
                </li>
              ))}
            </ul>
            <div className={styles.cardButton}>
              <Button
                label="Upgrade Now"
                onClick={() => alert(`Upgrading to ${plan.title}`)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default UpgradePage;
