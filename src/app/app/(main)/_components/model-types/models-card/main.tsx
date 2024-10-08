"use client";

import { useEffect, useState, useCallback } from "react";
import { createNewFile, fieldsByFiletemplateId } from "../../../_actions/dashboard";
import { Field } from "../../new-model/sheet-new-model";
import InputMask from "react-input-mask";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/app/utils/ToastContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

export const SelectedModelForm = ({ modelId }: { modelId: string }) => {
  const { showToast } = useToast();
  const [fields, setFields] = useState<Field[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<Record<string, string>>();
  const router = useRouter();

  const loadFields = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedFields = await fieldsByFiletemplateId(modelId);
      if (fetchedFields) {
        setFields(
          fetchedFields.map((field) => ({
            ...field,
            value: "",
            commonId: "",
            type: field.fieldType,
          }))
        );
      }
    } catch (error) {
      console.error('Erro ao carregar campos:', error);
      showToast("Erro ao carregar campos. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, [modelId, showToast]);

  useEffect(() => {
    loadFields();
  }, [loadFields]);

  const maskMap: { [key: string]: string } = {
    cpf: "999.999.999-99",
    cnpj: "99.999.999/9999-99",
    datadeadmissao: "99/99/9999",
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

  const renderInput = useCallback((field: Field) => {
    const mask = maskMap[field.type];
    const label = labelMap[field.type] || field.value || "Campo de Texto";

    if (mask && field.type !== "dataderecisao") {
      return (
        <div className="mb-4">
          <Label htmlFor={field.id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </Label>
          <Controller
            name={field.id}
            control={control}
            defaultValue=""
            rules={{ required: "Este campo é obrigatório" }}
            render={({ field: { onChange, value } }) => (
              <InputMask
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id={field.id}
                mask={mask}
                value={value}
                onChange={onChange}
                autoComplete="off"
              />
            )}
          />
          {errors[field.id] && <span className="text-red-500 text-xs">{errors[field.id]?.message}</span>}
        </div>
      );
    }

    return (
      <div className="mb-4">
        <Label htmlFor={field.id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </Label>
        <Input
          type={["dia", "mes", "ano"].includes(field.type) ? "number" : "text"}
          id={field.id}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={`Digite ${label.toLowerCase()}`}
          autoComplete="off"
          {...register(field.id, {
            required: "Este campo é obrigatório",
            ...(field.type === "dia" ? { min: 1, max: 31 } : {}),
            ...(field.type === "mes" ? { min: 1, max: 12 } : {}),
            ...(field.type === "ano" ? { min: 1900, max: new Date().getFullYear() } : {})
          })}
        />
        {errors[field.id] && <span className="text-red-500 text-xs">{errors[field.id]?.message}</span>}
      </div>
    );
  }, [control, errors, register]);

  const onSubmit: SubmitHandler<Record<string, string>> = async (data) => {
    setIsLoading(true);
    const formattedFields = fields.map(field => ({
      fileTemplateId: modelId,
      fieldId: field.id,
      value: data[field.id]
    }));

    try {
      await createNewFile(formattedFields);
      showToast("Arquivo criado com sucesso");
      reset();
      router.refresh();
    } catch (error) {
      console.error('Erro ao criar arquivo:', error);
      showToast("Erro ao criar arquivo. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Progress className="w-full" />;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {fields.map((field) => (
            <div key={field.id}>
              {renderInput(field)}
            </div>
          ))}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Criando...' : 'Criar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};