import type { User } from "./auth/user";

export type UserFormProps = {
  selectedUser?: User;
  isAdminMode?: boolean;
  onUserUpdated?: () => void;
};
