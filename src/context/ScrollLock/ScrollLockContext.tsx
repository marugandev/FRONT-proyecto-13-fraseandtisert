import { createContext } from "react";
import type { ScrollLockContextType } from "../../types/context/scroll-lock-context";

export const ScrollLockContext = createContext<
  ScrollLockContextType | undefined
>(undefined);
