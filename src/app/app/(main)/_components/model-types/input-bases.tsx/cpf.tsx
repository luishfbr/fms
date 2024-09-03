import InputMask from "react-input-mask";

import { UseFormRegister } from "react-hook-form";

import styles from "@/app/app/styles/main.module.css";
import { PointArchiveProps, WorkContractProps } from "@/app/types/types";

interface CpfProps {
  register: UseFormRegister<WorkContractProps | PointArchiveProps>;
}

export const CPF: React.FC<CpfProps> = ({ register }) => {
  return (
    <div className="space-y-1">
      <InputMask
        placeholder="CPF"
        type="text"
        mask="999-999-999/99"
        className={styles.inputStyles}
        {...register("cpf")}
        autoComplete="off"
        required
      />
    </div>
  );
};
