"use client";

import { useEffect, useState } from "react";
import { createNewFile, fieldsByFiletemplateId } from "../../../_actions/dashboard";
import { Field } from "../../new-model/sheet-new-model";
import InputMask from "react-input-mask";
import styles from "../../../../styles/main.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/app/utils/ToastContext";

export const SelectedModelForm = ({ modelId }: { modelId: string }) => {
  const { showToast } = useToast()
  const [fields, setFields] = useState<Field[]>([]);
  const { register, handleSubmit, setValue } = useForm<Record<string, string>>();

  const loadFields = async () => {
    const fields = await fieldsByFiletemplateId(modelId);
    if (fields) {
      setFields(
        fields.map((field) => ({
          ...field,
          value: "",
          commonId: "",
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
    prateleira: "Prateleira",
    caixa: "Caixa",
    pasta: "Pasta",
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
            {...register(field.id)}
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
              placeholder="Digite o nome completo"
              {...register(field.id)}
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
              {...register(field.id)}
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
              {...register(field.id)}
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
              {...register(field.id)}
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
              placeholder="Digite o valor"
              {...register(field.id)}
            />
          </>
        );
    }
  };

  const onSubmit: SubmitHandler<Record<string, string>> = async (data) => {
    const formattedFields = fields.map(field => ({
      fileTemplateId: modelId,
      fieldId: field.id,
      value: data[field.id]
    }));

    try {
      await createNewFile(formattedFields);
      showToast("Arquivo criado com sucesso");
    } catch (error) {
      console.error('Erro ao criar arquivo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      {fields.map((field) => (
        <div key={field.id} className={styles.fieldContainer}>
          {renderInput(field)}
        </div>
      ))}
      <Button className={styles.submitButton}>Criar</Button>
    </form>
  );
};