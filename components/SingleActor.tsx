"use client";
import Image from "next/image";
import { update, remove } from "@/redux/features/actors-slice";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { Poppins } from "next/font/google";
import { Button } from "./ui/button";
import { AiOutlineCheck } from "react-icons/ai";
import { AppDispatch, useAppSelector } from "@/redux/store";
const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });
type Props = {
  actor: {
    id: string;
    name: string;
    profile_path: string;
  };
};
export default function SingleActor(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { actor } = props;
  const actors = useAppSelector((state) => state.actorsReducer);
  return (
    <div
      onClick={() => {
        const isInArray = actors.some(
          (actorElement) => actorElement === actor.id
        );
        if (isInArray) {
          dispatch(remove(actor.id));
        } else {
          dispatch(update(actor.id));
        }
        console.log(actors);
      }}
      className={`relative flex flex-col gap-2 pb-2 duration-200 border-2 rounded-lg shadow-md cursor-pointer hover:opacity-90 hover:border-primary ${
        actors.some((actorElement) => actorElement === actor.id)
          ? "border-primary"
          : ""
      } group`}
    >
      <div className="relative">
        <Image
          src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
          width={126}
          height={189}
          className="w-full rounded-t-lg"
          alt={actor.name}
        />
        {actors.some((actorElement) => actorElement === actor.id) && (
          <div className="absolute duration-300 right-1 bottom-1">
            <Button
              variant={"default"}
              size={"icon"}
              className="w-6 h-6"
            >
              <AiOutlineCheck className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
      <h2
        className={`text-sm px-2 line-clamp-2 break-words ${poppins.className}`}
      >
        {actor.name}
      </h2>
    </div>
  );
}