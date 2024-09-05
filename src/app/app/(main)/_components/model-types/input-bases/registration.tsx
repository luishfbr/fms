import InputMask from "react-input-mask";
import styles from "@/app/app/styles/main.module.css";

export const Matricula = () => {
  return (
    <div className="space-y-1">
      <InputMask
        className={styles.inputStyles}
        placeholder="Matrícula"
        type="text"
        mask="999"
        id="registration"
        autoComplete="off"
        required
      />
    </div>
  );
};
