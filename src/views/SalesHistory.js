import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from 'react-apollo-hooks';
import isAuthenticate from '../utils/IsAuthenticated';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Fooder';
import Table from '../components/Table';
import { Link } from 'react-router-dom'
import payload from '../utils/payload';

const SALES=gql`
query allSales{
  listSales(status:Pedido){
    _id,
    address{
      _id,
      inside_number,
      crossing,
      cp,
      colony,
      reference,
      street
    },
    sales_detail{_id,amount,product{_id,name,description,profile_picture},quantity},
    payment_method,
    status,
    commentary,
    totals,
    Subtotals,
    charge,
    createdAt
  }
}
`

function SalesHistory(){
    const {data,loading}= useQuery(SALES);
    console.log(data)

    return(
      <>
        <Navbar/>
        <Header/>
        <main className="container home">
          <section className="row">
              <div class="container">
                <div class="row" id="ads"> 
                  {
                        <div class="span7">   
                          <div className="widget stacked widget-table action-table">
                            <div className="widget-header">
                              <i className="icon-th-list"></i>
                              <h3>Historial</h3>
                            </div>  
                            <div className="widget-content">
                              <table className="table table-striped table-bordered">
                                <thead>
                                  <tr>
                                      <th>Folio</th>
                                      <th>Fecha</th>
                                      <th>Subtotal</th>
                                      <th>Total</th>
                                      <th>Estatus</th>
                                      <th>Método Pago</th>
                                      <th>Comentario</th>
                                      <th>Dirección</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    payload().isAuthenticated ?
                                    (
                                      loading ? <h4>Loading...</h4>
                                      :data.listSales.map(Sale=>(
                                          <Table 
                                          _id={Sale._id} 
                                          totals={Sale.totals} 
                                          createdAt={Sale.createdAt}
                                          status={Sale.status} 
                                          payment_method={Sale.payment_method=='E'?'Efectivo':'Tarjeta'}
                                          commentary={Sale.commentary}
                                          Subtotals={Sale.Subtotals}
                                          sales_detail={Sale.sales_detail}
                                          address={"Calle "+Sale.address.street+ " Num "+Sale.address.inside_number+" " + Sale.address.crossing+" Col "+ Sale.address.colony}
                                          />
                                      ))
                                    ):
                                    ("")
                                  }
                                </tbody>
                              </table>
                            </div>   
                          </div>  
                        </div>
                      
                  }
                </div>  
              </div>
          </section>
        </main>
        <Footer/>
      </>
    )
   }
   
   export default isAuthenticate(SalesHistory);