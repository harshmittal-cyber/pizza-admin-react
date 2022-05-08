import React,{useState,useEffect} from 'react'
import {login} from '../../redux/actions/userAction';
import {useDispatch,useSelector} from 'react-redux';
import {clearerror} from '../../redux/actions/userAction';
import {useNavigate,Link} from 'react-router-dom'


const Login = () => {
    const {loading,error,isAuthenticated}=useSelector((state)=>state.userReducer)
    const [loginDetails,setLoginDetails]=useState({email:'',password:''})
    const [loginerror,setLoginError]=useState("");
    const [errorMessage,setErrorMessage]=useState("")
    let loginInitialState={
        emailError:"",
        passwordError:"",
    }
    const [authError,setAuthError]=useState(loginInitialState);
    const [displayError,setDisplayError]=useState(false)
    const dispatch=useDispatch();
    const navigate=useNavigate()

    const handleChange=(e)=>{
        setLoginDetails((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const loginValidate=()=>{
        let emailError=""
        let passwordError=""
        if(loginDetails.email.trim().length===0){
            emailError="Email is required"
        }
        if(loginDetails.password.trim().length===0){
            passwordError="Password is required"
        }
        if(emailError||passwordError){
            setAuthError({emailError,passwordError})
            return false
        }
        return true
    }

    const handleSubmit=()=>{
        if(loginValidate()){
            if(!emailValidation()){
                displayErrorFunction(`Invalid Email ${loginDetails.email}`)
            }else {
                dispatch(login(loginDetails))
                .then((res)=>{
                    if(!res.success){
                        displayErrorFunction(res.message);
                    }
                })
            }
        }else{
            displayErrorFunction("")
        }
    }

    const emailValidation = () => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!loginDetails.email || regex.test(loginDetails.email) === false){
            return false;
        }
        return true;
    }

    const displayErrorFunction=(message)=>{
        setErrorMessage(message);
        setDisplayError(true)
        setTimeout(()=>{
            setAuthError(loginInitialState);
            setErrorMessage("");
            setDisplayError(false)
        },3000)
    }

    useEffect(()=>{
        if(isAuthenticated){
            navigate('/')
        }
    },[isAuthenticated])

    return (
        <div>
        <div className="px-5 py-5 p-lg-0 min-h-screen bg-surface-secondary d-flex flex-column justify-content-center">
            <div className="d-flex justify-content-center">
                <div
                    className="col-lg-5 col-xl-4 p-12 p-xl-20 position-fixed start-0 top-0 h-screen overflow-y-hidden bg-primary d-none d-lg-flex flex-column">
                    <div className="mt-32 mb-20">
                        <h1 className="ls-tight font-bolder display-6 text-white mb-5">Let’s Eat something amazing today.</h1>
                        <p className="text-white text-opacity-80">
                            Maybe some text here will help me see it better. Oh God. Oke,let’s do it then.
                        </p>
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
                                    <h1 className="ls-tight font-bolder h2">Nice to see you!</h1>
                                    {!displayError ? <></> : <span className='text-danger mt-2'>{errorMessage}</span>}
                                </div>
                                <div className="mb-5">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <input
                                        className="form-control" autoComplete="off" 
                                        type="text" name="email" onChange={handleChange} 
                                    />
                                    <span className='text-danger'>{authError.emailError}</span>
                                </div>
                                    <div className="mb-5">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <label className="form-label" htmlFor="password">Password</label>
                                            </div>
                                            <div className="mb-2">
                                                <Link to={`/forgotpassword`}
                                                    className="text-sm text-muted text-primary-hover text-underline">Forgot
                                                    password?
                                                </Link>
                                            </div>
                                        </div>
                                        <input className="form-control" type="password"
                                            name="password" onChange={handleChange} 
                                        />
                                        <span className='text-danger'>{authError.passwordError}</span>
                                    </div>
                                    {/* <div><span className='text-danger'>{error}</span></div> */}
                                   
                                    <div>
                                        <button onClick={handleSubmit} className="btn btn-primary w-full">
                                            Sign in
                                        </button>
                                    </div>
                                <div className="mt-3 text-center">
                                    <small>Don't havean account?</small> 
                                    <Link to="/signup"
                                        className="text-warning text-sm font-semibold">
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Login