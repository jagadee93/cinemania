import Users from './Users';
import axios from "../api/axios";
import { useEffect, useState } from "react";
import MovieCard from "./Movie/Moviecard";
const Admin = () => {
    const [isApproved,setIsApproved]=useState(false)
    const [isRejected,setIsRejected]=useState(false)
        const ApproveMovie=async(id) =>{
            console.log(id)
            setIsApproved(true)

            try{
            await axios.put(`movies`,
             JSON.stringify({ movieId:id, code:5150 }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            setIsApproved(false)
            }catch(err){
                console.log(err)
            }
        }
        const rejecteMovie=async(id) =>{
            setIsRejected(true)
            console.log("hello")
            console.log(id)
            try{
            await axios.delete(`movies`,
             JSON.stringify({ movieId:id, code:5150 }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            setIsRejected(false)
            }catch(err){
                console.log(err)
            }
        }

    const [Movies,setMovies]=useState([])
    const [status,setStatus]=useState('')
    const [errMsg,setErrMsg]=useState('')

    useEffect(() =>{
        let isMounted =true
        const getPendingMovies=async() =>{
            try{
            const response = await axios.get("/admin")
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            response?.data?setMovies(response.data):setStatus('No pending movies found');
            if (response.data.status===204){
                setErrMsg("no movies found")
            }
            }
            
            catch (err) {
                        if (!err?.response.status===204) {
                            setErrMsg('No Movies found');
                        }
                }
    }
    getPendingMovies()
    isMounted =false
},[isApproved,isRejected])

    return (
        <>
        {
        Movies.length>0? Movies.map((movie) =>{
                return(
                 <MovieCard 
                    key={movie._id} 
                    title={movie.title} 
                    id={movie._id} 
                    addedBy={movie.addedBy} 
                    plot={movie.plot} 
                    username={movie.addedBy.username}  
                    year={movie.year} poster={movie.poster} 
                    click={ApproveMovie} 
                    reject={rejecteMovie}
                 />

                )
            }):<h1 style={{color:"red",textAlign:"center",marginTop:"100px"}}>No new movie requests found </h1>
        }
          
        </>
    )
}

export default Admin
