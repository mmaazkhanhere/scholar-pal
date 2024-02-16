import getCurrentUser from "@/action/getCurrentUser";
import Header from "@/components/header";


export default async function Home() {

  const currentUser = await getCurrentUser()

  return (
    <main>
      <Header currentUser={currentUser!} />
    </main>
  );
}
