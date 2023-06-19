import Authform from "@/components/Authform";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="https://links.papareact.com/jne"
          height={48}
          width={48}
          alt=""
          className="mx-auto w-auto"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <Authform />
    </main>
  );
}
