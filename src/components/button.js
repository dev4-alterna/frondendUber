import React from 'react';

function Button({className,value,onClick,type, name}){
    return(
        <div className="control-group">
            <div className="form-group floating-label-form-group controls">
              <button 
              type={type} 
              name={name}
              className={className}
              onClick={onClick}>
              {value}
              </button>           
             />
            </div>
          </div>
    );

}

export default Button;