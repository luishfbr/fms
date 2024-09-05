import InputMask from "react-input-mask";

import { UseFormRegister } from "react-hook-form";

import styles from "@/app/app/styles/main.module.css";

export const CNPJ = () => {
  return (
    <div className="space-y-1">
      <InputMask
        placeholder="CNPJ"
        type="text"
        mask="99.999.999/9999-99"
        className={styles.inputStyles}
        autoComplete="off"
        required
      />
    </div>
  );
};
