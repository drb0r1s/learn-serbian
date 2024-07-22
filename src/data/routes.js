import Home from "../pages/home/Home";
import Lessons from "../pages/lessons/Lessons";
import Forum from "../pages/forum/Forum";
import Link from "../pages/link/Link";

export const routes = [
    {
        path: "/",
        element: <Home />
    },

    {
        path: "/lessons",
        element: <Lessons />
    },

    {
        path: "/forum",
        element: <Forum />
    },

    {
        path: "/link",
        element: <Link />
    }
];