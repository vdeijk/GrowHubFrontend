import React from 'react';
import ConfirmationContent from '../../core/views/reusables/ConfirmationContent/ConfirmationContent';
import popupService from '../../core/services/PopupService/PopupService';

export const useDeleteConfirmation = (
  deleteAction: (id: string) => void,
  message: string = 'Are you sure you want to delete this item?',
) => {
  const openDeleteConfirmation = (id: string | undefined) => {
    if (id === undefined) return;

    const popupContent = (
      <ConfirmationContent
        message={message}
        onConfirm={() => {
          deleteAction(id);
          popupService.closePopup();
        }}
        onCancel={() => popupService.closePopup()}
      />
    );

    popupService.openPopup(popupContent);
  };

  return { openDeleteConfirmation };
};
