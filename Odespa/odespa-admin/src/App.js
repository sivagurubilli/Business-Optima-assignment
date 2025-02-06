import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import "./App.css"
import {
  ChakraProvider,
   extendTheme
} from '@chakra-ui/react';
import {  MultiSelectTheme } from 'chakra-multiselect'
import ProtectedRoutes from "./utils/ProtectedRotes"
const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme
  }
})

// Chakra imports

export default function Main() {
  // eslint-disable-next-line
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route  element={<ProtectedRoutes />}>
        <Route
          path="admin/*"
          element={
            <AdminLayout />
          }
        />
        </Route>
       
        <Route path="/" element={<Navigate to="/admin" replace />} />
        
      </Routes>
    </ChakraProvider>
  );
}
