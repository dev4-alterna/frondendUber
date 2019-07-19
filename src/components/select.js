import React from 'react';
import Select from 'react-select';



function App({name,options,defaultValue,onChange,selectedOption,placeholder}) {
 
    return (
      <Select
        name={name}
        value={selectedOption}
        onChange={onChange}
        options={options}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    );
  
}
export default App;

