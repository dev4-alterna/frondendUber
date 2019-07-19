import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from 'react-apollo-hooks';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import ProductPreview from '../components/ProductPreview';
import Footer from '../components/Fooder';

const ALL_PRODUCT=gql`
    query allProduct{
        listProducts{
        _id,
        name,
        description,
        price,
        profile_picture
        }
    }
`


function Home(){
const {data,loading}= useQuery(ALL_PRODUCT);
//console.log(data)
return(
    <> 
    <Navbar/>
    <Header/>
    <main className="container home">
        <section className="row">
            <div class="container">
	            <div class="row" id="ads">
               {
                   loading ? <h4>Loading...</h4>
                   :data.listProducts.map(Product=>(
                       <ProductPreview 
                       _id={Product._id} 
                       name={Product.name} 
                       description={Product.description}
                       key={Product._id} 
                       profile_picture={Product.profile_picture}
                       price={Product.price}/>
                   ))
               }
                </div>  
            </div>
        </section>
    </main>
    <Footer/>
    {/*Fragment <> </>*/}
    </>
)

}

export default Home;