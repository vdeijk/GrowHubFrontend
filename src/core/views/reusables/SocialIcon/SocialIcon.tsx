import React from 'react';
import styles from './SocialIcon.module.css';
import { IconType } from 'react-icons';

interface SocialIconProps {
  link: string;
  icon: IconType;
  label: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ link, icon: Icon, label }) => {
  return (
    <li>
      <a
        className={styles.iconLink}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        <Icon className={styles.icon} /> {label}
      </a>
    </li>
  );
};

export default SocialIcon;
