"use client";

import { useEffect, useState } from "react";
import {
  GetFilesByFieldIds,
  GetHeadersByFileTemplateId,
  GetModelsById,
} from "../_actions/dashboard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MenuComponent } from "./menu/menu-component";


interface File {
  id: string;
  value: string;
  fileTemplateId: string;
  fieldId: string;
}

interface Model {
  id: string;
  modelName: string;
}

interface Field {
  id: string;
  fieldLabel: string;
  fieldType: string;
}

export const TableContainer = ({ modelId, searchTerm }: { modelId: string, searchTerm: string }) => {
  const [model, setModel] = useState<Model | null>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const [files, setFiles] = useState<Record<string, string | undefined>[]>([]);

  const GetModel = async () => {
    const response = await GetModelsById(modelId);
    setModel(response);
    GetHeaders();
  };

  const GetHeaders = async () => {
    const fileTemplateId = model?.id as string;
    const response = await GetHeadersByFileTemplateId(fileTemplateId);
    if (response) {
      setFields(response as Field[]);
      const fieldIds = response.map((field) => field.id);
      GetFiles(fieldIds);
    }
  };

  const GetFiles = async (fieldIds: string[]) => {
    const response = await GetFilesByFieldIds(fieldIds);
    if (response) {
      console.log(response);
      setFiles(response);
    }
  };

  useEffect(() => {
    GetModel();
  }, [modelId]);

  const filteredFiles = files.filter((fileRow) =>
    Object.values(fileRow).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {fields.map((field) => (
            <TableHead className="text-center" key={field.id}>
              {field.fieldLabel}
            </TableHead>
          ))}
          <TableHead className="text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredFiles.map((fileRow, rowIndex) => (
          <TableRow key={rowIndex}>
            {fields.map((field) => (
              <TableCell key={field.id} className="text-center">
                {fileRow[field.id] || ""}
              </TableCell>
            ))}
            <TableCell className="flex justify-center items-center">
              <MenuComponent fileId={fileRow.id || ''} /> {/* O id do arquivo é acessado diretamente aqui */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

