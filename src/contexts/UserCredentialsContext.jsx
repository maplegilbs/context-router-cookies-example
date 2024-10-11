//import our createContext function
import { createContext } from "react";
//import our useState hook
import { useState, useEffect } from "react";
//Define a context using createContext and export it for use elsewhere
export const UserContext = createContext();

//this is a component, that when wrapped around children, will provide those children with the context
export default function UserProvider({ children }) {
    //define a user state variable and initialize to be null
    const [user, setUser] = useState(null);

    //look in cookies for the user - if exists use that data
    useEffect(() => {
        async function getUserInfoFromCookies() {
            try {
                //split the cookies string into an array on the "; " character
                let cookies = document.cookie.split("; ")
                //create an empty object to store our cookeis in as key value pairs
                let cookiesObj = {};
                //loop over our cookies array and build our object of key value pairs
                cookies.forEach(cookie => {
                    let cookieArray = cookie.split("=");
                    cookiesObj[cookieArray[0]] = cookieArray[1]
                })
                //if the cookies object contains a key of user, set the user with its associated value
                if (Object.keys(cookiesObj).includes('user')) {
                    setUser(cookiesObj.user)
                }
                //catch any errors
            } catch (error) {
                console.error(`Error getting user info: ${error}`);
            }
        }
        //call our async function once
        getUserInfoFromCookies()
    }, [])

    //return a component that simply wraps it's children in a context provider, such that the children have access to the necessary data
    //nothing is rendered here
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}