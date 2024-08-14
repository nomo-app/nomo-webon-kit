import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes.tsx";

const Page = lazy(() => import("./app/page.tsx"));
const UITestPage = lazy(() => import("./ui-tests/ui-tests.tsx"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={routes.main} element={<Page />} />
          <Route path={routes.uiTests} element={<UITestPage />} />
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>
);
