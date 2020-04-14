export interface SignIn {
  email: string;
  password: string;
}

export interface User extends SignIn {
  name: string;
}

export const SignInInitialValues = {
  email: "",
  password: "",
};

export const UserInitialValues = {
  name: "",
  email: "",
  password: "",
};
