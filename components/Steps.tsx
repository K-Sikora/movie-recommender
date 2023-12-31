"use client";
import { AiOutlineCheck } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { update } from "@/redux/features/results-slice";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { Button, buttonVariants } from "./ui/button";
import { InfoDrawer } from "./Drawer";
import { useToast } from "./ui/use-toast";
import { useDispatch } from "react-redux";
import { useState } from "react";
import LoadingResultsAnimation from "./LoadingResultsAnimation";
import Container from "./Container";
export default function Steps() {
  const [animation, setAnimation] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const categories = useAppSelector((state) => state.categoriesReducer);
  const movies = useAppSelector((state) => state.moviesReducer);
  const actors = useAppSelector((state) => state.actorsReducer);

  const stepsInfo = [
    {
      name: "actors",
      isFinished: actors.length >= 3,
    },
    {
      name: "movies",
      isFinished: movies.length >= 3,
    },
    {
      name: "categories",
      isFinished: categories.length >= 3,
    },
  ];

  async function sendInfo() {
    try {
      const res = await axios.post("/api/results", {
        actors,
        movies,
        categories,
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  const { mutate } = useMutation({
    mutationKey: ["sendInfo"],
    mutationFn: sendInfo,
    onSuccess: (data) => {
      dispatch(update(data));
      router.push("/results");
    },
  });

  async function handleFinish() {
    const allFinished = stepsInfo.every((step) => step.isFinished);
    if (allFinished) {
      mutate();
      setAnimation(true);
    } else {
      stepsInfo.forEach((step) => {
        !step.isFinished
          ? toast({
              description: `You need to choose more ${step.name}.`,
            })
          : null;
      });
    }
  }
  return (
    <Container className="flex flex-col gap-12 py-12">
      <div className="flex flex-wrap items-start gap-8">
        {stepsInfo.map((step) => (
          <div
            key={step.name}
            className="flex items-center gap-2"
          >
            <div
              className={`flex items-center justify-center border-2 rounded-full w-10 h-10 ${
                step.isFinished ? "bg-primary text-white" : "bg-background"
              }`}
            >
              <AiOutlineCheck className="w-4 h-4" />
            </div>
            <Link
              href={`/${step.name}`}
              className="font-medium capitalize md:text-lg"
            >
              {step.name}
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-between w-full">
        <div>
          <InfoDrawer />
        </div>
        {pathname === "/categories" ? (
          <Button
            onClick={handleFinish}
            className="ml-auto"
          >
            Finish
          </Button>
        ) : (
          <Link
            href={pathname === "/actors" ? "/movies" : "/categories"}
            className={`${buttonVariants({ variant: "default" })} ml-auto`}
          >
            Next step
          </Link>
        )}
      </div>
      {animation && (
        <LoadingResultsAnimation
          actors={actors}
          movies={movies}
          categories={categories}
          open={animation}
        />
      )}
    </Container>
  );
}
