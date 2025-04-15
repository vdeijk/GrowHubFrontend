// LandingPage.tsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Heading from '../../reusables/Heading/Heading';
import styles from './LandingPage.module.css';
import Button from '../../reusables/Button/Button';

const LandingPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headers}>
          <Heading level={1} text="🌱 GrowHub" />
          <Heading level={2} text="Your Smart Farming Companion" />
        </div>
        <div className={styles.content}>
          <Heading level={6} text="Demo Credentials:" />
          <p>📧 Email: demo@example.com</p>
          <p>🔑 Password: DemoPassword123!</p>
        </div>

        <Button
          onClick={() => loginWithRedirect()}
          label=" Log in to Demo"
          type="button"
        />
      </div>
    </div>
  );
};

export default LandingPage;
