import React, { Component, useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './scss/style.scss';
import 'react-notifications/lib/notifications.css';


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Entrust = React.lazy(() => import('./views/pages/entrust/Entrust'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

function App () {

  
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/entrust/validation" name="Entrust Page" render={props => <Entrust {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
            </Switch>
            <NotificationContainer/>
          </React.Suspense>
      </HashRouter>
    );
}

export default App;
