import "./Modal.css";

import useModal from "../../../context/Modal/useModal";
import { useEffect } from "react";
import Button from "../../atoms/Button/Button";

const Modal = () => {
  const { isOpen, isClosing, type, message, status, onConfirm, closeModal } =
    useModal();

  useEffect(() => {
    if (type === "info" && isOpen) {
      const timeout = setTimeout(() => {
        closeModal();
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [type, isOpen, closeModal]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (onConfirm) {
      onConfirm();
      closeModal();
    }
  };

  return (
    <dialog
      className={`modal 
        ${status ? `modal--${status}` : ""} 
        ${isClosing ? "modal--closing" : ""}`}
      open={isOpen}
      aria-modal="true"
      role="dialog"
    >
      {type === "info" && (
        <p className={`modal__text ${status ? `modal__text--${status}` : ""}`}>
          {message}
        </p>
      )}

      {type === "confirm" && (
        <div className="modal__confirm">
          <p className={`modal__text modal__text--${status}`}>{message}</p>
          <div className="modal-confirm__buttons">
            <Button
              type="reset"
              variant="alternative"
              action="cancel"
              onClick={closeModal}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="alternative"
              action="accept"
              onClick={handleSubmit}
            >
              Aceptar
            </Button>
          </div>
        </div>
      )}

      {type === "loader" && (
        <div className="modal__loader" aria-label="Loading" />
      )}
    </dialog>
  );
};

export default Modal;
