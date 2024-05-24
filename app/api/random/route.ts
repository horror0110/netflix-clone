import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export const GET = async (req: NextRequest) => {
  try {
    await serverAuth(req);
    const movieCount = await prismadb.movie.count();

    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return NextResponse.json(randomMovies[0], { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 400 });
  }
};
