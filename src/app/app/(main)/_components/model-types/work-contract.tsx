import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Core } from "./input-bases.tsx/core";
import { Name } from "./input-bases.tsx/name";
import { CPF } from "./input-bases.tsx/cpf";
import { Matricula } from "./input-bases.tsx/registration";
import { AddAndLogoutData } from "./input-bases.tsx/add-logout-date";
import { useForm } from "react-hook-form";
import { WorkContractProps } from "@/app/types/types";
import { saveWorkContract } from "../../_actions/dashboard";
import { useToast } from "@/app/utils/ToastContext";

interface WorkContractPropsTeste {
  ModelId: string;
  SectorId: string;
}

export const WorkContract: React.FC<WorkContractPropsTeste> = ({
  ModelId,
  SectorId,
}) => {
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkContractProps>({});

  const onSubmit = async (data: WorkContractProps) => {
    if (data.logoutDate === "") {
      data.logoutDate = "Emprego Atual";
    }
    const response = await saveWorkContract(data);
    if (response) {
      showToast("Arquivo salvo com sucesso!");
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4 mt-4 px-4">
          <input
            type="text"
            className="sr-only"
            value={ModelId}
            {...register("fileTemplateId")}
          />
          <Core register={register} />
          <Name register={register} />
          <div className="flex gap-4">
            <CPF register={register} />
            <Matricula register={register} />
          </div>
          <AddAndLogoutData register={register} />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button type="submit" className="w-full md:w-auto">
            Salvar Arquivo
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
