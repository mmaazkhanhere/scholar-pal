import getCurrentUser from "@/actions/getCurrentUser";
import Header from "@/components/header";
import HomePage from "@/components/home-page";
import { IUser } from "@/interface-d";


export default async function Home() {

  const currentUser = await getCurrentUser()

  return (
    <main>
      <Header currentUser={currentUser as IUser} />
      <HomePage currentUser={currentUser as IUser} />
    </main>
  );
}
