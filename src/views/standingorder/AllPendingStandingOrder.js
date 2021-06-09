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
import bankdata from "../../bank";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';


const AllPendingStandingOrder = () => {

  let history = useHistory();

  const token = localStorage.getItem('stand-order-token')
    let [data, setData]  = useState([]);
    let [loading, setLoading] = useState(true);
    let [modaldata, setModalData] = useState({});

    const showData = (data) => {
        setModalData(data);
    }


    let role = localStorage.getItem('role').split(",")
    let approverCheck = role.includes("approver");

    if (approverCheck !== true){
       history.push("/dashboard");
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


  const popApprove = (id) => {
    confirmAlert({
      title: 'Activate Standing Order',
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

    const columns = [
      {
          key: "stand_order_id",
          text: "Standing Order Id",
          sortable: true,
          
      },
     { key: "status",
      text: "Status",
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
      ,
      {
          key: "next_run_date",
          text: "Next Run Date",
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
        key: "action",
        text: "Action",
        cell: (record, index) => {
            return (
                <>
                 <button  className="btn btn-primary btn-sm" onClick={() => showData(record)} data-toggle="modal" data-target="#exampleModalCenter"
                    className="btn btn-primary"
                    style={{marginRight: '5px', fontSize:"12px"}}>
                        <span>View Details</span>
                </button>
                {
                  approverCheck == true ? (
                    (record.status === "pending") && record.delete_status !== "true" ?  <button
                  className="btn btn-primary btn-sm"
                  onClick={() => popApprove(record["stand_order_id"])}
                  style={{marginRight: '5px'}}>
                      Approve
              </button> :  <button disabled
                  className="btn btn-primary btn-sm"
                  style={{marginRight: '5px',fontSize:"12px"}}>
                      {record.status === "approved" ? "Approved" : "Approve"}
              </button>
                  ) : null
                  
                }
                 {
                  approverCheck == true ? (
                    (record.status === "pending") && record.delete_status !== "true" ?  <button
                  className="btn btn-primary btn-sm"
                  onClick={() => popDecline(record["stand_order_id"])}
                  style={{marginRight: '5px'}}>
                      Decline
              </button> :  <button disabled
                  className="btn btn-primary btn-sm"
                  style={{marginRight: '5px',fontSize:"12px"}}>
                     {record.status === "declined" ? "Declined" : "Decline"}
              </button>
                  ) : null
                  
                } 
                {
                    record.delete_status !== "true" ?  <button type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => popDeactivate(record["stand_order_id"])}
                    style={{marginRight: '5px',fontSize:"12px"}}>
                        Deactivate
                </button> :  
                <button disabled type="button"
                    className="btn btn-danger btn-sm"
                    style={{marginRight: '5px',fontSize:"12px"}}>
                        Deactivated
                </button>
                }
                    
                </>
            );
        }
    }
  ];

  const config = {
    page_size: 100,
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
  fetch(`${api_base_url}/api/standorder/pending`, {
    method: 'GET', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
        authorization: token
    },
}).then(response => response.json())
.then(data => {
  
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
          <CCardHeader style={{display:"flex", justifyContent:"space-between", }}>
             Pending Standing Order
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

export default AllPendingStandingOrder;
