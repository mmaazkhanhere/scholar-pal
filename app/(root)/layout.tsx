
import "./globals.css";
import type { Metadata } from "next";
import AuthContext from "@/libs/auth-context";
import LoginModal from "@/components/modals/login-modal";
import RegisterModal from "@/components/modals/registar-modal";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <LoginModal />
          <RegisterModal />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
