import { PointArchive } from "./model-types/point-archive";
import { WorkContract } from "./model-types/work-contract";
import { Model, Sector } from "./new-archive";

interface SelectedSectorModelsProps {
  selectedSector?: Sector;
  selectedModel?: Model;
}

export const SelectedSectorModels: React.FC<SelectedSectorModelsProps> = ({
  selectedSector,
  selectedModel,
}) => {
  return (
    <div>
      {selectedModel && selectedSector && (
        <>
          {selectedModel.modelName.includes("Contrato") && (
            <WorkContract
              ModelId={selectedModel.id}
              SectorId={selectedSector.id}
            />
          )}
          {selectedModel.modelName.includes("Folha") && (
            <PointArchive
              ModelId={selectedModel.id}
              SectorId={selectedSector.id}
            />
          )}
        </>
      )}
    </div>
  );
};
