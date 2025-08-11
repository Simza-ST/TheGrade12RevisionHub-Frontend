import React from 'react';

const WelcomeEmail = ({ firstName, lastName, otp, loginUrl = 'http://yourapp.com/login', socialMediaLink = 'http://yourapp.com/social' }) => {
    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f4f4f4',
            margin: 0,
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh'
        }}>
            <div style={{
                maxWidth: '600px',
                margin: '20px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
            }}>
                <div style={{
                    background: 'linear-gradient(to right, #1f7a6e, #134e48)',
                    padding: '20px',
                    textAlign: 'center',
                    color: '#ffffff'
                }}>
                    <img src="/images/appLogo.png" alt="Revision Hub Logo" style={{ maxWidth: '150px' }} />
                    <h1 style={{ margin: '10px 0', fontSize: '24px' }}>Welcome to Revision Hub!</h1>
                </div>
                <div style={{
                    padding: '20px',
                    color: '#333333',
                    lineHeight: '1.6'
                }}>
                    <h2 style={{ color: '#1f7a6e', fontSize: '20px' }}>
                        Hello {firstName} {lastName},
                    </h2>
                    <p>
                        Congratulations on joining Revision Hub! We're thrilled to have you as part of our learning community. To complete your registration, please use the following One-Time Password (OTP):
                    </p>
                    <div style={{
                        backgroundColor: '#e0f7fa',
                        padding: '15px',
                        textAlign: 'center',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#134e48',
                        borderRadius: '5px',
                        margin: '20px 0'
                    }}>
                        {otp}
                    </div>
                    <p>
                        Enter this OTP on the signup page to verify your account. This code is valid for the next 10 minutes.
                    </p>
                    <h3 style={{ fontSize: '18px', color: '#1f7a6e' }}>Next Steps to Get Started:</h3>
                    <ul style={{ paddingLeft: '20px' }}>
                        <li><strong>Explore Quizzes:</strong> Test your knowledge with our interactive subject-specific quizzes.</li>
                        <li><strong>Create a Study Plan:</strong> Set up a personalized schedule to stay on track with your goals.</li>
                        <li><strong>Track Progress:</strong> Use our analytics dashboard to monitor your learning journey.</li>
                    </ul>
                    <p>
                        Need help? Contact our support team at{' '}
                        <a href="mailto:support@revisionhub.com" style={{ color: '#1f7a6e', textDecoration: 'none' }}>
                            support@revisionhub.com
                        </a>.
                    </p>
                    <a
                        href={loginUrl}
                        style={{
                            display: 'inline-block',
                            padding: '12px 24px',
                            backgroundColor: '#1f7a6e',
                            color: '#ffffff',
                            textDecoration: 'none',
                            borderRadius: '5px',
                            marginTop: '20px',
                            textAlign: 'center'
                        }}
                    >
                        Log In to Start Learning
                    </a>
                </div>
                <div style={{
                    backgroundColor: '#f4f4f4',
                    padding: '10px',
                    textAlign: 'center',
                    color: '#666666',
                    fontSize: '12px'
                }}>
                    <p>&copy; 2025 Revision Hub. All rights reserved.</p>
                    <p>
                        Follow us on{' '}
                        <a href={socialMediaLink} style={{ color: '#1f7a6e', textDecoration: 'none' }}>
                            Social Media
                        </a>{' '}
                        for updates!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WelcomeEmail;