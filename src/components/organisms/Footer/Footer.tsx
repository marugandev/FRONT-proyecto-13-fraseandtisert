import "./Footer.css";

import SocialLinks from "../../molecules/SocialLinks/SocialLinks";
import { socialLinksData } from "../../../data/social-links-data";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__copyright">
        <p>{new Date().getFullYear()} © fraseandtisert | Creado por </p>
        <a
          className="site-footer__link"
          href="https://marugandev.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="site-footer__logo"
            src="/images/logos/logo_marugandev.svg"
            alt="logo marugandev"
            loading="lazy"
          />
        </a>
      </div>
      <SocialLinks links={socialLinksData} />
    </footer>
  );
};

export default Footer;
