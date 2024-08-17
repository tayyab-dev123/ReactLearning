import styles from "./Button.module.css";
export const Button = ({ onClick, type, children }) => {
  return (
    <div onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </div>
  );
};
