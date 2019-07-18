import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import isAuthenticated from './utils/IsAuthenticated';
import Home from './views/Home';
import Login from './views/login';
import Customer from './views/Customer';
import Provider from './views/Provider';
import Create from './views/Create';
import Update_Customer from './views/Update_customer';


function Lougout(){
  localStorage.removeItem('UberToken')
  return  <Redirect to="/login" />
}

const SecureLogout= isAuthenticated(Lougout);

function Routes() {
  return (
    <>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/customer" component={Customer}/>
      <Route exact path="/provider" component={Provider}/>
      <Route exact path="/logout" component={SecureLogout}/>
      <Route exact path="/create" component={Create}/>
      <Route exact path="/update_customer" component={Update_Customer}/>
    </>
    
  )
}

export default Routes;
