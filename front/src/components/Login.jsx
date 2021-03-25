import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const Login = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        let payload = {email: email, password: password};
        await axios.post('/api/login', payload)
        .then((res)=>{
            setError('');
            history.push('/smoothies');
        }).catch((err)=>{
            const error = err.response.data;
            console.log(error.err)
            setError(error.err)
        });
    }

    return (
        <main>
            <h1>Login</h1>
            <form onSubmit={handleSubmit.bind(this)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" placeholder="enter email" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="enter password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="error">
                    {error}
                </div>
                <button type="submit">Login</button>
            </form>
        </main>
    )
}

export default withRouter(Login);
