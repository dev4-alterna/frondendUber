import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from 'react-apollo-hooks';
import isAuthenticate from '../utils/IsAuthenticated';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Fooder';

import { Link } from 'react-router-dom'
import payload from '../utils/payload';

const SALES=gql`
query allSales{
    listSales(status:Pedido){
      _id,
      customer{
        _id
      },
      address{
        _id,
        inside_number
      },
      sales_detail{
        _id,
        product{
          _id,
          name
        }
      },
      payment_method,
      status,
      commentary,
      totals,
      Subtotals,
      charge
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
                      loading ? <h4>Loading...</h4>
                      :data.listSales.map(sales=>(
                          console.log(sales)
                      ))
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