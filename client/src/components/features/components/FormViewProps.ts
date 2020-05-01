import { ReactNode } from "react";
import { UserBody, SignIn } from "../../../types";

interface FormViewProps {
  name: string;
  buttonText: string;
  buttonDisabled: boolean;
  user: UserBody | SignIn;
  inputError?: UserBody | SignIn;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: ReactNode;
}

export default FormViewProps;
