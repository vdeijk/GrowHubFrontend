import { makeAutoObservable } from 'mobx';

class UpgradeStore {
  freeFeatures = [
    '👤 1 user',
    '🪴 Up to 10 personal plants',
    '📋 Basic task management (manual)',
    '📖 Access to public plant database (read-only)',
    '🗓️ Simple calendar view',
    '📈 Growth tracking (basic logs & photos)',
    '☁️ Cloud sync (limited)',
    '📱 Mobile-friendly interface',
  ];

  proFeatures = [
    'Everything in Free, plus:',
    '👥 3 users',
    '🪴 Unlimited personal plants',
    '🧠 Smart task suggestions (based on plant type & time of year)',
    '🧾 Custom tasks and recurring reminders',
    '🛠️ Editable & extendable plant database (user-specific or shared with approval)',
    '🌡️ Integration with basic sensors or manual input for local weather tracking',
    '📊 Exportable reports (CSV, PDF)',
    '🔔 Advanced notifications & alerts',
    '📷 Batch photo uploads for plant growth journals',
  ];

  enterpriseFeatures = [
    'Everything in Pro, plus:',
    '👥 Multi-user & team roles (admin, worker, viewer)',
    '🗄️ Centralized plant & crop database (custom + private)',
    '🔄 API Access & integrations (ERP, sensor data)',
    '📦 Inventory management (fertilizers, seeds, etc.)',
    '🏭 Support for multiple locations / greenhouses',
    '📈 Advanced analytics dashboard (yield prediction, task stats)',
    '📞 Dedicated support & onboarding',
    '🔐 SLA, backups, and data retention compliance',
  ];

  plans = [
    {
      title: 'Free Plan',
      price: 'Free',
      features: this.freeFeatures,
    },
    {
      title: 'Pro Plan',
      price: '$19.99/month',
      features: this.proFeatures,
    },
    {
      title: 'Enterprise Plan',
      price: '$49.99/month',
      features: this.enterpriseFeatures,
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }
}

const upgradeStore = new UpgradeStore();
export default upgradeStore;
