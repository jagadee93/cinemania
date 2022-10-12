import React,{useEffect,useRef,useState} from 'react'
import axios from '../../api/axios';
import "../../index.css";
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
function AddMovie() {

    const {auth} = useAuth();
    console.log(auth)
    const role=Math.max(...auth.roles)
    const titleRef= useRef();
    const [title,setTitle]=useState('');
    const [year,setYear]=useState(new Date().getFullYear())
    const [errMsg,setErrMsg]=useState('')
    const [genre,setGenre]=useState('')
    const [language,setLanguage]=useState('')
    const [poster,setPoster]=useState('')
    const [plot,setPlot]=useState('')
    const [success,setSuccess]=useState(false)
    const errRef=useRef();
    useEffect( () => {
        titleRef.current.focus();
        setErrMsg('')
    }, [])
    const handleSubmit= async(e) =>{
        e.preventDefault();
        try {
            const response = await axios.post("/movies",
                JSON.stringify({title,year,genres:genre,role,plot,username:auth.user,id:auth.id,language,poster}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            ); 
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            setSuccess(true);
            setErrMsg("added to movies")
            setTitle('')
            setYear('')
            setGenre('')
            setLanguage('')
            setPoster('')
            setPlot('')
            //clear state and controlled inputs
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('please fill all fields');
            } else if (err.response?.status ===403){
                setErrMsg('already movie exists ')
            }else{
                setErrMsg("failed")
            }
            errRef.current.focus();

        }
    }
  return (
    <div className='addMovie'>
    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
    <h1>add movie</h1>
    <form onSubmit={handleSubmit}>
        <label htmlFor="username">
            title:
        </label>
        <input
            type="text"
            id="title"
            ref={titleRef}
            autoComplete="off"
            onChange={(e) => setTitle(e.target.value.toLowerCase())}
            value={title}
            required
        />
        <label htmlFor="year">
            year:
        </label>
        <input
            type="number"
            id="year"
            onChange={(e) => setYear(e.target.value.trim())}
            value={year}
            required
        />


        <label htmlFor="genre">
            genre:
        </label>
        <input
            type="text"
            id="genre"
            onChange={(e) => setGenre(e.target.value.trim())}
            value={genre}
            required
        />
        <label htmlFor="language">
            language:
        </label>
         <input
            type="language"
            id="genre"
            onChange={(e) => setLanguage(e.target.value.trim())}
            value={language}
            required
        />
        <label htmlFor="poster">
            poster:
        </label>
         <input
            type="text"
            id="poster"
            onChange={(e) => setPoster(e.target.value.trim())}
            value={poster}
            required
        />
        <label for="plot" >Plot</label>
        <textarea name="body"
                cols={80}
                rows={2}
                onChange={(e) =>setPlot(e.target.value.trim())}
                value={plot}
        />

        <button className=''>Add movie</button>
    </form>
</div>
  )
}

export default AddMovie