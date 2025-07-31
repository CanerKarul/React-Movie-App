import useLocalStorage from "./hooks/useLocalStorage";
import useMovies from "./hooks/useMovies";
import Pagination from "./components/Pagination";
import ErrorMessage from "./components/ErrorMessage";
import Loading from "./components/Loading";
import Nav from "./components/Navbar/Nav";
import Logo from "./components/Navbar/Logo";
import Search from "./components/Navbar/Search";
import NavSearchResult from "./components/Navbar/NavSearchResult";
import Main from "./components/Main";
import ListContainer from "./components/ListContainer";
import MovieList from "./components/Movies/MovieList";
import MyListSummary from "./components/SelectedMovies/MyListSummary";
import MyMovieList from "./components/SelectedMovies/MyMovieList";
import MovieDetails from "./components/Movies/MovieDetails";

import { useState } from "react";

const api_key = "43a2f6c12cbf6c2d657dcc9e9d290245";

// console.log(getAvarage(selected_movie_list.map((m) => m.rating)));

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovies, setSelectedMovies] = useLocalStorage(
    [],
    "selectedMovies"
  );

  const [selectedMovie, setSelectedMovie] = useState(null);

  const {
    movies,
    loading,
    error,
    currentPage,
    totalPages,
    total_results,
    NextPage,
    PreviousPage,
  } = useMovies(query);

  function handleSelectedMovie(id) {
    setSelectedMovie((selectedMovie) => (id === selectedMovie ? null : id));
  }

  function handleUnselectMovie() {
    setSelectedMovie(null);
  }

  function handleAddToList(movie) {
    setSelectedMovies((selectedMovies) => [...selectedMovies, movie]);
    handleUnselectMovie();
  }

  function handleDeleteFromList(id) {
    setSelectedMovies((selectedMovies) =>
      selectedMovies.filter((m) => m.id !== id)
    );
  }

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NavSearchResult total_results={total_results} />
      </Nav>
      <Main>
        <div className="row mt-2">
          <div className="col-md-9">
            <ListContainer>
              {/* {loading ? <Loading /> : <MovieList movies={movies} />} */}

              {loading && <Loading />}
              {!loading && !error && (
                <>
                  {movies.length > 0 && (
                    <>
                      <MovieList
                        movies={movies}
                        onSelectMovie={handleSelectedMovie}
                        selectedMovie={selectedMovie}
                      />
                      <Pagination
                        NextPage={NextPage}
                        PreviousPage={PreviousPage}
                        currentPage={currentPage}
                        totalPages={totalPages}
                      />
                    </>
                  )}
                </>
              )}
              {error && <ErrorMessage message={error} />}
            </ListContainer>{" "}
          </div>
          <div className="col-md-3">
            <ListContainer>
              {selectedMovie ? (
                <MovieDetails
                  selectedMovie={selectedMovie}
                  onUnSelectMovie={handleUnselectMovie}
                  onAddToList={handleAddToList}
                  selectedMovies={selectedMovies}
                />
              ) : (
                <>
                  <MyListSummary selectedMovies={selectedMovies} />
                  <MyMovieList
                    selectedMovies={selectedMovies}
                    onDeleteFromList={handleDeleteFromList}
                  />
                </>
              )}
            </ListContainer>
          </div>
        </div>
      </Main>
    </>
  );
}

// function MyMovieListContainer() {
//   const [selectedMovies, setSelectedMovies] = useState(selected_movie_list);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="movie-list">
//       <button
//         className="btn btn-sm btn-outline-primary mb-2"
//         onClick={() => setIsOpen2((val) => !val)}
//       >
//         {isOpen2 ? (
//           <i className="bi bi-chevron-up"></i>
//         ) : (
//           <i className="bi bi-chevron-down"></i>
//         )}
//       </button>

//       {isOpen2 && (
//         <>
//           <MyListSummary selectedMovies={selectedMovies} />
//           <MyMovieList selectedMovies={selectedMovies} />
//         </>
//       )}
//     </div>
//   );
// }
