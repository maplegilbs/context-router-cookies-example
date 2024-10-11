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
  const accountAction = useParams().accountAction || null;
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (user) { navigate("/account") }
  }, [user])

  return (
    <>
      <h2>Account Page</h2>
      {(accountAction === 'signup' && !user) &&
        <Signup />
      }
      {(accountAction === 'login' && !user) &&
        <Login />
      }
      {(!accountAction && user) &&
        <div>Account Info</div>
      }
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
