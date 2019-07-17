import React from 'react';

function Input({placeholder,value,onChange,type, name,label,required,className}){
    return(
        <div className="control-group">
            <div className="form-group">
              <input 
              type={type}
              className={className} 
              placeholder={placeholder} 
              name={name}
              value={value}
              onChange={onChange}
              required={required}
             />
            </div>
          </div>
    );

}

export default Input;