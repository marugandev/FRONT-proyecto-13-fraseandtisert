import "./ScrollLock.css";

import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { ScrollLockContext } from "./ScrollLockContext";

export const ScrollLockProvider = ({ children }: { children: ReactNode }) => {
  const [scrollLocked, setScrollLocked] = useState(false);

  const lockScroll = useCallback(() => setScrollLocked(true), []);
  const unlockScroll = useCallback(() => setScrollLocked(false), []);

  useEffect(() => {
    if (scrollLocked) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [scrollLocked]);

  return (
    <ScrollLockContext.Provider value={{ lockScroll, unlockScroll }}>
      {children}
    </ScrollLockContext.Provider>
  );
};
