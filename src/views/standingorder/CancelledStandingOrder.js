/* eslint-disable no-sparse-arrays */
import React, { useState, useEffect } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import Moment from "moment";
import { api_base_url } from "../../utils/constant";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import bankdata from "../../bank";

const CancelledStandingOrder = () => {
  const token = localStorage.getItem("stand-order-token");
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);
  let [modaldata, setModalData] = useState({});

  const showData = (data) => {
    setModalData(data);
  };

  const columns = [
    {
      key: "stand_order_id",
      text: "Standing Order Id",
      sortable: true,
    },
    { key: "status", text: "Status", sortable: true },
    {
      key: "start_date",
      text: "Start Date",
      sortable: true,
      align: "center",
      cell: (record) => {
        let show = Moment(record["start_date"]).format("YYYY-MM-DD");
        return <span>{show}</span>;
      },
    },
    {
      key: "end_date",
      text: "End Date",
      sortable: true,
      cell: (record) => {
        let show = Moment(record["end_date"]).format("YYYY-MM-DD");
        return <span>{show}</span>;
      },
    },
    ,
    {
      key: "next_run_date",
      text: "Next Run Date",
      sortable: true,
      cell: (record) => {
        let show = Moment(record["end_date"]).format("YYYY-MM-DD");
        return <span>{show}</span>;
      },
    },
    {
      key: "amount",
      text: "Amount",
      sortable: true,
    },
    {
      key: "action",
      text: "Action",
      cell: (record, index) => {
        return (
          <>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => showData(record)}
              data-toggle="modal"
              data-target="#exampleModalCenter"
              className="btn btn-primary"
              style={{ marginRight: "5px", fontSize: "12px" }}
            >
              <span>View Details</span>
            </button>
          </>
        );
      },
    },
  ];

  const config = {
    page_size: 100,
    length_menu: [10, 20, 50],
    show_filter: true,
    show_pagination: true,
    pagination: "basic",
    button: {
      excel: false,
      print: false,
    },
    language: {
      loading_text: "Please be patient while data loads...",
    },
  };

  const getData = () => {
    fetch(`${api_base_url}/api/standorder/cancelled/inputter`, {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              Deactivated Standing Order
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

              <div
                class="modal fade"
                id="exampleModalCenter"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">
                        Standing Order Detail
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between">
                          {" "}
                          <div className="inline-block font-weight-bold">
                            Account Name :
                          </div>{" "}
                          <div className="text-right inline-block font-weight-bold">
                            {modaldata.account_name}
                          </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                          {" "}
                          <div className="inline-block font-weight-bold">
                            Account Number :
                          </div>{" "}
                          <div className="text-right inline-block font-weight-bold">
                            {modaldata.account_number}
                          </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                          {" "}
                          <div className="inline-block font-weight-bold">
                            Beneficiary Account Name :
                          </div>{" "}
                          <div className="text-right inline-block font-weight-bold">
                            {modaldata.beneficiary_account_name}
                          </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                          {" "}
                          <div className="inline-block font-weight-bold">
                            Beneficiary Account Number :
                          </div>{" "}
                          <div className="text-right inline-block font-weight-bold">
                            {modaldata.beneficiary_account_number}
                          </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                          {" "}
                          <div className="inline-block font-weight-bold">
                            Beneficiary Bank :
                          </div>{" "}
                          <div className="text-right inline-block font-weight-bold">
                            {bankdata[modaldata.beneficiary_bank]}
                          </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                          {" "}
                          <div className="inline-block font-weight-bold">
                            Frequency :
                          </div>{" "}
                          <div className="text-right inline-block font-weight-bold">
                            {modaldata.frequency}
                          </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                          {" "}
                          <div className="inline-block font-weight-bold">
                            Amount :
                          </div>{" "}
                          <div className="text-right inline-block font-weight-bold">
                            {modaldata.amount}
                          </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                          {" "}
                          <div className="inline-block font-weight-bold">
                            Created By :
                          </div>{" "}
                          <div className="text-right inline-block font-weight-bold">
                            {modaldata.inputter_id}
                          </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                          {" "}
                          <div className="inline-block font-weight-bold">
                            Assessed By :
                          </div>{" "}
                          <div className="text-right inline-block font-weight-bold">
                            {modaldata.approval_id}
                          </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                          {" "}
                          <div className="inline-block font-weight-bold">
                            Start Date :
                          </div>{" "}
                          <div className="text-right inline-block font-weight-bold">
                            {Moment(modaldata.start_date).format("YYYY-MM-DD")}
                          </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                          {" "}
                          <div className="inline-block font-weight-bold">
                            End Date :
                          </div>{" "}
                          <div className="text-right inline-block font-weight-bold">
                            {Moment(modaldata.end_date).format("YYYY-MM-DD")}
                          </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                          {" "}
                          <div className="inline-block font-weight-bold">
                            Next Run Date :
                          </div>{" "}
                          <div className="text-right inline-block font-weight-bold">
                            {Moment(modaldata.next_run_date).format(
                              "YYYY-MM-DD"
                            )}
                          </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                          {" "}
                          <div className="inline-block font-weight-bold">
                            Remarks :
                          </div>{" "}
                          <div className="text-right inline-block font-weight-bold">
                            {modaldata.remarks}
                          </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                          {" "}
                          <div className="inline-block font-weight-bold">
                            Status :
                          </div>{" "}
                          <div className="text-right inline-block font-weight-bold">
                            {modaldata.status}
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default CancelledStandingOrder;
