
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Samples from "../component/Samples";
import SideBar from "../component/SideBar";
import ContactForm from "../component/ContactForm";
import UserRecord from "../component/UserRecord";
import UserRecordForm from "../component/UserRecordForm";
import VolunteerDetails from "../component/VolunteerDetails";
import Dashboard from "../component/Dashboard/Dashboard";
import TotalTrees from "../component/Dashboard/TotalTrees";
import Register from "../component/Register";
import Login from "../component/SignIn";
import ProfilePage from "../component/Profile";
import DonorProfile from "../component/DonorProfile";


export const routeradmin = createBrowserRouter([
    {
      path: "/",
      element: <App  />,
      children: [
        {
          path: "",
          element: <Login />,
        },
        {
          path: "sidebar",
          element: <SideBar />,
          children: [
            {
              path: "contactForm",
              element: <ContactForm />,
            },
            {
              path: "samples",
              element: <Samples />,
            },
            {
              path: "profile-donor/:id",
              element: <DonorProfile/>,
            },
            {
              path: "profile/:id",
              element: <ProfilePage />,
            },
            {
              path: "volunteer",
              element: <VolunteerDetails />,
            },
           
            {
              path: "userRecord",
              element: <UserRecord/>,
            },
            {
              path: "userRecordForm",
              element: <UserRecordForm/>,
            },
            {
          
              path: "dashboard",
              element: <Dashboard/>,
              children:[
                {
                  path:'totaltrees',
                  element:<TotalTrees/>
                }
              ]
            },
            {
              path: "register",
              element: <Register/>,
            },
          ],
        },
      ],
    },
  ]);
  