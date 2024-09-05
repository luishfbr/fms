import InputMask from "react-input-mask";
import styles from "@/app/app/styles/main.module.css";

export const Core = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <InputMask
        placeholder="Prateleira"
        mask="99"
        className={styles.inputStyles}
        autoComplete="off"
        required
      />
      <InputMask
        placeholder="Caixa"
        mask="99"
        className={styles.inputStyles}
        autoComplete="off"
        required
      />
      <InputMask
        placeholder="Pasta"
        mask="99"
        className={styles.inputStyles}
        autoComplete="off"
        required
      />
    </div>
  );
};
