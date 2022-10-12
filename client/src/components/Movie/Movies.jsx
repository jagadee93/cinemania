
import { useState, useEffect } from "react";
import { EachMovie } from "./eachMovie";
import axios from "../../api/axios";
import Reviews from "../Review/Reviews";
export const Movies = () => {
  
  const [currentIndex, changeCurrentIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1000);

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(`/movies?page=${page}`);
        console.log(response.data, "movies");
        setMovies(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getMovies();
  }, [page]);

  function MovieDetails(movieID) {
    return <Reviews  id={movieID} />
  }

  function scrollToTop() {
    //
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <>
    <div className="gridView">
    
      {movies.map((movie, index) => {
        return (
          <div>
            <EachMovie
              key={movie._id}
              index={movie._id}
              onClickFunc={MovieDetails}
              bgImage={""}
              moviePoster={movie.poster}
              movieRD={movie.year}
              movieTitle={movie.title}
              movieDescription={movie.plot}
              movieRating={movie.rating}
              movieLanguage={movie.language}
            
            />
          </div>
        );
      })} 
    </div>


    <footer className="footer">
    <div className="pageBtn">
        <button
          onClick={(e) => {setPage(page > 1 ? page - 1 : 1);scrollToTop();}}
          className="btn2"
        >{" "}
          Back
        </button>
        <span style={{ color: "white", marginRight: "15px" }}>
          {" "}Page: {page + "/" + totalPages}
        </span>
        <button
          className="btn2"
          onClick={(e) => {
            setPage(page + 1 > totalPages ? 1 : page + 1);
            scrollToTop();
            changeCurrentIndex(0);
          }}>
          {" "}Next
        </button>
        </div>
      </footer>
</>
  );
};
