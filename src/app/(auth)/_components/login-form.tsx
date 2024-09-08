"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { login } from "../_actions/login";

export function LoginForm() {
  return (
    <TabsContent value="login">
      <Card>
        <div>
          <CardHeader>
            <CardTitle>Seja bem-vinda(o)!</CardTitle>
            <CardDescription>
              Insira as informações e acesse o gerenciador de arquivos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form action={login}>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" name="password" type="password" />
              </div>
              <div className="flex text-center items-center justify-center mt-6">
                <Button type="submit">Entrar</Button>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    </TabsContent>
  );
}
