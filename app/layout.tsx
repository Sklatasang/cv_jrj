import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jordi Roura | Software Developer & Computer Engineering",
  description:
    "Portfolio de Jordi Roura: Developer & IT Consultant a Deister Software i estudiant de 4t d'Enginyeria Informàtica a la UdG. ERP, integracions, dades, automatització i debugging.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca">
      <body>{children}</body>
    </html>
  );
}
