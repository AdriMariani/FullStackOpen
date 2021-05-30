import React from 'react'
import { useSelector } from 'react-redux'
import './Notification.css'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification.message) {
    return null
  }

  return (
    <div className={notification.isError ? 'error' : 'success'}>
      {notification.message}
    </div>
  )
}

export default Notification