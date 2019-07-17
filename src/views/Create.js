import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useMutation} from 'react-apollo-hooks';
import useForm from '../hooks/useForm';
import Input from '../components/input';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import isAuthenticate from '../utils/IsAuthenticated';

const CREATE_POST=gql`
mutation addPost($data:createPostAuthor!){
    createPost(data:$data){
      _id,
      title
    }
  }
`

function Create({history}){

    const [cover_photo,setCoverPhoto]=useState('');
    const [coverPreview,setCoverPreview]=useState('');

    const [sendPost,{data,error}]=useMutation(CREATE_POST);
    const handleCover=event=>{
        const render =new FileReader();
        const file =event.target.files[0];
        render.onloadend=()=>{
            setCoverPhoto(file)
            setCoverPreview(render.result)
        }

        render.readAsDataURL(file);
    }

    const catchPost=async(fields)=>{
        await sendPost({variables:{data:{...fields,cover_photo}}})
        if(data) history.push(`/post/${data.createPost._id}`)
        if(error) console.log(error)

    }

    const {inputs,handleInputChange,handleSubmit}=useForm(catchPost);
    return(
        <>
        <Navbar/>
        <Header/>
            <main className="container" >
                <section className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <Input name="title"
                            label="Title"
                            type="text"
                            placeholder="Title"
                            onChange={handleInputChange}
                            />
                            <div className="control-group">
                                <div className="form-group floating-label-form-group controls">
                                    <textarea name="content"
                                    onChange={handleInputChange}
                                    placeholder="Content"
                                    value={inputs.content}
                                    cols="60"
                                    rows="10"/>

                                    <Input name="cover_photo"
                                    label="Cover Photo"
                                    type="file"
                                    placeholder="Cover photo"
                                    onChange={handleCover}
                                    required
                                    />

                                    <img src={coverPreview} alt="preview" className="d-block w-50"/>
                                    <button type="submit" className="btn btn-primary">Send</button>
                                </div>
                            </div>

                        </form>

                    </div>

                </section>
            </main>
        </>
    )

}

export default isAuthenticate(Create);