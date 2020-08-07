import React from 'react'

const Person = ({ person, handleDelete }) => {
  return (
    <p>
      {`${person.name} ${person.number}\t`} 
      <button onClick={handleDelete}>Delete</button> 
    </p>
  )
}

export default Person