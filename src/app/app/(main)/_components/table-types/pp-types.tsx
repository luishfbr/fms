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
import { getTablePoint } from "../../_actions/dashboard";
import React, { useEffect } from "react";
import { useToast } from "@/app/utils/ToastContext";
import { PointArchiveProps } from "@/app/types/types";

const id = "cm0nw1uss000125u0gdtr3oos";

export const TablePointArchive = () => {
  const { showToast } = useToast();
  const [fields, SetFields] = React.useState<PointArchiveProps[]>([]);

  const getFieldsPoint = async () => {
    const response = await getTablePoint(id);
    if (response) {
      SetFields(response);
    } else {
      showToast("Erro ao buscar os dados");
    }
  };

  useEffect(() => {
    getFieldsPoint();
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
          <TableHead className={styles.tableHeader}>Mês</TableHead>
          <TableHead className={styles.tableHeader}>Ano</TableHead>
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
            <TableCell className={styles.tableBody}>{field.month}</TableCell>
            <TableCell className={styles.tableBody}>{field.year}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
