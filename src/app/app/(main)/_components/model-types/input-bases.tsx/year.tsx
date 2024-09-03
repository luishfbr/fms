import { WorkContractProps, PointArchiveProps } from "@/app/types/types";
import InputMask from "react-input-mask";
import { UseFormRegister } from "react-hook-form";
import styles from "@/app/app/styles/main.module.css";

interface YearProps {
  register: UseFormRegister<WorkContractProps | PointArchiveProps>;
}

export const Year: React.FC<YearProps> = ({ register }) => {
  return (
    <div>
      <div className="space-y-1">
        <InputMask
          placeholder="Ano"
          type="text"
          mask="9999"
          id="year"
          autoComplete="off"
          {...register("year")}
          className={styles.inputStyles}
          required
        />
      </div>
    </div>
  );
};
