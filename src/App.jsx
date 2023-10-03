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
import { selectCurrentUser, selectUserLogged } from "./store/slices/auth-slice";
import PageNotFound from "./Pages/PageNotFound";
import NotAuthorised from "./Pages/NotAuthorised";
import PageStart from "./Components/PageStart";
import VerifyUserPage from "./Pages/VerifyUserPage";
import SignOutPage from "./Pages/SignOutPage";
import DeleteCategory from "./Components/DeleteCategory";



function App() {
  const isLogged = useSelector(selectUserLogged)
  const verifyed = useSelector(selectCurrentUser)
  return (
    <>
      <Router>
        
        <PageStart />
        {isLogged ? <Header /> : ''}
        {isLogged ? <Sidebar /> : ''}

        <Routes>
          {/* User Links */}
          <Route path="/" element={!isLogged ? <LoginPage /> : verifyed.verifyed ? <DashboardPage /> : <VerifyUserPage />}/>

          <Route path="/sign-up" element={!isLogged ? <RegisterPage /> : <NotAuthorised />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={isLogged ? verifyed.verifyed ? <DashboardPage /> : <VerifyUserPage /> : <NotAuthorised />} />

          {/* Verify User */}
          <Route path="/verify-user" element={isLogged ? !verifyed.verifyed ? <VerifyUserPage /> : <DashboardPage /> : <NotAuthorised />} />

          {/* Product Links */}
          <Route path="/products/:pageNum" element={isLogged ? verifyed.verifyed ? <ProductPage /> : <VerifyUserPage /> : <NotAuthorised />} />
          <Route path="/product-detail" element={isLogged ? verifyed.verifyed ? <ProductDetailPage /> : <VerifyUserPage /> : <NotAuthorised />} />
          <Route path="/edit-product" element={isLogged ? verifyed.verifyed ? <EditProductPage /> : <VerifyUserPage /> : <NotAuthorised />} />


          {/* Orders Links */}
          <Route path="/orders" element={isLogged ? verifyed.verifyed ? <OrderPage /> : <VerifyUserPage /> : <NotAuthorised />} />
          <Route path="/order-detail" element={isLogged ? verifyed.verifyed ? <OrderDetailPage /> : <VerifyUserPage /> : <NotAuthorised />} />

          {/* Reviews */}
          <Route path="/reviews" element={isLogged ? verifyed.verifyed ? <ReviewPage /> : <VerifyUserPage /> : <NotAuthorised />} />

          {/* Categories */}
          <Route path="/categories" element={isLogged ? verifyed.verifyed ? <CategoryPage /> : <VerifyUserPage /> : <NotAuthorised />} />
          <Route path="/delete-categorie/:id" element={isLogged ? verifyed.verifyed ? <DeleteCategory /> : <VerifyUserPage /> : <NotAuthorised />} />

          {/* Categories */}
          <Route path="/log-out" element={isLogged ? verifyed.verifyed ? <SignOutPage /> : <VerifyUserPage /> : <NotAuthorised />} />


          {/* Page Not Found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
