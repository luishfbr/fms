import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";

export const WorkContract = () => {
  return (
    <TabsContent value="account">
      <Card>
        <form action="">
          <CardContent className="space-y-2 mt-4">
            <div className="grid grid-cols-3 gap-4">
              <Input
                className="text-center "
                placeholder="Prateleira"
                type="text"
              />
              <Input
                className="text-center "
                placeholder="Caixa"
                type="text"
              />
              <Input
                className="text-center "
                placeholder="Pasta"
                type="text"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" name="name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" name="cpf" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="addData">Data de Admissão</Label>
                <Input type="date" id="addData" name="addData" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="logoutDate">Data de Rescisão</Label>
                <Input type="date" id="logoutDate" name="logoutDate" />
              </div>
            </div>
            <div className="flex items-center justify-center text-center">
              <Label
                className="text-sm text-muted-foreground"
                htmlFor="actuality"
              >
                Ainda empregado?
              </Label>
              <Input
                className="mx-2 h-3 w-3 cursor-pointer"
                type="checkbox"
                id="actuality"
                name="actuality"
              />
            </div>
          </CardContent>
          <CardFooter className="grid">
            <Button>Salvar Arquivo</Button>
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  );
};
