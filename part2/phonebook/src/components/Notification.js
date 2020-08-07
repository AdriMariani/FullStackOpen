import React from 'react';
import './Notification.css'

const Notification = ({ message, isError }) => {
  return (
    <div className={isError ? "error" : "success"}>
      {message}
    </div>
  )
}

export default Notification;