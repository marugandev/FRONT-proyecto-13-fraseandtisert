export type LoginReq = {
  email: string;
  password: string;
};

export type LoginRes = {
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
