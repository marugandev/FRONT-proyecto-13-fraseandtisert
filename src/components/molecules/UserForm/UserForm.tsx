import "./UserForm.css";

import { useAuth } from "../../../context/Auth/useAuth";
import { useForm, type FieldErrors } from "react-hook-form";
import type { User } from "../../../types/auth/user";
import useModal from "../../../context/Modal/useModal";
import Button from "../../atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import { putUser } from "../../../api/user/putUser";
import { deleteUser } from "../../../api/user/deleteUser";
import { getTokenFromLocalStorage } from "../../../utils/authLocalStorage";
import type { UserFormProps } from "../../../types/user-form";
import { useEffect, useState } from "react";

const UserForm = ({
  selectedUser,
  isAdminMode = false,
  onUserUpdated
}: UserFormProps) => {
  const { user, logoutUser, setUser } = useAuth();
  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const editableUser = isAdminMode ? selectedUser : user;

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitting }
  } = useForm<Partial<User>>({
    defaultValues: {
      userName: "",
      email: "",
      password: "********",
      role: "user"
    }
  });

  useEffect(() => {
    if (editableUser) {
      reset({
        userName: editableUser.userName ?? "",
        email: editableUser.email ?? "",
        password: "********",
        role: editableUser.role ?? "user"
      });
      setPreviewImage(editableUser.profileImage || null);
      setFile(null);
    }
  }, [editableUser, reset]);

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    if (newFile) {
      setFile(newFile);
      setPreviewImage(URL.createObjectURL(newFile));
    }
  };

  const onValid = async (data: Partial<User>) => {
    if (!editableUser) return;

    try {
      openModal("loader");

      const formData = new FormData();
      if (data.userName) formData.append("userName", data.userName);
      if (data.email) formData.append("email", data.email);
      if (data.password && data.password !== "********") {
        formData.append("password", data.password);
      }
      if (isAdminMode && typeof data.role === "string") {
        formData.append("role", data.role);
      }
      if (file) formData.append("profileImage", file);

      const token = getTokenFromLocalStorage();
      if (!token) {
        closeModal();
        await sleep(1600);
        openModal(
          "info",
          "Token no encontrado. Inicia sesión de nuevo.",
          "error"
        );
        return;
      }

      const res = await putUser(editableUser._id, formData, token);

      closeModal();
      await sleep(1600);

      if (res.status === "success") {
        openModal("info", "Usuario actualizado", "success");

        if (onUserUpdated) onUserUpdated();

        if (!isAdminMode && res.data) {
          setUser(res.data);
        }
      } else {
        openModal("info", res.message || "Error al actualizar", "error");
      }
    } catch (error) {
      console.error(error);
      closeModal();
      await sleep(1600);
      openModal("info", "Error interno al actualizar", "error");
    }
  };

  const onInvalid = (formErrors: FieldErrors<Partial<User>>) => {
    const errorMessage =
      formErrors.userName?.message ||
      formErrors.email?.message ||
      formErrors.password?.message ||
      "Completa todos los campos requeridos";
    openModal("info", errorMessage, "error");
  };

  const handleUpdate = () => {
    const values = getValues();
    if (
      values.userName?.trim() ||
      values.email?.trim() ||
      values.password !== "********" ||
      (isAdminMode && values.role) ||
      file
    ) {
      openModal("confirm", "¿Deseas guardar los cambios?", "warning", () =>
        handleSubmit(onValid, onInvalid)()
      );
    } else {
      openModal("info", "No hay cambios para guardar", "warning");
    }
  };

  const handleLogout = () => {
    openModal("confirm", "¿Deseas cerrar la sesión?", "warning", () =>
      logoutUser()
    );
  };

  const handleDeleteUser = () => {
    if (!editableUser) return;

    openModal(
      "confirm",
      `¿Eliminar a ${editableUser.userName}?`,
      "warning",
      async () => {
        try {
          openModal("loader");
          const token = getTokenFromLocalStorage();
          if (!token) {
            closeModal();
            await sleep(1600);
            openModal("info", "Token no encontrado", "error");
            return;
          }

          const res = await deleteUser(editableUser._id!, token);
          closeModal();
          await sleep(1600);

          if (res.status === "success") {
            openModal("info", "Usuario eliminado", "success");

            if (onUserUpdated) onUserUpdated();

            if (!isAdminMode) {
              logoutUser();
              navigate("/auth?mode=register");
            }
          } else {
            openModal("info", res.message || "Error al eliminar", "error");
          }
        } catch {
          closeModal();
          await sleep(1600);
          openModal("info", "Error al eliminar usuario", "error");
        }
      }
    );
  };

  if (!editableUser) return null;

  return (
    <form className="user-form" noValidate>
      <div className="user-form__wrapper">
        <div className="user-form__wrapper-left">
          <fieldset className="user-form__fieldset">
            <label className="user-form__label">
              Nombre de usuario:
              <input
                {...register("userName", {
                  minLength: {
                    value: 3,
                    message: "Debe tener al menos 3 caracteres"
                  },
                  maxLength: {
                    value: 20,
                    message: "Máximo 20 caracteres"
                  }
                })}
                className="user-form__input"
              />
            </label>
          </fieldset>
          <fieldset className="user-form__fieldset">
            <label className="user-form__label">
              Email:
              <input
                type="email"
                {...register("email", {
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Introduce un email válido"
                  },
                  maxLength: {
                    value: 50,
                    message: "Máximo 50 caracteres"
                  }
                })}
                className="user-form__input"
              />
            </label>
          </fieldset>
          <fieldset className="user-form__fieldset">
            <label className="user-form__label">
              Contraseña:
              <input
                type="password"
                {...register("password", {
                  validate: (value) =>
                    !value ||
                    value === "********" ||
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ||
                    "Mínimo 8 caracteres, una letra y un número"
                })}
                className="user-form__input"
              />
            </label>
          </fieldset>

          {isAdminMode && (
            <fieldset className="user-form__fieldset">
              <label className="user-form__label">
                Role:
                <select {...register("role")} className="user-form__input">
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </label>
            </fieldset>
          )}
        </div>

        <div className="user-form__wrapper-rigth">
          <fieldset className="user-form__fieldset user-form__fieldset-file">
            <label className="user-form__label user-form__label-file">
              Imagen de perfil:
              <span className="user-form__span-file">Subir imagen</span>
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="user-form__input user-form__input-file"
              />
            </label>
            {previewImage && (
              <div className="user-form__wrapper-img">
                <img
                  className="user-form__img"
                  src={previewImage}
                  alt="preview perfil"
                />
              </div>
            )}
          </fieldset>
        </div>
      </div>

      <div className="user-form__buttons">
        <Button type="button" onClick={handleUpdate} disabled={isSubmitting}>
          Guardar cambios
        </Button>

        {!isAdminMode && (
          <Button type="button" onClick={handleLogout} variant="secondary">
            Cerrar sesión
          </Button>
        )}

        <Button type="button" onClick={handleDeleteUser} variant="accent-red">
          Eliminar cuenta
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
