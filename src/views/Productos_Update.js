import React, {  useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from 'react-apollo-hooks';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import payload from '../utils/payload';
import Input from '../components/input';
import isAuthenticate from '../utils/IsAuthenticated';
import useForm from '../hooks/useForm';
import { Link } from 'react-router-dom';


const READ_PRODUCTOS = gql`
query Product($id:ID!) {
    singleProducts(id:$id) {
    _id,
    name,
    description,
    price
  }
}
`;
const UPDATE_PRODUCTS = gql`
mutation updateProducts($id:ID!,$data:updateProductsInput!){
    updateProducts(id:$id,data:$data){       
    name,
    description,
    price
    }
  }
`;

function Productos_Update({ history,match}) {

    const{id} = match.params;
    if (!payload().isAuthenticated) {
        alert("Hubo un error: No autentificado.")
    }

    const { data, loading } = useQuery(READ_PRODUCTOS, { variables: { id } })
    const [sendProducts, { error }] = useMutation(UPDATE_PRODUCTS);

    const catchRegistro = async (fields) => {       
        await sendProducts({ variables: { id: id, data: {name:fields.name,description:fields.description,price:parseFloat(fields.price)} } })

        if (error) {
            alert("Hubo un error.")
        }
        else {
            alert("Se actualizo correctamente.")
            history.push('/')
        }

    }

    const { inputs, handleInputChange, handleSubmit, setVariables } = useForm(catchRegistro)

    useEffect(() => {
        if (data) {
            setVariables(data.singleProducts)
        }

    }, [data])

    return (
        <>
            <Navbar />
            <Header />
            <main className="container flotante">
                <section className="row">
                    <div className="wrapper fadeInDown">
                        <div id="formContent">
                            <form onSubmit={handleSubmit}>
                                <div class="modal-header modal-header-danger first">
                                <i class="fa fa-product-hunt" />Productos 
                                 <Link className="nav-link" to="/"><i className="fa fa-times" /></Link>
                                </div>
                                <div className="col-lg-8 col-md-10 mx-auto">
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
                                </div>
                                <div id="formFooter">
                                    <input type="submit" className="fourth" value="Enviar" />
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default isAuthenticate(Productos_Update);