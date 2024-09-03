import InputMask from "react-input-mask";
import { UseFormRegister } from "react-hook-form";
import styles from "@/app/app/styles/main.module.css";
import { PointArchiveProps, WorkContractProps } from "@/app/types/types";

interface RegistrationProps {
  register: UseFormRegister<WorkContractProps | PointArchiveProps>;
}

export const Matricula: React.FC<RegistrationProps> = ({ register }) => {
  return (
    <div className="space-y-1">
      <InputMask
        className={styles.inputStyles}
        placeholder="Matrícula"
        type="text"
        mask="999"
        id="registration"
        {...register("registration")}
        autoComplete="off"
        required
      />
    </div>
  );
};
