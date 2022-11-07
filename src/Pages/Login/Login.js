import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg';
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { setAuthToken } from '../../api/auth';


const Login = () => {
    const{signIn,googleSignIn}=useContext(AuthContext);
    const location=useLocation();
    const navigate=useNavigate();

    const from=location.state?.from?.pathname || '/';
    const handleLogIn = event => {
        event.preventDefault();
        const form=event.target;
        const email=form.email.value;
        const password=form.password.value;
        console.log(email,password)
        signIn(email,password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            

            const currentUser={
                email:user.email
            }
            console.log(currentUser);

            fetch('https://genius-car-server-gold-zeta.vercel.app/jwt',{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(currentUser)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                localStorage.setItem('geniousToken',data.token);
                navigate(from,{replace:true});

            })
            // navigate(from,{replace:true});
            // ...
          })
          .catch((error) => {
            console.log(error)
          });
          
        
        
    }
    const googleLogIn=()=>{
        googleSignIn(provider)
          .then((result) => {
            
            const user = result.user;
            setAuthToken(user);
            
          }).catch((error) => {
            console.log(error)
            
          });

    }
    const provider = new GoogleAuthProvider();
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content grid md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center lg:text-left">

                    <img src={img} alt="" />
                </div>

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-5xl font-bold text-center">Login now!</h1>

                    <form onSubmit={handleLogIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="email" name='email' className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" placeholder="password" name='password' className="input input-bordered" />
                            <label className="label">
                                <a href="/" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            {/* <input type="submit " className="btn btn-primary" value="login" /> */}
                            <button className="btn btn-primary">LogIn</button>
                            <button onClick={googleLogIn} className="btn btn-primary my-3">LogInWithGoogle</button>
                            

                        </div>
                    </form>
                    
                    
                    <p className='text-center p-4'>New to Genious Car <Link className='text-orange-600 font-bold ' to='/signup'>Sign Up</Link> </p>
                </div>

            </div>
        </div>
    );
};

export default Login;