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
import { loginWithEmail, updateTOTP, verifyOtpCode } from "../_actions/login";
import { useState } from "react";
import { useToast } from "@/app/utils/ToastContext";
import { useRouter } from "next/navigation";

type QrCodeFormData = z.infer<typeof qrcodeSchema>;

export const QrCodeForm: React.FC<{ qrcode: string; id: string; email: string }> = ({
  qrcode,
  id,
  email,
}) => {
  const { showToast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QrCodeFormData>({
    resolver: zodResolver(qrcodeSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: QrCodeFormData) => {
    setIsSubmitting(true);
    try {
      const verify = await verifyOtpCode(data.code, id);
      if (verify === true) {
        showToast("Código de autenticação verificado com sucesso!");
        await updateTOTP(id);
        await loginWithEmail(email);
        router.push("/app");
      } else {
        showToast("Código de autenticação inválido.");
      }
    } catch (error) {
      showToast("Servidor não está respondendo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <CardHeader>
        <CardTitle>Leia o Código Abaixo!</CardTitle>
        <CardDescription>
          Acesse o aplicativo de autenticação (Microsoft Authenticator) em seu
          telefone.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <Image src={qrcode} alt="QRCode" width={300} height={300} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-xs flex flex-col items-center justify-center gap-4 mt-4"
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
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Verificando..." : "Verificar"}
          </Button>
        </form>
      </CardContent>
    </div>
  );
};
