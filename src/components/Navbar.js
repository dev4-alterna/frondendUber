import React from 'react';
import {Link} from  'react-router-dom';
import payload from '../utils/payload';

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const defaul_img ="http://res.cloudinary.com/dadgbbhge/image/upload/v1563296640/grxzopfp9yluz5sd6cdt.jpg";


function Navbar(){
 
return(

        <SideNav
        onSelect={(selected) => {
        
        }}
        >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="home">
                <NavIcon>
                  <Link className="nav-link" to="/"><i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /></Link>
                </NavIcon>
                <NavText>
                  <Link className="nav-link" to="/">Home</Link>
                </NavText>
            </NavItem>
           { payload().isAuthenticated ?
           (
            <> 
            <NavItem eventKey="bienvenido">
                <NavIcon>
                    <i style={{ fontSize: '1.75em' }} >
                    <img src={payload().user.profile_picture=="" ?defaul_img:payload().user.profile_picture} alt="preview" className="Perfil"/>
                    </i>
                </NavIcon>
                <NavText>
                <b>Bienvenido {payload().user.first_name} {payload().user.last_name} &nbsp;</b> 
                </NavText>
            </NavItem>
            {
                payload().user.typeUser=='P' ?(
                  <>
                    <NavItem eventKey="products">
                        <NavIcon>
                        <Link className="nav-link" to="/products"><i className="fa fa-product-hunt" style={{ fontSize: '1.75em' }} /></Link>
                        </NavIcon>
                        <NavText>
                        <Link className="nav-link" to="/products">Productos</Link>
                        </NavText>
                    </NavItem> 
                    <NavItem eventKey="configuration">
                        <NavIcon>
                            <i className="fa fa-cog" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>Configuración</NavText>
                        <NavItem eventKey="configuration/provider">
                            <NavText>
                                <Link className="nav-link" to="/update_provider">Información personal</Link>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="configuration/delete_provider">
                            <NavText>Eliminar cuenta</NavText>
                        </NavItem>
                    </NavItem>
                  </>
                ):(
                  <>
                  <NavItem eventKey="create">
                      <NavIcon>
                      <Link className="nav-link" to="/create"><i className="fa fa-cart-arrow-down" style={{ fontSize: '1.75em' }} /></Link>
                      </NavIcon>
                      <NavText>
                      <Link className="nav-link" to="/create">Pedido</Link>
                      </NavText>
                  </NavItem>
                  <NavItem eventKey="history">
                        <NavIcon>
                        <Link className="nav-link" to="/history"><i className="fa fa-tasks" style={{ fontSize: '1.75em' }} /></Link>
                        </NavIcon>
                        <NavText>
                        <Link className="nav-link" to="/history">Mis Compras</Link>
                        </NavText>
                    </NavItem> 

                    <NavItem eventKey="configuration">
                        <NavIcon>
                            <i className="fa fa-cog" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>Configuración</NavText>
                        <NavItem eventKey="configuration/update">
                            <NavText style={{ fontSize: '1em' }}>
                                <Link className="nav-link" to="/update_customer">Información personal</Link>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="configuration/delete_customer">
                            <NavText style={{ fontSize: '1em' }}>
                                <Link className="nav-link" to="/delete_customer">Eliminar cuenta</Link>
                            </NavText>
                        </NavItem>
                    </NavItem>
                    </>
                )
            }
            <NavItem eventKey="addres">
                      <NavIcon>
                      <Link className="nav-link" to="/addres"><i className="fa fa-street-view" style={{ fontSize: '1.75em' }} /></Link>
                      </NavIcon>
                      <NavText>
                      <Link className="nav-link" to="/addres">Direcciones</Link>
                      </NavText>
            </NavItem>

            <NavItem eventKey="logout">
                <NavIcon>
                <Link className="nav-link" to="/logout"><i className="fa fa-user-times" style={{ fontSize: '1.75em' }} /></Link>
                </NavIcon>
                <NavText>
                <Link className="nav-link" to="/logout">Cerrar Sessión</Link>
                </NavText>
            </NavItem>
            </>
           ):
           (
            <> 
            <NavItem eventKey="login">
                <NavIcon>
                <Link className="nav-link" to="/login"><i className="fa fa-user-circle-o" style={{ fontSize: '1.75em' }} /></Link>
                </NavIcon>
                <NavText>
                  <Link className="nav-link" to="/login">Login</Link>
                </NavText>
            </NavItem>
            <NavItem eventKey="registro">
                <NavIcon>
                    <i className="fa fa-user-plus" style={{ fontSize: '1.75em' }} />
                    
                </NavIcon>
                <NavText>
                  Registro
                </NavText>
                <NavItem eventKey="registro/customer">
                    <NavText>
                        <Link className="nav-link" to="/customer" >Cliente</Link>
                    </NavText>
                </NavItem>
                <NavItem eventKey="registro/provider">
                    <NavText>
                        <Link className="nav-link" to="/provider">Proveedor</Link>
                    </NavText>
                </NavItem>

            </NavItem>
            </>
           )
           }  
        </SideNav.Nav>
        </SideNav>
)

}

export default Navbar;