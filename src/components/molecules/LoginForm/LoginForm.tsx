import "./LoginForm.css";

import { useForm, type FieldErrors } from "react-hook-form";
import Button from "../../atoms/Button/Button";
import { useAuth } from "../../../context/Auth/useAuth";
import useModal from "../../../context/Modal/useModal";
import UnderlineLink from "../../atoms/UnderlineLink/UnderlineLink";
import type { LoginReq } from "../../../types/auth/login";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<LoginReq>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { loginUser } = useAuth();
  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const onValid = async (data: LoginReq) => {
    try {
      openModal("loader");
      await loginUser(data);
      closeModal();

      await sleep(1600);
      openModal("info", "Sesión iniciada", "success");
      navigate("/");
    } catch (error) {
      console.error(error);
      closeModal();
      await sleep(1600);
      openModal("info", "Email o contraseña incorrectos", "error");
    }
  };

  const onInvalid = (errors: FieldErrors<LoginReq>) => {
    const errorMessage =
      errors.email?.message ||
      errors.password?.message ||
      "Por favor completa todos los campos";

    openModal("info", errorMessage, "error");
  };

  return (
    <form
      className="login-form"
      onSubmit={handleSubmit(onValid, onInvalid)}
      noValidate
    >
      <label
        className="login-form__label login-form__label-email"
        htmlFor="email"
      >
        Email
        <input
          id="email"
          className="login-form__input login-form__input-email"
          type="email"
          autoComplete="email"
          {...register("email", {
            required: "El email es obligatorio",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message:
                "Introduce un email válido, por ejemplo: usuario@dominio.com"
            }
          })}
        />
      </label>
      <label
        className="login-form__label login-form__label-password"
        htmlFor="password"
      >
        Contraseña
        <input
          id="password"
          className="login-form__input login-form__input-password"
          type="password"
          autoComplete="current-password"
          {...register("password", {
            required: "La contraseña es obligatoria",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message:
                "La contraseña no es válida. Debe tener mínimo 8 caracteres, al menos una letra y un número"
            }
          })}
        />
      </label>
      <p className="login-form__text-link">
        ¿No tienes cuenta?{" "}
        <UnderlineLink to="/auth?mode=register">Regístrate</UnderlineLink>
      </p>
      <Button type="submit" disabled={isSubmitting}>
        Iniciar sesión
      </Button>
    </form>
  );
};

export default LoginForm;
