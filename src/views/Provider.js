import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useMutation} from 'react-apollo-hooks';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Input from '../components/input';
import useForm  from '../hooks/useForm';
import {Link} from  'react-router-dom';

const ADD_PROVIDER=gql`
mutation addProvider($data:createProvidersInput!){
    createProviders(data:$data){
      _id,
      first_name
    }
  }
`;

function Provider({history}){
    const [profile_picture,setProfilePicture]=useState('');
    const [ProfilePreview,setProfilePreview]=useState('');

    const [sendProvider,{data,error}]=useMutation(ADD_PROVIDER);

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
            await sendProvider({variables:{data:{...fields,profile_picture}}})
           
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
        <main className="container flotante">
            <section className="row">
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <form onSubmit={handleSubmit}>
                        <div class="modal-header modal-header-danger first">
                            <i class="fa fa-user-plus" />Proveedor 
                            <Link className="nav-link" to="/"><i className="fa fa-times"/></Link>
                        </div>
                                       
                            <div>
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
                                    
                                    <img src={ProfilePreview} alt="Vista previa" />
                                    <Input name="profile_picture"
                                     label="Foto de perfil"
                                     type="file"
                                     placeholder="Seleccione la foto del perfil"
                                     onChange={handleCover}
                                     required
                                    />
            
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
                            </div>
                            <div id="formFooter">
                                <input type="submit" className="fourth" value="Enviar"/>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </section>
        </main>
        </>
    )
}

export default Provider;