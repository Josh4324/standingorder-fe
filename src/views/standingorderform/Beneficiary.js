import React, { lazy, useEffect, useRef, useState } from 'react'
import { useHistory } from "react-router-dom";
import DatePicker from 'react-datepicker';
//import Moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import bankdata from "../../bank";
import {api_base_url} from '../../utils/constant';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch
} from '@coreui/react'



const Beneficiary = (props) => {
  const id = props.id
  const accountNameRef = useRef();
  const accountNumberRef = useRef();
  const bankRef = useRef();
  const [disableStand, setDisableStand] = useState(false);
  const [accloader, setAccLoader] = useState(false);

   const checkExternal = (evt, id) => {
     
    setError("");
    setSucess("");
    fetch(`${api_base_url}/api/verify/external`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          authorization: props.token
      },
        body: JSON.stringify({
          "DBC":bankRef.current.value, 
          "AN": accountNumberRef.current.value, 
          "SAC": accountNumberRef.current.value
          
        }),
      }).then(response => response.json())
      .then(data => {
        setAccLoader(false)
        if (data.accountName === ""){
          setError("INVALID ACCOUNT");
          setAccountname("");
        }else {
          setAccountname(data.accountName)
        }
        if (evt.target){
          props.handleName(evt,id,data.accountName)
        }
      })
      .catch((error) => {
      setError("An error occurred");
      });
  }
  const checkInternal = (evt, id) => {
    setAccLoader(true);
    setError("");
      fetch(`${api_base_url}/api/verify/internal`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          authorization: props.token
      },
        body: JSON.stringify({
          "accountNumber": accountNumberRef.current.value, 
          
        }),
      }).then(response => response.json())
      .then(data => {
        setAccLoader(false)
        if (data.accountName === "INVALID ACCOUNT"){
          setError("INVALID ACCOUNT");
          setAccountname("");
        }else {
          setAccountname(data.accountName);
        }
        if (evt.target){
          props.handleName(evt,id,data.accountName)
        }
      })
      .catch((error) => {
      setError("An error occurred");
      });
  }


  const checkAcc = (evt, id) => {
    if (accountNumberRef.current.value.length >= 10){
      setAccLoader(true);
      if (bankRef.current.value === '000023'){
        checkInternal(evt, id)
      }else {
        checkExternal(evt, id);
      }
    } 
  }


  const [showElements, setShowElements] = React.useState(true);
  const [startDate, setStartDate] = React.useState(new Date());
  const [error, setError] = useState("");
  const [success, setSucess] = useState("");
  const [accountname, setAccountname] = useState("");
  
  


  const CustomInput = ({ value, onClick }) => (
    <button className="example-custom-input" onClick={onClick}>
      {value}
    </button>
    );


  return (
    <>

            <CCard>
  
            <CCardBody>
            <CFormGroup>
                  <CLabel htmlFor="select">BANK</CLabel>
                    <CSelect innerRef={bankRef} name="frequency" required onChange={(evt) => props.handleChange(evt, props.id) } data-key={props.id} name="bank" id="select">
                      <option value="0">Please select</option>
                      {
                        Object.entries(bankdata).map((item) => {
                          return <option value={item[0]}>{item[1]}</option>
                        })
                      }
                    </CSelect>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="account-number">ACCOUNT NUMBER</CLabel>
                <CInput id="account-number" required innerRef={accountNumberRef} 
                onChange={(evt) => {
                  props.handleChange(evt,props.id);
                  checkAcc(evt, id);
                } } 
                data-key={props.id} name="accountNumber"  placeholder="Enter account number" />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="account-name">ACCOUNT NAME</CLabel>
                <CInput readOnly id="account-name" value={accountname}
                 
                innerRef={accountNameRef}  data-key={props.id} name="accountName"  />
              </CFormGroup>
              <CInputGroup className={ accloader === true ? "loader" : "none"}>
                    <div >Loading...</div>
              </CInputGroup>
              <CInputGroup className={ error.length > 0 ? "alert alert-danger" : "none" }>
                      <div >{error}</div>
              </CInputGroup>
            </CCardBody>

          </CCard>

          <CCard className="my-3">
            <CCardBody>
            <CFormGroup>
              <CLabel htmlFor="standing">Do you want to move all the money from your account to this beneficiary account?</CLabel>
              <div>
                <input type="radio" id="yes" onChange={
                        (evt) => {
                          props.handleChange(evt, props.id);
                          props.getBalance(evt);
                          props.removeOthers(props.id);
                          setDisableStand(true);
                        }} name="move" value="Yes" data-key={props.id} />
                <label className="px-2" for="yes">Yes</label>
                <input type="radio" id="no" onChange={
                        (evt) => {
                          setDisableStand(false);
                          props.handleChange(evt, props.id);
                          props.setBen();
                        }} name="move" value="No" data-key={props.id}/>
                <label className="px-2" for="no">No</label>
              </div>
              
            </CFormGroup>


           



              
           
              <CFormGroup>
                <CLabel htmlFor="standing">STANDING ORDER AMOUNT</CLabel>
                <CInput id="standing" type="number" disabled={disableStand} required onChange={(evt) => props.handleChange(evt, props.id)} name="amount" data-key={props.id}  placeholder="Enter standing order amount" />
              </CFormGroup>
              <CFormGroup>
                  <CLabel htmlFor="select">FREQUENCY OF PAYMENT</CLabel>
                    <CSelect innerRef={props.frequencyRef} required name="frequency" onChange={(evt) => props.handleChange(evt, props.id)} data-key={props.id}  name="frequency" id="select">
                      <option value="0">Please select</option>
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Quartely">Quartely</option>
                    </CSelect>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="remark" >REMARKS</CLabel>
                <CInput id="remark" name="remark" data-key={props.id} onChange={(evt) => props.handleChange(evt, props.id)}  placeholder="Enter remarks" />
              </CFormGroup>
              
               <CFormGroup>
                <CLabel htmlFor="start-date">START DATE</CLabel>
                <CInput id="start-date" required name="startDate" type="date"  onChange={(evt) => props.handleChange(evt, props.id)} data-key={props.id}   />
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="start-date">STOP DATE</CLabel>
                <CInput id="stop-date" required name="stopDate" type="date"  onChange={(evt) => props.handleChange(evt, props.id)} data-key={props.id}   />
              </CFormGroup>
              
               
              
            </CCardBody>
            <CCardFooter>
                {
                    props.benNum === 1 ? "" :  <CButton onClick={() => props.remove(props.id)} size="md" className="mr-3" color="danger">Remove Beneficiary</CButton>
                }
           
            </CCardFooter>
          </CCard>
    </>
  )
}

export default Beneficiary
