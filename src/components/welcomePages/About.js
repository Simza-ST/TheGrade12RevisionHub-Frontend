import React from 'react';
import './About.css';

const About = () => {
    return (
        <section className="about" id="about">
            <div className="content">
                <br />
                <div className="title"><span>About the Revision Hub</span></div>
                <div className="about-details">
                    <div className="left">
                        {/*<img src="/images/aboutImage.jpeg" alt="About" /> /!* Replace with "https://via.placeholder.com/400" if missing *!/*/}
                        <img src="/images/image6.jpg" alt="About" />
                    </div>
                    <br />
                    {/*<div className="left">*/}
                    {/*    <img src="/images/image7.jpg" alt="About" />*/}
                    {/*</div>*/}

                    <div className="right">
                        <div className="topic">Designing Is My Passion</div>
                        <p>
                            The Grade 12 Revision Hub is designed to provide students with the essential tools
                            and resources needed to excel in their final year of high school. Our platform offers
                            comprehensive subject materials, effective study strategies, and access to past exam
                            papers to help students prepare thoroughly. Whether you're looking for structured
                            revision plans, expert tips, or additional learning resources, the Revision Hub ensures
                            you stay on track for academic success. Our goal is to enhance your understanding,
                            boost confidence, and make studying more efficient and enjoyable.
                        </p>
                    </div>
                </div>
            </div>
            <br />
        </section>
    );
};

export default About;