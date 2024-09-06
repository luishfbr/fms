import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  getModelsBySectorId,
  getUserByEmail,
} from "./_components/_actions/model";
import { Layers, AppWindow } from "lucide-react";
import { WorkContract } from "../(main)/_components/model-types/work-contract";
import { GlobalForm } from "./_components/form/global-form";

type Sector = {
  id: string;
  name: string;
};

type Models = {
  id: string;
  modelName: string | null;
};

export const Main = () => {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [models, setModels] = useState<Models[]>([]);
  const [selectedModel, setSelectedModel] = useState<Models | null>(null);
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null); // Estado para o setor selecionado

  const setSector = (sector: Sector) => {
    const id = sector.id;
    setSelectedSector(sector); // Definindo o setor selecionado
    getModelsBySectorId(id).then((data) => {
      setModels(data);
    });
  };

  const fetchUserEmail = async () => {
    const response = await getUserByEmail();
    if (response?.sectors) {
      setSectors(response.sectors);
    }
  };

  useEffect(() => {
    fetchUserEmail();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[850px] w-full">
      <div className="flex flex-col gap-6">
        <Card className="h-full p-6 flex flex-wrap gap-4 justify-center">
          {sectors.length > 0 ? (
            sectors.map((sector) => (
              <Card
                key={sector.id}
                className="w-32 h-32 flex flex-col items-center justify-center text-center border border-border hover:shadow-md transition-shadow duration-200 ease-in-out hover:cursor-pointer hover:bg-muted"
                onClick={() => setSector(sector)}
              >
                <Layers className="w-10 h-10 text-muted-foreground" />
                <div className="text-sm font-medium mt-2 text-primary">
                  {sector.name}
                </div>
              </Card>
            ))
          ) : (
            <span className="text-center text-muted-foreground">
              Usuário não possui setor(es).
            </span>
          )}
        </Card>

        {selectedSector && (
          <Card className="h-full p-6 flex flex-wrap gap-4 justify-center">
            {models.length > 0 ? (
              models.map((model) => (
                <Card
                  key={model.id}
                  className="w-32 h-32 flex flex-col items-center justify-center text-center border border-border hover:shadow-md transition-shadow duration-200 ease-in-out hover:cursor-pointer hover:bg-muted"
                  onClick={() => setSelectedModel(model)}
                >
                  <AppWindow className="w-10 h-10 text-muted-foreground" />
                  <div className="text-sm font-medium mt-2 text-primary">
                    {model.modelName || "No Name"}
                  </div>
                </Card>
              ))
            ) : (
              <span className="text-center text-muted-foreground">
                O setor não possui modelo(s).
              </span>
            )}
          </Card>
        )}
      </div>

      {selectedModel && <GlobalForm selectedModel={selectedModel} />}
    </div>
  );
};
