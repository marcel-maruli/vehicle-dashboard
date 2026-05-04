
export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  role: number;
};

export interface RegisterResponse {
  username: string
  email: string
  password: string
  role: Role
}

export interface Role {
  name: string
  id: number
}

export type UserData = {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: Role
};
