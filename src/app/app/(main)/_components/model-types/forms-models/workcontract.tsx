import { WorkContractProps } from "@/app/types/types";
import { useForm } from "react-hook-form";
import { AddAndLogoutData } from "../input-bases/add-logout-date";
import { Core } from "../input-bases/core";
import { CPF } from "../input-bases/cpf";
import { Name } from "../input-bases/name";
import { Matricula } from "../input-bases/registration";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getValuesModel, saveWorkContract } from "../../../_actions/dashboard";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/app/utils/ToastContext";

interface Value {
  name: string | null;
}

export const ForWorkContract = () => {
  const { showToast } = useToast();
  const { register, handleSubmit, reset } = useForm<WorkContractProps>({
    defaultValues: {
      logoutDate: "",
    },
  });
  const [value, setValue] = useState<Value[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const id = "cm0nusud6000025u0xmv5qiyf";

  const ValuesByidModel = async () => {
    const response = await getValuesModel(id);
    setValue(response);
  };

  const onSubmit = async (data: WorkContractProps) => {
    if (data.logoutDate === "") {
      data.logoutDate = "Ainda empregado";
    }
    const response = await saveWorkContract(data, id);
    if (response) {
      showToast("Arquivo salvo com sucesso");
    }
    reset();
  };

  useEffect(() => {
    ValuesByidModel();
  }, []);

  const filteredNames = value?.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <form
        className="flex flex-col m-4 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex gap-4">
          <Core register={register} />
          <Matricula register={register} />
        </div>
        <Name register={register} />
        <CPF register={register} />
        <AddAndLogoutData register={register} />
        <div className="flex justify-center">
          <Button type="submit">Criar Arquivo</Button>
        </div>
      </form>

      <Card className="m-4">
        <div className="flex flex-col gap-4 m-4 text-center items-center">
          <Input
            className="w-60"
            placeholder="Pesquise pelo nome"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ScrollArea className="max-h-80">
            <div className="w-full mt-4">
              {filteredNames?.length ? (
                filteredNames.map((name, index) => (
                  <div key={index}>
                    <span className="text-sm text-muted-foreground">
                      {name.name}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-sm text-muted-foreground">
                  Nenhum nome encontrado
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </Card>
    </div>
  );
};
