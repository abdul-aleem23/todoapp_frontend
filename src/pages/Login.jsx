import { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom'
import axios from "axios";
import { Context, server } from '../main';
import toast from "react-hot-toast";


const Login = () => {

  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { data } = await axios.post(
        `${server}/users/login`, 
        {
          email, password
        }, 
        {
          headers:{
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"}/>

  return (
    <div className='login'>
      <section>
        <form onSubmit={submitHandler}>
        <input
            type="email" 
            placeholder='Email'
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
          <input 
            type="password" 
            placeholder='Password'
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <button disabled={loading} type="submit">Login</button>
          <h4>Or</h4>
          <Link to="/register">Sign up</Link>
        </form>
      </section>
    </div>
  )
}

export default Login