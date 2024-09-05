import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Core } from "@/app/app/(main)/_components/model-types/input-bases.tsx/core";
import { useForm } from "react-hook-form";
import { WorkContractProps } from "@/app/types/types";

interface Models {
  id: string;
  modelName: string | null;
}

export const GlobalForm = ({
  selectedModel,
}: {
  selectedModel: Models | null;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkContractProps>({});
  const [formState, setFormState] = useState({
    field1: "",
    field2: "",
    field3: "",
  });

  useEffect(() => {
    if (selectedModel) {
      if (selectedModel.modelName === "Contrato de Trabalho") {
        setFormState((prevState) => ({
          ...prevState,
          field1: "Predefined Value for Contrato de Trabalho",
        }));
      } else {
        setFormState({
          field1: "",
          field2: "",
          field3: "",
        });
      }
    }
  }, [selectedModel]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Card className="p-6">
      <form className="space-y-4">
        <CardHeader className="flex items-center justify-between gap-4">
          <CardTitle>Crie seu novo arquivo</CardTitle>
          <CardDescription>
            Setor selecionado:{" "}
            <span className="text-background bg-muted-foreground px-4 py-2 rounded-sm">
              {selectedModel?.modelName}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Core />
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <Button type="submit" className="w-full md:w-auto">
            Salvar Arquivo
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
