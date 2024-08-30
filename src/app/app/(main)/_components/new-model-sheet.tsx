"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon, TrashIcon } from "lucide-react";
import { useToast } from "@/app/utils/ToastContext";
import { createModel, getSectors } from "../_actions/dashboard";

type FieldType = "text" | "select";

interface Field {
  name: string;
  type: FieldType;
  options?: string[];
}

type Sector = {
  name: string;
  id: string;
};

export function NewModelSheet() {
  const { showToast } = useToast();
  const [modelName, setModelName] = useState<string>("");
  const [description, setDescription] = useState<string>(""); // Adicionando estado para descrição
  const [fields, setFields] = useState<Field[]>([]);
  const [currentField, setCurrentField] = useState<Field>({
    name: "",
    type: "text",
  });
  const [selectOptions, setSelectOptions] = useState<string>("");
  const [sampleData, setSampleData] = useState<any[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);

  const addField = () => {
    if (currentField.name) {
      const newField: Field = { ...currentField };
      if (newField.type === "select") {
        newField.options = selectOptions
          .split(",")
          .map((option) => option.trim());
      }
      setFields([...fields, newField]);
      setCurrentField({ name: "", type: "text" });
      setSelectOptions("");
    }
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const saveModel = async () => {
    if (modelName && fields.length > 0 && selectedSector) {
      const data = {
        name: modelName,
        description: description, // Passar descrição para a função createModel
        sectorId: selectedSector.id,
      };

      const createModelResponse = await createModel(data);
      if (createModelResponse) {
        showToast("Modelo salvo com sucesso!");
      } else {
        showToast("Erro ao salvar o modelo.");
      }
    } else {
      showToast(
        "Por favor, forneça um nome de modelo, pelo menos um campo e selecione um setor."
      );
    }
  };

  const getSector = async () => {
    const response = await getSectors();
    if (response) {
      const { sectors } = response; // Extraindo o array de setores
      setSectors(sectors); // Passar o array para setSectors
    } else {
      console.error("Falha ao obter setores.");
    }
  };

  useEffect(() => {
    const generateSampleData = () => {
      const sampleRows = [];
      for (let i = 0; i < 3; i++) {
        const row: any = {};
        fields.forEach((field) => {
          if (field.type === "text") {
            row[field.name] = `Sample ${field.name} ${i + 1}`;
          } else if (field.type === "select" && field.options) {
            row[field.name] = field.options[i % field.options.length];
          }
        });
        sampleRows.push(row);
      }
      setSampleData(sampleRows);
    };

    generateSampleData();
  }, [fields]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button onClick={() => getSector()}>Criar Novo Modelo</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Crie um novo modelo</SheetTitle>
          <SheetDescription>
            Selecione o setor para liberar as opções de criação.
          </SheetDescription>
        </SheetHeader>
        <div className="flex items-center justify-center my-4">
          <Select
            onValueChange={(value) => {
              const sector = sectors.find((sector) => sector.id === value);
              setSelectedSector(sector || null);
            }}
          >
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="Selecione um setor" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sectors.map((sector) => (
                  <SelectItem key={sector.id} value={sector.id}>
                    {sector.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {selectedSector && (
          <div className="space-y-6 p-4">
            <div className="space-y-4">
              <Input
                placeholder="Nome do Modelo"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
              />
              <Input
                placeholder="Descrição do Modelo" // Campo de descrição adicionado
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="flex space-x-2">
                <Input
                  placeholder="Nome do Campo"
                  value={currentField.name}
                  onChange={(e) =>
                    setCurrentField({ ...currentField, name: e.target.value })
                  }
                />
                <Select
                  value={currentField.type}
                  onValueChange={(value: FieldType) =>
                    setCurrentField({ ...currentField, type: value })
                  }
                >
                  <SelectTrigger className="w-auto">
                    <SelectValue placeholder="Tipo do Campo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Caixa de Texto</SelectItem>
                    <SelectItem value="select">Caixa de Seleção</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={addField}>
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
              {currentField.type === "select" && (
                <Input
                  placeholder="Opções (separadas por vírgula)"
                  value={selectOptions}
                  onChange={(e) => setSelectOptions(e.target.value)}
                />
              )}
            </div>
            <div className="flex items-center justify-center flex-col">
              <h3 className="text-lg font-semibold mb-2">
                {modelName || "Dê um nome ao seu modelo"}
              </h3>
              {fields.map((field, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <span>{field.name}</span>
                  {field.type === "select" && (
                    <span className="text-sm text-gray-500">
                      Opções: {field.options?.join(", ")}
                    </span>
                  )}
                  <TrashIcon
                    onClick={() => removeField(index)}
                    className="h-4 w-4 cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <SheetFooter>
              <Button onClick={saveModel} className="w-full">
                Criar Modelo
              </Button>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
