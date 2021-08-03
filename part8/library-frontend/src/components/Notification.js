import React from 'react'

const Notification = ({ notification }) => {
  if ( !notification ) {
    return null
  }
  return (
    <div style={{color: notification.isError ? 'red' : 'green' }}>
      {notification.message}
    </div>
  )
}

export default Notification