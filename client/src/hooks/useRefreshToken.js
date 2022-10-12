import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const {setAuth} = useAuth();
    const {auth} =useAuth()
    console.log(auth)
    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            // console.log(response.data.accessToken);
            console.log(response.data)
            return {
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken,
                user:response.data.username,
                id:response.data.id,
                profilePic:response.profilePic
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
