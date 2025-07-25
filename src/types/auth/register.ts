export type RegisterReq = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegisterRes = {
  status: "success";
  message: string;
  user: {
    _id: string;
    userName: string;
    email: string;
    role: string;
    profileImage?: string;
  };
  token: string;
  expiresIn: number;
};
