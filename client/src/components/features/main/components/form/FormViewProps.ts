interface FormViewProps {
  buttonText: string;
  buttonDisabled: boolean;
  url: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default FormViewProps;
