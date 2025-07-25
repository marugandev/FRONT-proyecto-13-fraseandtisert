import "./Contact.css";
import { contactItems } from "../../../data/contact-items";
import UnderlineLink from "../../atoms/UnderlineLink/UnderlineLink";

const Contact = () => {
  return (
    <section className="site-contact">
      <h2 className="site-contact__title">Contacto</h2>

      <div className="site-contact__content">
        <ul className="site-contact__list">
          {contactItems.map(({ label, href, type, content }, index) => (
            <li className="site-contact__item" key={index}>
              <strong className="site-contact__label">{label}:</strong>

              {href ? (
                <UnderlineLink
                  to={href}
                  className="site-contact__link"
                  onClick={(e) => {
                    if (type === "address") {
                      e.preventDefault();
                      window.open(href, "_blank");
                    }
                  }}
                >
                  <span>{content}</span>
                </UnderlineLink>
              ) : (
                <span className="site-contact__text">{content}</span>
              )}
            </li>
          ))}
        </ul>

        <iframe
          className="site-contact__map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.8281425633194!2d-3.644123623505062!3d40.529042051415714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422c5d85fbb567%3A0x49a94bc39a610f88!2sAv.%20de%20Bruselas%2C%2035%2C%2028108%20Alcobendas%2C%20Madrid!5e0!3m2!1ses!2ses!4v1717942301019!5m2!1ses!2ses"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
};

export default Contact;
