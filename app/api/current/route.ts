import serverAuth from "@/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import prismadb from "../../../lib/prismadb";

export const GET = async (req: NextRequest) => {
  try {
    const { currentUser } = await serverAuth(req);

    return NextResponse.json(currentUser, { status: 200 });
  } catch (err) {
    console.error("Error:", err);

    // Return error message in case of failure
    return NextResponse.json({ error: err }, { status: 400 });
  }
};
