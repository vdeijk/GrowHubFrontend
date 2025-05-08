import React from 'react';
import styles from './FooterContainer.module.css';
import Heading from '../../reusables/Heading/Heading';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import SocialIcon from '../../reusables/SocialIcon/SocialIcon';
import FooterLink from '../../reusables/FooterLink/FooterLink';
import menuService from '../../../services/MenuService/MenuService';
import { observer } from 'mobx-react-lite';

const FooterContainer: React.FC = observer(() => {
  return (
    <footer
      className={`${styles.footer} ${
        menuService.isMenuOpen ? '' : styles.menuClosed
      }`}
    >
      <div className={styles.footerCol}>
        <Heading
          level={5}
          text="Follow"
          customStyles={{ color: 'var(--color-white)', marginBottom: '1rem' }}
        />
        <ul className={styles.socialIcons}>
          <SocialIcon
            link="https://github.com/vdeijk"
            icon={FaGithub}
            label="GitHub"
          />
          <SocialIcon
            link="https://www.linkedin.com/in/rick-van-der-eijk-9829b774/"
            icon={FaLinkedin}
            label="LinkedIn"
          />
        </ul>
      </div>

      <div className={styles.footerCol}>
        <Heading
          level={5}
          text="Contact"
          customStyles={{ color: 'var(--color-white)', marginBottom: '1rem' }}
        />
        <p className={styles.contactText}>Name: Rick van der Eijk </p>
        <p className={styles.contactText}>Phone: (+31)628258357 </p>
        <p className={styles.contactText}>Email: rickvdeijk@gmail.com </p>
        <br></br>
        <p className={styles.contactText}>
          Available for freelance work, customizations, or full-time roles.{' '}
        </p>
      </div>

      <div className={styles.resources}>
        <Heading
          level={5}
          text="Resources"
          customStyles={{ color: 'var(--color-white)', marginBottom: '1rem' }}
        />
        <ul className={styles.resources}>
          <FooterLink
            link="https://vdeijk.github.io/growhubDocs/"
            label="Documentation"
          />
        </ul>
      </div>
    </footer>
  );
});

export default FooterContainer;
