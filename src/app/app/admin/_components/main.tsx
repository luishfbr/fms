import { CreateNewUser } from "./_cards/createNewUser";
import { CreateNewSector } from "./_cards/createSectors";
import { CardSectors } from "./_cards/sectors";
import { CardUsers } from "./_cards/users";

export const Main = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="flex pb-6 flex-col gap-6">
        <CardUsers />
      </div>
      <div className="grid grid-cols-2">
        <div className="flex flex-col"></div>
      </div>
    </div>
  );
};
