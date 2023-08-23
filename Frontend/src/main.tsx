import React from 'react'
import ReactDOM from 'react-dom/client'
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.css";
import "framer-motion"
import App from './App.tsx'
import './App.css';
import './index.css'
import { Provider } from 'react-redux';
import {ToastContainer} from 'react-toastify'
import persistor, { store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import 'react-toastify/dist/ReactToastify.css'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
   
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>  
    <ToastContainer
     position="top-right"
     autoClose={3000}
     closeOnClick
     pauseOnHover={false}
     theme="light"
/>
    <App/>
    </PersistGate>
    </Provider>
  </React.StrictMode>,
)
