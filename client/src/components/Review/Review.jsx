import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";


const ImgSrc='https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg'

const Review = ({people}) => {
  const {auth}=useAuth()
  const [index, setIndex] = useState(0);
  {}



  const job=auth?.roles?.includes(5150)?"Admin"
  :auth?.roles?.includes(1984)?"Critic"
  :auth?.roles?.includes(2001)?"Viewer"
  :""
  const {_id,postedAt,uniqueId,userInfo:{name},rating,review}=people[index]
  console.log(_id,postedAt,uniqueId,name,rating)
  console.log(people)
  const checkNumber = (number) => {
    if (number > people.length - 1) {
      return 0;
    }
    if (number < 0) {
      return people.length - 1;
    }
    return number;
  };

  const nextPerson = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };

  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };

  const minIndex = 0;
  const maxIndex = people.length - 1;

  const getRandomPerson = () => {
    const getRandomIntInclusive = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    };

    let randomIndex = getRandomIntInclusive(minIndex, maxIndex);
    if (randomIndex === index) {
      randomIndex = index + 1;
    }
    setIndex(checkNumber(randomIndex));
  };

  return (
    <article className="review">
      <h3> reviews </h3>
      <div className="img-container">
        <img 
          src={ImgSrc} 
          alt={name} 
          className="person-img" />
        <span className="quote-icon">
          <FaQuoteRight />
        </span>
      </div>
      <h4 className="author">{name}</h4>
      <p className="job">{job}</p>
      <p className="info">{review}</p>
      <p className="info">{postedAt}</p>
      <div className="button-container">
        <button className="prev-btn" onClick={prevPerson}>
          <FaChevronLeft />
        </button>
        <button className="next-btn" onClick={nextPerson}>
          <FaChevronRight />v
        </button>
      </div>
      <button className="random-btn" onClick={getRandomPerson}>
        Get Random Review
      </button>
    </article>
  );
};

export default Review;
