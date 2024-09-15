"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import {
  GetFilesByFieldIds,
  GetHeadersByFileTemplateId,
  GetModelsById,
} from "../_actions/dashboard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MenuComponent } from "./menu/menu-component";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [isLoading, setIsLoading] = useState(true);

  const getModel = useCallback(async () => {
    try {
      const response = await GetModelsById(modelId);
      setModel(response);
      return response;
    } catch (error) {
      console.error("Error fetching model:", error);
    }
  }, [modelId]);

  const getHeaders = useCallback(async (fileTemplateId: string) => {
    try {
      const response = await GetHeadersByFileTemplateId(fileTemplateId);
      if (response) {
        setFields(response as Field[]);
        return response.map((field: Field) => field.id);
      }
    } catch (error) {
      console.error("Error fetching headers:", error);
    }
  }, []);

  const getFiles = useCallback(async (fieldIds: string[]) => {
    try {
      const response = await GetFilesByFieldIds(fieldIds);
      if (response) {
        setFiles(response);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const modelData = await getModel();
      if (modelData) {
        const fieldIds = await getHeaders(modelData.id);
        if (fieldIds) {
          await getFiles(fieldIds);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [getModel, getHeaders, getFiles]);

  useEffect(() => {
    fetchData();
  }, [modelId, fetchData]);

  const filteredFiles = useMemo(() => {
    return files.filter((fileRow) =>
      Object.values(fileRow).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [files, searchTerm]);

  if (isLoading) {
    return <Skeleton className="w-full h-64" />;
  }

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
        {filteredFiles.length === 0 ? (
          <TableRow>
            <TableCell colSpan={fields.length + 1} className="text-center">
              Nenhum resultado encontrado
            </TableCell>
          </TableRow>
        ) : (
          filteredFiles.map((fileRow, rowIndex) => (
            <TableRow key={rowIndex}>
              {fields.map((field) => (
                <TableCell key={field.id} className="text-center">
                  {fileRow[field.id] || "-"}
                </TableCell>
              ))}
              <TableCell className="flex justify-center items-center">
                <MenuComponent fileId={fileRow.id || ''} onUpdate={fetchData} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
