import React from 'react'
import Person from './Person'

const Phonebook = ({ persons, deletePerson }) =>
  persons.map(person =>
    <Person 
      key={person.id} 
      person={person} 
      handleDelete={() => deletePerson(person)}
    />
  )

export default Phonebook