import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";

export const route = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "/questions/:id",
                element: <Home/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register/>
            },
        ]
    }
]);