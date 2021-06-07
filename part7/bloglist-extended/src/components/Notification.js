import React from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification.message) {
    return null
  }

  return (
    <Alert variant={notification.isError ? 'danger' : 'success'}>
      {notification.message}
    </Alert>
  )
}

export default Notification