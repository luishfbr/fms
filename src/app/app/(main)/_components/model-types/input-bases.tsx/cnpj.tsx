import InputMask from "react-input-mask";

import { UseFormRegister } from "react-hook-form";
import { WorkContractProps } from "../work-contract";

import styles from "@/app/app/styles/main.module.css";

interface CnpjProps {
  register: UseFormRegister<WorkContractProps>;
}

export const CNPJ: React.FC<CnpjProps> = ({ register }) => {
  return (
    <div className="space-y-1">
      <InputMask
        placeholder="CNPJ"
        type="text"
        mask="99.999.999/9999-99"
        className={styles.inputStyles}
        {...register("cnpj")}
        autoComplete="off"
        required
      />
    </div>
  );
};
