"use client";

import { useToast } from "@/app/utils/ToastContext";
import { useEffect, useState } from "react";
import { getModelsBySectorId, getSectors } from "../_actions/dashboard";
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
  modelName: string;
  url: string;
};

type Sectors = {
  id: string;
  name: string;
};

export const MainTableAndModel = () => {
  const { showToast } = useToast();
  const [sectors, setSectors] = useState<Sectors[]>([]);
  const [models, setModels] = useState<Models[]>([]);

  const setSector = async (sector: Sectors) => {
    const response = await getModelsBySectorId(sector.id);
    if (response) {
      setModels(response);
    }
  };

  const setModel = async (model: Models) => {};

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

      <Card className="flex gap-4 items-center justify-center p-2 w-full">
        <span className="text-sm text-muted-foreground">
          Selecione um modelo:
        </span>
        {models.length > 0 ? (
          models.map((model) => (
            <Card
              key={model.id}
              onClick={() => setModel(model)}
              className="flex items-center justify-center text-center py-2 px-4 cursor-pointer font-bold text-sm hover:bg-muted"
            >
              {model.modelName}
            </Card>
          ))
        ) : (
          <span className="text-sm text-muted-foreground">Não há modelos</span>
        )}
      </Card>

      <Card className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              {/* {modelTable.map((field) => (
                <TableHead
                  key={field.id}
                  className="text-center max-w-32 min-w-24"
                >
                  {field.name}
                </TableHead>
              ))} */}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              {/* {modelTable.map((field) => (
                <TableCell key={field.id} className="text-center">
                  {filesByField[field.id]
                    ? filesByField[field.id].map((file) => (
                        <div key={file.id}>{file.name}</div>
                      ))
                    : "—"}
                </TableCell>
              ))} */}
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
