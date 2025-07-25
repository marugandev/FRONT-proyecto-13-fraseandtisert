import type { ReactNode } from "react";

export interface SidebarPanelProps {
  triggerLabel: ReactNode;
  triggerClassName?: string;
  panelPosition?: "left" | "right";
  ariaLabel: string;
  children:
    | React.ReactNode
    | ((params: { closePanel: () => void }) => React.ReactNode);
}
