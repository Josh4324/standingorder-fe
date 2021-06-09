import React, { lazy, useEffect, useState, useRef } from 'react'
import { useHistory } from "react-router-dom";
import Beneficiary from './Beneficiary';
import { NotificationManager} from 'react-notifications';
import "react-datepicker/dist/react-datepicker.css";
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
import CIcon from '@coreui/icons-react'


const StandingOrderForm = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [beneficiaryList, setBeneficiaryList] = useState([0]);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [accountname, setAccountname] = useState("");
  const [loader, setLoader] = useState(false);
  const [formloader, setFormLoader] = useState(false);
  const [accloader, setAccLoader] = useState(false);
  const [disableBen, setDisableBen] = useState(false);
  const [balance, setBalance] = useState("");
  
  let history = useHistory();
  
  let role = localStorage.getItem('role').split(",")
  let inputterCheck = role.includes("inputter");
  //let approverCheck = role.includes("approver");
  let approverCheck = false
  

  const accountNameRef = useRef();
  const accountNumberRef = useRef();
  let token

  if (localStorage.getItem("stand-order-token") !== null){
    token = localStorage.getItem('stand-order-token');
  }
  
  
  
  const onAdd = () => {
    const id = beneficiaryList.length
    setBeneficiaryList([...beneficiaryList, id])
  }

  const onRemove = (itemId) => {
    const newList = beneficiaryList.filter((item, index, array) => {
       return itemId !== index
     })

    const data2 = data.filter((item, index, array) => {
      return itemId !== index
    })
     setData([...data2]);
     setBeneficiaryList([...newList]);
  }

  const getBalance = (evt) => {
      fetch(`${api_base_url}/api/verify/balance`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          authorization: token
      },
        body: JSON.stringify({
          "AN":  accountNumberRef.current.value, 
          
        }),
      }).then(response => response.json())
      .then(data => {
        let amount = Number(data.balance) - 54.75
        setBalance(amount);
      })
      .catch((error) => {
      //setError("An error occurred");
      });
  }


  const removeOthers = (itemId) => {
    const newList = beneficiaryList.filter((item, index, array) => {
      return itemId === index
    })

   const data2 = data.filter((item, index, array) => {
     return itemId === index
   })
    setData([...data2]);
    setBeneficiaryList([...newList]);
    setDisableBen(true)
  }

  const setBen = () => {
    setDisableBen(false);
  }

  const checkInternal = () => {
    setError("");
    if (accountNumberRef.current.value.length >= 10 ) {
      setAccLoader(true);
      fetch(`${api_base_url}/api/verify/internal`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
           authorization: token
      },
        body: JSON.stringify({
          "accountNumber": accountNumberRef.current.value, 
          
        }),
      }).then(response => response.json())
      .then(data => {
        setAccLoader(false)
        if (JSON.stringify(data.accountName) === "{}"){
          setAccountname("");
          setError("INVALID ACCOUNT");
        }else {
          setAccountname(data.accountName.AccountName)
         
          if (Number(data.accountName.AccountProductCode) < 4 || Number(data.accountName.AccountProductCode) > 99){
            NotificationManager.error('This account is not eligible to create a standing order', 'Error');
            setTimeout(() => {
              history.push("/");
            }, 3000)
          }

          if (Number(data.accountName.CustomerID) < 20000){
            NotificationManager.error('This account is not eligible to create a standing order', 'Error');
            setTimeout(() => {
              history.push("/");
            }, 3000)
          }
        }
      })
      .catch((error) => {
      setError("An error occurred");
      });
    }
  }

  const submit = (evt) => {
    evt.preventDefault();
    setFormLoader(true);
    
   const owner = {
      accountName : accountNameRef.current.value,
      accountNumber: accountNumberRef.current.value
    }

    let datalist;

    if (data[0].move === "Yes"){
      datalist = [Object.assign(data[0], data[data.length  - 1])]
      datalist[0]["amount"] = balance
    }else{
      datalist = data
    }

   datalist.map((item) => {
     let narration = "From " + accountname + " | " + "Remarks - " + item.remark 
      fetch(`${api_base_url}/api/standorder`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          authorization: token
      },
        body: JSON.stringify({
            "accountNumber" :  accountNumberRef.current.value, 
            "accountName": accountNameRef.current.value,
            "beneficiary_bank" : item.bank,
            "beneficiary_account_number": item.accountNumber,
            "beneficiary_account_name" : item.accountName,
            "frequency": item.frequency, 
            "start_date": item.startDate, 
            "end_date": item.stopDate, 
            "amount": item.amount, 
            "remarks": narration,
            "userId": localStorage.getItem("userId")
        }),
      }).then(response => response.json())
      .then(data => {
        setFormLoader(false);
        setLoader(false)
        if (data.status === "Success"){
          NotificationManager.success('Standing Order created successfully', 'Success');
          if (approverCheck === false){
            history.push("/standingorder/pending")
          }else {
            history.push("/standingorder")
          }
          
        }else{
          setFormLoader(false)
          NotificationManager.error('Error creating standing order', 'Error');
        }
       
      })
      .catch((error) => {
        setFormLoader(false);
      NotificationManager.error('An error occured', 'Error');
      }); 
    })
    
  }

  const formRef = useRef();

  const handleChange = (evt, key,) => {
      let name = evt.target.name;
      let value = evt.target.value;
      if (Number(evt.target.dataset.key) === key){
          data[key] = {
            ...data[key],
            [name]: value
          }
        }
      setData([...data])
  }



  const handleName = (evt, key, value) => {
    if (Number(evt.target.dataset.key) === key){
      data[key] = {
        ...data[key],
        ["accountName"]: value
      }
    }
  setData([...data])
  }
 
  const reset = () => {
    formRef.current.reset();
  }
    

  return (
    <>
    <CForm innerRef={formRef} onSubmit={submit}>
      <CRow>
        <CCol xs="10" style={{marginLeft:"auto", marginRight:"auto"}}>
        <h3 className="py-3">STANDING ORDER FORM</h3>
          <CCard>
            <CCardHeader>
            <h5>REMITTER'S DETAILS</h5>
            </CCardHeader>
            <CCardBody>
            <CFormGroup>
                <CLabel htmlFor="account-name">ACCOUNT NUMBER</CLabel>
                <CInput id="account-number" onChange={checkInternal} innerRef={accountNumberRef} autoComplete required placeholder="Enter account number" />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="account-number">ACCOUNT NAME</CLabel>
                <CInput id="account-name" readOnly value={accountname} innerRef={accountNameRef} />
              </CFormGroup>
              <CInputGroup className={ accloader === true ? "loader" : "none"}>
                    <div >Loading...</div>
              </CInputGroup>
             
              <CInputGroup className={ error.length > 0 ? "alert alert-danger" : "none" }>
                      <div >{error}</div>
              </CInputGroup>
            </CCardBody>
          </CCard>

          
            <CCardHeader>
            <h5>BENEFICIARY'S DETAILS</h5>
            </CCardHeader>

            {
              beneficiaryList.map((id) => {
                return  <Beneficiary
                handleChange={handleChange}
                handleName = {handleName}
                checkInternal={checkInternal}
                removeOthers={removeOthers}
                key={id} 
                benNum={beneficiaryList.length} 
                id={id} 
                token={token}
                setBen={setBen}
                getBalance={getBalance}
                remove={onRemove} />
              })
            }
              <CInputGroup className={ formloader === true ? "loader" : "none"}>
                    <div >Loading...</div>
              </CInputGroup>
            
            <CCardFooter className="mb-3">
            <CButton onClick={onAdd} size="md" className="mr-3" disabled={disableBen} color="primary">Add Another Beneficiary</CButton>
              <CButton type="submit" size="md" className="mr-3" color="primary">Submit</CButton>
              <CButton type="reset" onClick={reset} size="md" color="danger">Reset</CButton>
            </CCardFooter>
         
        </CCol>
      </CRow>
      </CForm>
    </>
  )
}

export default StandingOrderForm
