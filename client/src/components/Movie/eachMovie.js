import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import notFound from "./notFound.png"
export const EachMovie = (props) => {
  let poster = props.moviePoster;
  return (
    <div className="movieStack" onClick={(e) => props.onClickFunc(props.index)}>
      <div className="eachMovie">
        <Link to={`/movies/${props.index}`}>
          <img 
            alt="moviePoster" 
            src={poster?poster:notFound}  
            className="moviePoster"
            onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src=notFound;
              }}
            />{" "}
        </Link>
      
            <Row className="justify-content">
                <Col><span className=""> {props.rating} </span></Col>
                <Col><span className=""> {props.movieTitle} </span>{" "}</Col>
                <Col><span className=""> {props.movieLanguage} </span></Col>
                
            </Row>

      </div>
      <div></div>
    </div>
  );
};
