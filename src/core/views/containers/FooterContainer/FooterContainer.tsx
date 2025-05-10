import React from 'react';
import styles from './FooterContainer.module.css';
import Heading from '../../reusables/Heading/Heading';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import SocialIcon from '../../reusables/SocialIcon/SocialIcon';
import FooterLink from '../../reusables/FooterLink/FooterLink';
import menuService from '../../../services/MenuService/MenuService';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

const FooterContainer: React.FC = observer(() => {
  const { t } = useTranslation();

  return (
    <footer
      className={`${styles.footer} ${
        menuService.isMenuOpen ? '' : styles.menuClosed
      }`}
    >
      <div className={styles.footerCol}>
        <Heading
          level={5}
          customStyles={{ color: 'var(--color-white)', marginBottom: '1rem' }}
        >
          {t('footer.headings.follow')}
        </Heading>
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
          customStyles={{ color: 'var(--color-white)', marginBottom: '1rem' }}
        >
          {t('footer.headings.contact')}
        </Heading>
        <p className={styles.contactText}>
          {t('footer.contact.name')}: Rick van der Eijk: Rick van der Eijk{' '}
        </p>
        <p className={styles.contactText}>
          {t('footer.contact.phone')}: (+31)628258357{' '}
        </p>
        <p className={styles.contactText}>
          {t('footer.contact.email')}: rickvdeijk@gmail.com{' '}
        </p>
        <br></br>
        <p className={styles.contactText}>{t('footer.contact.availability')}</p>
      </div>

      <div className={styles.resources}>
        <Heading
          level={5}
          customStyles={{ color: 'var(--color-white)', marginBottom: '1rem' }}
        >
          {t('footer.headings.resources')}
        </Heading>
        <ul className={styles.resources}>
          <FooterLink
            link="https://vdeijk.github.io/growhubDocs/"
            label={t('footer.resources.documentation')}
          />
        </ul>
      </div>
    </footer>
  );
});

export default FooterContainer;
