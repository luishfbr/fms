"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import register from "../_actions/register";

export function RegisterForm() {
  return (
    <TabsContent value="register">
      <Card>
        <form action={register}>
          <CardHeader>
            <CardTitle>Crie uma nova conta</CardTitle>
            <CardDescription>
              Insira as informações e registre-se em nosso gerenciador de
              arquivos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="off"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="off"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="off"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="passwordAgain">Digite Novamente</Label>
              <Input
                id="passwordAgain"
                name="passwordAgain"
                type="password"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex text-center items-center justify-center">
            <Button className="font-extralight">Registrar</Button>
          </CardFooter>
        </form>
      </Card>
      <Toaster />
    </TabsContent>
  );
}
