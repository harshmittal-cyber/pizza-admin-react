import React,{useState,useEffect} from 'react'
import {clearerror, register} from '../../redux/actions/userAction';
import {useDispatch,useSelector} from 'react-redux';
import {useNavigate,Link} from 'react-router-dom'


const Signup = () => {
    const {loading,error,isAuthenticated}=useSelector((state)=>state.userReducer)

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [storeName,setStoreName]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [signuperror,setSignupError]=useState()

    const dispatch=useDispatch();
    const navigate=useNavigate()

    const submit=()=>{
        if(password.length<8){
            setSignupError('Password length should be equal to 8')
        }else if(password!==confirmPassword){
            setSignupError('Confirm Password Not matched ')
        }else{
            dispatch(register({email,password,storeName}))
        }
    }
    useEffect(()=>{
        if(isAuthenticated){
            navigate('/')
        }
        setTimeout(()=>{
            setSignupError('')
            if(error) dispatch(clearerror())
        },3000)
    },[error,isAuthenticated,signuperror])

    return (
            <div>
                <div className="px-5 py-5 p-lg-0 min-h-screen bg-surface-secondary d-flex flex-column justify-content-center">
                    <div className="d-flex justify-content-center">
                        <div
                            className="col-lg-5 col-xl-4 p-12 p-xl-20 position-fixed start-0 top-0 h-screen overflow-y-hidden bg-primary d-none d-lg-flex flex-column">
                            <a className="d-block" href="#"><img src="https://clever-dashboard.webpixels.work/img/logos/clever-light.svg" className="h-10" alt="..." /></a>
                            <div className="mt-32 mb-20">
                                <h1 className="ls-tight font-bolder display-6 text-white mb-5">Let’s build something amazing today.</h1>
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
                                            <span className='text-danger mt-2'>{error}</span>
                                            <span className='text-danger mt-2'>{signuperror}</span>
                                        </div>
                                            <div className="mb-5"><label className="form-label" htmlFor="username">Email</label> <input
                                                    type="username" className="form-control" id="username" name="username" autoComplete="off" onChange={(e)=>setEmail(e.target.value)} /></div>
                                             <div className="mb-5">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div><label className="form-label" htmlFor="storename">StoreName</label></div>
                                                </div><input type="text" className="form-control" id="storename" name="password" autoComplete="off" onChange={(e)=>setStoreName(e.target.value)}
                                                     />
                                            </div>
                                            <div className="mb-5">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div><label className="form-label" htmlFor="password">Password</label></div>
                                                </div><input type="password" className="form-control" id="password" name="password" autoComplete="off" onChange={(e)=>setPassword(e.target.value)}
                                                     />
                                            </div>
                                            <div className="mb-5">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div><label className="form-label" htmlFor="password">Confirm Password</label></div>
                                                </div><input type="password" className="form-control" id="password" name="confirm-password" autoComplete="off" onChange={(e)=>setConfirmPassword(e.target.value)} />
                                            </div>
                                            <div>
                                                <button onClick={submit} disabled={email.length<1 || password.length<1 || storeName.length<1 || confirmPassword.length<1} className="btn btn-primary w-full" >
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