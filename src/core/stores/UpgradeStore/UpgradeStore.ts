import { makeAutoObservable } from 'mobx';

class UpgradeStore {
  plans = [
    {
      title: 'Free Plan',
      price: 'Free',
      features: ['Basic Feature 1', 'Basic Feature 2'],
    },
    {
      title: 'Pro Plan',
      price: '$19.99/month',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    },
    {
      title: 'Enterprise Plan',
      price: '$49.99/month',
      features: [
        'Feature 1',
        'Feature 2',
        'Feature 3',
        'Feature 4',
        'Feature 5',
      ],
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }
}

const upgradeStore = new UpgradeStore();
export default upgradeStore;
