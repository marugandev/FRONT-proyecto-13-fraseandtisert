import "./SuscribeForm.css";

import { useForm } from "react-hook-form";
import type { SuscribeFormType } from "../../../types/suscribe-form";
import Button from "../../atoms/Button/Button";
import useModal from "../../../context/Modal/useModal";

const SuscribeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm<SuscribeFormType>();

  const { openModal } = useModal();

  const onSubmit = async (data: SuscribeFormType) => {
    try {
      if (!data) return;

      reset();
      openModal("info", "¡Suscripción completada!", "success");
    } catch (error) {
      console.error(error);
      openModal(
        "info",
        "Error al enviar. Por favor, inténtalo de nuevo.",
        "error"
      );
    }
  };

  return (
    <div className="subscribe-form">
      <form
        className="suscribe-form__form"
        onSubmit={handleSubmit(onSubmit, (errors) => {
          if (errors.email) {
            openModal("info", errors.email.message!, "error");
          }
        })}
        noValidate
      >
        <p className="subscribe-form__description">
          Suscríbete para recibir ofertas exclusivas, historias originales,
          información sobre eventos y mucho más
        </p>
        <div className="subscribe-form__controls">
          <input
            className="subscribe-form__input"
            type="email"
            placeholder="Introduce tu email"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Introduce un email válido (Ej. usuario@dominio.com)"
              }
            })}
          />
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {"➬"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SuscribeForm;
