import React from 'react';
import styles from './ActionIcons.module.css';
import { observer } from 'mobx-react-lite';
import { FaTrash } from 'react-icons/fa';

interface ActionIconsProps<T extends { id?: number | undefined }> {
  item: T;
  handleDelete: (
    id: number | undefined,
    event: React.MouseEvent<SVGElement>,
  ) => void;
  handleCopy?: (
    id: number | undefined,
    event: React.MouseEvent<SVGElement>,
  ) => void;
  handlePaste?: (
    id: number | undefined,
    event: React.MouseEvent<SVGElement>,
  ) => void;
}

const ActionIcons = observer(
  <T extends { id: number | undefined }>(props: ActionIconsProps<T>) => {
    const { item, handleDelete } = props;

    //handleCopy, handlePaste

    return (
      <div className={styles.actionIcons}>
        {/* {handleCopy && (
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
        )} */}
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
