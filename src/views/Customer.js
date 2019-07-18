import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useMutation} from 'react-apollo-hooks';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Input from '../components/input';
import useForm  from '../hooks/useForm';

const ADD_CUSTOMER=gql`
mutation addCustomer($data:createCustomerInput!){
    createCustomers(data:$data){
      _id,
      first_name
    }
  }
`;

function Customer({history}){
    const [profile_picture,setProfilePicture]=useState('');
    const [ProfilePreview,setProfilePreview]=useState('');

    const [sendCustomer,{data,error}]=useMutation(ADD_CUSTOMER);

    const handleCover=event=>{
        const render =new FileReader();
        const file =event.target.files[0];
        render.onloadend=()=>{
            setProfilePicture(file)
            setProfilePreview(render.result)
        }

        render.readAsDataURL(file);
    }

    const catchRegistro=async(fields)=>{
        if(fields.password===fields.confirm_password){
            delete fields.confirm_password

            await sendCustomer({variables:{data:{...fields,profile_picture}}})
           
            error ? alert("Hubo un error") : history.push('/login')
        }
        else{
            alert('Los passwords no coinciden')
        }
    }

    const {inputs,handleInputChange,handleSubmit}=useForm(catchRegistro)
    return(
        <>
        <Navbar/>
        <Header/>
        <main className="container">
            <section className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                    <h3>Cliente</h3>
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
                         <div className="control-group">
                            <div className="form-group">
                                <div className="input-group">

                                <img src={ProfilePreview} alt="Vista previa" className="col-md-3 Perfil"/>
                                <Input name="profile_picture"
                                    label="Foto de perfil"
                                    type="file"
                                    placeholder="Seleccione la foto del perfil"
                                    onChange={handleCover}
                                    required
                                    />
                                </div>
                            </div>
                        </div>    
                            
         
                        <Input name="email"
                        label="Correo electrónico"
                        type="text"
                        placeholder="Ingrese el correo electrónico"
                        value={inputs.email}
                        onChange={handleInputChange}
                        required
                        />
                        <Input name="password"
                        label="Contraseña"
                        placeholder="Ingrese la contraseña"
                        type="password"
                        value={inputs.password}
                        onChange={handleInputChange}
                        required
                        />
                        <Input name="confirm_password"
                        label="Confirmación de contraseña"
                        placeholder="Ingrese la confirmación de la contraseña."
                        type="password"
                        value={inputs.confirm_password}
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

export default Customer;