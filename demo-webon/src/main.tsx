import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes.ts";
import * as Sentry from "@sentry/browser";
import { nomo } from "nomo-webon-kit";

Sentry.init({
  dsn: "https://some-sample-sentry@sentry.example.com/26",
  integrations: [],
});
nomo.getManifest().then((manifest) => {
  nomo.installErrorHook((e) => {
    Sentry.captureException(e, {
      tags: {
        webon_url: manifest.webon_url,
        webon_version: manifest.webon_version,
      },
    });
  });
});

const Page = lazy(() => import("./app/page.tsx"));
const ApiTestPage = lazy(() => import("./api-tests/api-tests.tsx"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={routes.main} element={<Page />} />
          <Route path={routes.apiTests} element={<ApiTestPage />} />
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>
);
