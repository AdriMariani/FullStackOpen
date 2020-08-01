import React, { useState } from 'react'
import Phonebook from './components/Phonebook'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const handleInputChange = (event) => {
    event.target.name === 'name' ? 
      setNewName(event.target.value) : 
      setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const validateForm = () => {
    const pattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    let message = 'Error: \n'
    let isValid = true

    if(persons.some(person => person.name === newName)) {
      message += `${newName} is already added to phonebook.\n`
      isValid = false
    }
    if (!newNumber.match(pattern)) {
      message += `${newNumber} is not a valid phone number.`
      isValid = false
    }

    if (!isValid)
      alert(message)

    return isValid    
  }

  const addPerson = (event) => {
    event.preventDefault()
    if(validateForm()) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        filter shown with <input value={filter} onChange={handleFilterChange}></input>
      </form>
      <h3>Add New Entry</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input name="name" value={newName} onChange={handleInputChange}/>
        </div>
        <div>
          number: <input name="number" value={newNumber} onChange={handleInputChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filter === '' ?
          <Phonebook persons={persons}/> :
          <Phonebook 
            persons={persons.filter(person => {
              return person.name.toLowerCase().startsWith(filter.toLowerCase())
            })}
          /> 
        }
      </div>
    </div>
  )
}

export default App