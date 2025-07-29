import Home from "@/components/custom/home/home";
import { auth } from "@/lib/auth";
import { loadSearchParams } from "@/modules/agents/params";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { SearchParams } from "nuqs";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session){
    redirect("/sign-in")
  }
  return (
    <Home/>
  );
}

export default Page
