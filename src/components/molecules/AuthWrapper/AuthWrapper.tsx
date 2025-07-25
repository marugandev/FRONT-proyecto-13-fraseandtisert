import "./AuthWrapper.css";

import type { ReactNode } from "react";

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="auth-wrapper" aria-label="Formulario de autenticación">
      <div className="auth-wrapper__form">{children}</div>
      <div className="auth-wrapper__image" aria-hidden="true" />
    </div>
  );
};

export default AuthWrapper;
