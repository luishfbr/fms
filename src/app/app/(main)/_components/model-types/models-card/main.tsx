"use client";

import { useEffect, useState } from "react";
import { fieldsByFiletemplateId } from "../../../_actions/dashboard";
import { Field } from "../../new-model/sheet-new-model";
import InputMask from "react-input-mask";
import styles from "../../../../styles/main.module.css";

export const SelectedModelForm = ({ modelId }: { modelId: string }) => {
  const [fields, setFields] = useState<Field[]>([]);

  const loadFields = async () => {
    const fields = await fieldsByFiletemplateId(modelId);
    if (fields) {
      setFields(
        fields.map((field) => ({
          ...field,
          value: "",
          type: field.fieldType,
        }))
      );
    }
  };

  useEffect(() => {
    loadFields();
  }, [modelId]);

  const maskMap: { [key: string]: string } = {
    cpf: "999.999.999-99",
    cnpj: "99.999.999/9999-99",
    datadeadmissao: "99/99/9999",
    dataderecisao: "99/99/9999",
    data: "99/99/9999",
  };

  const labelMap: { [key: string]: string } = {
    cpf: "CPF",
    cnpj: "CNPJ",
    datadeadmissao: "Data de Admissão",
    dataderecisao: "Data de Rescisão",
    data: "Data",
    nomecompleto: "Nome Completo",
    dia: "Dia",
    mes: "Mês",
    ano: "Ano",
  };

  const renderInput = (field: Field) => {
    const mask = maskMap[field.type];
    const label = labelMap[field.type] || "Campo de Texto";

    if (mask) {
      return (
        <>
          <label className={styles.label} htmlFor={field.id}>
            {label}
          </label>
          <InputMask
            className={styles.inputStyles}
            id={field.id}
            mask={mask}
            value={field.value}
            onChange={(e) => handleInputChange(e, field.id)}
          />
        </>
      );
    }

    switch (field.type) {
      case "nomecompleto":
        return (
          <>
            <label className={styles.label} htmlFor={field.id}>
              {label}
            </label>
            <input
              type="text"
              id={field.id}
              className={styles.inputStyles}
              onChange={(e) => handleInputChange(e, field.id)}
              placeholder="Digite o nome completo"
            />
          </>
        );
      case "dia":
        return (
          <>
            <label className={styles.label} htmlFor={field.id}>
              {label}
            </label>
            <input
              type="number"
              min="1"
              max="31"
              id={field.id}
              className={styles.inputStyles}
              value={field.value}
              onChange={(e) => handleInputChange(e, field.id)}
            />
          </>
        );
      case "mes":
        return (
          <>
            <label className={styles.label} htmlFor={field.id}>
              {label}
            </label>
            <input
              type="number"
              min="1"
              max="12"
              id={field.id}
              className={styles.inputStyles}
              value={field.value}
              onChange={(e) => handleInputChange(e, field.id)}
            />
          </>
        );
      case "ano":
        return (
          <>
            <label className={styles.label} htmlFor={field.id}>
              {label}
            </label>
            <input
              type="number"
              min="1900"
              max="2099"
              id={field.id}
              className={styles.inputStyles}
              value={field.value}
              onChange={(e) => handleInputChange(e, field.id)}
            />
          </>
        );
      default:
        return (
          <>
            <label className={styles.label} htmlFor={field.id}>
              {label}
            </label>
            <input
              type="text"
              id={field.id}
              className={styles.inputStyles}
              value={field.value}
              onChange={(e) => handleInputChange(e, field.id)}
              placeholder="Digite o valor"
            />
          </>
        );
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, value: e.target.value } : field
      )
    );
  };

  return (
    <div className={styles.formContainer}>
      {fields.map((field) => (
        <div key={field.id} className={styles.fieldContainer}>
          {renderInput(field)}
        </div>
      ))}
    </div>
  );
};
