import axios from "axios";
import Swal from "sweetalert2";
import react, { createContext, useState, useContext } from "react";

const UserContext = createContext();
const initialState = {login:false, token:'', name: ''};

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(initialState);

    const loginUser = async(dataUser) => {
        try {
            const resp = await axios.post('localhost:4001/api/login', dataUser
            );
            console.log(resp);
        } catch (error) {
            console.log("error en la peticion al backend");
        }
    }

    const value = {
        loginUser,
    }

    return (
      <UserContext.Provider value={value}>
        {children}
      </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext);
    if(!context)  {
        throw new Error('useUser error')
    }
    return context

}


