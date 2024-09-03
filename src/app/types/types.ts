export interface WorkContractProps {
  shelf: number;
  box: number;
  folder: number;
  name: string;
  cpf: string;
  registration: string;
  addData: string;
  logoutDate: string | null;
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
