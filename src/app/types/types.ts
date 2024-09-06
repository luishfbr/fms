export interface WorkContractProps {
  id: string;
  shelf: string;
  box: string;
  folder: string;
  name: string;
  cpf: string;
  registration: string;
  addData: string;
  logoutDate: string | null;
  fileTemplateId: string;
}

export interface PointArchiveProps {
  id: string;
  shelf: number;
  box: number;
  folder: number;
  name: string;
  cpf: string;
  registration: string;
  month: string;
  year: string;
}

export interface InputBaseProps {
  shelf: string | null;
  box: string | null;
  folder: string | null;
  name: string | null;
  cpf: string | null;
  cnpj: string | null;
  registration: string | null;
  month: string | null;
  year: string | null;
  addData: string | null;
  logoutDate: string | null;
}
