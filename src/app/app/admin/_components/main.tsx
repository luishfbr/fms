import { CardSectors } from "./_cards/sectors";
import { CardUsers } from "./_cards/users";

export const Main = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <>
        <CardUsers />
      </>
      <div className="flex flex-col">
        <CardSectors />
      </div>
    </div>
  );
};
