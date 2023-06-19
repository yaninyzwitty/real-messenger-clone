import "./globals.css";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Providers from "./Providers";
import ClientProvider from "./ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Messenger",
  description: "Generated by witty",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
          <ClientProvider />

          {children}
        </Providers>
      </body>
    </html>
  );
}
