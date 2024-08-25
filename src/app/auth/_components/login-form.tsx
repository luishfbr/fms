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
import { loginCredentials, loginGithub, loginGoogle } from "../_actions/login";

export function LoginForm() {
  return (
    <TabsContent value="login">
      <Card>
        <CardHeader>
          <CardTitle>Seja bem-vinda(o)!</CardTitle>
          <CardDescription>
            Insira as informações e acesse o gerenciador de arquivos.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="flex justify-center items-center space-x-6">
            <form action={loginGithub}>
              <Button type="submit">Entrar com Github</Button>
            </form>
            <form action={loginGoogle}>
              <Button type="submit">Entrar com Google</Button>
            </form>
          </div>
          <form action={loginCredentials}>
            <div className="space-y-1">
              <Label htmlFor="username">Usuário</Label>
              <Input id="username" name="username" type="text" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" />
            </div>
            <div className="flex text-center items-center justify-center mt-6">
              <Button type="submit">Entrar com credenciais</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </TabsContent>
  );
}
