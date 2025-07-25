import type { ReactNode } from "react";
import { useCallback, useState } from "react";
import { ModalContext } from "./ModalContext";
import type { ModalType } from "../../types/modal/modal-type";
import type { ModalStatus } from "../../types/modal/modal-status";

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [type, setType] = useState<ModalType>(null);
  const [message, setMessage] = useState<ReactNode | null>(null);
  const [status, setStatus] = useState<ModalStatus>(null);
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);

  const openModal = useCallback(
    (
      modalType: ModalType,
      modalMessage?: ReactNode,
      modalStatus?: ModalStatus,
      confirmAction?: () => void
    ) => {
      setIsOpen(true);
      setType(modalType);
      setMessage(modalMessage ?? null);
      setStatus(modalStatus ?? "success");
      setOnConfirm(() => confirmAction ?? null);
    },
    []
  );

  const closeModal = useCallback(() => {
    setIsClosing(true);

    setTimeout(() => {
      setIsOpen(false);
      setType(null);
      setMessage("");
      setStatus(null);
      setOnConfirm(null);
      setIsClosing(false);
    }, 400);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        isClosing,
        type,
        message,
        status,
        onConfirm,
        openModal,
        closeModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
