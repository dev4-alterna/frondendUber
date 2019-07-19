import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import useForm from '../hooks/useForm';
import Input from '../components/input';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import isAuthenticate from '../utils/IsAuthenticated';
import {Link} from  'react-router-dom';

const CREATE_PRODUCTS = gql`
mutation addProducts($data:createProductsInput!){
  createProducts(data:$data){
    _id,
    name,
    description,
    price,
    profile_picture
  }
}
`

function Products({ history }) {

    const [profile_picture, setProfilePicture] = useState('');
    const [coverPreview, setCoverPreview] = useState('');

    const [sendProducts, { data, error }] = useMutation(CREATE_PRODUCTS);
    const handleCover = event => {
        const render = new FileReader();
        const file = event.target.files[0];
        render.onloadend = () => {
            setProfilePicture(file)
            setCoverPreview(render.result)
        }

        render.readAsDataURL(file);
    }

    const cathProducts = async (fields) => {
        delete fields.defaults;
        fields.price = Number.parseFloat(fields.price);        
        await sendProducts({ variables: { data: { ...fields, profile_picture } } });
        if(data) history.push(`/`)
        if (error) console.log(error)
    

    }

    const { inputs, handleInputChange, handleSubmit } = useForm(cathProducts);
    return (
<>
        <Navbar/>
        <Header/>
        <main className="container flotante">
            <section className="row">
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <form onSubmit={handleSubmit}>
                        <div class="modal-header modal-header-danger first">
                            <i class="fa fa-product-hunt" />Productos 
                            <Link className="nav-link" to="/"><i className="fa fa-times"/></Link>
                        </div>
                                       
                            <div>
                            <Input name="name"
                                label="Nombre"
                                placeholder="Ingrese el nombre"
                                type="text"
                                value={inputs.name}
                                onChange={handleInputChange}
                                required
                            />
                             <Input name="description"
                                label="Descripción"
                                placeholder="Ingrese la descripción"
                                type="text"
                                value={inputs.description}
                                onChange={handleInputChange}
                                required
                            />
                              <Input name="price"
                                label="Precio"
                                placeholder="Ingrese el precio"
                                type="text"
                                value={inputs.price}
                                onChange={handleInputChange}
                                required
                            />                     
                                    
                                    <img src={coverPreview} alt="Vista previa" />
                                    <Input name="profile_picture"
                                     label="Imagen Producto"
                                     type="file"
                                     placeholder="Seleccione la foto del producto"
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
//export default isAuthenticate(Create);
export default Products;
