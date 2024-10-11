# Working with Contexts

Contexts allow you to pass data - most commonly state data such as user information - amongst components, without having to pass it through the props.  You can think of it a little bit like a global variable - all components that are beneath the component in which the context is shared can see that data.  (Also note here when referring to data this can mean any valid JS data including strings, arrays, numbers, functions, objects etc)

## 1 - Set up the file structure
- run npx create-react-app app-name
- modify the file structure such that the src directory contains three subdirectories, components, contexts, and pages
- delete all the code from the App.js file (we will update this later)
- inside those subdirectories populate with the following files (which can just be empty for now)
 ```md
 src
├── components
│   ├── layout
│   │   ├── Header.jsx
│   │   └── Layout.jsx
│   ├── Login.jsx
│   └── Signup.jsx
├── contexts
│   └── UserCredentials.js
└── pages
    ├── Home.js
    ├── About.js
    └── Account.js
```
## 2 - Create the context
- working in the UserCredentialsContext.jsx file import createContext from react
- In here we will store our contexts.  In this example we will be creating a component in the same way we create any other component, except it will not render anything visually, it will simply wrap any child components in the context provider giving them acces to the context.
- in this same file define a new context by calling createContext() and export it
``` 
//UserCredentialsContext.jsx
import { createContext } from "react";
export const UserContext = createContext()
```
## 3 - Create a UserProvider component
- create a new component and pass in the children as it's props. be sure to export as default
- return the children wrapped in the "provider" of the context created in step 2
- we will give the provider a value in the next step
```
//UserCredentialsContext.jsx
export default function UserProvider({children}){
return (
    <UserContext.Provider>
        {children}
    </UserContext.Provider>
)
}
```
## 4 - Define the value we want to share with our other components via the context, and provide that as the value in our context provider
- this is often defined as a state variable, with the variable and the setter shared
```
//UserCredentialsContext.jsx
const [user, setUser] = useState(null);
```
```
//UserCredentialsContext.jsx
return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
```
## 5 - Create the component from which the context will be shared.
- in this case we are going to make sure our context is shared from the root level, meaning ALL components will be able to access the data we set up in our context - therefore for our purpose we will use the App.js file
```
//App.js
export default function App() {
  return (
    <div>
      <UserProvider>
        //for now there is nothing inside the user provider, in the next steps we will define a router and use it inside the UserProvider so that all components have access to the UserContext
      </UserProvider>
    </div>
  );
}
```

# React Router
Now its time to incorporate React Router into the app 

## 1 - Define our router
- in the App.js file import the createBrowserRouter and RouterProvider from react-router-dom
```
 //App.js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
```
 - Then create a new router - it will have no routes to start
 ```
  //App.js
 const router = createBrowserRouter([])
 ```
 - And finally nest the RouterProvider inside the UserProvider set up in step 5 of the context section
 ```
 //App.js
 function App() {
  return (
    <div>
    <UserProvider>
        <RouterProvider router={router} />
    </UserProvider>
     </div>
  );
}
```
## 2 - Create our login and signup components
 - these are two simple forms that for the purpose of this exercise will not actually be functional - feel free to copy and paste
 ```
 //Login.jsx
 export default function Login() {
    return (
        <div style={{margin: "0 auto", width: "max-content"}}>
            <h4>Login</h4>
            <form>
                <label style={{margin: "4px"}} htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
                <br />
                <label style={{margin: "4px"}} htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
```
```
//Signup.jsx
export default function Signup() {
    return (
        <div style={{margin: "0 auto", width: "max-content"}}>
            <h4>Create Account</h4>
            <form>
                <label style={{margin: "4px"}} htmlFor="fullName">Full Name</label>
                <input type="text" name="fullName" id="fullName" />
                <br />
                <label style={{margin: "4px"}} htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
                <br />
                <label style={{margin: "4px"}} htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
```
## 3 - Create our layout
- inside the Layout subdirectory we are going to set up our header component by creating a menu and nav items.  We will revisit this later to setup conditionally rendered links
```
//Header.jsx
//Components
import { Link } from "react-router-dom";

export default function Header() {
    
    return (
        <menu>
            <nav className="nav--left">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>
            <nav className="nav--right">
            </nav>
        </menu>
    )
}
```
- still inside the Layout subdirectory we are going to set up our layout component which will simply render the header and then an Outlet component (the outlet component is simply a placeholder where any child components set up in the router will be rendered)
```
//Layout.jsx
//Components
import { Outlet } from "react-router-dom"
import Header from "./Header"

export default function Layout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
```
## 4 - Create the pages
- create two pages, home and about, that render some simple jsx - feel free to copy and paste
```
//home.jsx
//This is simply a placeholder component
export default function HomePage() {
  return (
    <>
    <div>This is the home page.</div>
    <img src="https://picsum.photos/400" />
    </>
  )
}
```
```
//about.jsx
//This is simply a placeholder component
export default function AboutPage() {
  return (
    <div>This is the about page.</div>
  )
}
```

- create our account page which we will keep simple for the moment and complete in a later step
```
//account.jsx

export default function AccountPage() {
  
  return (
    <>
      <h2>Account Page</h2>
    </>
  )
}
```
## 5 - Import the pages into the router and define our routes
- back in the App.js file import our pages and use them to update the createBroswerRouter function from step 1 to build our routes for the various paths of the router
```
//App.js
//Pages
import AccountPage from './pages/account';
import AboutPage from './pages/about';
import HomePage from './pages/home';
//Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//Styles
import './App.css';


//Define our router
const router = createBrowserRouter([
  {
    path: "/",
    element:
      <Layout />
    ,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "account",
        element: <AccountPage />,
      },
      {
        path: "account/:accountAction",
        element: <AccountPage />,
      }
    ]
  }
])
```

### At this point our App.js file is complete!  Make sure the one you have matches the one in the repo.  Each of these routes now have access to our Context data as the entire router provider was wrapped in the context provider

## 6 - Revisit the Header file to add links that will render depending on if the user data provided from the context is present or not
```
//Header.jsx
//Components
import { Link } from "react-router-dom";
//Contexts
import { UserContext } from "../../contexts/UserCredentialsContext";
//Hooks
import { useContext } from "react";

export default function Header() {
    const { user } = useContext(UserContext)
    
    return (
        <menu>
            <nav className="nav--left">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                {!user &&  //if there is no user data render a link to the signup path of the account page
                    <Link to="/account/signup">Sign Up</Link>
                }
            </nav>
            <nav className="nav--right">
                {user ? //if there is user data render a link to the account page, otherwise render a link to the login path of the account page
                    <Link to="/account">Account</Link>
                    :
                    <Link to="/account/login">Login</Link>
                }
            </nav>
        </menu>
    )
}
```

### Right now if you fire up the app you should only see the signup and login links in the header.  This is because the user data that we defined as our context value in step 4 of the context instructions was initialized as null.  

## 7 - Revisit the account page to conditionally render different components depending on the user data from our context
- right now the account page looks like this:
```
//account.jsx

export default function AccountPage() {
  
  return (
    <>
      <h2>Account Page</h2>
    </>
  )
}
```
- lets update it with the following code - its a bit to follow, but read through it piece by piece to understand what is being accomplished
```
//Import use params and useNavigate function to interact with url
import { useNavigate, useParams } from "react-router-dom"
//Components
import Login from "../components/Login";
import Signup from "../components/Signup";
import { Link } from "react-router-dom";
//Contexts
import { UserContext } from "../contexts/UserCredentialsContext"
//Hooks
import { useContext, useEffect } from "react"

export default function AccountPage() {
  //Get the accountAction out of our url params (if it exists)
  //For example if the path is account/signup our accountAction variable will be the string 'signup'
  const accountAction = useParams().accountAction || null;
  //Call our useNavigate hook to enable us to use the navigate function to change the url
  const navigate = useNavigate()
  //get the user data from the UserContext
  const { user } = useContext(UserContext)

  useEffect(() => {
    //if a user data is not null force the page to navigate to /account (which in turn will make the accountAction variable null) 
    if (user) { navigate("/account") }
  }, [user])

  return (
    <>
      <h2>Account Page</h2>
      //if the accountAction path is "signup" and the user data from the context is null render the signup component
      {(accountAction === 'signup' && !user) &&
        <Signup />
      }
      //if the accountAction path is "login" and the user data from the context is null render the signup component
      {(accountAction === 'login' && !user) &&
        <Login />
      }
      //if there is not accountAction path and there is user data from the context, display the account info
      {(!accountAction && user) &&
        <div>Account Info</div>
      }
      //if there is not accountAction path and there is no user data from the context inform the user they are not signed in and provide them with options
      {(!accountAction && !user) &&
        <div>
          You are not currently signed in. Please either
          <Link to="/account/login">&nbsp;Login&nbsp;</Link>
          or
          <Link to="/account/login">&nbsp;Signup</Link>
        </div>
      }
    </>
  )
}
```
### Great now our router is all set up and the pages and components are all using the context to make decisions on what to render based on the router path, and the data provided from the context.  However, we haven't provided any actual data to our context yet, it was initialized as null in step 4 of the context section, so lets change that and pull it all together in the next section


# Giving the context data / incorporating cookies / and bringing it all together

## 1 Give it some styling
- lets just give our page some simple styling, feel free to copy and paste
```
//App.css
menu {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background-color: burlywood;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 5px;
    text-transform: uppercase;
}

.nav--left, .nav--right {
    width: max-content;
    margin: 0;
}
.nav--left a, .nav--right a {
    margin: 0 6px;
    text-decoration: none;
    font-weight: 700;
    color: black;
    text-shadow: 1px 1px white;
}
```


## 2 Update our UserCredentialsContext
- right now our UserCredentialsContext component simply looks like this
```
//UserCredentialsContext.jsx
import { createContext } from "react";
import { useState } from "react";
export const UserContext = createContext();

export default function UserProvider({ children }) {

const [user, setUser] = useState(null);

return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
```

- lets set up a useEffect to look in the cookies of our browser and pull out any data from a cookie with the key of "user"

- first be sure to import useEffect
```
import { useState, useEffect } from "react";
```

- then set up the useEffect hook
```
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
```

### Alright! The code is complete.  Now to test it out.  Open the app in your browser.  Make a note of what link options are available.  If everything was set up properly your menu options should be Home, About, Signup and the link to the right should be Login

#### Now open your dev tools and navigate to your cookies.  It may be under the 'storage' or 'application' tabs depending on your browser

#### Add a cookie with the key of user and a value of some sort such as your name

#### Refresh the page - how did the menu options change?  Why did this happen?
#### Try navigating to the account page.  How about account/signup or account/login - where did these paths take you to and why?
#### Try deleting the cookie and returning to the /account path.  What happens now?  Why?  What else on the page has changed when the cookie disappears.


### Now think about how you might update the app to interact with a server.  What components would you need to update?  How would you change the UserContext?