import ButtonProps from "../Types/ButtonProps";

const Button: React.FC<ButtonProps> = ({ buttonName, styles, onClick }) => {
  return (
    <>
      <button className={styles} onClick={onClick}>
        {buttonName}
      </button>
    </>
  );
};

export default Button;
