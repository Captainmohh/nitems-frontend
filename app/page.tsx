<<<<<<< HEAD
import Topbar from "@/components/layout/Topbar"


export default function Home() {
  return(
    <Topbar />
  );
}
=======
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/dashboard");
}
>>>>>>> main
