import React, { useState, useEffect } from 'react'
import PersonService from './services/PersonsService'
import Phonebook from './components/Phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification] = useState(null)

  useEffect(() => {
    PersonService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    })
  }, [])

  const handleInputChange = (event) => {
    event.target.name === 'name' ? 
      setNewName(event.target.value) : 
      setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addNotification = (msg, isError) => {
    setNotification({ msg, isError })
    setTimeout(() => setNotification(null), 5000)
  }

  const deletePerson = person => {
    if(window.confirm(`Delete ${person.name} ?`)) {
      PersonService.deletePerson(person.id)
      .then( () => {
        setPersons(persons.filter(p => p.id !== person.id))
        addNotification(`Deleted ${person.name}`, false)
      })
      .catch(error => {
        setPersons(persons.filter(p => p.id !== person.id))
        addNotification(`${person.name} has already been deleted on the server`, true)
      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const foundPerson = persons.find(p => p.name === newName);

    if(foundPerson) {
      if(window.confirm(`${foundPerson.name} is already added to the phonebook, replace the old number with a new one?`)){
        PersonService.update(foundPerson.id, newPerson)
          .then( returnedPerson => {
            setPersons(persons.map(p => p.id !== foundPerson.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            addNotification(`Updated ${returnedPerson.name}'s number`,false)
          })
          .catch(err => addNotification(err.response.data.error, true))
      }
    }
    else {
      PersonService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          addNotification(`Added ${returnedPerson.name}`,false)
        })
        .catch(err => addNotification(err.response.data.error, true))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {
        notification !== null ? 
          <Notification message={notification.msg} isError={notification.isError}/> :
          ''
      }
      <Filter value={filter} handleChange={handleFilterChange}/>
      <h3>Add New Entry</h3>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        addPerson={addPerson} 
        handleChange={handleInputChange}
      />
      <h2>Numbers</h2>
      <div>
        {filter === '' ?
          <Phonebook persons={persons} deletePerson={deletePerson}/> :
          <Phonebook 
            persons={persons.filter(person => {
              return person.name.toLowerCase().startsWith(filter.toLowerCase())
            })}
            deletePerson={deletePerson}
          /> 
        }
      </div>
    </div>
  )
}

export default App