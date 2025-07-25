import "./Admin.css";

import { useEffect, useState, useCallback } from "react";
import { getTokenFromLocalStorage } from "../../../utils/authLocalStorage";
import useModal from "../../../context/Modal/useModal";
import UserForm from "../../molecules/UserForm/UserForm";
import type { User } from "../../../types/auth/user";
import { getAllUsers } from "../../../api/user/getAllUsers";

const Admin = () => {
  const { openModal, closeModal } = useModal();

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleGetAllUsers = useCallback(async () => {
    try {
      openModal("loader");
      const token = getTokenFromLocalStorage();
      if (!token) {
        closeModal();
        openModal(
          "info",
          "Token no encontrado. Inicia sesión de nuevo.",
          "error"
        );
        return;
      }

      const res = await getAllUsers(token);
      closeModal();

      if (res.status === "success") {
        const sortedUsers = res.data
          .slice()
          .sort((a, b) => a.userName.localeCompare(b.userName));
        setUsers(sortedUsers);

        if (sortedUsers.length > 0) {
          setSelectedUserId(sortedUsers[0]._id || null);
          setSelectedUser(sortedUsers[0]);
        }
      } else {
        openModal(
          "info",
          res.message || "Error al cargar los usuarios",
          "error"
        );
      }
    } catch (error) {
      console.error(error);
      closeModal();
      openModal("info", "Error interno al cargar los usuarios", "error");
    }
  }, [openModal, closeModal]);

  useEffect(() => {
    handleGetAllUsers();
  }, [handleGetAllUsers]);

  useEffect(() => {
    if (selectedUserId) {
      const userFound =
        users.find((user) => user._id === selectedUserId) || null;
      setSelectedUser(userFound);
    }
  }, [selectedUserId, users]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(e.target.value);
  };

  return (
    <section className="site-admin-panel">
      <h2 className="site-admin-panel__title">
        ⚡️ Panel de admin - Gestión de usuarios
      </h2>
      <label className="site-admin-panel__label" htmlFor="user-select">
        Seleccionar usuario:
        <select
          className="site-admin-panel__select"
          id="user-select"
          value={selectedUserId ?? ""}
          onChange={handleChange}
        >
          {users?.map((user) => (
            <option key={user._id} value={user._id}>
              {user.userName}
            </option>
          ))}
        </select>
      </label>

      {selectedUser && (
        <UserForm
          selectedUser={selectedUser}
          isAdminMode
          onUserUpdated={handleGetAllUsers}
        />
      )}
    </section>
  );
};

export default Admin;
