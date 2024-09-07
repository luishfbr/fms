import { Card } from "@/components/ui/card";
import { ForWorkContract } from "../forms-models/workcontract";
import { FormForPoint } from "../forms-models/forpoint";

export const SelectedModelCard = ({
  selectedModel,
}: {
  selectedModel: any;
}) => {
  return (
    <Card>
      {selectedModel.modelName === "Contrato de Trabalho" && (
        <ForWorkContract />
      )}
      {selectedModel.modelName === "Folha de Ponto" && <FormForPoint />}
    </Card>
  );
};
