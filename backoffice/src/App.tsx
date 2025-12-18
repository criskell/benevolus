import { Routes, Route } from "react-router";
import Dashboard from "./layouts/dashboard";
import { Home } from "./pages/home";
import { Categoria } from "./pages/categorias";

export default function Page() {
  return (
    <Routes>
      <Route element={<Dashboard />}>
        <Route element={<Home />} path="/" />
        <Route element={<Categoria/>} path="/categoria"/>
      </Route>
    </Routes>
  );
}
