import { RouterProvider } from "react-router-dom";
import { useSelector } from 'react-redux'
import { createBrowserRouter } from "react-router-dom";
import { Error404, Home, LayoutComponent, Toolbox, Wiki, Register, Login, Profile, Admin, Item } from "./pages/";
import AuthProvider from "./utils/AuthProvider";

function App() {
  const user = useSelector((state) => state.auth)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LayoutComponent />,
      errorElement: <Error404 />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/wiki', element: <Wiki /> },
        { path: '/wiki/:category', element: <Wiki /> },
        { path: '/wiki/:category/p/:subcategories', element: <Wiki /> },
        { path: '/wiki/:category/p/:subcategories/tools/:tools', element: <Wiki /> },
        { path: '/wiki/:category/p/:subcategories/tools/:tools/item/:name', element: <Item /> },
        { path: '/toolbox', element: <Toolbox /> },
        { path: '/register', element: <Register /> },
        { path: '/login', element: <Login /> },
        { path: '/admin', element: user.user && user.userExtras && user.userExtras.isAdmin ? <Admin /> : <Error404 /> },
        { path: '/profile', element: user.user ? <Profile /> : <Login /> },
      ]

    },

  ])


  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
