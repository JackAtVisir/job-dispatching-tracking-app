import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { Amplify } from "aws-amplify"
import outputs from "../amplify_outputs.json"
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import UserInit from "./UserInit.tsx"

import Assets from "./Assets.tsx"
import App from "./App.tsx"
import CreateAssets from "./CreateAssets.tsx"
import CreateJobs from './CreateJobs.tsx'

Amplify.configure(outputs);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <App />
    ),
  },
  {
    path: "/assets",
    element: <Assets />,
  },
  {
    path: "/createAssets",
    element: <CreateAssets />,
  },
  {
    path: "/createJob",
    element: <CreateJobs />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator>
      <UserInit />
      <RouterProvider router={router} />
    </Authenticator>
  </React.StrictMode>
);