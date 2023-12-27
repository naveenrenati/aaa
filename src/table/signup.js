// Signup.js
import React, { useState } from 'react';
import firebase from 'firebase/compat/app'; // Use 'compat/app' to handle the breaking changes in version 9
import 'firebase/compat/auth'; // Import the specific Firebase modules you need
import './signup.css';
import { API_BASE_URL } from '../configure.js';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSignup = async () => {
        try {
            // Create user with email and password using Firebase Authentication
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

            // Add custom user data to the Firebase user
            await userCredential.user.updateProfile({
                displayName: role,
            });

            // Save user data to MongoDB Atlas
            const response = await fetch(`${ API_BASE_URL }/firebase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    uid: userCredential.user.uid,
                    role, // Ensure 'role' is included in the request body
                }),
            });

            const data = await response.json();
            console.log('MongoDB response:', data);

            alert('Signup successful!');
        } catch (error) {
            alert(`Signup failed: ${error.message}`);
        }
    };

    return (
        <div>
            <div className='tablesignup'>
            <h1>Signup</h1>
            <form>
                <label>Email:</label>
                <input type="email" className="form-control" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label>Password:</label>
                <input type="password" className="form-control" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />

                <label>Role:</label>
                <select value={role} className="form-control"  onChange={(e) => setRole(e.target.value)} required>
                    <option value="n1">N1</option>
                    <option value="n2">N2</option>
                    <option value="n3">N3</option>
                </select>
                <div className='createbutton'>
                <button type="button" className='createuser'  onClick={handleSignup}>Create User</button>
                </div>
                
            </form>
            </div>
            
        </div>
    );
};

export default Signup;
