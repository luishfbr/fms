"use client";

import * as React from "react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSectors, getUsers } from "../_actions/users";
import { DeleteButton } from "./sectorsButtons/deleteButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export type Sector = {
  id: string;
  name: string;
};

export const Sectors = () => {
  const router = useRouter();
  const [sectors, setSectors] = React.useState<Sector[]>([]);


  React.useEffect(() => {
    const fetchData = async () => {
      const fetchedSectors = await getSectors();
      setSectors(fetchedSectors);
    };
    fetchData();
  }, []);

  return (
    <ScrollArea className="h-48 w-full rounded-md">
      <div className="p-4">
        {sectors.map((sector) => (
          <React.Fragment key={sector.id}>
            <div className="text-sm flex justify-between text-center items-center">
              <span>{sector.name}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir Menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DeleteButton id={sector.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
};
