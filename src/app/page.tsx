import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/options";
import Link from "next/link";
import CountrySearch from "../components/CountrySearch";
export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Link
        href="/api/auth/signout"
        className="px-4 py-2 font-bold text-white rounded bg-red-400 text-xl"
      >
        {" "}
        SIGN OUT{" "}
      </Link>
      <div className="text-lg p-2">
        You are signed in as {session?.user?.name}
      </div>
      <CountrySearch />
    </div>
  );
}
