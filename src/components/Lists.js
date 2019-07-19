import React from 'react';
import { Link } from 'react-router-dom'
function Lists({_id,title,Desc}){
 return(
    <div className="list">
    <Link to={`/addres_update/${_id}`}>
      <h2 className="Title">
       {title}
      </h2>
      <h3 className="Desc">
      {Desc}
      </h3>
    </Link>    
  </div>
 
 )

}

export default Lists;