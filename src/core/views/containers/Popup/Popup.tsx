import React from 'react';
import { observer } from 'mobx-react-lite';
import popupStore from '../../../stores/PopupStore/PopupStore';
import styles from './Popup.module.css';

const Popup: React.FC = observer(() => {
  if (!popupStore.isOpen) return null;

  return (
    <div className={styles.overlay}>
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
