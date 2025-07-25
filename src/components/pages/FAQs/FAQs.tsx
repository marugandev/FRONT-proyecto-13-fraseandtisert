import "./FAQs.css";

import { useState } from "react";
import { faqItems } from "../../../data/faq-items";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="site-faqs">
      <h2 className="site-faqs__title">Preguntas frecuentes</h2>
      <ul className="site-faqs__list">
        {faqItems.map(({ question, answer }, index) => (
          <li
            key={index}
            className={`site-faqs__item ${
              openIndex === index ? "site-faqs__item--open" : ""
            }`}
            onClick={() => toggle(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") toggle(index);
            }}
          >
            <div className="site-faqs__question">
              {question}
              <span className="site-faqs__icon" aria-hidden="true">
                +
              </span>
            </div>
            <div className="site-faqs__answer">{answer}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FAQs;
