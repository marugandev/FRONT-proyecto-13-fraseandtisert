import "./Menu.css";

import SidebarPanel from "../SidebarPanel/SidebarPanel";
import MenuCollectionsLinks from "../../molecules/MenuCollectionsLinks/MenuCollectionsLinks";
import MenuGeneralLinks from "../../molecules/MenuGeneralLinks/MenuGeneralLinks";
import MenuProfile from "../../molecules/MenuProfile/MenuProfile";

const Menu = () => {
  return (
    <SidebarPanel
      triggerLabel="Menu"
      triggerClassName="menu"
      panelPosition="left"
      ariaLabel="Menu"
    >
      {({ closePanel }) => (
        <>
          <div className="menu__container">
            <nav className="menu__nav">
              <ul className="menu__list">
                <MenuCollectionsLinks closePanel={closePanel} />
                <MenuGeneralLinks closePanel={closePanel} />
              </ul>
            </nav>
            <MenuProfile closePanel={closePanel} />
          </div>
        </>
      )}
    </SidebarPanel>
  );
};

export default Menu;
