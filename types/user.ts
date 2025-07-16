export type User = {
  id: string;
  email: string;
  username?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface EditUser {
  username: string;
  email: string;
};

export type ServerBoolResponse = {
  success: boolean
};

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};