import Modal from './Modal';
import './ConfirmModal.css';

interface ConfirmModalProps {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  title = 'Confirm',
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <Modal onClose={onCancel}>
      <div className="confirm-modal">
        <h2>{title}</h2>
        <p className="confirm-message">{message}</p>
        <div className="form-actions">
          <button className="btn btn-secondary" onClick={onCancel}>{cancelText}</button>
          <button className="btn btn-danger" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;


