import type { ContactItem } from "../types/contact-item";

export const contactItems: ContactItem[] = [
  {
    label: "Atención al cliente",
    content: "info@fraseandtisert.com",
    href: "mailto:info@fraseandtisert.com",
    type: "email"
  },
  {
    label: "Prensa",
    content: "prensa@fraseandtisert.com",
    href: "mailto:prensa@fraseandtisert.com",
    type: "email"
  },
  {
    label: "Teléfono",
    content: "+34 900 123 456",
    href: "tel:+34900123456",
    type: "phone"
  },
  {
    label: "Dirección",
    content: "Av. de Bruselas 35, 28108, Alcobendas, Madrid",
    href: "https://www.google.com/maps/dir/?api=1&destination=40.5290472,-3.6413499",
    type: "address"
  }
];
