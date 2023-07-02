import { Routes, Route } from "react-router-dom";
import { Login } from "../page/Login";

export const RouteApp = () => {
  return (
      <Routes>
        <Route
          path="/"
          element={<Login/>}
        />
      </Routes>
  );
};
