import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)
  let role = localStorage.getItem('role').split(",")
  let inputterCheck = role.includes("inputter");
  let approverCheck = role.includes("approver");
  let adminCheck = role.includes("admin");
  //let approverCheck = false;
  //let inputterCheck = false;
  let navlist = [];

  if (inputterCheck){
    navlist.push(navigation[0])
    navlist.push(navigation[1])
    navlist.push(navigation[2])
    navlist.push(navigation[3])
    navlist.push(navigation[4])
    navlist.push(navigation[5])
    navlist.push(navigation[6])
    navlist.push(navigation[7])
    navlist.push(navigation[13])
  }

  if (approverCheck){
    navlist.push(navigation[0])
    navlist.push(navigation[2])
   
    navlist.push(navigation[8])
    navlist.push(navigation[9])
    navlist.push(navigation[10])
    navlist.push(navigation[11])
    navlist.push(navigation[12])
    navlist.push(navigation[14])
  }

  if (adminCheck){
    navlist.push(navigation[0])
    navlist.push(navigation[15])
    navlist.push(navigation[16])
    navlist.push(navigation[17])
    navlist.push(navigation[18])
    navlist.push(navigation[19])
    navlist.push(navigation[20])
  }



  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
       <CSidebarBrand className="d-md-down-none" to="/">
        <Link className="brand" to="/" style={{ padding: "20px"}}>
            <img src={Logo} alt="Providus Bank" width="100px" />
          </Link>
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navlist}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
