import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CButton,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink
} from '@coreui/react'


// routes config
import routes from '../routes'

const TheHeader = () => {
  let history = useHistory();
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const username = localStorage.getItem('userId');

  const logout = () => {
    localStorage.removeItem("stand-order-token");
    history.push('/login');
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
      <Link className="brand" to="/" style={{ padding: "20px"}}>
            <img src={Logo} alt="Providus Bank" width="100px" />
          </Link>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        
           <CHeaderNavItem className="px-3" >
           <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
         </CHeaderNavItem>
        
       
      </CHeaderNav>

      <h5 className="mt-3">{username}</h5>

      <div className="px-3" >
      <CButton size="md" className="mt-2" color="danger" onClick={logout}>
               LogOut
        </CButton>
        </div>
      

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
         
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
