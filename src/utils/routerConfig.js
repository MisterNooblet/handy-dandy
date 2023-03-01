import { createBrowserRouter } from "react-router-dom";
import { Error404, Home, LayoutComponent, Toolbox, Wiki } from "../pages";

const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutComponent />,
        errorElement: <Error404 />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/wiki', element: <Wiki /> },
            { path: '/toolbox', element: <Toolbox /> },
        ]

    },

])

export default router