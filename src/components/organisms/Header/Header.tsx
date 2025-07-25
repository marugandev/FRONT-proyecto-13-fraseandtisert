import "./Header.css";

import Menu from "../Menu/Menu";
import Logo from "../../atoms/Logo/Logo";
import Cart from "../Cart/Cart";

const Header = () => {
  return (
    <header className="site-header">
      <Menu />
      <Logo />
      <Cart />
    </header>
  );
};

export default Header;
