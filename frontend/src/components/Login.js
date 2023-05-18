import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
        }
    });
    // API call to submit login data
    const handleLogin = async () => {
        console.log(email, password);
        let result = await fetch('http://localhost:5000/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        result = await result.json();
        console.log(result)
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate('/');
        } else if (result.message === 'No User Found !') {
            alert("Please Enter Valid Credentials");
        } else if (result.message === 'Details Missing') {
            alert('Please Enter All Credentials !');
        } else {
            alert('Please check credentials');
        }

    }
    // frontend block
    return (
        <div className='login'>
            <h1 className="text">Login To Explore !</h1>
            <input type="text" className='inputbox' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} value={email}></input>
            <input type="password" className='inputbox' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} value={password}></input>
            <button type='submit' className='formButton' onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login;