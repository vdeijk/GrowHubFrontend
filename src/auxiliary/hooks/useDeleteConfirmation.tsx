import React, { useState } from 'react';
import ConfirmationContent from '../../core/views/reusables/ConfirmationContent/ConfirmationContent';
import popupService from '../../core/services/PopupService/PopupService';

export const useDeleteConfirmation = (
  deleteAction: (id: number) => void,
  message: string = 'Are you sure you want to delete this item?',
) => {
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  const openDeleteConfirmation = (id: number | undefined) => {
    if (id === undefined) return;

    setSelectedId(id);

    const popupContent = (
      <ConfirmationContent
        message={message}
        onConfirm={() => {
          if (selectedId !== undefined) {
            deleteAction(selectedId);
          }
          popupService.closePopup();
        }}
        onCancel={() => popupService.closePopup()}
      />
    );

    popupService.openPopup(popupContent);
  };

  return { openDeleteConfirmation };
};
