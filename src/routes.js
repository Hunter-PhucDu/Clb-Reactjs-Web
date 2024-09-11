import React, { lazy } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux"

const HomePage = lazy(() => import('./views/pages/homepage'))
const LoginUser = lazy(() => import('./views/pages/loginUser'))
const LoginAdmin = lazy(() => import('./views/pages/loginAdmin'))
const Register = lazy(() => import('./views/pages/register'))
const ForgotPassword = lazy(() => import('./views/pages/forgotPassword'))
const Management = lazy(() => import('./views/pages/management'))
const Page404 = lazy(() => import('./views/pages/page404'))
const Page500 = lazy(() => import('./views/pages/page500'))
const RegistrationForm = lazy(() => import('./views/pages/rigistration'))
const News = lazy(() => import('./views/pages/news'))


// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element }) => {
  const auth = useSelector((state) => state.auth)
  return auth.isLoggedIn ? (element) : (<Navigate to="/login" />)
}

// eslint-disable-next-line react/prop-types
const PrivateAdminManagementRoute = ({ element }) => {
  const auth = useSelector((state) => state.auth)

  return auth.account.role === "ADMIN" ? element : <Navigate replace to="/" />
}

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ element }) => {
  const auth = useSelector((state) => state.auth)
  return auth.account.isLoggedIn ? (<Navigate to="/" />) : (element)
}

const Routers = ({ notify }) => {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<PublicRoute element={<LoginUser notify={notify} />} />} />
      <Route path="/admin-sign-in" element={<PublicRoute element={<LoginAdmin />} />} />
      <Route path="/register" element={<PublicRoute element={<Register notify={notify} />} />} />
      <Route path="/forgotpassword" element={<PublicRoute element={<ForgotPassword />} />} />
      <Route path="/registration" element={<RegistrationForm notify={notify} />} />
      <Route path="/news" element={<News />} />
      <Route path="/management" element={<PrivateAdminManagementRoute element={<Management />} />} />
      <Route path="/500" element={<Page500 />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}
export default Routers


