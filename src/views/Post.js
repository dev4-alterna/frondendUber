import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from 'react-apollo-hooks';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

const SINGLEPOST=gql`
    query singlePost($id:ID!){
        singlePost(id:$id){
            title,
            content,
            cover_photo
        }
    }
`;

function Post({match}){
    const {id}= match.params;
    const {data,loading,error} = useQuery(SINGLEPOST,{variables:{id}})


return(
    <>
        {
             loading ? <h4>Cargando...</h4>:
             error?  <h4>Hubo un error</h4>:
             (
                <>
                <Navbar/>
                <Header  cover={data.singlePost.cover_photo}/>
                <article>
                    <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                        {
                                    <>
                                        <h2>{data.singlePost.title}</h2>
                                        <p>{data.singlePost.content}</p>
                                    </>
                        }
                        </div>
                    </div>
                    </div>
                </article>

                </>
             )
        }
    </>
)

}



export default Post;