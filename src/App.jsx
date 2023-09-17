import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import DashboardPage from "./Pages/DashboardPage";
import Header from "./Shared/HeaderShared";
import Sidebar from "./Shared/SidebarShared";
import ProductPage from "./Pages/ProductPage";
import EditProductPage from "./Pages/EditProductPage";
import CategoryPage from "./Pages/CategoryPage";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/edit-product" element={<EditProductPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="*" element={"Page Not Found"} />
        </Routes>
      </Router>
    </>
  )
}

export default App
