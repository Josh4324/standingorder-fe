import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index';
import { useHistory } from "react-router-dom";
import { NotificationManager} from 'react-notifications';
import { useIdleTimer } from 'react-idle-timer';

  

const TheLayout = () => {
  let history = useHistory();

  const handleOnIdle = event => {
    //console.log('user is idle',)
    //console.log('last active', getLastActiveTime())
      localStorage.removeItem("stand-order-token")
      history.push("/login");
      NotificationManager.success('User is Idle', 'TimeOut');
   
  }

  const handleOnActive = event => {
    //console.log('user is active', event)
    //console.log('time remaining', getRemainingTime())
   
  }

  const handleOnAction = (e) => {
    //console.log('user did something', e)
    
  }

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 5,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500
  })

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
