"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateNewSector } from "./createSectors";
import { BadgePlus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSectors, getUsers, getUsersOnSectorById } from "./_actions/users";
import { DeleteButton } from "./_components/sectorsButtons/deleteButton";
import styles from "@/app/app/styles/main.module.css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Eye } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { SubmitHandler, useForm } from "react-hook-form";

export type Sector = {
  id: string;
  name: string;
};

export type User = {
  name: string;
  email: string;
  role: string;
};

type AddUserToSectorFormData = {
  users: string[];
};

export const CardSectors = () => {
  const [sectors, setSectors] = React.useState<Sector[]>([]);
  const [usersOnSector, setUsersOnSector] = React.useState<string[]>([]);
  const [usersToList, setUsersToList] = React.useState<User[]>([]);
  const { register, handleSubmit } = useForm<AddUserToSectorFormData>();

  const onSubmit: SubmitHandler<AddUserToSectorFormData> = async (data) => {
    console.log(data);
  };

  const getUsersToList = async () => {
    const get = await getUsers();
    setUsersToList(get);
  };

  const getUsersOnSector = async (sectorId: string) => {
    try {
      const response = await getUsersOnSectorById(sectorId);
      setUsersOnSector(response);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      // Optionally, set an empty list or handle the error state
      setUsersOnSector([]);
    }
  };

  const fetchData = async () => {
    const fetchedSectors = await getSectors();
    setSectors(fetchedSectors);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Setores Cadastrados</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48 w-full rounded-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className={styles.th}>Setor</th>
                  <th className={styles.th}>Usuários</th>
                  <th className={styles.th}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {sectors.length > 0 ? (
                  sectors.map((sector) => (
                    <tr key={sector.id}>
                      <td className={styles.td}>
                        <span>{sector.name}</span>
                      </td>
                      <td className={styles.td}>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              onClick={() => getUsersOnSector(sector.id)}
                              variant={"ghost"}
                            >
                              <Eye className="h-5 w-5" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto">
                            <ScrollArea>
                              <div>
                                <h4 className="mb-4 text-center text-sm text-muted-foreground">
                                  Usuários presentes no setor: <br />
                                  {sector.name}
                                </h4>
                                <DropdownMenuSeparator />
                                <div className="flex flex-col text-center gap-0.5">
                                  {usersOnSector.length > 0 ? (
                                    usersOnSector.map((name, index) => (
                                      <span
                                        className="text-sm text-muted-foreground"
                                        key={index}
                                      >
                                        {name}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-sm text-muted-foreground text-center">
                                      Nenhum usuário encontrado.
                                    </span>
                                  )}
                                </div>
                              </div>
                            </ScrollArea>
                          </PopoverContent>
                        </Popover>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              onClick={() => getUsersToList()}
                              variant={"ghost"}
                            >
                              <BadgePlus className="h-5 w-5" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto">
                            <ScrollArea>
                              <div>
                                <h4 className="mb-4 text-center text-sm text-muted-foreground">
                                  Selecione os usuários que deseja adicionar.
                                </h4>
                                <DropdownMenuSeparator />
                                <form
                                  onSubmit={handleSubmit(onSubmit)}
                                  className="flex flex-col text-center gap-0.5"
                                >
                                  {usersToList.length > 0 ? (
                                    usersToList.map((users, index) => (
                                      <Toggle
                                        {...register("users")}
                                        value={users.email}
                                      >
                                        <span
                                          className="text-sm text-muted-foreground"
                                          key={index}
                                        >
                                          {users.name}
                                        </span>
                                      </Toggle>
                                    ))
                                  ) : (
                                    <span className="text-sm text-muted-foreground text-center">
                                      Nenhum usuário encontrado.
                                    </span>
                                  )}
                                  <Button type="submit">Adicionar</Button>
                                </form>
                              </div>
                            </ScrollArea>
                          </PopoverContent>
                        </Popover>
                      </td>
                      <td className={styles.td}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir Menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="center">
                            <DeleteButton
                              id={sector.id}
                              onSuccess={fetchData}
                            />
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      Nenhum setor encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex text-center justify-center">
        <CreateNewSector onCreateSuccess={fetchData} />
      </CardFooter>
    </Card>
  );
};
