import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';

const Signup = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        let payload = {email: email, password: password};
        await axios.post('/api/signup', payload)
        .then(async (res)=>{
            setErrorEmail(null);
            setErrorPassword(null);
            history.push('/smoothies');
        })
        .catch(async (err)=>{
            const data = await err.response.data;
            console.log(data);
            setErrorEmail(data.errors.email);
            setErrorPassword(data.errors.password);
        });
    }
    
    return (
        <main>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit.bind(this)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" placeholder="enter email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <div className="error">
                        {errorEmail}
                    </div>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="enter password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <div className="error">
                        {errorPassword}
                    </div>
                </div>
                <button type="submit">Valide</button>
            </form>
        </main>
    )
}

export default withRouter(Signup);
