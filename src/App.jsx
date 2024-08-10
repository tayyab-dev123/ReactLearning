import { useEffect, useRef, useState } from "react";
import "./App.css";
import StarRating from "./Components/StarRating";
import { useMovie } from "./useMovie";
import { useLocalStorage } from "./useLocalStorage";
import { useKey } from "./useKey";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const Logo = () => {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
};

const SearchBar = ({ query, setQuery }) => {
  const inputEL = useRef();

  useKey("Enter", function (e) {
    if (document.activeElement === inputEL.current) return;
    inputEL.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEL}
    />
  );
};

const ResultFound = ({ movies }) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

const NavBar = ({ children }) => {
  return <nav className="nav-bar">{children}</nav>;
};

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "8dedb31d";

// fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
//   .then((movies) => movies.json())
//   .then((data) => setMovies(data.Search));
export default function App() {
  const [query, setQuery] = useState("");
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useLocalStorage([], "watched");

  const [selectedId, setSelectedId] = useState(null);
  const [userRating, setUserRating] = useState("");
  const handleSelectedMovie = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };
  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteMovie = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };
  const { movies, isLoading, isError } = useMovie(query, handleCloseMovie);
  return (
    <>
      <NavBar movies={movies}>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <ResultFound movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !isError && (
            <MovieList movies={movies} onSelectedMovie={handleSelectedMovie} />
          )}
          {isError && <ErrorMessage error={isError} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onMovieClose={handleCloseMovie}
              onAddWatched={handleAddWatched}
              setUserRating={setUserRating}
              userRating={userRating}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                handleDeleteMovie={handleDeleteMovie}
              />
            </>
          )}
        </Box>

        {/* <Box element={<MovieList movies={movies} />} />
        <Box
          element={
            <>
              <WatchedSummary watched={tempWatchedData} />
              <WatchedMovieList watched={tempWatchedData} />
            </>
          }
        /> */}

        {/* <WatchBox /> */}
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ error }) {
  return <p className="error">{error}</p>;
}

const Main = ({ children }) => {
  return <main className="main">{children}</main>;
};

const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
};

export const MovieList = ({ movies, onSelectedMovie }) => {
  return (
    <div>
      <ul className="list list-movies">
        {movies?.map((movie) => (
          <Movie
            movie={movie}
            key={movie.imdbID}
            onSelectedMovie={onSelectedMovie}
          />
        ))}
      </ul>
    </div>
  );
};

export const Movie = ({ movie, onSelectedMovie }) => {
  return (
    <div>
      <li onClick={() => onSelectedMovie(movie.imdbID)} key={movie.imdbID}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </li>
    </div>
  );
};

export const MovieDetails = ({
  selectedId,
  onMovieClose,
  onAddWatched,
  setUserRating,
  userRating,
  watched,
}) => {
  const [movie, setMovie] = useState([]);
  const countRef = useRef(0);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    imdbRating,
    Plot: plot,
    // Type: type,
    Actors: actors,
    Released: released,
    Runtime: runtime,
    Director: director,
  } = movie;
  useEffect(() => {
    if (userRating) {
      countRef.current += 1;
    }
  }, [userRating]);
  useEffect(() => {
    async function fetMovieDetails() {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
    }
    fetMovieDetails();
  }, [selectedId]);

  useKey("Escape", onMovieClose);

  useEffect(() => {
    if (!title) return;
    document.title = "Movie | " + title;
    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0]),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onMovieClose();
  }

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onMovieClose}>
          &larr;
        </button>
        <img src={poster} alt={`${title} poster`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDb Rating
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          {!isWatched ? (
            <>
              {" "}
              <StarRating
                MaxRating={10}
                size={24}
                onSettingRating={setUserRating}
              />
              {userRating > 0 ? (
                <button onClick={handleAdd} className="btn-add">
                  + Add to list
                </button>
              ) : null}
            </>
          ) : (
            <p>Already Watched Movie rating is {watchedUserRating}</p>
          )}
        </div>
        <em>{plot}</em>
        <p>Starring {actors}</p>
        <p>Directed {director}</p>
      </section>
    </div>
  );
};

const WatchedSummary = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div>
      <div className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{watched.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{avgImdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{avgRuntime} min</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const WatchedMovieList = ({ watched, handleDeleteMovie }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          handleDeleteMovie={handleDeleteMovie}
        />
      ))}
    </ul>
  );
};

const WatchedMovie = ({ movie, handleDeleteMovie }) => {
  return (
    <div>
      <li key={movie.imdbID}>
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <h3>{movie.title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>
          <button
            className="btn-delete"
            onClick={() => handleDeleteMovie(movie.imdbID)}
          >
            X
          </button>
        </div>
      </li>
    </div>
  );
};
