import React from 'react';
import styles from './ActionIcons.module.css';
import { observer } from 'mobx-react-lite';
import { FaTrash, FaCopy, FaPaste } from 'react-icons/fa';

interface ActionIconsProps<T extends { id?: string | undefined }> {
  item: T;
  handleDelete: (
    id: string | undefined,
    event: React.MouseEvent<SVGElement>,
  ) => void;
  handleCopy?: (
    id: string | undefined,
    event: React.MouseEvent<SVGElement>,
  ) => void;
  handlePaste?: (
    id: string | undefined,
    event: React.MouseEvent<SVGElement>,
  ) => void;
}

const ActionIcons = observer(
  <T extends { id: string | undefined }>(props: ActionIconsProps<T>) => {
    const { item, handleDelete, handleCopy, handlePaste } = props;

    return (
      <div className={styles.actionIcons}>
        {handleCopy && (
          <FaCopy
            className={styles.copyIcon}
            onClick={(event) =>
              item.id !== undefined && handleCopy(item.id, event)
            }
            title="Copy"
          />
        )}
        {handlePaste && (
          <FaPaste
            className={styles.pasteIcon}
            onClick={(event) =>
              item.id !== undefined && handlePaste(item.id, event)
            }
            title="Paste"
          />
        )}
        <FaTrash
          className={styles.deleteIcon}
          onClick={(event) =>
            item.id !== undefined && handleDelete(item.id, event)
          }
          title="Delete this row"
        />
      </div>
    );
  },
);

export default ActionIcons;
