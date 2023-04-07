import { Box } from '@mui/material'
import React from 'react'

import { Outlet} from "react-router-dom"
import GlobalLoading from '../common/GlobalLoading'
import Footer from '../common/Footer'
import Topbar from '../common/Topbar'
import AuthModal from '../common/AuthModal'
import { useDispatch } from "react-redux";
import { setUser } from '../../redux/features/userSlice'

const MainLayout = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem('userItem');
  const userJson = JSON.parse(user);
  if(userJson) {
    dispatch(setUser(userJson));
  }
  
  return (
    <>
      <GlobalLoading />
      <AuthModal />

      <Box display="flex" minHeight="100vh">
        
        <Topbar />

        <Box
          component="main"
          flexGrow={1}
          overflow="hidden"
          minHeight="100vh"
        >
          <Outlet />
        </Box>
      </Box>

      <Footer />
    </>
  );
}

export default MainLayout