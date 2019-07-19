import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from 'react-apollo-hooks';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import {Link} from  'react-router-dom';
import Lists from '../components/Lists';
import Footer from '../components/Fooder';
import payload from '../utils/payload';
import isAuthenticate from '../utils/IsAuthenticated';

const READ_ADDRESS=gql`
query readAddress {
    listAddress{
        _id,
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


function ListAddress({history}){

    const {data,loading} = useQuery(READ_ADDRESS);

    return(
        <> 
        <Navbar/>
        <Header/>
        <main className="container flotante">
            <section className="row">
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <form >
							<div class="modal-header modal-header-danger first">
								<i class="fa fa-user-plus" />Direcciones
								<Link className="nav-link" to="/"><i className="fa fa-times"/></Link>
							</div>
							<div>
								{
									loading ? <h4>Loading...</h4>
									:data.listAddress.map(Address=>(
										<Lists _id={Address._id} 
										title={Address.street + 
												' No Ext ' + Address.outside_number +
												' No Int ' + Address.inside_number +
												' No Int ' + Address.crossing +
												' CP ' + Address.cp +
												' No Colonia ' + Address.colony} 
										Desc = {Address.reference} 
										key={Address._id}/>
									))
								}
							</div>						
                        </form>
                    </div>
                </div>
            </section>
        </main> 
        <Footer/>
        {/*Fragment <> </>*/}
        </>
    )

}

export default isAuthenticate(ListAddress);