import { TablePointArchive } from "./table-types/pp-types";
import { TableWorkContract } from "./table-types/wc-table";

export const MainTableAndModel = () => {
  return (
    <div>
      <TableWorkContract />
      <TablePointArchive />
    </div>
  );
};
