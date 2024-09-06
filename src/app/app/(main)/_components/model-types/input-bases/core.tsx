import InputMask from "react-input-mask";
import styles from "@/app/app/styles/main.module.css";

export const Core = ({ register }: { register: any }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <InputMask
        placeholder="Prateleira"
        {...register("shelf")}
        mask="99"
        className={styles.inputStyles}
        autoComplete="off"
        required
      />
      <InputMask
        placeholder="Caixa"
        {...register("box")}
        mask="99"
        className={styles.inputStyles}
        autoComplete="off"
        required
      />
      <InputMask
        placeholder="Pasta"
        {...register("folder")}
        mask="99"
        className={styles.inputStyles}
        autoComplete="off"
        required
      />
    </div>
  );
};
