import * as ReactDOM from 'react-dom/client';
import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import { AppContainer } from './AppContainer';
import { Content } from './Content';
import { About } from './About';
import './style.scss'; // require for bundling

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppContainer/>,
        errorElement: <div> no page here </div>,
        children: [
            {
                path: 'polynomial-model',
                element: <Content/>
            },
            {
                path: 'About',
                element: <About/>
            }
        ]
    }
]);

root.render(<RouterProvider router={router}/>);
