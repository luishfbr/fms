import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { getSectorByUserId } from "../../_actions/dashboard";
import { MoveDown, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SectorSelect } from "./_components/sector-select";

const fieldTypes = [
  "Nome Completo",
  "CPF",
  "CNPJ",
  "Data de Admissão",
  "Data de Rescisão",
  "Data",
  "Dia",
  "Mês",
  "Ano",
];

export interface Sectors {
  id: string;
  name: string;
}

export interface Field {
  id: string;
  value: string;
  type: string;
}

export interface FormData {
  modelName: string;
  fields: Field[];
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
  const [fields, setFields] = useState<Field[]>([]);
  const [disabledFields, setDisabledFields] = useState<{
    [key: string]: boolean;
  }>({}); // State to track disabled buttons

  const { register, handleSubmit } = useForm<FormData>();

  const getValuesAndSetFields = (value: string) => {
    const id = getIdFromInputType(value);
    addField(value, id);
  };

  const onSubmit = (data: FormData) => {
    console.log({
      ...data,
      fields,
    });
  };

  const getSectorsById = async (id: string) => {
    const response = await getSectorByUserId(id);
    if (response) {
      setSectors(response);
    }
  };

  const addField = (fieldValue: string, fieldType: string) => {
    const newField: Field = {
      id: getIdFromInputType(fieldValue),
      value: fieldValue,
      type: fieldType,
    };
    setFields((prevFields) => [...prevFields, newField]);
    setDisabledFields((prev) => ({ ...prev, [fieldType]: true })); // Disable button for this field type
  };

  const removeField = (fieldId: string, fieldType: string) => {
    setFields((prevFields) =>
      prevFields.filter((field) => field.id !== fieldId)
    );
    setDisabledFields((prev) => ({ ...prev, [fieldType]: false })); // Re-enable button for this field type
  };

  useEffect(() => {
    getSectorsById(id);
  }, [id]);

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
          <SectorSelect
            sectors={sectors}
            selectedSector={selectedSector}
            setSelectedSector={setSelectedSector}
          />

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
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {fieldTypes.map((fieldType) => (
                    <Button
                      key={fieldType}
                      type="button"
                      onClick={() => getValuesAndSetFields(fieldType)}
                      disabled={disabledFields[getIdFromInputType(fieldType)]} // Disable based on the field type
                    >
                      {fieldType}
                    </Button>
                  ))}
                </div>

                <ScrollArea className="w-64 max-h-[500px] h-[500px]">
                  {fields.length > 0 ? (
                    <div className="flex flex-col gap-2 m-2">
                      {fields.map((field) => (
                        <div
                          key={field.id}
                          className="flex items-center justify-between"
                        >
                          <span>{field.value}</span>
                          <Trash
                            className="w-5 h-5 cursor-pointer"
                            onClick={() => removeField(field.id, field.type)}
                          />
                        </div>
                      ))}
                    </div>
                  ) : null}
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
