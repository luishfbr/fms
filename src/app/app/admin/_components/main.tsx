import { Toaster } from "@/components/ui/toaster";
import { CreateNewUser } from "./_cards/createNewUser";
import { CreateNewSector } from "./_cards/createSectors";
import { CardSectors } from "./_cards/sectors";
import { CardUsers } from "./_cards/users";

export const Main = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="flex h-screen flex-col gap-6">
        <CardUsers />
        <div className="grid grid-cols-2 gap-6 ">
          <CardSectors />
          <div>
            <CreateNewSector />
          </div>
        </div>
      </div>
      <div className="flex h-screen flex-col">
        <CreateNewUser />
      </div>
      <Toaster />
    </div>
  );
};
