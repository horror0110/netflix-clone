import { without } from "lodash";
import prismadb from "../../../lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import serverAuth from "@/lib/serverAuth";

export const POST = async (req: NextRequest) => {
  try {
    const { movieId } = await req.json();

    const { currentUser } = await serverAuth(req);

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      throw new Error("Invalid ID");
    }

    const user = await prismadb.user.update({
      where: {
        email: currentUser?.email || "",
      },
      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.log(err);

    return NextResponse.json(err, { status: 400 });
  }
};

export const DELETE = async (req: NextRequest) => {
  const { currentUser }: any = await serverAuth(req);

  const { movieId } = await req.json();

  const existingMovie = await prismadb.movie.findUnique({
    where: {
      id: movieId,
    },
  });

  if (!existingMovie) {
    throw new Error("Invalid ID");
  }

  // Хэрэглэгчийн favoriteIds array дотроос movieIds ийг хасаад бусдын аваад ир

  const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

  const updatedUser = await prismadb.user.update({
    where: {
      email: currentUser.email || "",
    },
    data: {
      favoriteIds: updatedFavoriteIds,
    },
  });

  return NextResponse.json(updatedUser, { status: 200 });
};
