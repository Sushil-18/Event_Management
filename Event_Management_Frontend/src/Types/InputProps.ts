export default interface InputProps {
  labelName: string;
  inputType: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
