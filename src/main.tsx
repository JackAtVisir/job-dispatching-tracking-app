import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { Amplify } from "aws-amplify"
import outputs from "../amplify_outputs.json"
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import UserInit from "./UserInit.tsx"

import App from "./App.tsx"
import Assets from "./componentsAdmin/Assets.tsx"
import Jobs from "./componentsUser/Jobs.tsx"
import CreateAssets from "./componentsAdmin/CreateAssets.tsx"
import CreateJobs from './componentsAdmin/CreateJobs.tsx'
import AssetForm from './componentsUser/AssetForm.tsx'
import FinishedJobs from './componentsUser/FinishedJobs.tsx'
import Users from './Users.tsx'
import AllJobs from './componentsAdmin/AllJobs.tsx'

Amplify.configure(outputs);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [ 
      { path: 'assets', element: <Assets /> },
      { path: 'createAssets', element: <CreateAssets /> },
      { path: 'createJob', element: <CreateJobs /> },
      { path: 'completedJobs', element: <FinishedJobs /> },
      { path: 'users', element: <Users /> },
      { path: 'allJobs', element: <AllJobs /> },
      {
        path: 'jobs',
        element: <Jobs />,
        children: [
          {
            path: 'assetForm',
            element: <AssetForm />,
          }
        ]
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator>
      <UserInit />
      <RouterProvider router={router} />
    </Authenticator>
  </React.StrictMode>
);