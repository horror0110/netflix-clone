import { getSession } from "next-auth/react";
import prismadb from "../lib/prismadb";
import { Session, getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { options } from "@/app/api/auth/[...nextauth]/options";

interface User {
  id: string;
  email: string;
  // Add other user fields as needed
}

const serverAuth = async (req: any): Promise<{ currentUser: User }> => {
  // Extract the session using the provided NextRequest
  const session: Session | null = await getServerSession({ req, ...options });

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const currentUser: any = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("User not found");
  }

  return { currentUser };
};

export default serverAuth;
