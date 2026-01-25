import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Asegúrate de que la ruta a tus estilos sea la correcta
import TidioChat from "./components/TidioChat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Impatto Py - Hogar e Iluminación",
  description: "Soluciones exclusivas para tu hogar, cocina e iluminación en Paraguay.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* Aquí se renderiza todo el contenido de tus páginas (Navbar, Hero, etc.) */}
        {children}

        {/* Carga del Chat Profesional de Tidio. 
            Aparecerá una burbuja en la esquina inferior derecha. 
        */}
        <TidioChat />
      </body>
    </html>
  );
}
