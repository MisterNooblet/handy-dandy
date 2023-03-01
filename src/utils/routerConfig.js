import { createBrowserRouter } from "react-router-dom";
import { Error404, Home, LayoutComponent, Toolbox, Wiki, Register } from "../pages";

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
        ]

    },

])

export default router