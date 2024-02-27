
import Header from "@/components/header";
import HomePage from "@/components/home-page";
import useUser from "@/hooks/useUser";
import { IUser } from "@/interface-d";
import { useSession } from "next-auth/react";

export default function Home() {

  return (
    <main>
      <Header />
      <HomePage />
    </main>
  );
}
