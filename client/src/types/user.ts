export interface SignIn {
  email: string;
  password: string;
}

export interface Register extends SignIn {
  name: string;
}

export interface User {
  name?: string;
  email?: string;
  password?: string;
  entries?: BigInteger;
  token?: string;
}

export interface Token {
  token: string;
}
