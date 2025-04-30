import React from 'react';
import styles from './ActionIcons.module.css';
import { observer } from 'mobx-react-lite';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

interface ActionIconsProps<T extends { id?: number | undefined }> {
  item: T;
  handleEdit: (id: number | undefined) => void;
  handleDelete: (id: number | undefined) => void;
  handlePopup?: (id: number | undefined) => void;
}

const ActionIcons = observer(
  <T extends { id: number | undefined }>(props: ActionIconsProps<T>) => {
    const { item, handleEdit, handleDelete, handlePopup } = props;

    return (
      <div className={styles.actionIcons}>
        {handlePopup && (
          <FaSearch
            className={styles.viewIcon}
            onClick={() => item.id !== undefined && handlePopup(item.id!)}
            title="View Info"
          />
        )}
        <FaEdit
          className={styles.editIcon}
          onClick={() => item.id !== undefined && handleEdit(item.id)}
          title="Edit Plant"
        />
        <FaTrash
          className={styles.deleteIcon}
          onClick={() => item.id !== undefined && handleDelete(item.id)}
          title="Delete Plant"
        />
      </div>
    );
  },
);

export default ActionIcons;
