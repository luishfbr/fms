import { PointArchiveProps, WorkContractProps } from "@/app/types/types";
import { Input } from "@/components/ui/input";
import { UseFormRegister } from "react-hook-form";

interface EnterpriseNameProps {
  register: UseFormRegister<WorkContractProps | PointArchiveProps>;
}

export const EnterpriseName: React.FC<EnterpriseNameProps> = ({ register }) => {
  return (
    <div>
      <div className="space-y-1">
        <Input
          className="text-center w-full"
          placeholder="Nome da Empresa"
          type="text"
          id="name"
          autoComplete="off"
          {...register("enterpriseName")}
          required
        />
      </div>
    </div>
  );
};
