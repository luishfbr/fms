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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon, TrashIcon } from "lucide-react";

type FieldType = "text" | "select";

interface Field {
  name: string;
  type: FieldType;
  options?: string[];
}

export function NewModelSheet() {
  const [modelName, setModelName] = useState("");
  const [fields, setFields] = useState<Field[]>([]);
  const [currentField, setCurrentField] = useState<Field>({
    name: "",
    type: "text",
  });
  const [selectOptions, setSelectOptions] = useState("");
  const [sampleData, setSampleData] = useState<any[]>([]);

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

  const saveModel = () => {
    if (modelName && fields.length > 0) {
      console.log("Saving model:", { name: modelName, fields });
      alert("Model saved successfully!");
    } else {
      alert("Please provide a model name and at least one field.");
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
        <Button>Criar Novo Modelo</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Crie um novo modelo</SheetTitle>
          <SheetDescription>
            Faça da forma que preferir, pensando no setor: Recursos Humanos.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-6 p-4">
          <div className="space-y-4">
            <Input
              placeholder="Model Name"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
            />
            <div className="flex space-x-2">
              <Input
                placeholder="Field Name"
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
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Field Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="select">Select</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={addField}>
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
            {currentField.type === "select" && (
              <Input
                placeholder="Select options (comma-separated)"
                value={selectOptions}
                onChange={(e) => setSelectOptions(e.target.value)}
              />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {modelName || "Unnamed Model"}
            </h3>
            {fields.map((field, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <span>
                  {field.name} ({field.type})
                </span>
                {field.type === "select" && (
                  <span className="text-sm text-gray-500">
                    Options: {field.options?.join(", ")}
                  </span>
                )}
                <TrashIcon
                  onClick={() => removeField(index)}
                  className="h-4 w-4 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
        <SheetFooter>
          <Button onClick={saveModel} className="w-full">
            Criar Modelo
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
