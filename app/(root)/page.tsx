import getCurrentUser from "@/actions/getCurrentUser";
import Header from "@/components/header";
import { IUser } from "@/interface-d";


export default async function Home() {

  const currentUser = await getCurrentUser()

  return (
    <main>
      <Header currentUser={currentUser as IUser} />
    </main>
  );
}
