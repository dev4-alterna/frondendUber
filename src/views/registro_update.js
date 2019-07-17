import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useQuery} from 'react-apollo-hooks';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import payload from '../utils/payload';
import Input from '../components/input';


const READ_CUSTOMER=gql`
query Customers($id:ID!) {
    singleCustomer(id:$id) {
    _id,
    first_name,
    last_name,
    email,
    telephone,
    profile_picture
  }
}
`;

function Update_Registro(){
    if(!payload().isAuthenticated )
    {
        alert("Hubo un error: No autentificado")
    }

    const idcustom=payload().user._id;
    const {data,loading,error} = useQuery(READ_CUSTOMER,{variables:{id:idcustom}})
    console.log(data);

    return(
        <> 
        <Navbar/>
        <Header/>
        <main className="container">
            <section className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                   {
                       loading ? <h4>Loading...</h4>
                       :
                       <>
                       <Input name="first_name"
                       label="Nombres"
                       placeholder="Ingrese los nombres"
                       type="text"
                       value={data.singleCustomer.first_name}
                       onChange 
                       required
                       />
                       <Input name="last_name"
                       label="Apellidos"
                       placeholder="Ingrese los apellidos"
                       type="text"
                       value={data.singleCustomer.last_name}
                       onChange
                       required
                       />
                      </> 
                   }
                   
                </div>
            </section>
        </main>
       
        {/*Fragment <> </>*/}
        </>
    )
}

export default Update_Registro;