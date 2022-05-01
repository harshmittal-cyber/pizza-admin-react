import React from 'react'

const Modal = ({children, targetName}) => {
  return (
<div className="modal fade" id={targetName} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-md modal-fullscreen-sm-down">
    <div className="modal-content">
      <div className="modal-body">
        {children}
      </div>
    </div>
  </div>
</div>
  )
}

Modal.defaultProps = {
  targetName: "exampleModal"
} 

export default Modal