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

export const WorkContract = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkContractProps>({});

  const onSubmit = (data: WorkContractProps) => {
    if (data.logoutDate === "") {
      data.logoutDate = "Emprego Atual";
    }
    console.log(data);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4 mt-4 px-4">
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
