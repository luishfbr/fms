import InputMask from "react-input-mask";
import styles from "@/app/app/styles/main.module.css";

import { UseFormRegister } from "react-hook-form";
import { PointArchiveProps, WorkContractProps } from "@/app/types/types";

interface CoreProps {
  register: UseFormRegister<WorkContractProps | PointArchiveProps>;
}

export const Core: React.FC<CoreProps> = ({ register }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <InputMask
        {...register("shelf")}
        placeholder="Prateleira"
        mask="99"
        className={styles.inputStyles}
        autoComplete="off"
        required
      />
      <InputMask
        {...register("box")}
        placeholder="Caixa"
        mask="99"
        className={styles.inputStyles}
        autoComplete="off"
        required
      />
      <InputMask
        {...register("folder")}
        placeholder="Pasta"
        mask="99"
        className={styles.inputStyles}
        autoComplete="off"
        required
      />
    </div>
  );
};
