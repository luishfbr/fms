"use client";

import styles from "@/app/app/styles/main.module.css";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { getTableWorkContract } from "../../_actions/dashboard";
import React, { useEffect } from "react";
import { useToast } from "@/app/utils/ToastContext";
import { WorkContractProps } from "@/app/types/types";

const id = "cm0nusud6000025u0xmv5qiyf";

export const TableWorkContract = () => {
  const { showToast } = useToast();
  const [fields, SetFields] = React.useState<WorkContractProps[]>([]);

  const getFieldsWorkContract = async () => {
    const response = await getTableWorkContract(id);
    if (response) {
      SetFields(response);
    } else {
      showToast("Erro ao buscar os dados");
    }
  };

  useEffect(() => {
    getFieldsWorkContract();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className={styles.tableHeader}>Nome Completo</TableHead>
          <TableHead className={styles.tableHeader}>Prateleira</TableHead>
          <TableHead className={styles.tableHeader}>Caixa</TableHead>
          <TableHead className={styles.tableHeader}>Pasta</TableHead>
          <TableHead className={styles.tableHeader}>CPF</TableHead>
          <TableHead className={styles.tableHeader}>Matrícula</TableHead>
          <TableHead className={styles.tableHeader}>Data de Admissão</TableHead>
          <TableHead className={styles.tableHeader}>Data de Rescisão</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fields.map((field) => (
          <TableRow key={field.id}>
            <TableCell className={styles.tableBody}>{field.name}</TableCell>
            <TableCell className={styles.tableBody}>{field.shelf}</TableCell>
            <TableCell className={styles.tableBody}>{field.box}</TableCell>
            <TableCell className={styles.tableBody}>{field.folder}</TableCell>
            <TableCell className={styles.tableBody}>{field.cpf}</TableCell>
            <TableCell className={styles.tableBody}>
              {field.registration}
            </TableCell>
            <TableCell className={styles.tableBody}>{field.addData}</TableCell>
            <TableCell className={styles.tableBody}>
              {field.logoutDate}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
