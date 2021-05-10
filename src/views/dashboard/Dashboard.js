import React, { lazy, useState, useEffect, useRef } from 'react'
import Moment from 'moment';
import { useHistory, Link } from "react-router-dom";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout
} from '@coreui/react';
import {api_base_url} from '../../utils/constant';



const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))


const Dashboard = () => {
  console.log(api_base_url);
  let history = useHistory();
  let selectRef = useRef(null);

  let role = localStorage.getItem('role').split(",")
  let inputterCheck = role.includes("inputter");
  //let approverCheck = role.includes("approver");
 // let adminCheck = role.includes("admin");
  let adminCheck = false;
  let approverCheck = false;
  
  
  const [standingOrder, setStandingOrder] = useState(0);
  const [pending, setPending] = useState(0);
  const [approved, setApproved] = useState(0);
  const [declined, setDeclined] = useState(0);

  const [allStandingOrder, setAllStandingOrder] = useState(0);
  const [allPending, setAllPending] = useState(0);
  const [allApproved, setAllApproved] = useState(0);
  const [allDeclined, setAllDeclined] = useState(0);

  const [adminStandingOrder, setAdminStandingOrder] = useState(0);
  const [adminPending, setAdminPending] = useState(0);
  const [adminApproved, setAdminApproved] = useState(0);
  const [adminDeclined, setAdminDeclined] = useState(0);


const getData = () => {
fetch(`${api_base_url}/api/standorder/stat`, {
  method: 'GET',
  headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem("stand-order-token")
  },
}).then(response => response.json())
.then(data => {
console.log('Success:', data);
setStandingOrder(data.data.standingOrder);
setPending(data.data.pending);
setApproved(data.data.approved);
setDeclined(data.data.declined);
setAllStandingOrder(data.data.allStandingOrder);
setAllApproved(data.data.allApproved);
setAllPending(data.data.allPending);
setAllDeclined(data.data.allDeclined);
setAdminStandingOrder(data.data.adminStandingOrder);
setAdminApproved(data.data.adminApproved);
setAdminPending(data.data.adminPending);
setAdminDeclined(data.data.adminDeclined);

}).catch((err) => {
    console.log(err)
})
}

useEffect(() => {
    getData();
    return () => {
    }
}, [])
 
  return (
    <>

    {
        inputterCheck === true ? 
        (<CRow>
            <CCol style={{ display:"flex", justifyContent:"space-around", flexWrap:"wrap", marginTop:"50px", }}>
               
                    <CCard style={{ backgroundColor: "#417dd1", color: "white",fontSize:"10px"}} className="view-card px-auto">
                        <h3 className="ml-3 mt-3">{standingOrder}</h3>
                        <h4 style={{ fontSize:"16px" }} className="mx-auto mt-2">Standing Orders</h4> 
                    </CCard>
                
                
               
                    <CCard style={{ backgroundColor: "#a37708", color: "white"}} className="view-card px-auto">
                        <h3  className="ml-3 mt-3">{pending}</h3>
                        <h4 style={{ fontSize:"16px" }} className="mx-auto mt-2 text-center">Pending Standing Orders</h4> 
                    </CCard>
                
                
              
                    <CCard style={{ backgroundColor: "#417dd1", color: "white"}} className="view-card px-auto">
                        <h3  className="ml-3 mt-3">{approved}</h3>
                        <h4 style={{ fontSize:"16px" }} className="mx-auto mt-2 my-2 text-center">Approved Standing Orders</h4> 
                    </CCard>
                
                
                    <CCard style={{ backgroundColor: "#f07584", color: "white"}} className="view-card px-auto">
                        <h3  className="ml-3 mt-3">{declined}</h3>
                        <h4 style={{ fontSize:"16px" }} className="mx-auto mt-2 my-2 text-center">Declined Standing Orders</h4> 
                    </CCard>
                
               
            </CCol>
          </CRow>)
        :
        null
    }


{
        approverCheck === true ? 
        (<CRow>
            <CCol style={{ display:"flex", justifyContent:"space-around", flexWrap:"wrap", marginTop:"50px", }}>
               
                    <CCard style={{ backgroundColor: "#417dd1", color: "white",fontSize:"10px"}} className="view-card px-auto">
                        <h3 className="ml-3 mt-3">{allStandingOrder}</h3>
                        <h4 style={{ fontSize:"16px" }} className="mx-auto mt-2">All Standing Orders</h4> 
                    </CCard>
                
                
               
                    <CCard style={{ backgroundColor: "#a37708", color: "white"}} className="view-card px-auto">
                        <h3  className="ml-3 mt-3">{allPending}</h3>
                        <h4 style={{ fontSize:"16px" }} className="mx-auto mt-2 text-center">All Pending Standing Orders</h4> 
                    </CCard>
                
                
              
                    <CCard style={{ backgroundColor: "#417dd1", color: "white"}} className="view-card px-auto">
                        <h3  className="ml-3 mt-3">{allApproved}</h3>
                        <h4 style={{ fontSize:"16px" }} className="mx-auto mt-2 my-2 text-center">All Approved Standing Orders</h4> 
                    </CCard>
                
                
                    <CCard style={{ backgroundColor: "#f07584", color: "white"}} className="view-card px-auto">
                        <h3  className="ml-3 mt-3">{allDeclined}</h3>
                        <h4 style={{ fontSize:"16px" }} className="mx-auto mt-2 my-2 text-center">All Declined Standing Orders</h4> 
                    </CCard>
                
               
            </CCol>
          </CRow>)
        :
        null
    }

{
        adminCheck === true ? 
        (<CRow>
            <CCol style={{ display:"flex", justifyContent:"space-around", flexWrap:"wrap", marginTop:"50px", }}>
               
                    <CCard style={{ backgroundColor: "#417dd1", color: "white",fontSize:"10px"}} className="view-card px-auto">
                        <h3 className="ml-3 mt-3">{adminStandingOrder}</h3>
                        <h4 style={{ fontSize:"16px" }} className="mx-auto mt-2">All Standing Orders</h4> 
                    </CCard>
                
                
               
                    <CCard style={{ backgroundColor: "#a37708", color: "white"}} className="view-card px-auto">
                        <h3  className="ml-3 mt-3">{adminPending}</h3>
                        <h4 style={{ fontSize:"16px" }} className="mx-auto mt-2 text-center">All Pending Standing Orders</h4> 
                    </CCard>
                
                
              
                    <CCard style={{ backgroundColor: "#417dd1", color: "white"}} className="view-card px-auto">
                        <h3  className="ml-3 mt-3">{adminApproved}</h3>
                        <h4 style={{ fontSize:"16px" }} className="mx-auto mt-2 my-2 text-center">All Approved Standing Orders</h4> 
                    </CCard>
                
                
                    <CCard style={{ backgroundColor: "#f07584", color: "white"}} className="view-card px-auto">
                        <h3  className="ml-3 mt-3">{adminDeclined}</h3>
                        <h4 style={{ fontSize:"16px" }} className="mx-auto mt-2 my-2 text-center">All Declined Standing Orders</h4> 
                    </CCard>
                
               
            </CCol>
          </CRow>)
        :
        null
    }
    
    

    {
        inputterCheck === true ?
        (<CRow>
            <CCol style={{ display:"flex", justifyContent:"space-around", marginTop:"50px", flexWrap:"wrap"}}>
                <Link to="/standOrder" style={{textDecoration:"none"}}>
                    <CCard style={{ backgroundColor: "#417dd1", color: "white"}} className="view-card px-auto">
                    <h4 style={{ fontSize:"16px" }} className="mx-auto mt-5">New Standing Order</h4> 
                    </CCard>
                </Link>
                
                <Link  to="/standingorder/pending" style={{textDecoration:"none"}}>
                    <CCard style={{ backgroundColor: "#a37708", color: "white"}} className="view-card px-auto">
                    <h4 style={{ fontSize:"16px" }} className="mx-auto mt-5 text-center">View Pending Standing Orders</h4> 
                    </CCard>
                </Link>
                
                <Link to="/standingorder/approved" style={{textDecoration:"none"}}>
                    <CCard style={{ backgroundColor: "#417dd1", color: "white"}} className="view-card px-auto">
                    <h4 style={{ fontSize:"16px" }} className="mx-auto mt-5 text-center">View Approved Standing Orders</h4> 
                    </CCard>
                </Link>
                
                <Link to="/standingorder/declined" style={{textDecoration:"none"}}>
                    <CCard style={{ backgroundColor: "#f07584", color: "white"}} className="view-card px-auto">
                    <h4 style={{ fontSize:"16px" }} className="mx-auto mt-5 text-center">View Declined Standing Orders</h4> 
                    </CCard>
                </Link>
               
            </CCol>
          </CRow>)
        :
        null
    }



{
        approverCheck === true ?
        (<CRow>
            <CCol style={{ display:"flex", justifyContent:"space-around", marginTop:"50px", flexWrap:"wrap"}}>
                <Link to="/standingorder" style={{textDecoration:"none"}}>
                    <CCard style={{ backgroundColor: "#0247FE", color: "white"}} className="view-card px-auto">
                    <h4 style={{ fontSize:"16px" }} className="mx-auto mt-5">View All Standing Order</h4> 
                    </CCard>
                </Link>
                
                <Link  to="/standingorder/allpending" style={{textDecoration:"none"}}>
                    <CCard style={{ backgroundColor: "#a37708", color: "white"}} className="view-card px-auto">
                    <h4 style={{ fontSize:"16px" }} className="mx-auto mt-5 text-center">View All Pending Standing Orders</h4> 
                    </CCard>
                </Link>
                
                <Link to="/standingorder/allapproved" style={{textDecoration:"none"}}>
                    <CCard style={{ backgroundColor: "#0247FE", color: "white"}} className="view-card px-auto">
                    <h4 style={{ fontSize:"16px" }} className="mx-auto mt-5 text-center">View All Approved Standing Orders</h4> 
                    </CCard>
                </Link>
                
                <Link to="/standingorder/alldeclined" style={{textDecoration:"none"}}>
                    <CCard style={{ backgroundColor: "#f07584", color: "white"}} className="view-card px-auto">
                    <h4 style={{ fontSize:"16px" }} className="mx-auto mt-5 text-center">View All Declined Standing Orders</h4> 
                    </CCard>
                </Link>
               
            </CCol>
          </CRow>)
        :
        null
    }

{
        adminCheck === true ?
        (<CRow>
            <CCol style={{ display:"flex", justifyContent:"space-around", marginTop:"50px", flexWrap:"wrap"}}>
                <Link to="/standingorder/admin" style={{textDecoration:"none"}}>
                    <CCard style={{ backgroundColor: "#0247FE", color: "white"}} className="view-card px-auto">
                    <h4 style={{ fontSize:"16px" }} className="mx-auto mt-5">View All Standing Order</h4> 
                    </CCard>
                </Link>
                
                <Link  to="/standingorder/adminpending" style={{textDecoration:"none"}}>
                    <CCard style={{ backgroundColor: "#a37708", color: "white"}} className="view-card px-auto">
                    <h4 style={{ fontSize:"16px" }} className="mx-auto mt-5 text-center">View All Pending Standing Orders</h4> 
                    </CCard>
                </Link>
                
                <Link to="/standingorder/adminapproved" style={{textDecoration:"none"}}>
                    <CCard style={{ backgroundColor: "#0247FE", color: "white"}} className="view-card px-auto">
                    <h4 style={{ fontSize:"16px" }} className="mx-auto mt-5 text-center">View All Approved Standing Orders</h4> 
                    </CCard>
                </Link>
                
                <Link to="/standingorder/admindeclined" style={{textDecoration:"none"}}>
                    <CCard style={{ backgroundColor: "#f07584", color: "white"}} className="view-card px-auto">
                    <h4 style={{ fontSize:"16px" }} className="mx-auto mt-5 text-center">View All Declined Standing Orders</h4> 
                    </CCard>
                </Link>
               
            </CCol>
          </CRow>)
        :
        null
    }
      

      
    </>
  )
}

export default Dashboard
