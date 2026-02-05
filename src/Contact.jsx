import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
// import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you! Your message has been received. We will get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="contact-main-container">
            <Navbar />
            
            <div className="contact-first-container">
                <div className="contact-info-section">
                    <h2 className="contact-title">Get In Touch</h2>
                    <p className="contact-subtitle">We would love to hear from you. Whether it's a special request or a simple hello.</p>
                    
                    <div className="contact-details">
                        <div className="contact-item">
                            <h4>Location</h4>
                            <p>Vallikunnam, Kerala, India</p>
                        </div>
                        <div className="contact-item">
                            <h4>Email</h4>
                            <p>info@monarquedining.com</p>
                        </div>
                        <div className="contact-item">
                            <h4>Phone</h4>
                            <p>+91 98765 43210</p>
                        </div>
                    </div>
                </div>

                <div className="contact-form-section">
                    <form onSubmit={handleSubmit} className="contact-form-container">
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Your Name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                            className="contact-input-field" 
                        />
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Your Email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                            className="contact-input-field" 
                        />
                        <textarea 
                            name="message" 
                            placeholder="How can we help you?" 
                            value={formData.message} 
                            onChange={handleChange} 
                            required 
                            className="contact-textarea-field"
                        ></textarea>
                        <button type="submit" className="contact-submit-btn">SEND MESSAGE</button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Contact;