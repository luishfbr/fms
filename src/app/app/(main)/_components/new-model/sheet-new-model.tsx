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
import { createNewModel, getSectorByUserId } from "../../_actions/dashboard";
import { MoveDown, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SectorSelect } from "./_components/sector-select";
import { useToast } from "@/app/utils/ToastContext";
import { FieldType } from "@prisma/client";

const fieldTypes: { label: string; type: keyof typeof FieldType }[] = [
  { label: "Nome Completo", type: "nomecompleto" },
  { label: "CPF", type: "cpf" },
  { label: "CNPJ", type: "cnpj" },
  { label: "Data de Admissão", type: "datadeadmissao" },
  { label: "Data de Rescisão", type: "dataderecisao" },
  { label: "Data", type: "data" },
  { label: "Dia", type: "dia" },
  { label: "Mês", type: "mes" },
  { label: "Ano", type: "ano" },
];

export interface Sectors {
  id: string;
  name: string;
}

export interface Field {
  id: string;
  value: string;
  type: keyof typeof FieldType;
}

export interface FormDataProps {
  modelName: string;
  fields: Field[];
}

function getIdFromInputType(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "");
}

export function SheetNewModel({ id }: { id: string }) {
  const { showToast } = useToast();
  const [sectors, setSectors] = useState<Sectors[]>([]);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const [disabledFields, setDisabledFields] = useState<{
    [key: string]: boolean;
  }>({});

  const { register, handleSubmit, reset } = useForm<FormDataProps>();

  const getValuesAndSetFields = (
    label: string,
    type: keyof typeof FieldType
  ) => {
    const id = getIdFromInputType(label);
    addField(label, type);
  };

  const onSubmit = async (data: FormDataProps) => {
    if (!data.modelName || data.modelName.length <= 0) {
      return showToast("Você deve inserir um nome para o modelo.");
    }
    if (fields.length <= 0) {
      return showToast("Você deve adicionar pelo menos um campo.");
    }
    if (!selectedSector) {
      return showToast("Você deve selecionar um setor.");
    }

    const formData = {
      modelName: data.modelName,
      sectorId: selectedSector, // Certifique-se de que o setor está selecionado
      fields: fields,
    };

    const newModel = await createNewModel(formData);
    if (newModel) {
      showToast("Modelo criado com sucesso!");
      reset(); // Reseta o formulário após a criação
    } else {
      showToast("Erro ao criar modelo. Por favor, tente novamente.");
    }
  };

  const getSectorsById = async (id: string) => {
    const response = await getSectorByUserId(id);
    if (response) {
      setSectors(response);
    }
  };

  const addField = (fieldValue: string, fieldType: keyof typeof FieldType) => {
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
                      key={fieldType.label}
                      type="button"
                      onClick={() =>
                        getValuesAndSetFields(fieldType.label, fieldType.type)
                      }
                      disabled={
                        disabledFields[getIdFromInputType(fieldType.label)]
                      }
                    >
                      {fieldType.label}
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
