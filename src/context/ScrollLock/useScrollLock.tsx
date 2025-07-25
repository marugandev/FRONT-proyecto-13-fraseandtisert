import { useContext } from "react";
import { ScrollLockContext } from "./ScrollLockContext";

export const useScrollLock = () => {
  const context = useContext(ScrollLockContext);
  if (!context)
    throw new Error("useScrollLock debe usarse dentro de ScrollLockProvider");
  return context;
};
