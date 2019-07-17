import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import isAuthenticated from './utils/IsAuthenticated';
import Home from './views/Home';
import Login from './views/login';
import Registro from './views/registro';
import Create from './views/Create';
import Update_Registro from './views/registro_update';


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
      <Route exact path="/registro" component={Registro}/>
      <Route exact path="/logout" component={SecureLogout}/>
      <Route exact path="/create" component={Create}/>
      <Route exact path="/update_registro" component={Update_Registro}/>
    </>
    
  )
}

export default Routes;
