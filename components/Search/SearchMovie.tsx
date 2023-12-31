"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

export default function SearchMovie() {
  const searchParams = useSearchParams();
  const movieQuery = searchParams.get("movieQuery");
  console.log(movieQuery);
  const router = useRouter();
  const [search, setSearch] = useState(movieQuery ? movieQuery : "");
  const [query] = useDebounce(search, 500);
  useEffect(() => {
    if (!query) {
      router.push("/movies");
    } else {
      router.push(`/movies?query=${query}`);
    }
  }, [query, router]);
  return (
    <Input
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
      }}
      placeholder="Search movie..."
      className="my-6"
    />
  );
}
