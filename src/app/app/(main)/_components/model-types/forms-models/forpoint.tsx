import { PointArchiveProps } from "@/app/types/types";
import { useForm } from "react-hook-form";
import { Core } from "../input-bases/core";
import { CPF } from "../input-bases/cpf";
import { Name } from "../input-bases/name";
import { Matricula } from "../input-bases/registration";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getValuesModel, savePointArchive } from "../../../_actions/dashboard";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/app/utils/ToastContext";
import { Month } from "../input-bases/month";
import { Year } from "../input-bases/year";

interface Value {
  name: string | null;
}

export const FormForPoint = () => {
  const { showToast } = useToast();
  const { register, handleSubmit, reset } = useForm<PointArchiveProps>();
  const [value, setValue] = useState<Value[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const id = "cm0nw1uss000125u0gdtr3oos";

  // Função para buscar os valores
  const ValuesByidModel = async () => {
    const response = await getValuesModel(id);
    setValue(response);
  };

  // Função de submit do formulário
  const onSubmit = async (data: PointArchiveProps) => {
    console.log(data);
    const response = await savePointArchive(data, id);
    if (response) {
      showToast("Arquivo salvo com sucesso");
      reset(); // Resetar o formulário
      ValuesByidModel(); // Recarregar os valores para atualizar a lista
    }
  };

  // Buscar os valores ao carregar o componente
  useEffect(() => {
    ValuesByidModel();
  }, []);

  // Filtrar os nomes com base na pesquisa
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
        <div className="flex gap-4">
          <CPF register={register} />
          <Year register={register} />
          <Month register={register} />
        </div>
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
