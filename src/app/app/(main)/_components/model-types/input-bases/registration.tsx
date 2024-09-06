import InputMask from "react-input-mask";
import styles from "@/app/app/styles/main.module.css";

export const Matricula = ({ register }: { register: any }) => {
  return (
    <div className="space-y-1">
      <InputMask
        {...register("registration")}
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
