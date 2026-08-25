import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://epocaindumentaria.com.ar"),
  title: "ÉPOCA Indumentaria | Tienda Online Oficial",
  description:
    "Descubrí la colección de Época Indumentaria. Sastrería de autor, abrigos Perramus, camisería de lino y accesorios exclusivos en nuestra boutique de San Martín 1718.",
  keywords: [
    "Época Indumentaria",
    "Sastrería",
    "Perramus",
    "Ambos Hombre",
    "Moda Argentina",
    "San Martín 1718",
    "Camisas de Lino",
    "Trenchs",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/images/epoca/brand/favicon.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [{ url: "/images/epoca/brand/favicon.png" }],
  },
  openGraph: {
    title: "ÉPOCA Indumentaria | Tienda Online Oficial",
    description:
      "Sastrería de autor, línea femenina y abrigos Perramus en Época Indumentaria.",
    images: ["/images/epoca/brand/logo-epoca-social.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${jakarta.variable} ${cormorant.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FAF9F6] text-[#16203B]">
        {children}
      </body>
    </html>
  );
}
