import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";
import { getAuthSession } from "../auth/[...nextauth]/options";
import serverAuth from "@/lib/serverAuth";

export const GET = async (req: NextRequest) => {
  try {
    const { currentUser }: any = await serverAuth(req);

    if (!currentUser) {
      return NextResponse.json("Unauthorized", { status: 404 });
    }

    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser.favoriteIds,
        },
      },
    });

    return NextResponse.json(favoriteMovies, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(err, { status: 500 });
  }
};
