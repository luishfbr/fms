import { WorkContractProps, PointArchiveProps } from "@/app/types/types";
import { Input } from "@/components/ui/input";
import { UseFormRegister } from "react-hook-form";

interface NameProps {
  register: UseFormRegister<WorkContractProps | PointArchiveProps>;
}

export const Name: React.FC<NameProps> = ({ register }) => {
  return (
    <div>
      <div className="space-y-1">
        <Input
          className="text-center w-full"
          placeholder="Nome Completo"
          type="text"
          id="name"
          autoComplete="off"
          {...register("name")}
          required
        />
      </div>
    </div>
  );
};
