import "./SidebarPanel.css";

import type { SidebarPanelProps } from "../../../types/sidebar-panel";
import { useState, useEffect } from "react";
import UnderlineLink from "../../atoms/UnderlineLink/UnderlineLink";
import Button from "../../atoms/Button/Button";
import { useScrollLock } from "../../../context/ScrollLock/useScrollLock";

const SidebarPanel = ({
  triggerLabel,
  triggerClassName,
  panelPosition = "right",
  ariaLabel,
  children
}: SidebarPanelProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { lockScroll, unlockScroll } = useScrollLock();

  const togglePanel = (): void => setIsOpen((prev) => !prev);
  const closePanel = (): void => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return () => unlockScroll();
  }, [isOpen, lockScroll, unlockScroll]);

  return (
    <>
      <UnderlineLink onClick={togglePanel} className={triggerClassName}>
        {triggerLabel}
      </UnderlineLink>
      <div
        className={`sidebar-panel__overlay ${
          isOpen ? "sidebar-panel__overlay--open" : ""
        }`}
        onClick={closePanel}
        aria-hidden={!isOpen}
      />
      <aside
        className={`sidebar-panel sidebar-panel--${panelPosition} ${
          isOpen ? "sidebar-panel--open" : ""
        }`}
        role="complementary"
        aria-label={ariaLabel}
        aria-hidden={!isOpen}
      >
        <Button variant="primary" action="close" onClick={closePanel}>
          ×
        </Button>
        <div className="sidebar-panel__content">
          {typeof children === "function" ? children({ closePanel }) : children}
        </div>
      </aside>
    </>
  );
};

export default SidebarPanel;
