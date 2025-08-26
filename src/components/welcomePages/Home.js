import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <section className="home" id="home">
            <div className="home-content">
                <div className="text">
                    <br />
                    <div className="text-one">Hello,</div>
                    <div className="text-two">Welcome to</div>
                    <div className="text-three">Grade 12 Revision Hub</div>
                    <div className="text-four">Your ultimate destination to ace your exams!</div>
                    <div className="text-five">Empower your studies with expert resources and personalized strategies.</div>
                </div>
                <div className="button-group">
                    <a href="/signup"><button className="btn-primary">GET STARTED</button></a>
                </div>
                <div className="highlights">
                    <ul>
                        <li>Access free past exam papers</li>
                        <li>Expert study tips and strategies</li>
                        <li>Interactive revision tools</li>
                    </ul>
                </div>
                <div className="image-placeholder">
                    {/*<img src="/images/studentImage.jpg" alt="Students preparing for exams" />*/}
                    <img src="/images/image4.jpg" alt="Students preparing for exams" />
                </div>
                <div className="support">
                    <a href="/support" className="support-link">Need Help? Contact Support</a>
                </div>
                <br />
            </div>
        </section>
    );
};

export default Home;