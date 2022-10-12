const { default: mongoose } = require("mongoose");
const Review = require("../model/Review");
const User = require("../model/User");
const Movie=require("../model/Movies");
const { v4: uuidv4 } = require('uuid');
const { response } = require("express");

const apiGetAllReviewsOfaMovie = async (req,res) => { 
    const movies=await Review.find()
    if (movies.length ===0 ) return res.status(404).json({"message": " not found"})
     return res.json(movies);
}

const apiPostReview = async (req, res)  =>{
    const uniqueId=uuidv4();
    const {movieId,review,rating} = req.body;
   
    const FoundMovie= await Movie.findOne({_id:req.body.movieId})
    const movieYear=parseInt(FoundMovie?.year)
    if (movieYear>(new Date().getFullYear())) return res.status(400).json({message:"you cant review upcoming movie"})
    if (!movieId||!rating||!review) return res.status(401).json({ 'message': 'please enter all fields' });
    if (!req.body.username) return res.status(404).json({"message":"login to submit review"})

    
    
    const foundUser= await User.findOne({username:req.body.username});
    if (!foundUser) return res.status(404)
    const userRating=foundUser.roles.Critic? (rating*2)/2 :rating
    console.log(userRating,"here is rating")
    const No=foundUser.roles.Critic?2:1
    console.log(No,"user")

    if (foundUser?.reviewedMovies?.includes(movieId)) {
       return res.status(403).json({'message': 'you have already reviewed this movie' });
    }
    else{
        console.log('heyy im in else block');
        foundUser.reviews.push(uniqueId);
        foundUser.reviewedMovies.push(movieId)
        let count=foundUser.reviewcount
        count+=1
        const Role =foundUser.roles
        count ===3?foundUser.roles.Critic=1984:""
        console.log(Role)
        foundUser.reviewcount=count
        resulte =await foundUser.save()

        console.log(resulte,"user updated");
    }

    try{
        const result= await Review.create({
            uniqueId:uniqueId,
            MovieId :movieId,
            review: review, 
            rating: rating,
            userInfo: {
                name: req.body.username,
            },
        })
        console.log(result,"hey created review");

        //working
        
        console.log(FoundMovie)
        foundRating=FoundMovie.rating
        console.log(foundRating,"here is the rating from database")
        const Number=FoundMovie.ratedBy
        console.log(Number,"here is number of people reviewed it ")
        //updating user to critic based om rating
        Number==0? FoundMovie.rating=userRating : FoundMovie.rating=(foundRating+userRating)/(Number+No);
        FoundMovie.ratedBy=(Number+No)
        FoundMovie.reviews.push(uniqueId)
        await FoundMovie.save();

        console.log(FoundMovie)
       return  res.status(201).json({"message": 'review posted'});
    }catch(err){
        console.error(err)
       return res.status(500).json({ 'message': err.message });
    }
    
}
const apiUpdateReview = async(req, res) => {
    const{reviewId,review,userId,}= req.body;
    if (!reviewId||!review||!userId) return res.status(400).json({"message": 'please enter review'})
    const FoundReview = await Review.findOne({_id:reviewId}).exec();
    if (FoundReview.userInfo._id !==userId) return res.status(403).json({"message":"you cannot edit other user reviews"});
    FoundReview.review=review;
    const result= await FoundReview.save();
    res.status(200).json({"message": 'review updated'});
}


const apiDeleteReview = async (req, res) =>{
    const {reviewId,userId}=req.body;
    const FoundReview= await Review.findOne({_id:reviewId}).exec();
    console.log(FoundReview);
    if (!FoundReview){
        return res.status(204).json({"message":"cant find review"})
    }
    if (FoundReview.userInfo._id !==userId) return res.status(403).json({"message":"you are not authorized to delete"})
    const result= await FoundReview.deleteOne();
    console.log(result);
    res.status(204).json({"message":"success"});

}

const getAllReviewsForaMovie = async(req,res) =>{
    console.log("hello")
    const reviews=await Review.find({MovieId:req.params.id}).exec();
    console.log(reviews)
    if(!reviews) return res.status(404).json({"message":"no reviews found"});
   
    return res.status(200).json(reviews);
}

module.exports ={apiPostReview,apiDeleteReview,apiUpdateReview,getAllReviewsForaMovie,apiGetAllReviewsOfaMovie};