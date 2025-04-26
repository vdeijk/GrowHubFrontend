import React from 'react';
import popupStore from '../../../stores/PopupStore/PopupStore';
import { observer } from 'mobx-react-lite';
import Button from '../Button/Button';
import { ButtonProps } from '../Button/Button';

const PlantDatabasePopup: React.FC = observer(() => {
  const { closePopup } = popupStore;

  const buttonData: ButtonProps = {
    onClick: closePopup,
    label: 'Close',
    type: 'button',
  };

  return (
    <>
      <h2>Popup Title</h2>
      <p>This is the content of the popup.</p>
      <Button {...buttonData} />
    </>
  );
});

export default PlantDatabasePopup;
