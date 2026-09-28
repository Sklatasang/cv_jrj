import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jordi Roura | Software Engineer",
  description:
    "Portfolio de Jordi Roura, Software Engineer i estudiant de 4t de GEINF especialitzat en desenvolupament ERP, dades, integracions i automatització.",
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
