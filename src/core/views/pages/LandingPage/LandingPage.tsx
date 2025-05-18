// LandingPage.tsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Heading from '../../reusables/Heading/Heading';
import styles from './LandingPage.module.css';
import Button from '../../reusables/Button/Button';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LandingPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headers}>
          <Heading level={1} customStyles={{ marginBottom: '2rem' }}>
            GrowHub
          </Heading>
        </div>
        <div className={styles.content}>
          <Heading level={6} customStyles={{ marginBottom: '1rem' }}>
            Demo Credentials (or use your own):
          </Heading>
          <div className={styles.credentials}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
            <p className={styles.text}>
              <span className={styles.bold}>Email:&nbsp;</span>
              demo@example.com
            </p>
            <FontAwesomeIcon icon={faKey} className={styles.icon} />
            <p className={styles.text}>
              <span className={styles.bold}>Password:&nbsp;</span>
              DemoPassword123!
            </p>
          </div>
        </div>

        <Button
          customStyles={{ justifySelf: 'center' }}
          onClick={() =>
            loginWithRedirect({
              authorizationParams: {
                redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
              },
            })
          }
          label="Log in to Demo"
          type="button"
        />
      </div>
    </div>
  );
};

export default LandingPage;
