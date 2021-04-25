import React from 'react'
import { connect } from 'react-redux'

const Notification = props => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <>
      { 
        props.notification === '' ? '' :
        <div style={style}>
          {props.notification}
        </div>
      }
    </>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification.message
  }
}

export default connect(mapStateToProps)(Notification)

// Code using useSelector hook
// import React from 'react'
// import { useSelector } from 'react-redux'

// const Notification = props => {
//   const notification = useSelector(state => state.notification.message)
//   const style = {
//     border: 'solid',
//     padding: 10,
//     borderWidth: 1
//   }
//   return (
//     <>
//       { 
//         notification === '' ? '' :
//         <div style={style}>
//           {notification}
//         </div>
//       }
//     </>
//   )
// }

// export default Notification