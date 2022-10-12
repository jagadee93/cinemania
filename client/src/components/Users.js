import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import UserCard from "./Profile/UserCard";

const Users = () => {
    const [users, setUsers] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
    return (
        <article>
            <h2>Users List</h2>
            <div className="users">
            {
            users.length>0 ?
            users.map((user)=>{
                return <div className="user" ><UserCard roles={Object.values(user.roles).filter(Boolean)} name={user.username} profilePic={user.profilePic} email={user.email} count={user.reviewcount} /></div>
                

            }):"No users found"
            }
            </div>


        </article>
    );
};

export default Users;
