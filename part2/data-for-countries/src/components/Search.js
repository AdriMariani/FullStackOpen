import React from 'react';

const Search = ( { value, handleChange } ) => 
    <div>
      Find Countries: <input value={value} onChange={handleChange}/>
    </div>

export default Search