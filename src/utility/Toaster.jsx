import React, {useState} from 'react'

const Toaster = ({text, showIcon, icon, timeout}) => {

  const [showToaster, setShowToaster] = useState(true)

  setTimeout(() => {
    setShowToaster(false)
  }, timeout * 1000);

    return (
      <div className={showToaster ? 'position-fixed d-block' : 'position-fixed d-none'} style={{top: "20px", right: "20px", zIndex:"1000"}}>
        <div className="bg-dark rounded text-white p-4 shadow d-flex align-items-center" >
          {showIcon ? 
          icon === "tick" ? <i className='bi bi-check text-success d-flex' style={{fontSize:"2rem"}}></i> :
          <i className='bi bi-x text-danger d-flex' style={{fontSize:"2rem"}}></i>  
          :
          <></>
        }
            <p style={{maxWidth:"800px"}}>{text}</p>
        </div>
      </div>
  )
}

Toaster.defaultProps = {
  text: "Lorem ipsum dolor sit amet.",
  showIcon: true,
  icon:"tick",
  timeout: 3
}

export default Toaster