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
          {selectedModel.name.includes("Contrato") && <WorkContract />}
          {selectedModel.name.includes("Folha") && <PointArchive />}
        </>
      )}
    </div>
  );
};
