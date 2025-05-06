import React from 'react';
import styles from './FooterLink.module.css';

interface FooterLinkProps {
  link: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ link, label }) => {
  return (
    <li className={styles.footerLink}>
      <a
        href={link}
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    </li>
  );
};

export default FooterLink;
