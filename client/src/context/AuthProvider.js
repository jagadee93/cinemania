import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [username,setUserName]=useState();
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist,username,setUserName}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;