export interface SignIn {
  email: string;
  password: string;
}

export interface Register extends SignIn {
  name: string;
}

export interface UserBody {
  name?: string;
  email?: string;
  password?: string;
  entries?: BigInteger;
}

export interface User extends UserBody {
  id: number;
}

export interface Token {
  token: string;
  id: number;
}
