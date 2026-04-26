import { Modal } from "react-bootstrap";
import CommonButton from "./CommonButton";
import '../css/ConfirmationPopUp.css';

type ConfirmModalProps = {
  show: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  loading?: boolean;
};

const ConfirmModal = ({
  show,
  title,
  message,
  onConfirm,
  onClose,
  loading = false,
}: ConfirmModalProps) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      keyboard={false}
      dialogClassName="confirm-modal"
    >
      <Modal.Header closeButton className="confirm-header">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="confirm-body">
        <p>{message}</p>
      </Modal.Body>

      <Modal.Footer className="confirm-footer">
        <CommonButton 
            variant="secondary" 
            onClick={onClose} 
            buttonText="Cancel"
        />
        <CommonButton
          variant="danger"
          onClick={onConfirm}
          loading={loading}
          buttonText="Confirm"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;