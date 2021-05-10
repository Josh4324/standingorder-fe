import React, { lazy, useState, useEffect, useRef } from 'react'
import ReactDatatable from '@ashvin27/react-datatable';
import Moment from 'moment';
import { useHistory } from "react-router-dom";

import {api_base_url} from '../../utils/constant';
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
} from '@coreui/react'
import NotificationManager from 'react-notifications/lib/NotificationManager';
import { useJwt } from "react-jwt";



const AdminTransactions = () => {

  let history = useHistory();
  
  const token = localStorage.getItem('stand-order-token');
    let [data, setData]  = useState([]);
    let [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    let [filterdata, setFilterData] = useState([]);


    const columns = [
      {
          key: "transaction_id",
          text: "Transaction Id",
          sortable: true
      },
      {
        key: "stand_order_id",
        text: "Stand Order Id",
        sortable: true,
        align: "center"
    },
      {
          key: "amount",
          text: "Amount",
          sortable: true
      },
      {
        key: "date",
        text: "Transaction Date",
        sortable: true,
        align: "center",
        cell: record => {
          let show = Moment(record["date"]).format("YYYY-MM-DD");
          return (
              <span>{show}</span>
          )
        }
    },
      {
          key: "status",
          text: "Status",
          sortable: true,
          align: "center"
      },
      {
        key: "num_of_retries",
        text: "Number of Retries",
        sortable: true,
         
      },
    
      
  ];

  const config = {
    page_size: 10,
    length_menu: [10, 20, 50],
    show_filter: true,
    show_pagination: true,
    pagination: 'basic',
    button: {
        excel: false,
        print: false
    },
    language: {
      loading_text: "Please be patient while data loads..."
  }
}


const getData = () => {
  fetch(`${api_base_url}/api/transactions/admin`, {
    method: 'GET', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
        authorization: token
    },
}).then(response => response.json())
.then(data => {
  console.log('Success:', data);
  setData(data.data);
  setLoading(false);
})
.catch((error) => {
  console.error('Error:', error);
});
}


useEffect(() => { 
    getData();
}, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
           
            <CCardBody>

            <ReactDatatable
             className="table table-responsive"
                config={config}
                records={data}
                columns={columns}
                loading={loading}
                />
              
              <br />
             
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default AdminTransactions;
