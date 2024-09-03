import { PointArchiveProps, WorkContractProps } from "@/app/types/types";
import { Input } from "@/components/ui/input";
import { UseFormRegister } from "react-hook-form";

interface MonthProps {
  register: UseFormRegister<WorkContractProps | PointArchiveProps>;
}

export const Month: React.FC<MonthProps> = ({ register }) => {
  return (
    <div>
      <div className="space-y-1">
        <Input
          className="text-center w-full"
          placeholder="Mês"
          type="text"
          id="month"
          autoComplete="off"
          {...register("month")}
          required
        />
      </div>
    </div>
  );
};
