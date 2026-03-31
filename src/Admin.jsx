import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
// import './Admin.css';

const Admin = () => {
    const [reservations, setReservations] = useState([]);
    const [messages, setMessages] = useState([]); // NEW STATE FOR MESSAGES
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            // Fetch both reservations and messages
            const resResponse = await fetch('http://localhost:5001/api/reservations');
            const resData = await resResponse.json();
            setReservations(resData);

            const msgResponse = await fetch('http://localhost:5001/api/messages');
            const msgData = await msgResponse.json();
            setMessages(msgData);

            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteReservation = async (id) => {
        if (window.confirm("Are you sure you want to delete this reservation?")) {
            try {
                const response = await fetch(`http://localhost:5001/api/reservations/${id}`, { method: 'DELETE' });
                if (response.ok) setReservations(reservations.filter(res => res._id !== id));
            } catch (error) {
                console.error("Delete error:", error);
            }
        }
    };

    // NEW DELETE MESSAGE LOGIC
    const handleDeleteMessage = async (id) => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            try {
                const response = await fetch(`http://localhost:5001/api/messages/${id}`, { method: 'DELETE' });
                if (response.ok) setMessages(messages.filter(msg => msg._id !== id));
            } catch (error) {
                console.error("Delete error:", error);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("isAdminAuthenticated");
        window.location.href = "/admin-login";
    };

    return (
        <div className="admin-main-container">
            <Navbar />
            <button onClick={handleLogout} className="admin-delete-btn" style={{margin: '20px'}}>Logout</button>
            <div className="admin-first-container">
                <div className="admin-content-box">
                    
                    {/* --- RESERVATIONS SECTION --- */}
                    <h2 className="admin-title">Reservation Manager</h2>
                    {loading ? (
                        <div className="admin-loader">Loading Data...</div>
                    ) : (
                        <div className="admin-table-container">
                            <table className="admin-data-table">
                                <thead>
                                    <tr>
                                        <th>Guest Name</th>
                                        <th>Contact</th>
                                        <th>Guests</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.map((res) => (
                                        <tr key={res._id}>
                                            <td className="admin-td-name">{res.name}</td>
                                            <td>{res.phone}</td>
                                            <td>{res.guests} Pax</td>
                                            <td>{new Date(res.date).toLocaleDateString()}</td>
                                            <td>{res.time}</td>
                                            <td>
                                                <button className="admin-delete-btn" onClick={() => handleDeleteReservation(res._id)}>Remove</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* --- NEW CUSTOMER MESSAGES SECTION --- */}
                    <h2 className="admin-title" style={{ marginTop: '50px' }}>Customer Messages</h2>
                    {loading ? (
                        <div className="admin-loader">Loading Messages...</div>
                    ) : messages.length === 0 ? (
                        <p style={{color: '#888'}}>No messages yet.</p>
                    ) : (
                        <div className="admin-table-container">
                            <table className="admin-data-table">
                                <thead>
                                    <tr>
                                        <th>Sender Name</th>
                                        <th>Email</th>
                                        <th>Message</th>
                                        <th>Date Sent</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages.map((msg) => (
                                        <tr key={msg._id}>
                                            <td className="admin-td-name">{msg.name}</td>
                                            <td>{msg.email}</td>
                                            <td style={{ maxWidth: '300px', wordWrap: 'break-word' }}>{msg.message}</td>
                                            <td>{new Date(msg.date).toLocaleDateString()}</td>
                                            <td>
                                                <button className="admin-delete-btn" onClick={() => handleDeleteMessage(msg._id)}>Remove</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Admin;