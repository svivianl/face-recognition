import { ReactNode } from "react";
import { User, SignIn } from "../../../types";

interface FormViewProps {
  name: string;
  buttonText: string;
  buttonDisabled: boolean;
  user: User | SignIn;
  inputError: User | SignIn;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: ReactNode;
}

export default FormViewProps;
