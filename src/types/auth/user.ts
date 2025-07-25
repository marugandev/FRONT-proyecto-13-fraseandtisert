export type User = {
  _id: string;
  userName: string;
  email?: string;
  password?: string;
  role?: "user" | "admin";
  profileImage?: string;
  favoriteProducts?: [];
};
