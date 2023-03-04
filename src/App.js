import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { createBrowserRouter } from "react-router-dom";
import { Error404, Home, LayoutComponent, Toolbox, Wiki, Register, Login, Profile } from "./pages/";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth, db } from "./utils/fireBaseConfig";
import { login, logout, updateUser } from "./store/authSlice";
import { doc, getDoc, } from "firebase/firestore";

function App() {
  const user = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in, send the user's details to redux, store the current user in the state
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    // eslint-disable-next-line
  }, []);

  const getUserDetails = async () => {
    const docRef = doc(db, 'users', user.user.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      dispatch(
        updateUser({
          country: docSnap.data().country,
          isAdmin: docSnap.data().isAdmin,
          toolbox: docSnap.data().toolbox
        })
      );
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  useEffect(() => {
    if (user.user) {
      getUserDetails()
    }
  }, [user.user])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LayoutComponent />,
      errorElement: <Error404 />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/wiki', element: <Wiki /> },
        { path: '/toolbox', element: <Toolbox /> },
        { path: '/register', element: <Register /> },
        { path: '/login', element: <Login /> },
        { path: '/profile', element: user.user ? <Profile /> : <Login /> },
      ]

    },

  ])


  return (
    <RouterProvider router={router} />
  );
}

export default App;
