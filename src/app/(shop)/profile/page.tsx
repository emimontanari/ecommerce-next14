import { Title } from "@/components";
import { auth } from "../../../auth.config";
import { redirect } from "next/navigation";

export default async function PhofilePage() {
  const session = await auth();

  if (!session?.user) redirect("/");
  return (
    <div>
      <Title title="Perfil" />

      <pre>{JSON.stringify(session.user, null, 2)}</pre>

      <h1>{session.user.role}</h1>
    </div>
  );
}
