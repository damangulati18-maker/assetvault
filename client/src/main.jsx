import ReactDOM from 'react-dom/client';
import { createBrowserRouter,RouterProvider } from "react-router";

import './main.css'
import Home from './home'
import Login from './Login';
import AppLayout from './Applayout';



const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<AppLayout/>,
    children:[
      {
        path:"/home",element:<Home/>
      },
      {
        path:"/",element:<Login/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter}/>);
