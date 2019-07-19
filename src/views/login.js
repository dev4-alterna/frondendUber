import React from 'react';
import gql from 'graphql-tag';
import {useMutation} from 'react-apollo-hooks';
import Select from 'react-select'
import {Link} from  'react-router-dom';
import useForm from '../hooks/useForm';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Input from '../components/input';
import logo from '../image/uber-eats.jpg';

const LOGIN=gql`
mutation LOGIN($email:String!,$password:String!){
    login(email:$email,password:$password,typeUser:C){
        token
    }
}
`

const options = [
    { value: 'C', label: 'Cliente'},
    { value: 'P', label: 'Proveedor' }
  ]
  

function Login({history}){
    const [sendLogin]=useMutation(LOGIN);

    const submitLogin =async(fields)=>{
        //console.log(fields) 
        const mutation=await sendLogin({variables:{...fields}})
        if(mutation){
            const {login}=mutation.data;
            localStorage.setItem('UberToken',login.token);
            history.push('/');
        }else
        {
            alert("Hubo un error")
        }
    }
 
    
    const {inputs,handleInputChange,handleSubmit,handleInputClick,handleSelect}=useForm(submitLogin)
    return(
        <>
        <Navbar/>
        <Header/>
        <main className="container flotante">
            <section className="row">
            <div className="wrapper fadeInDown">
                <div id="LoginContent">
                    <form onSubmit={handleSubmit}>   
                        <div className="fadeIn first">
                            <Link className="nav-link" to="/"><i className="fa fa-times"/></Link>
                        </div>
                        <div>     
                            <img src={logo} id="icon" alt="User Icon" />         
                            <Input name="email"
                                    label="email"
                                    type="text"
                                    placeholder="Email"
                                    value={inputs.email}
                                    className="form-control"
                                    onChange={handleInputChange}
                                    required
                            />
                            <Input name="password"
                                    label="Password"
                                    placeholder="Password"
                                    className="form-control"
                                    type="password"
                                    value={inputs.password}
                                    onChange={handleInputChange}
                                    required
                            />     
                            <Select options={options}  
                                name="typeUser" 
                                value={inputs.typeUser}
                                onChange={handleSelect}
                                placeholder="Selecciona un tipo de usuario" 
                                className=""
                                defaultValue={{ label: "Cliente", value: "C" }}
                            />
                        </div>     
                        <div id="formFooter">
                            <input type="submit" className="fourth" value="Login"/>
                        </div>
                    </form>
                </div>
            </div>
            </section>
        </main>
        </>
    )
}

export default Login;