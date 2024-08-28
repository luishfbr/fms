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
import { ScrollArea } from "@/components/ui/scroll-area";
import styles from "@/app/app/styles/main.module.css";
import { getUsers } from "./_actions/users";
import { DeleteButton } from "./_components/usersButtons/deleteButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { EditButton } from "./_components/usersButtons/editButton";
import { ChangeRole } from "./_components/usersButtons/changeRole";

type Users = {
  name: string;
  email: string;
  role: string;
};

export function CardUsers() {
  const [users, setUsers] = React.useState<Users[]>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  // Função para buscar usuários
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchData();
  }, []);

  // Filtrar usuários com base no termo de pesquisa
  const filteredUsers = users.filter((user) =>
    [user.name, user.email, user.role].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Lista de Usuários Cadastrados</CardTitle>
        <CardDescription>
          Pesquise pelo nome, email ou permissão do colaborador.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 h-10 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <ScrollArea className="h-72 rounded-md border">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className={styles.th}>Nome</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Permissão</th>
                  <th className={styles.th}></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.email}>
                      <td className="px-2 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className={styles.td}>{user.email}</td>
                      <td className={styles.td}>{user.role}</td>
                      <td>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild className="flex">
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir Menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="center">
                            <DeleteButton email={user.email} />
                            <DropdownMenuSeparator />

                            <ChangeRole email={user.email} />
                            <DropdownMenuSeparator />
                            <EditButton email={user.email} />
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      Nenhum usuário encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex text-center justify-center">
        <span className="text-sm text-muted-foreground">
          Acesse o cartão ao lado para registrar um novo usuário.
        </span>
      </CardFooter>
    </Card>
  );
}
