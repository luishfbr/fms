import { Field } from "../app/(main)/_components/new-model/sheet-new-model";

export interface BaseProps {
  id: string;
  shelf: string;
  box: string;
  folder: string;
  name: string;
  cpf: string;
  registration: string;
  fileTemplateId?: string;
}

export interface WorkContractProps extends BaseProps {
  addData: string;
  logoutDate: string;
}

export interface PointArchiveProps extends BaseProps {
  month: string;
  year: string;
}

export interface InputBaseProps {
  shelf?: string;
  box?: string;
  folder?: string;
  name?: string;
  cpf?: string;
  cnpj?: string;
  registration?: string;
  month?: string;
  year?: string;
  addData?: string;
  logoutDate?: string;
}

export interface NewModelProps {
  modelName: string;
  sectorId: string;
  fields: Field[];
}

export interface FileData {
  fileTemplateId: string;
  fieldId: string;
  value: string;
}
