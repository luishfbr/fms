import { Card } from "@/components/ui/card";
import { ForWorkContract } from "../forms-models/workcontract";
import { FormForPoint } from "../forms-models/forpoint";
import { Field } from "../../new-model/sheet-new-model";
import { useState } from "react";
import { fieldsByFiletemplateId } from "../../../_actions/dashboard";

export const SelectedModelCard = ({
  selectedModel,
}: {
  selectedModel: any;
}) => {
  const [fields, setFields] = useState<Field[]>([]);

  const GetFields = async () => {
    const response = await fieldsByFiletemplateId(selectedModel);
    setFields(response);
  };
  return <Card></Card>;
};
