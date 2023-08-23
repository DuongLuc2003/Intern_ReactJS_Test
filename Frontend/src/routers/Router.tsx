// src/routers/Router.js
import React from 'react';
import {  Navigate } from 'react-router-dom';
import { createBrowserRouter } from "react-router-dom";
import Cart from '../pages/Cart.tsx';
import Home from '../pages/Home';
import Checkout from '../pages/Checkout';
import Signin from '../pages/auth/Signin.tsx';
import Shop from '../pages/Shop';
import Signup from '../pages/auth/Signup.tsx';
import Productdetail from '../pages/Productdetail.tsx';
import LayoutAdmin from '../components/Layouts/LayoutAdmin/LayoutAdmin.tsx';
import Dashboard from '../pages/admin/dashbroad/index.tsx';
import AdminProduct from '../features/product/index.tsx';
import AdminUser from '../features/auth/index.tsx';
import AdminProductAdd from '../features/product/pages/Add/index.tsx';
import AdminProductEdit from '../features/product/pages/Edit/index.tsx';
import Layout from '../components/Layouts/LayoutWebsite/Layout.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to='/home' /> },
      { path: '/home', element: <Home /> },
      { path: 'Shop', element: <Shop /> },
      { path: 'Shop/:id', element: <Productdetail /> },
      { path: 'Cart', element: <Cart /> },
      { path: 'Checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: 'Signin', element: <Signin /> },
      { path: 'Signup', element: <Signup /> },
      
    ]
  },
  {
    path: 'admin',
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <Navigate to='dashboard' /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'product', element: <AdminProduct /> },
      { path: 'user', element: <AdminUser /> },
      { path: 'product/add', element: <AdminProductAdd /> },
      { path: 'product/:idProduct/edit', element: <AdminProductEdit /> },
    ],
  },
]);

// export const Router = createBrowserRouter(routes);