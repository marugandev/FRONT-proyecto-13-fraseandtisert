import "./RegisterForm.css";

import { useForm, type FieldErrors } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useModal from "../../../context/Modal/useModal";
import { useAuth } from "../../../context/Auth/useAuth";
import UnderlineLink from "../../atoms/UnderlineLink/UnderlineLink";
import Button from "../../atoms/Button/Button";
import type { RegisterReq } from "../../../types/auth/register";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting }
  } = useForm<RegisterReq>({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const { openModal, closeModal } = useModal();
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const onValid = async (data: RegisterReq) => {
    try {
      openModal("loader");
      await registerUser(data);
      closeModal();

      await sleep(1600);
      openModal("info", "Registrado con éxito", "success");
      navigate("/");
    } catch (error) {
      console.error(error);
      closeModal();

      await sleep(1600);
      openModal("info", "Error en el registro", "error");
    }
  };

  const onInvalid = (errors: FieldErrors<RegisterReq>) => {
    const errorMessage =
      errors.userName?.message ||
      errors.email?.message ||
      errors.password?.message ||
      errors.confirmPassword?.message ||
      "Por favor completa todos los campos correctamente";

    openModal("info", errorMessage, "error");
  };

  return (
    <form
      className="register-form"
      onSubmit={handleSubmit(onValid, onInvalid)}
      noValidate
    >
      <label className="register-form__label" htmlFor="userName">
        Nombre de usuario
        <input
          id="userName"
          className="register-form__input"
          type="text"
          autoComplete="username"
          {...register("userName", {
            required: "El nombre de usuario es obligatorio",
            minLength: {
              value: 3,
              message: "Debe tener al menos 3 caracteres"
            },
            maxLength: {
              value: 20,
              message: "Debe tener como máximo 20 caracteres"
            }
          })}
        />
      </label>
      <label className="register-form__label" htmlFor="email">
        Email
        <input
          id="email"
          className="register-form__input"
          type="email"
          autoComplete="email"
          {...register("email", {
            required: "El email es obligatorio",
            maxLength: {
              value: 50,
              message: "El email no puede tener más de 50 caracteres"
            },
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message:
                "Introduce un email válido, por ejemplo: usuario@dominio.com"
            }
          })}
        />
      </label>
      <label className="register-form__label" htmlFor="password">
        Contraseña
        <input
          id="password"
          className="register-form__input"
          type="password"
          autoComplete="new-password"
          {...register("password", {
            required: "La contraseña es obligatoria",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: "Mínimo 8 caracteres, al menos una letra y un número"
            }
          })}
        />
      </label>
      <label className="register-form__label" htmlFor="confirmPassword">
        Repetir contraseña
        <input
          id="confirmPassword"
          className="register-form__input"
          type="password"
          autoComplete="new-password"
          {...register("confirmPassword", {
            required: "Debes confirmar la contraseña",
            validate: (value) =>
              value === watch("password") || "Las contraseñas no coinciden"
          })}
        />
      </label>
      <p className="register-form__text-link">
        ¿Ya tienes cuenta?{" "}
        <UnderlineLink to="/auth?mode=login">Inicia sesión</UnderlineLink>
      </p>
      <Button type="submit" disabled={isSubmitting}>
        Registrarse
      </Button>
    </form>
  );
};

export default RegisterForm;
