import { BrowserRouter, Routes, Route } from "react-router-dom";

export const RouteApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Rota de Login</h1>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
