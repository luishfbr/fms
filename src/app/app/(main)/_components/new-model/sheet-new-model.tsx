import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getSectorByUserId } from "../../_actions/dashboard";
import { MoveDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Sectors {
  id: string;
  name: string;
}

interface FormData {
  modelName: string;
  value: string;
}

function getIdFromInputType(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "-");
}

export function SheetNewModel({ id }: { id: string }) {
  const [sectors, setSectors] = useState<Sectors[]>([]);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const { register, handleSubmit, watch } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const getSectorsById = async (id: string) => {
    const response = await getSectorByUserId(id);
    if (response) {
      setSectors(response);
    }
  };

  useEffect(() => {
    getSectorsById(id);
  }, [id]);

  const watchedValue = watch("value", "");
  const fieldId = getIdFromInputType(watchedValue);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"edit"}>Criar Modelo</Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Crie um novo modelo</SheetTitle>
          <SheetDescription>Primeiro selecione o setor.</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 items-center justify-center text-center m-4">
          <Select onValueChange={(value) => setSelectedSector(value)}>
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="Selecione um Setor" />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((sector) => (
                <SelectItem key={sector.id} value={sector.id}>
                  {sector.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedSector && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4 items-center justify-center text-center">
                <MoveDown className="w-8 h-8" />
                <div className="flex flex-col gap-2">
                  <Label>Qual o nome do modelo?</Label>
                  <Input
                    {...register("modelName")}
                    className="text-center"
                    type="text"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button type="button">Campo de Texto</Button>
                  <Button type="button">Texto com Máscara</Button>
                  <Button type="button">Descrição</Button>
                  <Button type="button">Menu de Seleção</Button>
                </div>
                <ScrollArea className="max-h-[560px] h-[600px]">
                  <div className="flex flex-col gap-2">
                    <Input
                      {...register("value")}
                      type="text"
                      placeholder="Valor do campo de texto?"
                    />
                    <Input
                      className="text-center"
                      type="text"
                      value={fieldId}
                      readOnly
                    />
                  </div>
                </ScrollArea>
                <Button type="submit">Criar Modelo</Button>
              </div>
            </form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
