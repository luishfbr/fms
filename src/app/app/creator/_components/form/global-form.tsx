import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { InputBaseProps, WorkContractProps } from "@/app/types/types";
import { AddAndLogoutData } from "@/app/app/(main)/_components/model-types/input-bases/add-logout-date";
import { CNPJ } from "@/app/app/(main)/_components/model-types/input-bases/cnpj";
import { Core } from "@/app/app/(main)/_components/model-types/input-bases/core";
import { CPF } from "@/app/app/(main)/_components/model-types/input-bases/cpf";
import { EnterpriseName } from "@/app/app/(main)/_components/model-types/input-bases/enterprise-name";
import { Month } from "@/app/app/(main)/_components/model-types/input-bases/month";
import { Name } from "@/app/app/(main)/_components/model-types/input-bases/name";
import { Matricula } from "@/app/app/(main)/_components/model-types/input-bases/registration";
import { Year } from "@/app/app/(main)/_components/model-types/input-bases/year";

interface Models {
  id: string;
  modelName: string | null;
}

export const GlobalForm = ({
  selectedModel,
}: {
  selectedModel: Models | null;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputBaseProps>({});

  const onSubmit = (data: InputBaseProps) => {
    console.log(data);
    reset();
  };

  return (
    <Card className="p-6">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <CardHeader className="flex items-center justify-between gap-4">
          <CardTitle>Crie seu novo arquivo</CardTitle>
          <CardDescription>
            Setor selecionado:{" "}
            <span className="text-background bg-muted-foreground px-4 py-2 rounded-sm">
              {selectedModel?.modelName}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <Core register={register} />
          <Name register={register} />
          <EnterpriseName register={register} />
          <CPF register={register} />
          <CNPJ register={register} />
          <Matricula register={register} />
          <Month register={register} />
          <Year register={register} />
          <AddAndLogoutData register={register} />
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <Button type="submit" className="w-full md:w-auto">
            Salvar Arquivo
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
