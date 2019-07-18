import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from 'react-apollo-hooks';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import PostPreview from '../components/PostPreview';
import Footer from '../components/Fooder';

const ALL_PRODUCT=gql`
    query allProduct{
        listProducts{
        _id,
        name,
        description,
        price
        }
    }
`


function Home(){
const {data,loading}= useQuery(ALL_PRODUCT);

return(
    <> 
    <Navbar/>
    <Header/>
    <main className="container">
        <section className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
               {
                   loading ? <h4>Loading...</h4>
                   :data.listProducts.map(Product=>(
                       <PostPreview _id={Product._id} title={Product.name} key={Product._id}/>
                   ))
               }
               
            </div>
        </section>
    </main>
    <Footer/>
    {/*Fragment <> </>*/}
    </>
)

}

export default Home;