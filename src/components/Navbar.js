import React from 'react';
import {Link} from  'react-router-dom';
import payload from '../utils/payload';

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const defaul_img ="http://res.cloudinary.com/dadgbbhge/image/upload/v1563296640/grxzopfp9yluz5sd6cdt.jpg";


function Navbar(){
    const headerStyles = {
        fontSize: 16,
       
        height: '1200px' 
      };
return(
<div style={{ width: 250 }}>
        <SideNav >
        <SideNav.Toggle  />
        <SideNav.Nav  >
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
                        <Link className="nav-link" to="/update_photo">
                            <i style={{ fontSize: '1.75em' }} >
                            <img src={payload().user.profile_picture=="" ?defaul_img:payload().user.profile_picture} alt="preview" className="Perfil"/>
                            </i>
                        </Link>
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
                                <Link className="nav-link" to="/products_add"><i className="fa fa-product-hunt" style={{ fontSize: '1.75em' }} /></Link>
                                </NavIcon>
                                <NavText>Productos</NavText>
                                <NavItem eventKey="products/add">
                                    <NavText>
                                        <Link className="nav-link" to="/products_add">Agrear Productos </Link>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="products/upd">
                                    <NavText>
                                        <Link className="nav-link" to="/products_upd">Modificar Productos</Link>
                                    </NavText>
                                </NavItem>
                            </NavItem> 
                            <NavItem eventKey="configuration" >
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
                                <Link className="nav-link" to="/sales">Pedido</Link>
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
                            <NavItem eventKey="configuration" >
                                <NavIcon>
                                    <i className="fa fa-cog" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>Configuración</NavText>
                                <NavItem eventKey="configuration/update">
                                    <NavText style={{ fontSize: '1em' }}>
                                        <Link className="nav-link" to="/update_customer">Información personal</Link>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="configuration/delete_customer" >
                                    <NavText style={{ fontSize: '1em' }}>
                                        <Link className="nav-link" to="/delete_customer">Eliminar cuenta</Link>
                                    </NavText>
                                </NavItem>
                            </NavItem>
                        </>
                        )
                    }
                <NavItem eventKey="address">
                      <NavIcon>
                            <i className="fa fa-street-view" style={{ fontSize: '1.75em' }} />
                      </NavIcon>
                      <NavText>
                       Direcciones 
                      </NavText>
                      <NavItem eventKey="">
                            <NavText style={{ fontSize: '1em' }}>
                                <Link className="nav-link" to="/Address">Alta de direcciones</Link>
                            </NavText>
                       </NavItem>
                       <NavItem eventKey="">
                            <NavText style={{ fontSize: '1em' }}>
                                <Link className="nav-link" to="/listAddress">Lista de direcciones</Link>
                            </NavText>
                       </NavItem>
                      
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
                <NavItem eventKey="registros">
                <NavIcon>
                    <i className="fa fa-user-plus" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                <Link className="nav-link">Registro</Link>
                </NavText>
                <NavItem eventKey="">
                    <NavText>
                        <Link className="nav-link" to="/customer" >Cliente</Link>
                    </NavText>
                </NavItem>
                <NavItem eventKey="">
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
        </div>
)

}

export default Navbar;