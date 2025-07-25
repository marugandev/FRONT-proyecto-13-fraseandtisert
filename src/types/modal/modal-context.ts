import type { ModalType } from "./modal-type";
import type { ModalStatus } from "./modal-status";
import type { ReactNode } from "react";

export type ModalContextType = {
  isOpen: boolean;
  isClosing: boolean;
  type: ModalType;
  status?: ModalStatus;
  message: ReactNode | null;
  onConfirm: (() => void) | null;
  openModal: (
    type: ModalType,
    message?: ReactNode,
    status?: ModalStatus,
    confirmAction?: () => void
  ) => void;
  closeModal: () => void;
};
