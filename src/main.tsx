import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Assets from "./Assets.tsx"
import App from "./App.tsx"
import CreateAssets from "./CreateAssets.tsx"

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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator>
      <RouterProvider router={router} />
    </Authenticator>
  </React.StrictMode>
);