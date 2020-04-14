import { User, SignIn } from "./user";

export const handleRegisterErrors = (user: User) => {
  const { name, email, password } = user;
  let errorMessages = {} as User;
  let error = false;

  if (!name) {
    errorMessages["name"] = "Please insert your name";
    error = true;
  }

  const {
    error: singinError,
    errorMessages: singinErrorMessages,
  } = handleSignInErrors({ email, password });
  if (singinError) {
    error = true;
    errorMessages = { ...errorMessages, ...singinErrorMessages };
  }
  return { error, errorMessages };
};

export const handleSignInErrors = (user: SignIn) => {
  const { email, password } = user;
  const errorMessages = {} as SignIn;
  let error = false;

  if (!email) {
    errorMessages["email"] = "Please insert your email address";
    error = true;
  }
  if (!password) {
    errorMessages["password"] = "Please insert a password";
    error = true;
  }

  return { error, errorMessages };
};
