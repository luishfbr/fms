export interface WorkContractProps {
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
  shelf: number;
  box: number;
  folder: number;
  name: string;
  cpf: string;
  registration: string;
  month: string;
  year: string;
}
