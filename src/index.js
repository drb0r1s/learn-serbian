import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from "./data/routes";
import { Provider } from 'react-redux';
import { store } from './state/store';
import { Language } from './functions/Language';
import "./style/main.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(routes);

Language.set("rs");

root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);