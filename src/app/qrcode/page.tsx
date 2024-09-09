"use client";

import { ToastProvider } from "../utils/ToastContext";
import { QrCodeForm } from "./_components/qrcode-form";

export default function Page() {
  return (
    <ToastProvider>
      <div className="h-screen mx-auto flex items-center justify-center">
        <QrCodeForm />
      </div>
    </ToastProvider>
  );
}
