import React from 'react';
import styles from './ConfirmationContent.module.css';
import ButtonContainer from '../ButtonContainer/ButtonContainer';
import { ButtonProps } from '../../../../auxiliary/interfaces/ButtonProps';
import i18next from 'i18next';

interface ConfirmationContentProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationContent: React.FC<ConfirmationContentProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  const buttonContainerData: ButtonProps[] = [
    {
      type: 'button',
      onClick: () => onCancel(),
      label: i18next.t('confirmationContent.buttons.back'),
    },
    {
      type: 'button',
      onClick: () => onConfirm(),
      label: i18next.t('confirmationContent.buttons.confirm'),
    },
  ];

  return (
    <div className={styles.container}>
      <p className={styles.message}>{message}</p>
      <ButtonContainer buttons={buttonContainerData} />
    </div>
  );
};

export default ConfirmationContent;
