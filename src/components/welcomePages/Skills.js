import React from 'react';
import './Skills.css';

const Skills = () => {
    return (
        <section className="skills" id="skills">
            <div className="content">
                <br />
                <div className="title"><span>Study Tips</span></div>
                <div className="skills-details">
                    <div className="left">
                        <div className="topic">Get effective study strategies to improve your performance.</div>
                        <p>
                            Effective study strategies can enhance your learning experience and improve retention.
                            Start by creating a study schedule that allocates time for each subject,
                            ensuring a balanced approach. Utilize active learning techniques such as
                            summarizing notes, teaching concepts to others, and practicing past exam questions.
                            Minimize distractions by setting up a dedicated study space and taking regular breaks
                            to maintain focus. Incorporate different resources, including flashcards, mind maps
                            , and online tutorials, to reinforce understanding. Finally, maintain a positive mindset
                            and prioritize self-care through proper rest, nutrition, and exercise for optimal academic performance.
                        </p>
                        <br />
                    </div>

                    {/*<div className="right">*/}
                    {/*    <img src="/images/skillsImage.jpg" alt="Study Tips" /> /!* Replace with "https://via.placeholder.com/400" if missing *!/*/}

                    {/*</div>*/}
                    <div className = "right">
                        <img src="/images/image5.jpg" alt="Study Tips" />
                    </div>
                </div>
            </div>
            <br />
        </section>
    );
};

export default Skills;