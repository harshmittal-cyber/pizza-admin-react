import React from 'react'

const NotFound = () => {
return (
    <section className='vh-100 vw-100 bg-primary d-flex align-items-center justify-content-center text-center text-white'
    style={{height: "100vh", width: "100vw", overflow: "hidden"}}>
        <div className="container-fluid">
            <h1 className='ls-tight font-bolder display-6 text-white mt-4 mb-3'>404 Not Found</h1>
            <div className="w-56 h-56 bg-orange-500 rounded-circle position-fixed bottom-0 end-20 transform translate-y-1/3">
            </div>
        </div>
    </section>
)
}

export default NotFound