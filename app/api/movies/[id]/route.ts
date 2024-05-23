import serverAuth from "@/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../../lib/prismadb";

export const GET = async (req: NextRequest, { params }: any) => {
  try {

    console.log("server side:" , params.id)
    await serverAuth(req);

    const movie = await prismadb.movie.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!movie) {
      throw new Error("Invalid ID");
    }

    return NextResponse.json(movie, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 400 });
  }
};
