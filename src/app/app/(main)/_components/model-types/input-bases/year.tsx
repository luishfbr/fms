import InputMask from "react-input-mask";
import styles from "@/app/app/styles/main.module.css";

export const Year = ({ register }: { register: any }) => {
  return (
    <div>
      <div className="space-y-1">
        <InputMask
          {...register("year")}
          placeholder="Ano"
          type="text"
          mask="9999"
          id="year"
          autoComplete="off"
          className={styles.inputStyles}
          required
        />
      </div>
    </div>
  );
};
