import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
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

const Login = () => {
  let history = useHistory();

  const emailRef = useRef();
  const passRef = useRef();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const login = (evt) => {
    evt.preventDefault();
    setError("");
    setLoader(true);
    fetch(`${api_base_url}/api/user/auth/login`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: emailRef.current.value,
        password: passRef.current.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data.responseCode === "00") {
          localStorage.setItem("userId", data.data.userId);
          localStorage.setItem("role", data.data.roleaccess);
          history.push("/entrust/validation");
        } else {
          setError("Email and Password Incorrect");
          history.push("/login");
        }
      })
      .catch((error) => {
        setLoader(false);
        setError("Email and Password Incorrect");
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
                  <CForm onSubmit={login}>
                    <h1 style={{ color: "orange" }}>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        innerRef={emailRef}
                        placeholder="User Id"
                        autoComplete="email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        innerRef={passRef}
                        placeholder="Password"
                        autoComplete="current-password"
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
                        Login
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

export default Login;
