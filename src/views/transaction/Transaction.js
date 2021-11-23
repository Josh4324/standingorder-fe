import React, { useState, useEffect } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import Moment from "moment";
import { api_base_url } from "../../utils/constant";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";

const Transaction = () => {
  const token = localStorage.getItem("stand-order-token");
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);

  const generatePDF = (record) => {
    fetch(`${api_base_url}/api/receipt`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        transId: record["transaction_id"],
        standOrderId: record["stand_order_id"],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.open(`${api_base_url}/${data}`, "_blank");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const columns = [
    {
      key: "transaction_id",
      text: "Transaction Id",
      sortable: true,
    },
    {
      key: "stand_order_id",
      text: "Stand Order Id",
      sortable: true,
      align: "center",
    },
    {
      key: "amount",
      text: "Amount",
      sortable: true,
    },
    {
      key: "date",
      text: "Transaction Date",
      sortable: true,
      align: "center",
      cell: (record) => {
        let show = Moment(record["date"]).format("YYYY-MM-DD");
        return <span>{show}</span>;
      },
    },
    {
      key: "status",
      text: "Status",
      sortable: true,
      align: "center",
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
            <button
              className="btn btn-primary btn-sm"
              onClick={() => generatePDF(record)}
              className="btn btn-primary"
              style={{ marginRight: "5px", fontSize: "12px" }}
            >
              <span>Download Receipt</span>
            </button>
          </>
        );
      },
    },
  ];

  const config = {
    page_size: 10,
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
    fetch(`${api_base_url}/api/transactions/inputter`, {
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
  );
};

export default Transaction;
