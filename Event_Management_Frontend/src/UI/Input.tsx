import InputProps from "../Types/InputProps";

const Input: React.FC<InputProps> = ({ labelName, inputType, onChange }) => {
  return (
    <>
      <label htmlFor="">{labelName}</label>
      <input type={inputType} onChange={onChange} />
    </>
  );
};

export default Input;
