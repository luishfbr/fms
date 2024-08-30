export interface TextBox {
  id: string;
  value: string;
}

export interface SelectBox {
  id: string;
  value: string;
  options: options[];
}

export interface options {
  value: string;
}

export interface DataBox {
  id: string;
  value: string;
}

export interface PhoneNumberBox {
  id: string;
  value: string;
}

export interface CpfBox {
  id: string;
  value: string;
}

export interface CnpjBox {
  id: string;
  name: string;
}
