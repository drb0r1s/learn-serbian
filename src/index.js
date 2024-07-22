import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from "./data/routes";
import "./style/main.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(routes);

root.render(<RouterProvider router={router} />);