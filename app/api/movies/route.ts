import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";

export const GET = async (req: NextRequest) => {
  try {
    const movies = await prismadb.movie.findMany();
    return NextResponse.json(movies, { status: 200 });
  } catch (err) {
    console.log(err);

    return NextResponse.json(err, { status: 400 });
  }
};
