"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { getSectorById, getSectors, getUserSession } from "./_actions/model";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BadgePlus, TrashIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type User = {
  id: string;
  name: string | null;
  email: string | null;
  role: string | null;
};

type Sector = {
  id: string;
  name: string;
};

type FieldType = "text" | "select";

interface Field {
  name: string;
  type: FieldType;
  options?: string[];
}

export function Main() {
  const [user, setUser] = useState<User | null>(null);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [nameSector, setNameSector] = useState<Sector | null>(null);
  const [inputType, setInputType] = useState<string | null>(null); // State to track which button is selected
  const [modelName, setModelName] = useState("");
  const [fields, setFields] = useState<Field[]>([]);
  const [currentField, setCurrentField] = useState<Field>({
    name: "",
    type: "text",
  });
  const [selectOptions, setSelectOptions] = useState("");

  const { setValue } = useForm();

  const getSector = async (sectorId: string) => {
    try {
      const response = await getSectorById(sectorId);
      setNameSector(response);
    } catch (error) {
      console.error("Error fetching sector by ID:", error);
    }
  };

  const handleSelectChange = (sectorId: string) => {
    setSelectedSector(sectorId);
    setValue("selectedSector", sectorId); // Store the selected sector ID
    getSector(sectorId); // Fetch the sector details
  };

  const handleClickChange = (type: string) => {
    setInputType(type);
  };

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
    console.log("saveModel");
  };

  const getSectorsByEmail = async () => {
    if (user?.email) {
      try {
        const response = await getSectors(user.email);
        setSectors(response);
      } catch (error) {
        console.error("Error fetching sectors:", error);
      }
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserSession();
        setUser(response);
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      getSectorsByEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-6">
        <div>
          <Card className="flex flex-col items-center justify-center text-center">
            <CardHeader>
              <CardDescription>
                Selecione um setor para liberar as opções de criação.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="w-auto">
                  <SelectValue placeholder="Selecione um Setor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Setor(es)</SelectLabel>
                    {sectors.map((sector) => (
                      <SelectItem key={sector.id} value={sector.id}>
                        {sector.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>

        {selectedSector && (
          <Card className="flex flex-col items-center text-center">
            <CardHeader>
              <CardDescription>
                Crie seu modelo de arquivo para o setor: {nameSector?.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="space-y-1">
                <Label htmlFor="nameModel">
                  Qual o nome deste novo modelo?
                </Label>
                <Input
                  type="text"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">
                  Selecione e adicione as opções de criação
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <Button onClick={() => handleClickChange("textBox")}>
                    Caixa de Texto
                  </Button>
                  <Button onClick={() => handleClickChange("selectBox")}>
                    Caixa de Seleção
                  </Button>
                </div>
              </div>

              {inputType === "textBox" && (
                <div className="flex gap-2">
                  <Input
                    className="text-center"
                    type="text"
                    value={currentField.name}
                    onChange={(e) =>
                      setCurrentField({ ...currentField, name: e.target.value })
                    }
                  />
                  <Button onClick={addField}>
                    <BadgePlus className="h-5 w-5" />
                  </Button>
                </div>
              )}

              {inputType === "selectBox" && (
                <div className="mt-4">
                  <Label htmlFor="selectBox">Caixa de Seleção</Label>
                  <Input
                    type="text"
                    placeholder="Select options (comma-separated)"
                    value={selectOptions}
                    onChange={(e) => setSelectOptions(e.target.value)}
                  />
                  <Button onClick={addField} className="mt-2">
                    <BadgePlus className="h-5 w-5" />
                  </Button>
                </div>
              )}

              {fields.length > 0 && (
                <ScrollArea className="h-[270px] w-auto border border-border rounded-md">
                  <div className="flex flex-col p-2">
                    <h3 className="text-lg font-semibold mb-2">
                      {modelName || "Unnamed Model"}
                    </h3>
                    {fields.map((field, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 justify-center px-2 py-2 border-b border-border rounded-sm space-x-2 mb-2"
                      >
                        <span className="text-sm text-muted-foreground">
                          {field.name}
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
                </ScrollArea>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={saveModel} className="w-full">
                Criar Modelo
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>

      {selectedSector && (
        <Card className="flex flex-col items-center text-center w-full">
          <Table>
            <TableHeader>
              <TableRow>
                {fields.map((field, index) => (
                  <TableHead className="text-center" key={index}>
                    {field.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
          </Table>
        </Card>
      )}
    </div>
  );
}
