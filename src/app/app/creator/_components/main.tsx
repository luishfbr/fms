"use client";

import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

interface SelectOption {
  value: string;
}

interface Option {
  type: "text" | "select";
  label: string;
  options?: SelectOption[];
}

interface FileTemplateFormValues {
  name: string;
  description: Option[];
}

export const Main: React.FC = () => {
  const { control, handleSubmit, register, reset } =
    useForm<FileTemplateFormValues>({
      defaultValues: {
        name: "",
        description: [],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "description",
  });

  const onSubmit = (data: FileTemplateFormValues) => {
    // Salvar o modelo na API ou backend
    console.log(data);
    reset();
  };

  const addTextOption = () => {
    append({ type: "text", label: "" });
  };

  const addSelectOption = () => {
    append({ type: "select", label: "", options: [] });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nome do Modelo:</label>
        <input {...register("name")} />
      </div>

      <div>
        <button type="button" onClick={addTextOption}>
          Adicionar Caixa de Texto
        </button>
        <button type="button" onClick={addSelectOption}>
          Adicionar Caixa de Seleção
        </button>
      </div>

      {/* {fields.map((field, index) => (
        <div key={field.id}>
          <Controller
            name={`description.${index}.label`}
            control={control}
            render={({ field }) => <input placeholder="Label" {...field} />}
          />

          {field.type === "select" && (
            <div>
              <label>Opções:</label>
              <Controller
                name={`description.${index}.options`}
                control={control}
                defaultValue={field.options || []}
                render={({ field: { onChange, value } }) => (
                  <>
                    {value.map((option: SelectOption, optionIndex: number) => (
                      <div key={optionIndex}>
                        <input
                          value={option.value}
                          onChange={(e) => {
                            const newOptions = [...value];
                            newOptions[optionIndex].value = e.target.value;
                            onChange(newOptions);
                          }}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        onChange([...value, { value: "" }]);
                      }}
                    >
                      Adicionar Opção
                    </button>
                  </>
                )}
              />
            </div>
          )}

          <button type="button" onClick={() => remove(index)}>
            Remover
          </button>
        </div>
      ))} */}

      <div>
        <button type="submit">Salvar Modelo</button>
      </div>
    </form>
  );
};
