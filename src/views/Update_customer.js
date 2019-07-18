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
    telephone,
    profile_picture
  }
}
`;
const UPDATE_CUSTOMER=gql`
mutation updateCustomers($id:ID!,$data:updateCustomerInput!){
    updateCustomers(id:$id,data:$data){
      first_name,
      last_name,
      telephone,
      profile_picture
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

    const [profile_picture,setProfilePicture]=useState('');
    const [ProfilePreview,setProfilePreview]=useState('');
    const [user,setUser]=useState('');

    const [sendCustomer,{error}]=useMutation(UPDATE_CUSTOMER);
    

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
        await sendCustomer({variables:{id:idcustom,data:{...fields,profile_picture}}})
        error ? alert("Hubo un error") : history.push('/login')
        
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
                        
                        <input type="submit" className="fadeIn fourth col-md-9" value="Enviar"/>
                    </form>
                </div>
            </section>
        </main>
        </>
    )
}

export default isAuthenticate(Update_Customer);