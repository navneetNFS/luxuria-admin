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



function App() {
  const isLogged = useSelector(selectUserLogged)
  const {verifyed} = useSelector(selectCurrentUser)
  console.log(verifyed);
  return (
    <>
      <Router>
        
        <PageStart />
        {isLogged ? <Header /> : ''}
        {isLogged ? <Sidebar /> : ''}

        <Routes>
          {/* User Links */}
          <Route path="/" element={!isLogged ? <LoginPage /> : verifyed ? <DashboardPage /> : <VerifyUserPage />}/>

          {!isLogged ? 
          <Route path="/sign-up" element={<RegisterPage />} /> : 
          <Route path="/sign-up" element={<NotAuthorised />} />}

          {/* Dashboard */}
          <Route path="/dashboard" element={isLogged ? verifyed ? <DashboardPage /> : <VerifyUserPage /> : <NotAuthorised />} />

          {/* Verify User */}
          <Route path="/verify-user" element={isLogged ? !verifyed ? <VerifyUserPage /> : <DashboardPage /> : <NotAuthorised />} />

          {/* Product Links */}
          <Route path="/products" element={isLogged ? verifyed ? <ProductPage /> : <VerifyUserPage /> : <NotAuthorised />} />
          <Route path="/product-detail" element={isLogged ? verifyed ? <ProductDetailPage /> : <VerifyUserPage /> : <NotAuthorised />} />
          <Route path="/edit-product" element={isLogged ? verifyed ? <EditProductPage /> : <VerifyUserPage /> : <NotAuthorised />} />


          {/* Orders Links */}
          <Route path="/orders" element={isLogged ? verifyed ? <OrderPage /> : <VerifyUserPage /> : <NotAuthorised />} />
          <Route path="/order-detail" element={isLogged ? verifyed ? <OrderDetailPage /> : <VerifyUserPage /> : <NotAuthorised />} />

          {/* Reviews */}
          <Route path="/reviews" element={isLogged ? verifyed ? <ReviewPage /> : <VerifyUserPage /> : <NotAuthorised />} />

          {/* Categories */}
          <Route path="/categories" element={isLogged ? verifyed ? <CategoryPage /> : <VerifyUserPage /> : <NotAuthorised />} />


          {/* Page Not Found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
