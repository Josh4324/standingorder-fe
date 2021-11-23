import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import { NotificationManager } from "react-notifications";
import { useIdleTimer } from "react-idle-timer";
import { api_base_url } from "../../../utils/constant";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const Entrust = () => {
  let history = useHistory();

  const handleOnIdle = (event) => {
    localStorage.removeItem("stand-order-token");
    history.push("/login");
    NotificationManager.success("User is Idle", "TimeOut");
  };

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 1,
    onIdle: handleOnIdle,
    debounce: 500,
  });

  const responseRef = useRef();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const entrustlogin = (evt) => {
    console.log(responseRef.current.value);
    evt.preventDefault();
    setError("");
    setLoader(true);
    fetch(`${api_base_url}/api/user/auth/securepass`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: localStorage.getItem("userId"),
        response: responseRef.current.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoader(false);
        if (data.responseCode === 200) {
          localStorage.setItem("stand-order-token", data.token);
          history.push("/");
        } else {
          setError("Authentication failed, please try again");
          history.push("/entrust/validation");
        }
      })
      .catch((error) => {
        setLoader(false);
        setError("Authentication failed, please try again");
      });
  };

  return (
    <div className="c-app bg c-default-layout flex-row align-items-center">
      <CContainer>
        <div
          style={{
            marginLeft: "auto",
            width: "150px",
            textAlign: "center",
            marginBottom: "20px",
            marginRight: "auto",
          }}
        >
          <img src={Logo} alt="Providus Bank" width="150px" />
        </div>
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={entrustlogin}>
                    <h3 className="py-3" style={{ color: "orange" }}>
                      Entrust Authentication
                    </h3>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        innerRef={responseRef}
                        placeholder="Response"
                        autoComplete="response"
                      />
                    </CInputGroup>
                    <CInputGroup
                      className={
                        error.length > 0 ? "alert alert-danger" : "none"
                      }
                    >
                      <div>{error}</div>
                    </CInputGroup>
                    <CInputGroup
                      className={loader === true ? "loader" : "none"}
                    >
                      <div>Loading...</div>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CButton
                        style={{
                          backgroundColor: "orange",
                          borderColor: "orange",
                        }}
                        type="submit"
                        color="primary"
                        className="px-4 w-100"
                      >
                        Submit
                      </CButton>
                    </CInputGroup>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Entrust;
