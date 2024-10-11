//Components
import Layout from './components/Layout/Layout';
//Contexts - in this case a component
import UserProvider from './contexts/UserCredentialsContext';
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
      // if desired you could provide the context here and wrap the layout in the UserProvider
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
        // or if desired you could just provide the context to a specific page and wrap this page in the UserProvider
        element: <AccountPage />,
      },
      {
        path: "account/:accountAction",
        element: <AccountPage />,
      }
    ]
  }
])

function App() {
  return (
    <div>
      <UserProvider> {/*Wrap the entire router in our context, and all elements can now access the context*/}
        <RouterProvider router={router} />
      </UserProvider>
    </div>
  );
}

export default App;
