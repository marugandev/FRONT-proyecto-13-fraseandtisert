import { createContext } from "react";
import type { ModalContextType } from "../../types/modal/modal-context";

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);
