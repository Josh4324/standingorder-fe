import React, { lazy, useState, useEffect, useRef } from 'react'
import ReactDatatable from '@ashvin27/react-datatable';
import Moment from 'moment';
import { useHistory } from "react-router-dom";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
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
import ReactPDF from '@react-pdf/renderer';
import { jsPDF } from "jspdf";



const Transaction = () => {

  let history = useHistory();
  
  const token = localStorage.getItem('stand-order-token');
    let [data, setData]  = useState([]);
    let [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    let [filterdata, setFilterData] = useState([]);


    const generatePDF = (record) => {
      const doc = new jsPDF('p', 'pt');
      
      doc.setFontSize(22);
      doc.text(20, 20, 'Transaction Receipt.');

      let transact = "Transaction ID:" + record['transaction_id'];
      let amount = "Amount:" + String(record['amount']);
      let date = "Date:" + String(record['date']);
      
      doc.text(20, 60, transact)
      doc.text(20, 100, amount)
      doc.text(20, 140, date)  

      
      doc.save('receipt.pdf')
    }   




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
      {
        key: "action",
        text: "Action",
        cell: (record, index) => {
            return (
                <>
                <button  className="btn btn-primary btn-sm" onClick={() => generatePDF(record)}
                    className="btn btn-primary"
                    style={{marginRight: '5px', fontSize:"12px"}}>
                        <span>Download Receipt</span>
                </button> 
                    
                </>
            );
        }
    }
    
      
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
  fetch(`${api_base_url}/api/transactions/inputter`, {
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

export default Transaction;
