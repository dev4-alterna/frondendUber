import React,{useState} from 'react';
import gql from 'graphql-tag';
import {useMutation} from 'react-apollo-hooks';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import isAuthenticate from '../utils/IsAuthenticated';
import payload from '../utils/payload';
import useForm  from '../hooks/useForm';
import Input from '../components/input';
import {Link} from  'react-router-dom';


const UPDATE=gql`
mutation updateCustomers($id:ID!,$data:updateCustomerInput!){
    updateCustomers(id:$id,data:$data){
        profile_picture
    }
  }
`


function Update_photo({history}){
    const [profile_picture,setProfilePicture]=useState('');
    const [ProfilePreview,setProfilePreview]=useState('');

    if(!payload().isAuthenticated )
    {
        alert("Hubo un error: No autentificado")
    }
    const handleCover=event=>{
        const render =new FileReader();
        const file =event.target.files[0];
        render.onloadend=()=>{
            setProfilePicture(file)
            setProfilePreview(render.result)
        }

        render.readAsDataURL(file);
    }

    const idcustom=payload().user._id;

    const [sendCustomer,{error}]=useMutation(UPDATE);

    const catchRegistro=async(fields)=>{
         
        await sendCustomer({variables:{id:idcustom,data:{profile_picture,profile_picture}}})

        if(error){
            alert("Hubo un error") 
        }
        else{
            alert("Se guardo correctamente.") 
            localStorage.removeItem('UberToken')
            history.push('/')
            
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
                                 <i class="fa fa-user-plus"></i> Cambiar imagen de perfil
                                 <Link className="nav-link" to="/"><i className="fa fa-times"/></Link>
                            </div>
                            <div className="col-lg-8 col-md-10 mx-auto">
                                    <img src={ProfilePreview} alt="Vista previa" />
                                    <Input name="profile_picture"
                                     label="Foto de perfil"
                                     type="file"
                                     placeholder="Seleccione la foto del perfil"
                                     onChange={handleCover}
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

export default isAuthenticate(Update_photo);