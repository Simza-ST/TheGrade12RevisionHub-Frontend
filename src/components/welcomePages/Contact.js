import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const openChatPopup = () => setShowPopup(true);
    const closeChatPopup = () => {
        setShowPopup(false);
        setFormData({ name: '', email: '', message: '' });
    };

    const sendChatMessage = (e) => {
        e.preventDefault();
        const { name, email, message } = formData;
        const subject = 'New Chat Message';
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        window.location.href = `mailto:ntando.tristan32@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        closeChatPopup();
    };

    const copyEmail = () => {
        navigator.clipboard.writeText('ntando.tristan32@gmail.com')
            .then(() => alert('Email copied to clipboard!'))
            .catch((err) => console.error('Failed to copy email: ', err));
    };

    return (

        <section className="contact" id="contact">
            <div className="content">
                <br />
                <div className="title"><span>Contact Us</span></div>
                <div className="text">
                    <div className="topic">Have Any Question?</div>
                    <p>Reach out for academic support.</p>
                    <div className="button">
                        <button onClick={openChatPopup}>Let's Chat</button>
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close-btn" onClick={closeChatPopup}>×</span>
                        <h2>Chat with Us</h2>
                        <form onSubmit={sendChatMessage}>
                            <div className="form-group">
                                <label htmlFor="chatName">Full Name:</label>
                                <input
                                    type="text"
                                    id="chatName"
                                    className="form-control"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="chatEmail">Email Address:</label>
                                <input
                                    type="email"
                                    id="chatEmail"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="chatMessage">Message:</label>
                                <textarea
                                    id="chatMessage"
                                    className="form-control"
                                    rows="5"
                                    placeholder="Enter your message here..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn-submit">Send Message</button>
                        </form>
                        <div className="email-copy">
                            <p>Or email us directly: <span onClick={copyEmail}>ntando.tristan32@gmail.com</span></p>
                        </div>
                    </div>
                </div>
            )}
            <br />
        </section>
    );
};

export default Contact;