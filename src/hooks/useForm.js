import { useState } from 'react';

function useForm(callback,defaults={}){
    console.log(defaults)
    const [inputs, setInputs]= useState({defaults});
    const handleSubmit=(event)=>{
        if(event){
            event.preventDefault();

        }
        callback(inputs);
       
    }
    const handleInputChange=(event)=>{
        event.persist();
        const {name,value} =event.target
        setInputs(fields=>({...fields,[name]:value}));
    }

    const handleInputClick=(event)=>{
        event.persist();
        const {name,value} =event.target
        console.log(event.target)
        setInputs(fields=>({...fields,[name]:value}));
    }

    return {
        inputs,
        handleSubmit,
        handleInputChange,
        handleInputClick
    }
}

export default useForm;