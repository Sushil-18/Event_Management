import InputProps from "../Types/InputProps";

const Input: React.FC<InputProps> = ({
  labelName,
  inputType,
  onChange,
  value,
  placeHolder,
  labelStyle,
  inputStyle,
}) => {
  return (
    <>
      <label className={labelStyle}>{labelName}</label>
      <input
        type={inputType}
        onChange={onChange}
        value={value}
        placeholder={placeHolder}
        className={inputStyle}
      />
    </>
  );
};

export default Input;
