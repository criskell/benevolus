import { Routes, Route } from "react-router";
import Dashboard from "./layouts/dashboard";
import { Home } from "./pages/home";
import { Categoria } from "./pages/categorias";
import { Campanhas } from "./pages/campanhas";

const Page = () => {
  return (
    <Routes>
      <Route element={<Dashboard />}>
        <Route element={<Home />} path="/" />
        <Route element={<Categoria/>} path="/categoria"/>
        <Route element={<Campanhas />} path="/campanhas" />
      </Route>
    </Routes>
  );
};

export default Page;
