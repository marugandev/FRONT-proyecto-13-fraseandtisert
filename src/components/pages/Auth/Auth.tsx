import "./Auth.css";

import { useNavigate, useSearchParams } from "react-router-dom";
import AuthWrapper from "../../molecules/AuthWrapper/AuthWrapper";
import LoginForm from "../../molecules/LoginForm/LoginForm";
import RegisterForm from "../../molecules/RegisterForm/RegisterForm";
import { useEffect } from "react";
import { useAuth } from "../../../context/Auth/useAuth";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const mode = searchParams.get("mode");

  const { user, isAuthLoading } = useAuth();

  useEffect(() => {
    if (isAuthLoading) return;

    if (user) navigate("/", { replace: true });
    if (!mode) navigate("/auth?mode=login", { replace: true });
  }, [user, mode, navigate, isAuthLoading]);

  if (isAuthLoading || user || !mode) return null;

  return (
    <AuthWrapper>
      {mode === "login" ? <LoginForm /> : <RegisterForm />}
    </AuthWrapper>
  );
};

export default Auth;
