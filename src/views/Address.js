import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useMutation} from 'react-apollo-hooks';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Input from '../components/input';
import useForm  from '../hooks/useForm';
import {Link} from  'react-router-dom';



const ADD_ADDRESS=gql`
mutation AddAddress($data:createAddressinput!){
    createAddress(data:$data){
        street,
        inside_number,
        outside_number,
        crossing,
        cp,
        colony,
        reference,
        latitude,
        longitude
    }
  }
`;




function AddressRegister({history}){
   
    const [sendAddress,{data,error}]=useMutation(ADD_ADDRESS);
    

    const catchRegistro=async(fields)=>{
        await sendAddress({variables:{data:{...fields}}})         
    }

    const {inputs,handleInputChange,handleSubmit}=useForm(catchRegistro)
    return(
        <>
        <Navbar/>
        <Header/>
        <main className="container flotante">
            <section className="row">
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                    <form onSubmit={handleSubmit}>

                        <div className="modal-header modal-header-danger first">
                            <i className="fa fa-user-plus" />Direcciones 
                            <Link className="nav-link" to="/">
                                <i className="fa fa-times"/>
                            </Link>
                        </div>                                       
                        <div>

                        <Input name="street"
                        label="Calle"
                        placeholder="Ingrese la calle"
                        type="text"
                        value={inputs.street}
                        onChange={handleInputChange}
                        required
                        />
                        <Input name="inside_number"
                        label="Número Interior"
                        placeholder="Ingrese el número interior"
                        type="text"
                        value={inputs.inside_number}
                        onChange={handleInputChange}
                        required
                        />
                        <Input name="outside_number"
                        label="Número Exterior"
                        placeholder="Ingrese el número exterior"
                        type="text"
                        value={inputs.outside_number}
                        onChange={handleInputChange}
                        required
                        />
                         
                        <Input name="crossing"
                        label="Cruzamientos"
                        type="text"
                        placeholder="Ingrese los cruzamientos"
                        value={inputs.crossing}
                        onChange={handleInputChange}
                        required
                        />
                       
                        <Input name="cp"
                        label="CP"
                        placeholder="Ingrese el Código Postal"
                        type="text"
                        value={inputs.cp}
                        onChange={handleInputChange}
                        required
                        />

                        <Input name="colony"
                        label="Colonia"
                        placeholder="Ingrese la Colonia"
                        type="text"
                        value={inputs.colony}
                        onChange={handleInputChange}
                        required
                        />
                        <Input name="reference"
                        label="Referencias"
                        placeholder="Ingrese algúna referencia"
                        type="text"
                        value={inputs.reference}
                        onChange={handleInputChange}
                        required
                        />
                        <input type="submit" className="fadeIn fourth col-md-9" value="Enviar"/>

                        </div>
                        

                    </form>
                </div>
                </div>
            </section>
        </main>
        </>
    )
}

export default AddressRegister;