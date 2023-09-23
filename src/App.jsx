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
import { useSelector } from "react-redux";
import { selectUserLogged } from "./store/slices/auth-slice";
import PageNotFound from "./Pages/PageNotFound";
import NotAuthorised from "./Pages/NotAuthorised";
import PageStart from "./Components/PageStart";



function App() {
  const isLogged = useSelector(selectUserLogged)
  return (
    <>
      <PageStart />
      <Router>
        {isLogged ? <Header /> : ''}
        {isLogged ? <Sidebar /> : ''}
        
        <Routes>
          {/* User Links */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={isLogged ? <DashboardPage /> : <NotAuthorised />} />

          {/* Product Links */}
          <Route path="/products" element={isLogged ? <ProductPage /> : <NotAuthorised />} />
          <Route path="/product-detail" element={isLogged ? <ProductDetailPage /> : <NotAuthorised />} />
          <Route path="/edit-product" element={isLogged ? <EditProductPage /> : <NotAuthorised />} />


          {/* Orders Links */}
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/order-detail" element={isLogged ? <OrderDetailPage /> : <NotAuthorised />} />

          {/* Reviews */}
          <Route path="/reviews" element={isLogged ? <ReviewPage /> : <NotAuthorised />} />

          {/* Categories */}
          <Route path="/categories" element={isLogged ? <CategoryPage /> : <NotAuthorised />} />

          {/* Page Not Found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
