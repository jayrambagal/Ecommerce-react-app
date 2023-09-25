import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:searchTerm" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
