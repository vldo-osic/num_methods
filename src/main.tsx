import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom'
import './styles/app.css'
import { Root } from './Root.tsx'
import { NumMethods } from './pages/NumMethods.tsx'
import { MatrixPage } from './pages/MatrixPage.tsx'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        
    },
    {
        path: 'methods/',
        element: <NumMethods/>
    },
    {
        path: 'matrix/',
        element: <MatrixPage/>
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
