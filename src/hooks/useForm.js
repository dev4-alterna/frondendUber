import { useState,useEffect } from 'react';

function useForm(callback){
    
    const [inputs, setInputs]= useState({});
   

    const handleSubmit=(event)=>{
        if(event){
            event.preventDefault();

        }
        callback(inputs);
       
    }

    const setVariables=(fields)=>{
       setInputs({...fields})
    }

    const handleInputChange=(event)=>{
        event.persist();
        const {name,value} =event.target
        setInputs(fields=>({...fields,[name]:value}));
    }

    const handleInputClick=(event)=>{
        event.persist();
        const {name,value} =event.target
        //console.log(event.target)
        setInputs(fields=>({...fields,[name]:value}));
    }

    return {
        inputs,
        handleSubmit,
        handleInputChange,
        handleInputClick,
        setVariables
    }
}

export default useForm;