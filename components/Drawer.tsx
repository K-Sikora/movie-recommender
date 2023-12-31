"use client";
import { useAppSelector } from "@/redux/store";

import { Drawer } from "vaul";
import { Button } from "./ui/button";
import SingleActor from "./SingleActor";
import DividerHeading from "./DividerHeading";
import SingleMovie from "./SingleMovie";
import SingleCategory from "./SingleCategory";
import { AiFillGithub } from "react-icons/ai";
import Link from "next/link";
import Container from "./Container";

export function InfoDrawer() {
  const categories = useAppSelector((state) => state.categoriesReducer);
  const movies = useAppSelector((state) => state.moviesReducer);
  const actors = useAppSelector((state) => state.actorsReducer);
  return (
    <Drawer.Root fixedHeight>
      <Drawer.Trigger asChild>
        <Button variant={"outline"}>See currently chosen</Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-30 bg-black/40" />
        <Drawer.Content className="flex flex-col z-40 rounded-t-[10px] max-h-[70vh] md:max-h-[85vh] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-background rounded-t-[10px] overflow-auto flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
            <Container>
              <Drawer.Title className="mb-4 font-medium">
                Your currently chosen actors, movies and categories.
              </Drawer.Title>
              <DividerHeading>Actors</DividerHeading>
              <div className="grid grid-cols-3 gap-2 my-6 gap-y-8 xs:grid-cols-5 sm:grid-cols-5 md:grid-cols-6 xl:grid-cols-8">
                {actors.map((actor) => (
                  <SingleActor
                    key={actor.id}
                    actor={actor}
                  />
                ))}
              </div>
              <DividerHeading>Movies</DividerHeading>
              <div className="grid grid-cols-3 gap-2 my-6 gap-y-8 xs:grid-cols-5 sm:grid-cols-5 md:grid-cols-6 xl:grid-cols-8">
                {movies.map((movie) => (
                  <SingleMovie
                    key={movie.id}
                    movie={movie}
                  />
                ))}
              </div>
              <DividerHeading>Categories</DividerHeading>
              <div className="flex flex-wrap gap-2 my-6 gap-y-4">
                {categories.map((category) => (
                  <SingleCategory
                    key={category.id}
                    category={category}
                  />
                ))}
              </div>
            </Container>
          </div>
          <div className="p-4 mt-auto border-t bg-background">
            <div className="flex justify-end max-w-6xl gap-6 px-4 mx-auto">
              <Link href="https://github.com/K-Sikora">
                <AiFillGithub size={20} />
              </Link>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
