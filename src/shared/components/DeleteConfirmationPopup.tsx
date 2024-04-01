import React from 'react';
import { Button, Dialog, Classes } from '@blueprintjs/core';
import { color } from '../../styles/color';

interface DeleteConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}

const DeleteConfirmationPopup: React.FC<DeleteConfirmationPopupProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message = 'Are you sure you want to delete this?',
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Deletion"
      style={{
        backgroundColor: color.Udarkgrey,
        color: color.Ulightgrey,
        boxShadow: `0 0 25px ${color.Ubrightblue}`,
      }}
      canEscapeKeyClose={true}
      canOutsideClickClose={true}
    >
      <div className={Classes.DIALOG_BODY}>
        <p>{message}</p>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button intent="danger" onClick={onConfirm}>
            Delete
          </Button>
          <Button
            onClick={onClose}
            style={{
              backgroundColor: color.Ublue,
              color: color.Ulightgrey,
              border: `1px solid ${color.Udarkblue}`,
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteConfirmationPopup;
