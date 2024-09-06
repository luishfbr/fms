import InputMask from "react-input-mask";
import styles from "@/app/app/styles/main.module.css";

export const CPF = ({ register }: { register: any }) => {
  return (
    <div className="space-y-1">
      <InputMask
        {...register("cpf")}
        placeholder="CPF"
        type="text"
        mask="999-999-999/99"
        className={styles.inputStyles}
        autoComplete="off"
        required
      />
    </div>
  );
};
