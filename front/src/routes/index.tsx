import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("../pages/home"));
const NotFound = lazy(() => import("../pages/notFound"));

export const RoutesApp = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>carregando</div>}>
        <Routes>
          <Route index element={<Home />} />
          <Route path=":hash" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
