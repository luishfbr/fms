"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSectors, getUsers } from "./_actions/users";
import { Button } from "@/components/ui/button";

type Users = {
  name: string;
  email: string;
  role: string;
};

type Sectors = {
  id: string;
  name: string;
};

export const CardSetUserToSector = () => {
  const [users, setUsers] = React.useState<Users[]>([]);
  const [selectUser, setSelectUser] = React.useState<string>("");
  const [sectors, setSectors] = React.useState<Sectors[]>([]);

  const SelectUser = (user: string) => {
    setSelectUser(user);
  };

  const getAllUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const getAllSectors = async () => {
    try {
      const response = await getSectors();
      setSectors(response);
    } catch (error) {
      console.error("Failed to fetch sectors:", error);
    }
  };

  React.useEffect(() => {
    getAllUsers();
    getAllSectors();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardDescription>
          Selecione o usuário que deseja adicionar setores.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2">
        <ScrollArea className="h-[230px] w-[360] rounded-md border">
          <div className="flex flex-col">
            <span className="text-center bg-primary py-1 text-white">
              Lista de Usuários
            </span>
            <div className="flex flex-col text-center">
              {users.length > 0 ? (
                users.map((user, index) => (
                  <span
                    key={index}
                    className="px-6 py-1 text-center text-sm text-muted-foreground"
                  >
                    {user.name}
                  </span>
                ))
              ) : (
                <span className="px-6 py-1 text-center text-sm text-muted-foreground">
                  Nenhum usuário encontrado.
                </span>
              )}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
