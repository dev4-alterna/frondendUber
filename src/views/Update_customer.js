import React, {useState,useEffect} from 'react';
import gql from 'graphql-tag';
import {useQuery,useMutation} from 'react-apollo-hooks';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import payload from '../utils/payload';
import Input from '../components/input';
import isAuthenticate from '../utils/IsAuthenticated';
import useForm  from '../hooks/useForm';


const READ_CUSTOMER=gql`
query Customers($id:ID!) {
    singleCustomer(id:$id) {
    _id,
    first_name,
    last_name,
    email,
    telephone
  }
}
`;
const UPDATE_CUSTOMER=gql`
mutation updateCustomers($id:ID!,$data:updateCustomerInput!){
    updateCustomers(id:$id,data:$data){
      first_name,
      last_name,
      telephone
    }
  }
`;

function Update_Customer({history}){
    if(!payload().isAuthenticated )
    {
        alert("Hubo un error: No autentificado")
    }

    const idcustom=payload().user._id;
    const {data,loading} = useQuery(READ_CUSTOMER,{variables:{id:idcustom}})
    //console.log(data);

    const [user,setUser]=useState('');

    const [sendCustomer,{error}]=useMutation(UPDATE_CUSTOMER);
    

    const catchRegistro=async(fields)=>{
        delete fields.__typename
        delete fields._id
        await sendCustomer({variables:{id:idcustom,data:{...fields}}})

        if(error){
            alert("Hubo un error") 
        }
        else{
            localStorage.removeItem('UberToken')
            history.push('/login')
        } 
        
    }

    const {inputs,handleInputChange,handleSubmit,setVariables}=useForm(catchRegistro)

    useEffect(()=>{
        if(data)
        {
            setVariables(data.singleCustomer)
        }
       
    },[data])

    return(
        <> 
        <Navbar/>
        <Header/>
        <main className="container">
            <section className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <Input name="first_name"
                        label="Nombres"
                        placeholder="Ingrese los nombres"
                        type="text"
                        value={inputs.first_name}
                        onChange={handleInputChange}
                        required
                        />
                        <Input name="last_name"
                        label="Apellidos"
                        placeholder="Ingrese los apellidos"
                        type="text"
                        value={inputs.last_name}
                        onChange={handleInputChange}
                        required
                        />
                        <Input name="telephone"
                        label="Teléfono"
                        placeholder="Ingrese el teléfono"
                        type="text"
                        value={inputs.telephone}
                        onChange={handleInputChange}
                        required
                        />
                        <input type="submit" className="fadeIn fourth col-md-9" value="Enviar"/>
                    </form>
                </div>
            </section>
        </main>
        </>
    )
}

export default isAuthenticate(Update_Customer);