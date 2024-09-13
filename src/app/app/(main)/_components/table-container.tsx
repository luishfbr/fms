import { useEffect, useState } from "react";
import {
  GetHeadersByFileTemplateId,
  GetModelsById,
} from "../_actions/dashboard";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Model {
  id: string;
  modelName: string;
}

interface Field {
  id: string;
  fieldLabel: string;
  fieldType: string;
}

export const TableContainer = ({ modelId }: { modelId: string }) => {
  const [model, setModel] = useState<Model | null>(null);
  const [fields, setFields] = useState<Field[]>([]);

  const GetModel = async () => {
    const response = await GetModelsById(modelId);
    setModel(response);
    GetHeaders();
  };

  const GetHeaders = async () => {
    const fileTemplateId = model?.id as string;
    const response = await GetHeadersByFileTemplateId(fileTemplateId);
    if (response) {
      setFields(response);
    }
  };

  useEffect(() => {
    GetModel();
  }, [modelId]);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {fields.map((field, index) => (
            <TableHead className="text-center" key={index}>{field.fieldLabel}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
    </Table>
  );
};
