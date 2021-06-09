import React, { lazy, useState, useEffect, useRef } from 'react'
import ReactDatatable from '@ashvin27/react-datatable';
import Moment from 'moment';
import { useHistory } from "react-router-dom";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
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
import bankdata from "../../bank";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';


const StandingOrder = () => {

  let history = useHistory();
  let selectRef = useRef();

  let role = localStorage.getItem('role').split(",")
  //let inputterCheck = role.includes("inputter");
  let approverCheck = role.includes("approver");
  let inputterCheck = false;

  if (approverCheck === false){
    history.push("/standingorder/pending")
  }

  
  const token = localStorage.getItem('stand-order-token')
    let [data, setData]  = useState([]);
    let [loading, setLoading] = useState(true);
    let [filterdata, setFilterData] = useState([]);
    let [modaldata, setModalData] = useState({});


    const showData = (data) => {
      setModalData(data);
  }

  const popDeactivate = (id) => {
    confirmAlert({
      title: 'Deactivate Standing Order',
      message: 'Are you sure you want to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deactivate(id)
        },
        {
          label: 'No',
        }
      ]
    });
  };

  const popApprove = (id) => {
    confirmAlert({
      title: 'Approve Standing Order',
      message: 'Are you sure you want to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => approve(id)
        },
        {
          label: 'No',
        }
      ]
    });
  };

  const popDecline = (id) => {
    confirmAlert({
      title: 'Decline Standing Order',
      message: 'Are you sure you want to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => decline(id)
        },
        {
          label: 'No',
        }
      ]
    });
  };

    const onSelect = () => {
        let newData
        if (selectRef.current.value === "deactivated"){
          newData = filterdata.filter((item) => {
            return item.delete_status === "true"
          })
        }else if (selectRef.current.value === "approved"){
          newData = filterdata.filter((item) => {
            return item.status === "approved"
          })
        }else if (selectRef.current.value === "cancelled"){
          newData = filterdata.filter((item) => {
            return item.status === "cancelled"
          })
        }else if (selectRef.current.value === "declined"){
          newData = filterdata.filter((item) => {
            return item.status === "declined"
          })
        }else if (selectRef.current.value === "pending"){
          newData = filterdata.filter((item) => {
            return item.status === "pending"
          })
        }else if (selectRef.current.value === "All"){
          newData = filterdata
        }
        setData(newData);
      }
     


    const deactivate = (id) => {
        fetch(`${api_base_url}/api/standorder/deactivate`, {
      method: 'POST', // or 'PUT'
      headers: {
          'Content-Type': 'application/json',
          authorization: token
      },
      body: JSON.stringify({
        "stand_order_id": id
      }),
    }).then(response => response.json())
    .then(data => {
        if (data.status === "Success"){
            NotificationManager.success("Stand order deactivated", "Success");
            setTimeout(() => {
              window.location.reload(false);
            }, 3000)
        }else{
            NotificationManager.error("Error trying to deactivate Stand order", "Error");
        }
    })
    .catch((error) => {
    console.error('Error:', error);
    });
    }

    const approve = (id) => {
      fetch(`${api_base_url}/api/standorder/approve`, {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
        authorization: token
    },
    body: JSON.stringify({
      "stand_order_id": id,
      "status": "approved"
    }),
  }).then(response => response.json())
  .then(data => {
      console.log(data);
      if (data.status === "Success"){
          NotificationManager.success("Stand order approved", "Success");
          setTimeout(() => {
            window.location.reload(false);
          }, 3000)
      }else{
          NotificationManager.error("Error trying to approve Stand order", "Error");
      }
  })
  .catch((error) => {
  console.error('Error:', error);
  });
  }


  const decline = (id) => {
    fetch(`${api_base_url}/api/standorder/approve`, {
  method: 'POST', // or 'PUT'
  headers: {
      'Content-Type': 'application/json',
      authorization: token
  },
  body: JSON.stringify({
    "stand_order_id": id,
    "status": "declined"
  }),
}).then(response => response.json())
.then(data => {
    console.log(data);
    if (data.status === "Success"){
        NotificationManager.success("Stand order declined", "Success");
        setTimeout(() => {
          window.location.reload(false);
        }, 3000)
    }else{
        NotificationManager.error("Error trying to decline Stand order", "Error");
    }
})
.catch((error) => {
console.error('Error:', error);
});
}


    const columns = [
      {
          key: "stand_order_id",
          text: "Standing Order Id",
          sortable: true,
          
      },
      {
          key: "start_date",
          text: "Start Date",
          sortable: true,
          align: "center",
          cell: record => {
            let show = Moment(record["start_date"]).format("YYYY-MM-DD");
            return (
                <span>{show}</span>
            )
          }
      },
      {
          key: "end_date",
          text: "End Date",
          sortable: true,
          cell: record => {
            let show = Moment(record["end_date"]).format("YYYY-MM-DD");
            return (
                <span>{show}</span>
            )
          }
      } ,
      {
          key: "amount",
          text: "Amount",
          sortable: true
      },
      {
        key: "account_number",
        text: "Account number",
        sortable: true
    },
    {
      key: "account_name",
      text: "Account Name",
      sortable: true
  },
      {
        key: "remarks",
        text: "Remarks",
        sortable: true
    },
    {
        key: "action",
        text: "Action",
        cell: (record, index) => {
            return (
                <>
                <button  className="btn btn-primary btn-sm" onClick={() => showData(record)} data-toggle="modal" data-target="#exampleModalCenter"
                  className="btn btn-primary"
                  style={{marginRight: '5px', fontSize:"12px"}}>
                    View Details
                </button> 
                </>
            );
        }
    }
  ];

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const filename = "providus";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
}

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
  fetch(`${api_base_url}/api/standorder`, {
    method: 'GET', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
        authorization: token
    },
}).then(response => response.json())
.then(data => {
  setData(data.data);
  setFilterData(data.data);
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
          <CCardHeader style={{display:"flex", justifyContent:"space-between", }}>
              Standing Order
              <div style={{display:"flex", justifyContent:"space-between"}}>
             
              <select ref={selectRef} className="ml-3 py-2 px-2"  onChange={onSelect}>
                  <option value="All">Select Standing order Status</option>
                  <option value="All">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="declined">Declined</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="deactivated">Deactivated</option>
              </select>
             
              <CButton size="md" className="ml-3" color="primary" onClick={(e) => exportToCSV(data,filename)}>
                Export Report(CSV)
              </CButton>
             
              </div>
            </CCardHeader>
            <CCardBody>

            <ReactDatatable
             className="table table-responsive"
                config={config}
                records={data}
                columns={columns}
                loading={loading}
                />
              
              <br />

              
              <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Standing Order Detail</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between"> <div className="inline-block font-weight-bold">Account Name :</div> <div className="text-right inline-block font-weight-bold">{modaldata.account_name}</div></li>
                        <li class="list-group-item d-flex justify-content-between"> <div className="inline-block font-weight-bold">Account Number :</div> <div className="text-right inline-block font-weight-bold">{modaldata.account_number}</div></li>
                        <li class="list-group-item d-flex justify-content-between"> <div className="inline-block font-weight-bold">Beneficiary Account Name :</div> <div className="text-right inline-block font-weight-bold">{modaldata.beneficiary_account_name}</div></li>
                        <li class="list-group-item d-flex justify-content-between"> <div className="inline-block font-weight-bold">Beneficiary Account Number :</div> <div className="text-right inline-block font-weight-bold">{modaldata.beneficiary_account_number}</div></li>
                        <li class="list-group-item d-flex justify-content-between"> <div className="inline-block font-weight-bold">Beneficiary Bank :</div> <div className="text-right inline-block font-weight-bold">{bankdata[modaldata.beneficiary_bank]}</div></li>
                        <li class="list-group-item d-flex justify-content-between"> <div className="inline-block font-weight-bold">Frequency :</div> <div className="text-right inline-block font-weight-bold">{modaldata.frequency}</div></li>
                        <li class="list-group-item d-flex justify-content-between"> <div className="inline-block font-weight-bold">Amount :</div> <div className="text-right inline-block font-weight-bold">{modaldata.amount}</div></li>
                        <li class="list-group-item d-flex justify-content-between"> <div className="inline-block font-weight-bold">Created By :</div> <div className="text-right inline-block font-weight-bold">{modaldata.inputter_id}</div></li>
                        <li class="list-group-item d-flex justify-content-between"> <div className="inline-block font-weight-bold">Assessed By :</div> <div className="text-right inline-block font-weight-bold">{modaldata.approval_id}</div></li>
                        <li class="list-group-item d-flex justify-content-between"> <div className="inline-block font-weight-bold">Start Date :</div> <div className="text-right inline-block font-weight-bold">{Moment(modaldata.start_date).format("YYYY-MM-DD")}</div></li>
                        <li class="list-group-item d-flex justify-content-between"> <div className="inline-block font-weight-bold">End Date :</div> <div className="text-right inline-block font-weight-bold">{Moment(modaldata.end_date).format("YYYY-MM-DD") }</div></li>
                        <li class="list-group-item d-flex justify-content-between"> <div className="inline-block font-weight-bold">Next Run Date :</div> <div className="text-right inline-block font-weight-bold">{Moment( modaldata.next_run_date).format("YYYY-MM-DD")}</div></li>
                        <li class="list-group-item d-flex justify-content-between"> <div className="inline-block font-weight-bold">Remarks :</div> <div className="text-right inline-block font-weight-bold">{modaldata.remarks}</div></li>
                        <li class="list-group-item d-flex justify-content-between"> <div className="inline-block font-weight-bold">Status :</div> <div className="text-right inline-block font-weight-bold">{modaldata.status}</div></li>
                    </ul>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>
             
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default StandingOrder;
