import type { User } from "./user";
import type { RegisterReq } from "./register";
import type { LoginReq } from "./login";

export type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  registerUser: (data: RegisterReq) => Promise<void>;
  loginUser: (data: LoginReq) => Promise<void>;
  logoutUser: () => void;
  isAuthLoading: boolean;
};
