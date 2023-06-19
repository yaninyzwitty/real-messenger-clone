"use client";
import { SessionProvider } from "next-auth/react";

import { Session } from "next-auth";

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

function Providers({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default Providers;
