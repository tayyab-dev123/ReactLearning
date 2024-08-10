import { useEffect, useState } from "react";
const KEY = "8dedb31d";

export function useMovie(query, callback) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      callback?.();
      try {
        setIsLoading(true);
        setIsError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
        setIsError("");
      } catch (error) {
        if (error.name === "AbortError") return;
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setIsError("");
      setMovies([]);
      return;
    }
    // handleCloseMovie();
    fetchData();
    return () => {
      controller.abort();
    };
  }, [query]);
  return { isLoading, isError, movies };
}
