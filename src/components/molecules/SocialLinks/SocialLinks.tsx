import type { SocialLink } from "../../../types/social-link";
import "./SocialLinks.css";

const SocialLinks = ({ links }: { links: SocialLink[] }) => {
  return (
    <ul className="social-links">
      {links.map(({ name, url, icon }) => (
        <li key={name}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
          >
            <img
              className="social-links__img"
              src={icon}
              alt={`${name} icon`}
            />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
