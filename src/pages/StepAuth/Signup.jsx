import React,{useState,useEffect} from 'react'
import {clearerror, register} from '../../redux/actions/userAction';
import {useDispatch,useSelector} from 'react-redux';
import {useNavigate,Link} from 'react-router-dom'


const Signup = () => {
    const {loading,error,isAuthenticated}=useSelector((state)=>state.userReducer)
    const [signuperror,setSignupError]=useState('');
    const [signupDetails,setSignupDetails]=useState({email:'',password:'',storeName:'',confirmPassword:''})

    let signupInitialState={
        emailError:"",
        passwordError:"",
        storeNameError:"",
        confirmPasswordError:"",
    }

    const [authError,setAuthError]=useState(signupInitialState);
    const [displayError,setDisplayError]=useState(false)

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setSignupDetails((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const signupValidate=()=>{
        let emailError=""
        let passwordError=""
        let storeNameError=""
        let confirmPasswordError=""
   
        if(signupDetails.email.trim().length===0){
            emailError='Email is required'
        }
        if(signupDetails.storeName.trim().length===0){
            storeNameError='Store Name is required'
        }
        if(signupDetails.password.trim().length===0){
            passwordError='Please Enter Your Password'
        }
        if(signupDetails.confirmPassword.trim().length===0){
            confirmPasswordError='Please Enter Confirm Password'
        }
        if(emailError||passwordError || storeNameError || confirmPasswordError){
            setAuthError({emailError,passwordError,storeNameError,confirmPasswordError})
            return false
        }
        return true
    }

    const submit=()=>{
        
        if(signupValidate()){
                if(signupDetails.password.trim().length<8){
                    displayErrorFunction('Password length should be equal to 8')
                }else if(signupDetails.password!==signupDetails.confirmPassword){
                    displayErrorFunction('Confirm Password Not matched')
                }else if(!emailValidation()){
                    displayErrorFunction(`Invalid Email ${signupDetails.email}`)
                }else{
                    dispatch(register(signupDetails))
                    .then((res)=>{
                        console.log(res)
                        if(!res.success){
                            displayErrorFunction(res.message);
                        }
                    })
                }
        }else{
            displayErrorFunction('')
        }
    }

    const emailValidation = () => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!signupDetails.email || regex.test(signupDetails.email) === false){
            return false;
        }
        return true;
    }

    const displayErrorFunction=(message)=>{
        setDisplayError(true);
        setSignupError(message);
        setTimeout(()=>{
            setAuthError(signupInitialState);
            setSignupError("");
            setDisplayError(false)
        },2000)
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
                        className="col-12 col-md-9 col-lg-7 offset-lg-5 border-left-lg min-h-screen d-flex flex-column  position-relative">
                        <div className="py-lg-16 px-lg-20">
                            <div className="row">
                                <div className="col-lg-10 col-md-9 col-xl-6 mx-auto ms-xl-0">
                                    <div className="mt-2 mt-lg-2 mb-6 d-lg-block">
                                        <h1 className="ls-tight font-bolder h2">Create your account!</h1>
                                        <p>It's free and easy</p>
                                        {!displayError ? <></> : <span className='text-danger mt-2 '>{signuperror}</span>}
                                    </div>
                                        <div className="mb-5"><label className="form-label" htmlFor="username">Email</label> <input
                                                type="username" className="form-control" id="username" name="email" autoComplete="off" onChange={handleChange} />
                                                  <span className='text-danger small'>{authError.emailError}</span>
                                                </div>
                                            <div className="mb-5">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div><label className="form-label" htmlFor="storename">StoreName</label></div>
                                            </div><input type="text" className="form-control" id="storename" name="storeName" autoComplete="off" onChange={handleChange}
                                                    />
                                    <div className='text-danger small'>{authError.storeNameError}</div>

                                        </div>
                                        <div className="mb-5">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div><label className="form-label" htmlFor="password">Password</label></div>
                                            </div><input type="password" className="form-control" id="password" name="password" autoComplete="off" onChange={handleChange}
                                                    />
                                              <span className='text-danger small'>{authError.passwordError}</span>
                                        </div>
                                        <div className="mb-5">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div><label className="form-label" htmlFor="confirmpassword">Confirm Password</label></div>
                                            </div><input type="password" className="form-control" id="confirmpassword" name="confirmPassword" autoComplete="off" onChange={handleChange} />
                                            <span className='text-danger small'>{authError.confirmPasswordError}</span>
                                        </div>
                                        <div>
                                            <button onClick={submit} className="btn btn-primary w-full" >
                                                Register
                                            </button>
                                        </div>
                        <div className="mt-3 text-center"><small>Already have
                                an account?</small> <Link to="/login"
                                className="text-warning text-sm font-semibold">Sign in</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup