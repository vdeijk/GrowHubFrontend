import React from 'react';
import styles from './ActionIcons.module.css';
import { observer } from 'mobx-react-lite';
import { FaTrash, FaCopy, FaPaste } from 'react-icons/fa';

interface ActionIconsProps<T extends { id?: number | undefined }> {
  item: T;
  handleDelete: (id: number | undefined) => void;
  handleCopy?: (id: number | undefined) => void;
  handlePaste?: (id: number | undefined) => void;
}

const ActionIcons = observer(
  <T extends { id: number | undefined }>(props: ActionIconsProps<T>) => {
    const { item, handleDelete, handleCopy, handlePaste } = props;

    return (
      <div className={styles.actionIcons}>
        {handleCopy && (
          <FaCopy
            className={styles.copyIcon}
            onClick={() => item.id !== undefined && handleCopy(item.id)}
            title="Copy"
          />
        )}
        {handlePaste && (
          <FaPaste
            className={styles.pasteIcon}
            onClick={() => item.id !== undefined && handlePaste(item.id)}
            title="Paste"
          />
        )}
        <FaTrash
          className={styles.deleteIcon}
          onClick={() => item.id !== undefined && handleDelete(item.id)}
          title="Delete this row"
        />
      </div>
    );
  },
);

export default ActionIcons;
