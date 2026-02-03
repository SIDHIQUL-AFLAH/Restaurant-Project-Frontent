import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Use a secret password of your choice
        if (password === "admin") { 
            localStorage.setItem("isAdminAuthenticated", "true");
            navigate('/admin');
        } else {
            alert("Incorrect Admin Password!");
        }
    };

    return (
        <div className="reservation-main-container">
            <Navbar />
            <div className="reservation-first-container">
                <div className="reservation-card-container">
                    <h2 className="reservation-title">Admin Access</h2>
                    <form onSubmit={handleLogin} className="reservation-form-container">
                        <input 
                            type="password" 
                            placeholder="Enter Admin Password" 
                            className="reservation-input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="reservation-submit-btn">LOGIN</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;