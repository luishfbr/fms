import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import InputMask from "react-input-mask";
import styles from "@/app/app/styles/main.module.css";

export const AddAndLogoutData = ({ register }: { register: any }) => {
  const [isEmployed, setIsEmployed] = useState(false);

  const handleCheckboxChange = (event: any) => {
    setIsEmployed(event.target.checked);
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center text-center space-x-2">
        <Label className="text-sm text-muted-foreground" htmlFor="actuality">
          Ainda empregado?
        </Label>
        <Input
          className="h-4 w-4 cursor-pointer"
          type="checkbox"
          id="actuality"
          name="actuality"
          checked={isEmployed}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <InputMask
            {...register("addData")}
            mask="99/99/9999"
            className={styles.inputStyles}
            placeholder="Data de Admissão"
            type="text"
            id="addData"
            autoComplete="off"
            required
          />
        </div>
        <div className="space-y-1">
          <InputMask
            {...register("logoutDate")}
            mask="99/99/9999"
            className={styles.inputStyles}
            placeholder="Data de Rescisão"
            type="text"
            id="logoutDate"
            autoComplete="off"
            disabled={isEmployed}
          />
        </div>
      </div>
    </div>
  );
};
