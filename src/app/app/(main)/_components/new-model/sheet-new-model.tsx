import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState, useCallback } from "react";
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

const getIdFromInputType = (input: string): string => {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "");
};

export function SheetNewModel({ id }: { id: string }) {
  const { showToast } = useToast();
  const [sectors, setSectors] = useState<Sectors[]>([]);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const [disabledFields, setDisabledFields] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormDataProps>();

  const addField = useCallback((fieldValue: string, fieldType: keyof typeof FieldType) => {
    const newField: Field = {
      id: getIdFromInputType(fieldValue),
      value: fieldValue,
      type: fieldType,
    };
    setFields((prevFields) => [...prevFields, newField]);
    setDisabledFields((prev) => ({ ...prev, [fieldType]: true }));
  }, []);

  const removeField = useCallback((fieldId: string, fieldType: string) => {
    setFields((prevFields) => prevFields.filter((field) => field.id !== fieldId));
    setDisabledFields((prev) => ({ ...prev, [fieldType]: false }));
  }, []);

  const onSubmit = useCallback(async (data: FormDataProps) => {
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
      sectorId: selectedSector,
      fields: fields,
    };

    try {
      const newModel = await createNewModel(formData);
      if (newModel) {
        showToast("Modelo criado com sucesso!");
        resetForm();
        setIsOpen(false);
      }
    } catch (error) {
      showToast("Erro ao criar modelo. Por favor, tente novamente.");
      console.error("Error creating model:", error);
    }
  }, [fields, selectedSector, showToast, reset]);

  const resetForm = useCallback(() => {
    reset();
    setFields([]);
    setDisabledFields({});
    setSelectedSector(null);
  }, [reset]);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await getSectorByUserId(id);
        if (response) {
          setSectors(response);
        }
      } catch (error) {
        console.error("Error fetching sectors:", error);
        showToast("Erro ao carregar setores. Por favor, tente novamente.");
      }
    };

    fetchSectors();
  }, [id, showToast]);

  const handleSheetOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    setIsOpen(open);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <Button variant="edit">Criar Modelo</Button>
      </SheetTrigger>
      <SheetContent side="left">
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
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="flex flex-col gap-4 items-center justify-center text-center">
                <MoveDown className="w-8 h-8" />
                <div className="flex flex-col gap-2 w-full">
                  <Label htmlFor="modelName">Nome do modelo</Label>
                  <Input
                    id="modelName"
                    {...register("modelName")}
                    className="text-center"
                    type="text"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 w-full">
                  {fieldTypes.map((fieldType) => (
                    <Button
                      key={fieldType.type}
                      type="button"
                      onClick={() => addField(fieldType.label, fieldType.type)}
                      disabled={disabledFields[fieldType.type]}
                    >
                      {fieldType.label}
                    </Button>
                  ))}
                </div>

                <ScrollArea className="w-full max-h-[300px] h-96">
                  {fields.length > 0 && (
                    <div className="flex flex-col gap-2 m-2">
                      {fields.map((field) => (
                        <div
                          key={field.id}
                          className="flex items-center justify-between bg-secondary p-2 rounded"
                        >
                          <span>{field.value}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeField(field.id, field.type)}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
                <Button type="submit" className="w-full">Criar Modelo</Button>
              </div>
            </form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
