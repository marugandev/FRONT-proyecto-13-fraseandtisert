import "./RecycledSection.css";

import CircleSpin from "../../atoms/CircleSpin/CircleSpin";

export const RecicledSection = () => {
  return (
    <section className="recycled-section">
      <div className="recycled-section__content">
        <h2 className="recycled-section__title">Moda con propósito</h2>
        <p className="recycled-section__text">
          Nuestras camisetas están hechas con materiales reciclados y 100%
          algodón.
        </p>
        <p>
          Elegimos fibras naturales y procesos responsables para crear prendas
          que cuidan del planeta y de tu comodidad.
        </p>
        <ul className="recycled-section__list">
          <li className="recycled-section__list-item">✔︎ Cómodas</li>
          <li className="recycled-section__list-item">✔︎ Duraderas</li>
          <li className="recycled-section__list-item">✔︎ Sostenibles</li>
        </ul>
        <CircleSpin
          src="/images/spin/circle-spin-sustainable.svg"
          alt="Reciclado 100%"
        />
      </div>
      <p className="recycled-section__text recycled-section__text--emphasis">
        <strong>Vestir bien también es hacer el bien.</strong>
      </p>
    </section>
  );
};

export default RecicledSection;
