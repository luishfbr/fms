import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { qrcodeSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import example from "@/app/utils/assets/example.jpeg";
import {
  loginWithEmail,
  LoginWithId,
  verifyOtpCode,
  verifyOtpCodeByEmail,
} from "../_actions/login";
import { useToast } from "@/app/utils/ToastContext";
import { useRouter } from "next/navigation";

type QrCodeFormData = z.infer<typeof qrcodeSchema>;

export const NoQrCodeForm: React.FC<{ email: string }> = ({ email }) => {
  const { showToast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QrCodeFormData>({
    resolver: zodResolver(qrcodeSchema),
  });

  const onSubmit = async (data: QrCodeFormData) => {
    const response = await verifyOtpCodeByEmail(data.code, email);
    if (response === true) {
      showToast("Código de autenticação verificado com sucesso!");
      await loginWithEmail(email);
      router.push("/app");
    } else {
      showToast("Código de autenticação inválido.");
    }
  };

  return (
    <div>
      <CardHeader>
        <CardTitle>Verifique o código de autenticação</CardTitle>
        <CardDescription>
          Acesse o aplicativo de autenticação em seu telefone. Igual mostra a
          imagem abaixo!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <Image src={example} alt="QRCode" width={400} height={400} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-44 mt-2 flex flex-col items-center justify-center gap-4"
        >
          <Input
            {...register("code")}
            className="text-center"
            id="code"
            placeholder="Código de verificação"
            autoComplete="off"
          />
          {errors.code && (
            <p className="text-red-700 text-sm">{errors.code.message}</p>
          )}
          <Button type="submit">Verificar</Button>
        </form>
      </CardContent>
    </div>
  );
};
