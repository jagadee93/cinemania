import React, { useState, useEffect ,useRef} from "react";
import { Link,useNavigate, useParams } from 'react-router-dom';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import axios from "../../api/axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import useAuth from '../../hooks/useAuth';
import Review from "./Review"
const REVIEW_REGEX=/^.{20,}$/
function Reviews(props) {
    const navigate=useNavigate()
    const {auth}=useAuth()
    const [show, setShow] = useState(false);
    const handleClose = async() => {
        postReview();
        setTimeout(() =>{
            setShow(false)
        },3000)
        setErrMsg('')
        ;}
    const handleShow = () => {
        setErrMsg('')
        auth.user?setShow(true):setShow(false)
        if (!auth.user) {
            setVisible(true)
            navigate("/login")
        }


    }
    
    const params=useParams();
    console.log(params.id)
    const [reviews, setReviews] = useState([]);
    const [movieDetails, setMovieDetails] = useState([]);
    const [errMsg,setErrMsg]=useState('')
    // review section
    const [reviewText,setReviewText]=useState('')
    const [rating,setRating]=useState()
    const [validRating,setValidRating]=useState(true)
    //modal 2
    const [visible, setVisible] = useState(false);

    const Close = () => setVisible(false);
    const Show = () => setVisible(true);


    const postReview=async() =>{
    try {
        const response = await axios.post('/reviews',
        JSON.stringify({ movieId:params.id,review:reviewText,rating:rating, username:auth.user,id:auth.id}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        console.log(JSON.stringify(response?.data));
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('You cant review upcoming movie ');
        } else if (err.response?.status === 404) {
            setErrMsg('login to submit review');
        } else if (err.response?.status === 403) {
          setErrMsg('You have already reviewed this movie');
        }
        else  if (err.response?.status ===401){
            setErrMsg('try again later');
        }else{
            setErrMsg('server error');
        }
          
        
    }
    }




useEffect(() => {
    setValidRating(!REVIEW_REGEX.test(reviewText))
}, [reviewText])


    
    console.log(reviewText)
    useEffect(() => {
        let isMounted=true;

        const getMovies = async (props) => {
                try {
                    const response = await axios.get(`/reviews/${params.id}`, {
                    withCredentials: true
                    });
                    setReviews(response.data)
                    console.log(reviews)
                    const details = await axios.get(`/movies/${params.id}`, {
                    withCredentials: true
                    });
                    // setReviews(response.data)
                    setMovieDetails(details.data);
                    console.log(details.data)
                } catch (err) {
                    console.log(err);
                 }
            }
    
    getMovies();

    return () =>{
        isMounted=false
    }
  
  }, [params.id,]);
  return (
      <div className="MovieDetails">
            {movieDetails.map((movie) => {
                return (
                <div>
        <div
        className="detailsPage"
        style={{ backgroundImage: `url(${movie.bgPoster})`,width:"100%",marginTop:"" }
        }
        >
        <div className="banner">
            <div className="details">
            <div className="rateAndLangD">
                <h5 className="movieReleaseDateD">
                {" Rating "}
                {movie.rating ? movie.rating : 5}{" "}
                </h5>
            </div>


            <h1 className="movieTitleD"> {movie.title} </h1>
            <p className="movieDescriptionD"> {movie.plot} </p>
            <div style={{ marginBottom: "30px" }}></div>
            <hr style={{ opacity: "0.1" }}></hr>
            <div style={{ marginBottom: "15px" }}></div>
            <div style={{ display: "inline-flex" }}>
                <h4
                style={{
                    marginRight: "10px",
                    fontWeight: "normal",
                    fontStyle: "italic"
                }}
                className="movieGenreD"
                >
                {" "}
                {movie.genres.map((genre) => genre)}{" "}
                </h4>
            </div>

            <div className="rateAndLangD">
                <p className="movieDescriptionD">
                {" "}
                {"Runtime: " + movie.runtime + " mins"}{" "}
                </p>
                <p className="movieDescriptionD">
                {" "}
                {"Budget: $" + "400m"}{" "}
                </p>
            </div>

            <div className="rateAndLangD">
                <h4 className="movieRatingD">
                {" "}
                {"Rating: " + movie.rating}{" "}
                </h4>
                <h4>
                Language:{" "}
                <span className="movieLanguageD"> {movie.language} </span>{" "}
                </h4>
            </div>
            <div style={{ paddingBottom: "20px" }}></div>
            </div>
            <div style={{marginTop:'100 px'}}>
                <a href={"dewj"}>
                    {" "}
                    <img
                    alt="moviePoster"
                    className="moviePosterD"
                    src={movie.poster}>

                </img>{" "}
                </a>
                        </div>
                    </div>
                    </div>
                </div>
                );
            })}
            

            <>
      <Button variant="primary" onClick={handleShow}>
        Add review 
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {
            errMsg
        }
        <div style={{color:'orange'}}>
        {rating>=1? (<IoIosStar  onClick={() =>setRating(1)}/>) : (<IoIosStarOutline onClick={() => setRating(1)}/>)}
        {rating>=2?(<IoIosStar onClick={() =>setRating(2)} />) : (<IoIosStarOutline onClick={() =>setRating(2)} />)}
        {rating>=3?(<IoIosStar onClick={() =>setRating(3)} />) : (<IoIosStarOutline onClick={() =>setRating(3)} />)}
        {rating>=4?(<IoIosStar onClick={() =>setRating(4)} />) : (<IoIosStarOutline onClick={() =>setRating(4)} />)}
        {rating>=5?(<IoIosStar onClick={() =>setRating(5)} />) : (<IoIosStarOutline onClick={() =>setRating(5)} />)}
        {rating>=6?(<IoIosStar onClick={() =>setRating(6)} />) : (<IoIosStarOutline onClick={() =>setRating(6)} />)}
        {rating>=7?(<IoIosStar onClick={() =>setRating(7)} />) : (<IoIosStarOutline onClick={() =>setRating(7)} />)}
        {rating>=8?(<IoIosStar onClick={() =>setRating(8)} />) : (<IoIosStarOutline onClick={() =>setRating(8)} />)}
        {rating>=9?(<IoIosStar onClick={() =>setRating(9)} />) : (<IoIosStarOutline onClick={() =>setRating(9)} />)}
        {rating>=10?(<IoIosStar onClick={() =>setRating(10)} />) : (<IoIosStarOutline onClick={() =>setRating(10)} />)}
        <h4>{rating}</h4>
        </div>
          <Form>
            <Form.Group
              className="mb-3" >
              <Form.Label>Enter Rating here</Form.Label>
              <Form.Control aria-describedby="uidnote" onChange={(e) =>setReviewText(e.target.value) } as="textarea" rows={3} />

              <p id="uidnote" className={reviewText.length<20 ? "instructions" : "offscreen"}>
                minimum 20 character long.<br />
            </p>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button  disabled={validRating} variant="primary" onClick={handleClose}>
            Post Review
          </Button>
        </Modal.Footer>
      </Modal>
    </>

    <>
     

      <Modal
        show={visible}
        onHide={Close}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> You have not logged in</Modal.Title>
        </Modal.Header>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={Close}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
            <div>
            {
                reviews.length>0 ? 
                      <Review people={reviews} />:<h1>"No reviews found"</h1> 
            }
            </div>
            </div>
  );
}

export default Reviews;
