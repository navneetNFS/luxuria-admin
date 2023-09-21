import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import DashboardPage from "./Pages/DashboardPage";
import Header from "./Shared/HeaderShared";
import Sidebar from "./Shared/SidebarShared";
import ProductPage from "./Pages/ProductPage";
import EditProductPage from "./Pages/EditProductPage";
import CategoryPage from "./Pages/CategoryPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import OrderPage from "./Pages/OrderPage";
import OrderDetailPage from "./Pages/OrderDetailPage";
import ReviewPage from "./Pages/ReviewPage";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Sidebar />
        <Routes>
          {/* User Links */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Product Links */}
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product-detail" element={<ProductDetailPage />} />
          <Route path="/edit-product" element={<EditProductPage />} />


          {/* Orders Links */}
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/order-detail" element={<OrderDetailPage />} />

          {/* Reviews */}
          <Route path="/reviews" element={<ReviewPage />} />

          {/* Categories */}
          <Route path="/categories" element={<CategoryPage />} />

          {/* Page Not Found */}
          <Route path="*" element={"Page Not Found"} />
        </Routes>
      </Router>
    </>
  )
}

export default App
