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
