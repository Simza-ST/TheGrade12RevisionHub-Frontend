import React from 'react';
import './Services.css';

const Services = () => {
    return (
        <section className="services" id="services">
            <div className="content">
                <br />
                <div className="title"><span>My Services</span></div>
                <div className="boxes">
                    {[
                        {
                            icon: 'fa-book-open',
                            topic: 'Subject-Specific Tutoring',
                            text: 'Mathematics, Sciences, English, Social Sciences, Business & Accounting, Computer Science & IT',
                        },
                        {
                            icon: 'fa-file-alt',
                            topic: 'Exam Preparation',
                            text: 'Past paper walkthroughs, Marking schemes analysis, Time management strategies, Essay structuring techniques',
                        },
                        {
                            icon: 'fa-lightbulb',
                            topic: 'Study Resources',
                            text: 'Notes & summaries, Formula sheets, Mind maps & concept diagrams, Flashcards',
                        },
                        {
                            icon: 'fa-video',
                            topic: 'Online & In-Person Sessions',
                            text: 'One-on-one tutoring, Group study sessions, Virtual revision classes',
                        },
                        {
                            icon: 'fa-clipboard-check',
                            topic: 'Assessments Assistance',
                            text: 'Research guidance, Proofreading & editing, Referencing & citations help',
                        },
                        {
                            icon: 'fa-user-check',
                            topic: 'Motivation & Study Skills Coaching',
                            text: 'Overcoming procrastination, Effective revision techniques, Stress management & exam anxiety coping strategies',
                        },
                    ].map((service, index) => (
                        <div className="box" key={index}>
                            <div className="icon">
                                <i className={`fas ${service.icon}`}></i>
                            </div>
                            <div className="topic">{service.topic}</div>
                            <p>{service.text}</p>
                        </div>
                    ))}
                </div>
                <br />
            </div>
        </section>
    );
};

export default Services;