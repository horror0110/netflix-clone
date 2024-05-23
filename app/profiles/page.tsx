"use client";
import React, { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";

const ProfilesPage = () => {
  const { data: session, status }: any = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      router.push("/auth");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return null; // Render nothing if not authenticated
  }
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div
            onClick={() => {
              router.push("/");
            }}
          >
            <div className="group flex-row w-44 mx-auto">
              <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent grou-hover:cursor-pointer group-hover:border-white overflow-hidden">
                <Image
                  src="/images/default.png"
                  alt="Profile"
                  width={200}
                  height={200}
                />
              </div>
              <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                {session?.user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilesPage;
