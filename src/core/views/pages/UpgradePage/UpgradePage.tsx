import React from 'react';
import styles from './UpgradePage.module.css';
import Heading from '../../reusables/Heading/Heading';
import Button from '../../reusables/Button/Button';
import { observer } from 'mobx-react-lite';
import upgradeStore from '../../../stores/UpgradeStore/UpgradeStore';

const UpgradePage: React.FC = observer(() => {
  return (
    <div className={styles.page}>
      <div className={styles.cards}>
        {upgradeStore.plans.map((plan, index) => (
          <div key={index} className={styles.card}>
            <Heading level={2} text={plan.title}></Heading>
            <p className={styles.cardPrice}>{plan.price}</p>
            <ul className={styles.cardFeatures}>
              {plan.features.map((feature, idx) => (
                <li key={idx} className={styles.cardFeature}>
                  {feature}
                </li>
              ))}
            </ul>
            <div>
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
