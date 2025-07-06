import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Jobs from "./Jobs.tsx"
import App from "./App.tsx"
import CreateJobs from "./CreateJobs.tsx"

Amplify.configure(outputs);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <App />
    ),
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/createJobs",
    element: <CreateJobs />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator>
      <RouterProvider router={router} />
    </Authenticator>
  </React.StrictMode>
);