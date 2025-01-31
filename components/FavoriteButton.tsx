"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import ClipLoader from "react-spinners/ClipLoader";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();

  const { data: currentUser, mutate } = useCurrentUser();

  const [isLoading, setIsLoading] = useState(false);

  // хэрэглэгчийн favoriteIds array дотор энэ кино байгаа эсэхийг шалгах return true or false

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    setIsLoading(true);
    let response;

    if (isFavorite) {
      response = await axios.delete("/api/favorite", { data: { movieId } });
      setIsLoading(false);
    } else {
      response = await axios.post("/api/favorite", { movieId });
      setIsLoading(false);
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });

    mutateFavorites();

    setIsLoading(false);
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div>
      {isLoading ? (
        <ClipLoader
          color="red"
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div
          onClick={toggleFavorites}
          className="cursor-pointer group/item w-4 h-4 md:w-10 md:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
        >
          <Icon className="text-white" size={25} />
        </div>
      )}
    </div>
  );
};

export default FavoriteButton;
