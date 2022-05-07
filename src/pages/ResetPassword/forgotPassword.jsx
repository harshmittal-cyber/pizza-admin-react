import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {useNavigate,Link} from 'react-router-dom';
import {forgotpassword} from '../../redux/actions/userAction'
import Toaster from '../../utility/Toaster';


const ForgotPassword = () => {
    const {message,error,loading}=useSelector((state)=>state.userReducer);
    const dispatch=useDispatch()
    const [email,setEmail]=useState("");
    const [toaster,setToaster]=useState(false);
    const [forgoterror,setError]=useState(null)
  

    const handleChange=(e)=>{
        setEmail(e.target.value)
    }

    const emailValidation = () => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!email || regex.test(email) === false){
            setError("Invalid Email")
            return false;
        }
        return true;
    }

    const handleSubmit=()=>{
        if(emailValidation()){
           dispatch(forgotpassword(email)).then((res)=>{
                setEmail("");
                setToaster(true)
            })
        }else{
            displayErrorFunction(null)
        }
    }
  
    const displayErrorFunction=(message)=>{
        setTimeout(()=>{ setError(message)},3000)
    }

   
    return (
        <div>
            <div className="px-5 py-5 p-lg-0 min-h-screen bg-surface-secondary d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-center">
                    <div
                        className="col-lg-5 col-xl-4 p-12 p-xl-20 position-fixed start-0 top-0 h-screen overflow-y-hidden bg-primary d-none d-lg-flex flex-column">
                        {/* <a className="d-block" href="#"><img src="https://clever-dashboard.webpixels.work/img/logos/clever-light.svg" className="h-10" alt="..." /></a> */}
                        <div className="mt-32 mb-20">
                            <h1 className="ls-tight font-bolder display-6 text-white mb-5">Let’s Eat something amazing today.</h1>
                            <p className="text-white text-opacity-80">Maybe some text here will help me see it better. Oh God. Oke,
                                let’s do it then.</p>
                        </div>
                        <div
                            className="w-56 h-56 bg-orange-500 rounded-circle position-absolute bottom-0 end-20 transform translate-y-1/3">
                        </div>
                    </div>
                    <div
                        className="col-12 col-md-9 col-lg-7 offset-lg-5 border-left-lg min-h-screen d-flex flex-column justify-content-center position-relative">
                        <div className="py-lg-16 px-lg-20">
                            <div className="row">
                                <div className="col-lg-10 col-md-9 col-xl-6 mx-auto ms-xl-0">
                                    <div className="mt-15 mt-lg-5 mb-6 d-lg-block">
                                        <h1 className="ls-tight font-bolder h2">Forgot Password</h1>
                                        <span>{forgoterror!==null && <small className='text-danger'>{forgoterror}</small>}</span>  
                                    </div>
                                    <div className="mb-5">
                                        <label className="form-label" htmlFor="email">Email</label> 
                                        <input
                                            className="form-control" autoComplete="off" 
                                            type="text" name="email"
                                            value={email}
                                            onChange={handleChange}
                                        />
                                    </div>                                   
                                    <div>
                                        <button  className="btn btn-primary w-full" onClick={handleSubmit}>
                                            Send Email
                                        </button>
                                    </div>
                                    <div className="mt-3 text-center">
                                    <small>Have an account? </small> 
                                    <Link to="/login"
                                        className="text-warning text-sm font-semibold">
                                        Login
                                    </Link>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {toaster && message && <Toaster text={message} icon={'tick'} showIcon={true} />}
            {toaster && error && <Toaster text={error} icon={'x'} showIcon={true} />}
        </div>
    )
}

export default ForgotPassword