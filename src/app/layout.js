import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ayuda Emergencia Venezuela | Generador de Flyers",
  description: "Plataforma de respuesta rápida. Genera y difunde flyers de personas desaparecidas, solicitudes de insumos o estado de emergencia de manera instantánea y optimizada.",
  openGraph: {
    title: "Ayuda Emergencia Venezuela",
    description: "Crea y comparte flyers de emergencia de forma instantánea. Sistema optimizado para bajas conexiones.",
    type: "website",
    locale: "es_VE",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
