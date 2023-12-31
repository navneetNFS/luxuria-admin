import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectUserLogged } from "./store/slices/auth-slice";
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
import PageNotFound from "./Pages/PageNotFound";
import NotAuthorised from "./Pages/NotAuthorised";
import PageStart from "./Components/PageStart";
import VerifyUserPage from "./Pages/VerifyUserPage";
import SignOutPage from "./Pages/SignOutPage";
import DeleteCategory from "./Components/DeleteCategory";
import DeleteProduct from "./Components/DeleteProduct";
import ForgotPassword from "./Pages/ForgotPassword";
import SubCategoryPage from "./Pages/SubCategoryPage";
import DeleteSubCategory from "./Components/DeleteSubCategory";
import RightsPage from "./Pages/RightsPage";
import RightsForm from "./Components/RightsForm";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import axios from "axios";
import MyProfile from "./Pages/MyProfile";

function App() {
  const isLogged = useSelector(selectUserLogged)
  const user = useSelector(selectCurrentUser)
  const role = user ? user.role : null


  const email = user ? user.email : ''
  const [rights, setRight] = useState({})
  const [isLoading, setLoading] = useState(false)

  const getRights = async () => {
    if (email != '') {
      const res = await axios(`/api/rights/${email}`).then(({ data }) => data).catch(({ response }) => response.data);
      const { success } = res
      setLoading(false)

      if (success) {
        setRight(res.rights)
      }
    }
  }

  useLayoutEffect(() => {
    if (isLogged) {
      setLoading(true)
      getRights()
    }
  }, [isLogged])

  const { products, orders, category } = rights
  return (
    <>
      <Router>
        <PageStart />
        {isLogged ? <Header /> : ''}
        {isLogged ? <Sidebar /> : ''}


        <Routes>
          {/* User Links */}
          <Route path="/" element={!isLogged ? <LoginPage /> : <PageNotFound />} />

          <Route path="/sign-up" element={!isLogged ? <RegisterPage /> : <NotAuthorised />} />

          <Route path="/forgot-password" element={!isLogged ? <ForgotPassword /> : <PageNotFound />} />

          <Route path="/dashboard" element={isLogged ? user.verifyed ? <DashboardPage rights={rights} role={role} isLoading={isLoading} /> : <VerifyUserPage /> : <NotAuthorised />} />


          {/* User Profile */}

          <Route path="/my-profile" element={isLogged ? user.verifyed ? <MyProfile /> : <VerifyUserPage /> : <NotAuthorised />} />

          {/* Verify User */}
          <Route path="/verify-user" element={isLogged ? !user.verifyed ? <VerifyUserPage /> : <DashboardPage /> : <NotAuthorised />} />

          {/* Product Links */}
          <Route path="/products" element={isLogged ? user.verifyed ? products || role == "super-admin" ? <ProductPage /> : <NotAuthorised /> : <VerifyUserPage /> : <NotAuthorised />} />
          <Route path="/product-detail/:productId" element={isLogged ? user.verifyed ? products || role == "super-admin" ? <ProductDetailPage /> : <NotAuthorised /> : <VerifyUserPage /> : <NotAuthorised />} />
          <Route path="/edit-product/:productId" element={isLogged ? user.verifyed ? products || role == "super-admin" ? <EditProductPage /> : <NotAuthorised /> : <VerifyUserPage /> : <NotAuthorised />} />
          <Route path="/delete-product/:productId" element={isLogged ? user.verifyed ? products || role == "super-admin" ? <DeleteProduct /> : <NotAuthorised /> : <VerifyUserPage /> : <NotAuthorised />} />

          {/* Reviews */}
          <Route path="/reviews" element={isLogged ? user.verifyed ? products || role == "super-admin" ? <ReviewPage /> : <NotAuthorised /> : <VerifyUserPage /> : <NotAuthorised />} />


          {/* Orders Links */}
          <Route path="/orders" element={isLogged ? user.verifyed ? orders || role == "super-admin" ? <OrderPage /> : <NotAuthorised /> : <VerifyUserPage /> : <NotAuthorised />} />

          {/* <Route path="/order-detail" element={isLogged ? user.verifyed ? orders || role == "super-admin" ? <OrderDetailPage /> : <NotAuthorised /> : <VerifyUserPage /> : <NotAuthorised />} /> */}

          <Route path="/order-detail" element={isLogged ? user.verifyed ? orders || role == "admin" || role == "super-admin" ? <OrderDetailPage /> : <NotAuthorised /> : <VerifyUserPage /> : <NotAuthorised />} />

          {/* Categories */}
          <Route path="/categories" element={isLogged ? user.verifyed ? category || role == "super-admin" ? <CategoryPage /> : <NotAuthorised /> : <VerifyUserPage /> : <NotAuthorised />} />
          <Route path="/categories/:categoryName" element={isLogged ? user.verifyed ? category || role == "super-admin" ? <SubCategoryPage /> : <NotAuthorised /> : <VerifyUserPage /> : <NotAuthorised />} />
          <Route path="/delete-categorie/:id" element={isLogged ? user.verifyed ? category || role == "super-admin" ? <DeleteCategory /> : <NotAuthorised /> : <VerifyUserPage /> : <NotAuthorised />} />
          <Route path="/delete-sub-categorie/:categoryName/:id" element={isLogged ? user.verifyed ? category || role == "super-admin" ? <DeleteSubCategory /> : <NotAuthorised /> : <VerifyUserPage /> : <NotAuthorised />} />


          {/* Rights */}

          {
            role == "super-admin" ? <Route path="/right" element={isLogged ? user.verifyed ? <RightsPage /> : <VerifyUserPage /> : <NotAuthorised />}>
              <Route path="/right/:emailId" element={isLogged ? user.verifyed ? <RightsForm /> : <VerifyUserPage /> : <NotAuthorised />} />
            </Route> : <Route path="/right" element={isLogged ? user.verifyed ? <NotAuthorised /> : <VerifyUserPage /> : <NotAuthorised />} />
          }



          {/* Categories */}
          <Route path="/log-out" element={isLogged ? user.verifyed ? <SignOutPage /> : <VerifyUserPage /> : <NotAuthorised />} />


          {/* Page Not Found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        
      </Router>
    </>
  )
}

export default App
