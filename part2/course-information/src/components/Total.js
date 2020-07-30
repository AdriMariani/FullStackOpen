import React from 'react'

const Total = ({ parts }) => {
    const total = parts.reduce( (total, part) => total + part.exercises, 0 )
    return <strong>Number of exercises {total}</strong>
}

export default Total