import React from 'react';
import { observer } from 'mobx-react-lite';
import popupStore from '../../../services/PopupService/PopupService';
import styles from './Popup.module.css';

const Popup: React.FC = observer(() => {
  if (!popupStore.isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      popupStore.closePopup();
    }
  };

  return (
    <div
      className={styles.overlay}
      role="button"
      tabIndex={0}
      onClick={handleOverlayClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleOverlayClick(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }}
    >
      <div className={styles.popup}>
        <button
          className={styles.closeButton}
          onClick={() => popupStore.closePopup()}
        >
          &times;
        </button>
        <div className={styles.content}>{popupStore.content}</div>
      </div>
    </div>
  );
});

export default Popup;
