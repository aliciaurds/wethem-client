import { createContext, useEffect, useState } from "react";
import service from "../services/config"
//todo AQUI TB AÑADO TODO LO DE ADMIN
//first we define component where context get displayed (states)

const AuthContext = createContext()
//then where context (state, function) get created 
function AuthWrapper(props){
    //shared states
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)


    const authenticateUser = async () => {
        //send token to BE to validate it
        //verify*
        //if it is valid, it is logged in; if not, it is not
        const token = localStorage.getItem("authToken") //as we call it in login form 
        try{
            const response = await service.get("/auth/verify")
            //if we get to this point => valid token:
            setIsLoggedIn(true)
            setLoading(false)
            console.log(response);


        }catch(err){
            //if not => non valid
            setIsLoggedIn(false);
            setLoading(false)
            console.log(err);
        }
    }

    //when all my app runs for firts time then I use this function to authenticate. I do it here bc my function is in the same page and I dont need to export it. Then my authwrapper will envolve the whole app
    useEffect(()=>{
        authenticateUser();


    },[])


    //object where I passed all info
    const passedContext = {
        authenticateUser,
        isLoggedIn
    }
    if(loading){
        return <h3>Loading...</h3>
    }

    return(
        // with props I pass info I want to share with all my app
        <AuthContext.Provider value={passedContext}>
            {props.children}
            {/* this will be all our app */}
        </AuthContext.Provider>
    )
}
export {
    AuthContext,
    AuthWrapper
}