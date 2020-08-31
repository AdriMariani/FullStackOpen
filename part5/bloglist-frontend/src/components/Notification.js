import React from 'react';
import './Notification.css'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <div className={notification.isError ? "error" : "success"}>
      {notification.msg}
    </div>
  )
}

export default Notification;