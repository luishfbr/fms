"use client";

import { useToast } from "@/app/utils/ToastContext";
import { useEffect, useState } from "react";
import {
  getFields,
  getFiles,
  getModels,
  getSectors,
} from "../_actions/dashboard";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Models = {
  id: string;
  name: string;
};

type Sectors = {
  id: string;
  name: string;
};

type SelectedSectors = {
  id: string;
};

type ModelTable = {
  id: string;
  name: string;
  type: string;
  options: string[];
};

type Files = {
  id: string;
  name: string;
};

type FilesByField = {
  [key: string]: Files[]; // Associar arquivos por ID de campo
};

export const MainTableAndModel = () => {
  const { showToast } = useToast();
  const [models, setModels] = useState<Models[]>([]);
  const [sectors, setSectors] = useState<Sectors[]>([]);
  const [selectedSector, setSelectedSector] = useState<SelectedSectors | null>(
    null
  );
  const [modelTable, setModelTable] = useState<ModelTable[]>([]);
  const [filesByField, setFilesByField] = useState<FilesByField>({});
  const [showModels, setShowModels] = useState<boolean>(false);
  const [showTable, setShowTable] = useState<boolean>(false);

  const setSector = (sector: SelectedSectors) => {
    const { id } = sector;
    handleGetModels(id);
    setSelectedSector(sector);
    setShowModels(true); // Mostrar a div dos modelos ao selecionar um setor
    setShowTable(false); // Resetar a visibilidade da tabela ao selecionar um novo setor
  };

  const handleGetModels = async (id: string) => {
    if (id) {
      try {
        const response = await getModels(id);
        if (response) {
          setModels(response);
        }
      } catch (error) {
        showToast("Failed to fetch models");
      }
    }
  };

  const handleGetFiles = async (fieldsId: string) => {
    if (fieldsId) {
      try {
        const response = await getFiles(fieldsId);
        if (response) {
          setFilesByField((prev) => ({
            ...prev,
            [fieldsId]: response, // Armazena os arquivos pelo campo ID
          }));
        }
      } catch (error) {
        showToast("Failed to fetch files");
      }
    }
  };

  const handleGetModelsFields = async (modelId: string) => {
    if (modelId) {
      try {
        const response = await getFields(modelId);
        if (response) {
          const formattedResponse = response.map((item: any) => ({
            ...item,
            options: item.options.map(
              (option: { value: string }) => option.value
            ),
          }));
          setModelTable(formattedResponse);

          // Chama handleGetFiles para cada field ID de formattedResponse
          formattedResponse.forEach((field) => {
            handleGetFiles(field.id); // Chama handleGetFiles para cada field.id
          });

          setShowTable(true); // Mostrar a div da tabela ao selecionar um modelo
        }
      } catch (error) {
        showToast("Failed to fetch model fields");
      }
    }
  };

  useEffect(() => {
    const getAllSectors = async () => {
      try {
        const response = await getSectors();
        if (response) {
          const { sectors } = response;
          setSectors(sectors);
        }
      } catch (error) {}
    };
    getAllSectors();
  }, []);

  return (
    <div className="flex flex-col max-h-screen h-[850px] gap-2">
      <Card className="flex gap-4 items-center justify-center p-2 w-full">
        <span className="text-sm text-muted-foreground">
          Selecione um setor:
        </span>
        {sectors.map((sector) => (
          <Card
            className="flex items-center justify-center text-center py-2 px-4 cursor-pointer font-bold text-sm hover:bg-muted"
            key={sector.id}
            onClick={() => setSector(sector)}
          >
            {sector.name}
          </Card>
        ))}
      </Card>

      {showModels && (
        <Card className="flex gap-4 items-center justify-center p-2 w-full">
          <span className="text-sm text-muted-foreground">
            Selecione um modelo:
          </span>
          {models.length > 0 ? (
            models.map((model) => (
              <Card
                key={model.id}
                onClick={() => handleGetModelsFields(model.id)}
                className="flex items-center justify-center text-center py-2 px-4 cursor-pointer font-bold text-sm hover:bg-muted"
              >
                {model.name}
              </Card>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">
              Não há modelos
            </span>
          )}
        </Card>
      )}

      {showTable && (
        <Card className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                {modelTable.map((field) => (
                  <TableHead
                    key={field.id}
                    className="text-center max-w-32 min-w-24"
                  >
                    {field.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                {modelTable.map((field) => (
                  <TableCell key={field.id} className="text-center">
                    {filesByField[field.id]
                      ? filesByField[field.id].map((file) => (
                          <div key={file.id}>{file.name}</div>
                        ))
                      : "—"}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
};
