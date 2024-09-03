import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Core } from "./input-bases.tsx/core";
import { useForm } from "react-hook-form";
import { Name } from "./input-bases.tsx/name";
import { CPF } from "./input-bases.tsx/cpf";
import { Matricula } from "./input-bases.tsx/registration";
import { Month } from "./input-bases.tsx/month";
import { Year } from "./input-bases.tsx/year";
import { PointArchiveProps } from "@/app/types/types";

export const PointArchive = () => {
  const { register, handleSubmit } = useForm<PointArchiveProps>();

  const onSubmit = (data: PointArchiveProps) => {
    console.log(data);
  };
  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4 mt-4">
          <Core register={register} />
          <Name register={register} />
          <div className="flex gap-4">
            <CPF register={register} />
            <Matricula register={register} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Month register={register} />
            <Year register={register} />
          </div>
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
