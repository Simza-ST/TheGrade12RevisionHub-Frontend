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
                </div>
                <div className="button">
                    <a href="/signup"><button>GET STARTED</button></a>
                </div>
                <br />
            </div>
        </section>
    );
};

export default Home;