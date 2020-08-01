import React from 'react'
import Person from './Person'

const Phonebook = ({ persons }) =>
    persons.map(person =>
        <Person key={person.name} person={person}/>
    )

export default Phonebook