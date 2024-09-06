import InputMask from "react-input-mask";

import { UseFormRegister } from "react-hook-form";

import styles from "@/app/app/styles/main.module.css";

export const CNPJ = ({ register }: { register: UseFormRegister<any> }) => {
  return (
    <div className="space-y-1">
      <InputMask
        {...register("cnpj")}
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
