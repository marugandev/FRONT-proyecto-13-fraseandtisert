import "./Profile.css";

import { useEffect } from "react";
import { useAuth } from "../../../context/Auth/useAuth";
import { Navigate } from "react-router-dom";
import useModal from "../../../context/Modal/useModal";
import UserForm from "../../molecules/UserForm/UserForm";

const Profile = () => {
  const { user, isAuthLoading } = useAuth();
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    if (isAuthLoading) {
      openModal("loader");
    } else {
      closeModal();
    }
  }, [isAuthLoading, openModal, closeModal]);

  if (isAuthLoading) return null;

  if (!user) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  return (
    <section className="site-profile">
      <h2 className="site-profile__title">Mi Perfil</h2>
      <UserForm />
    </section>
  );
};

export default Profile;
