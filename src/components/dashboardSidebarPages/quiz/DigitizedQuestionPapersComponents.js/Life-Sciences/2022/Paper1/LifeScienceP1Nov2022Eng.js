// App.js
// Complete single-file React app (JavaScript) that digitizes
// Life Sciences P1 November 2022 with answering, submission,
// auto-marking, per-question feedback, and results.
//
// Usage:
// - Drop this into a Create React App or Vite React project as src/App.js
// - Ensure React is installed
// - Add the style tag below to index.html or keep styles inline here (see StyleInjector)

import React, { useMemo, useState, useEffect, useCallback } from "react";
import LifeScienceP2Nov2021Eng from "../../2021/Paper2/LifeScienceP2Nov2021Eng";

/* ----------------------------- Style injector ----------------------------- */
// If you don't want to modify index.html, this injects basic styles at runtime.
const baseCss = `
.app {
  max-width: 980px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}
header h1 { margin: 0; font-size: 1.35rem; }
header h2 { margin: 0.2rem 0 0.5rem; font-size: 1.15rem; color: #333; }
header p { color: #666; }
.instructions { background: #f8f9fa; border: 1px solid #e9ecef; padding: 1rem; margin: 1rem 0; border-radius: 6px; }
.instructions h3 { margin-top: 0; }
.paper-section { margin: 2rem 0; }
.paper-section .marks { color: #555; }
.question { border-top: 1px solid #ddd; padding-top: 1rem; margin-top: 1rem; }
.question-header { display: flex; justify-content: space-between; align-items: baseline; }
.prompt { margin: 0.5rem 0; line-height: 1.45; }
.subparts { margin-left: 1rem; border-left: 2px solid #eee; padding-left: 1rem; }
.subpart { margin: 0.5rem 0 0.75rem; }
.marks.small { color: #777; font-size: 0.85rem; }
.mcq { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem; }
.mcq-option { display: flex; align-items: flex-start; gap: 0.5rem; background: #fafafa; border: 1px solid #eee; padding: 0.5rem; border-radius: 6px; }
.mcq-option input[type="radio"] { margin-top: 0.2rem; flex-shrink: 0; }
input[type="text"], textarea {
  width: 100%;
  padding: 0.55rem;
  border: 1px solid #ccc; border-radius: 6px;
  font-size: 0.95rem; margin-top: 0.25rem;
}
.actions { display: flex; gap: 0.75rem; margin-top: 2rem; }
button { padding: 0.55rem 0.9rem; border: none; border-radius: 6px; background: #0d6efd; color: white; cursor: pointer; }
button.secondary { background: #6c757d; }
button:disabled { background: #8fa9e8; cursor: not-allowed; }
.results { background: #f6f7fb; border: 1px solid #e1e3f0; padding: 1rem; border-radius: 6px; }
.feedback-section { margin: 1rem 0; }
.feedback-question { border-top: 1px dashed #cbd; padding-top: 0.75rem; }
.feedback-header { display: flex; justify-content: space-between; }
.feedback-note { color: #444; font-style: italic; }
footer { margin-top: 2rem; color: #666; font-size: 0.9rem; }
blockquote { background: #fff; border-left: 4px solid #0d6efd; padding: 0.75rem; margin-top: 1rem; }
`;

const StyleInjector = () => {
    useEffect(() => {
        const id = "paper-base-css";
        if (document.getElementById(id)) return;
        const style = document.createElement("style");
        style.id = id;
        style.textContent = baseCss;
        document.head.appendChild(style);
    }, []);
    return null;
};

/* --------------------------- Data: paper structure --------------------------- */

const questions = [
    {
        id: "sectionA",
        title: "SECTION A – Question 1",
        totalMarks: 50,
        questions: [
            {
                id: "1.1",
                number: "1.1",
                prompt: "Various options are provided as possible answers to the following questions. Choose the answer and write only the letter (A–D) next to the question numbers (1.1.1 to 1.1.10) in the ANSWER BOOK, e.g. 1.1.11 D.",
                type: "long",
                marks: 20,
                children: [
                    {
                        id: "1.1.1",
                        label: "1.1.1",
                        type: "mcq",
                        marks: 2,
                        prompt: "Which ONE of the following maintains the shape of the eyeball?",
                        options: [
                            { letter: "A", text: "Cornea" },
                            { letter: "B", text: "Lens" },
                            { letter: "C", text: "Vitreous humour" },
                            { letter: "D", text: "Retina" }
                        ]
                    },
                    {
                        id: "1.1.2",
                        label: "1.1.2",
                        type: "mcq",
                        marks: 2,
                        prompt: "The choroid …",
                        options: [
                            { letter: "A", text: "is richly supplied with blood vessels." },
                            { letter: "B", text: "contains photoreceptors." },
                            { letter: "C", text: "refracts the light rays." },
                            { letter: "D", text: "sends impulses to the brain." }
                        ]
                    },
                    {
                        id: "1.1.3",
                        label: "1.1.3",
                        type: "mcq",
                        marks: 2,
                        prompt: "Which ONE of the following occurs immediately after fertilisation?",
                        options: [
                            { letter: "A", text: "The blastula, which is a hollow ball of cells, is formed by meiosis." },
                            { letter: "B", text: "The morula, which is a hollow ball of cells, is formed by meiosis." },
                            { letter: "C", text: "The blastula, which is a solid ball of cells, is formed by mitosis." },
                            { letter: "D", text: "The morula, which is a solid ball of cells, is formed by mitosis." }
                        ]
                    },
                    {
                        id: "1.1.4",
                        label: "1.1.4",
                        type: "mcq",
                        marks: 2,
                        prompt: "On a hot day …",
                        options: [
                            { letter: "A", text: "less blood flows to the surface of the skin." },
                            { letter: "B", text: "the sweat glands become inactive." },
                            { letter: "C", text: "more blood flows to the surface of the skin." },
                            { letter: "D", text: "vasoconstriction takes place." }
                        ]
                    },
                    {
                        id: "1.1.5",
                        label: "1.1.5",
                        type: "mcq",
                        marks: 2,
                        prompt: "The normal site of fertilisation in a human female is the …",
                        options: [
                            { letter: "A", text: "uterus." },
                            { letter: "B", text: "ovary." },
                            { letter: "C", text: "vagina." },
                            { letter: "D", text: "Fallopian tube." }
                        ]
                    },
                    {
                        id: "1.1.6",
                        label: "1.1.6",
                        type: "mcq",
                        marks: 2,
                        image:"picture116.png",
                        prompt: "Which ONE of the following best describes the events of accommodation when a person is viewing an object that is less than 6 m away?",
                        options: [
                            { letter: "A", text: "Relaxes / Tighten / Increases" },
                            { letter: "B", text: "Contracts / Slacken / Decreases" },
                            { letter: "C", text: "Relaxes / Slacken / Decreases" },
                            { letter: "D", text: "Contracts / Tighten / Increases" }
                        ]
                    },
                    {
                        id: "1.1.7",
                        label: "1.1.7",
                        type: "mcq",
                        marks: 2,
                        image:"picture117.png",
                        prompt: "The axon is represented by structure …",
                        options: [
                            { letter: "A", text: "1" },
                            { letter: "B", text: "2" },
                            { letter: "C", text: "3" },
                            { letter: "D", text: "4" }
                        ]
                    },
                    {
                        id: "1.1.8",
                        label: "1.1.8",
                        type: "mcq",
                        marks: 2,
                        prompt: "Which labelled part affects the speed of impulse transmission?",
                        options: [
                            { letter: "A", text: "1" },
                            { letter: "B", text: "2" },
                            { letter: "C", text: "3" },
                            { letter: "D", text: "4" }
                        ]
                    },
                    {
                        id: "1.1.9",
                        label: "1.1.9",
                        type: "mcq",
                        marks: 2,
                        image:"picture119.png",
                        prompt: "Which ONE of the following is an explanation of the results?",
                        options: [
                            { letter: "A", text: "Phototropism occurred because the auxins moved towards light, which inhibited growth on the lower side of the stem." },
                            { letter: "B", text: "Geotropism occurred because the auxins moved downwards, which stimulated growth on the lower side of the stem." },
                            { letter: "C", text: "Phototropism occurred because the auxins moved away from light, which stimulated growth on the upper side of the stem." },
                            { letter: "D", text: "Geotropism occurred because the auxins moved upwards, which inhibited growth on the upper side of the stem." }
                        ]
                    },
                    {
                        id: "1.1.10",
                        label: "1.1.10",
                        type: "mcq",
                        marks: 2,
                        prompt: "A control for the same investigation was set up by putting an identical pot plant on a rotating clinostat. Which ONE of the following would be the expected results observed after a few days?",
                        options: [
                            { letter: "A", text: "There will be no growth." },
                            { letter: "B", text: "The stem will grow upwards." },
                            { letter: "C", text: "The stem will grow downwards." },
                            { letter: "D", text: "The stem will grow horizontally." }
                        ]
                    }
                ]
            },
            {
                id: "1.2",
                number: "1.2",
                prompt: "Give the correct biological term for each of the following descriptions. Write only the term next to the question numbers (1.2.1 to 1.2.10) in the ANSWER BOOK.",
                type: "long",
                marks: 10,
                children: [
                    { id: "1.2.1", label: "1.2.1", type: "short", marks: 1, prompt: "The part of the skull that protects the brain" },
                    { id: "1.2.2", label: "1.2.2", type: "short", marks: 1, prompt: "The homeostatic process whereby temperature is controlled in the body" },
                    { id: "1.2.3", label: "1.2.3", type: "short", marks: 1, prompt: "The visual defect characterised by a cloudy lens" },
                    { id: "1.2.4", label: "1.2.4", type: "short", marks: 1, prompt: "The blood vessel that transports deoxygenated blood from the foetus towards the placenta" },
                    { id: "1.2.5", label: "1.2.5", type: "short", marks: 1, prompt: "The part of the brain that controls body temperature" },
                    { id: "1.2.6", label: "1.2.6", type: "short", marks: 1, prompt: "A branch of the nervous system that is made up of spinal and cranial nerves" },
                    { id: "1.2.7", label: "1.2.7", type: "short", marks: 1, prompt: "Finger-like projections that develop from the outer membrane of an embryo after implantation" },
                    { id: "1.2.8", label: "1.2.8", type: "short", marks: 1, prompt: "A hormone that regulates the salt levels in blood" },
                    { id: "1.2.9", label: "1.2.9", type: "short", marks: 1, prompt: "The fluid that protects the developing foetus against mechanical injury" },
                    { id: "1.2.10", label: "1.2.10", type: "short", marks: 1, prompt: "The area of the retina that contains the highest concentration of cones" }
                ]
            },
            {
                id: "1.3",
                number: "1.3",
                prompt: "Indicate whether each of the descriptions in COLUMN I apply to A ONLY, B ONLY, BOTH A AND B or NONE of the items in COLUMN II. Write A only, B only, both A and B or none next to the question numbers (1.3.1 to 1.3.3) in the ANSWER BOOK.",
                type: "long",
                marks: 6,
                image:"picture13.png",
                children: [
                    {
                        id: "1.3.1",
                        label: "1.3.1",
                        type: "short",
                        marks: 2,
                        prompt: "A plant hormone that inhibits the germination of seeds",
                        options: [
                            { letter: "A", text: "Gibberellins" },
                            { letter: "B", text: "Abscisic acid" }
                        ]
                    },
                    {
                        id: "1.3.2",
                        label: "1.3.2",
                        type: "short",
                        marks: 2,
                        prompt: "The functional connection between two consecutive neurons",
                        options: [
                            { letter: "A", text: "Synapse" },
                            { letter: "B", text: "Effector" }
                        ]
                    },
                    {
                        id: "1.3.3",
                        label: "1.3.3",
                        type: "short",
                        marks: 2,
                        prompt: "A hormone that stimulates puberty",
                        options: [
                            { letter: "A", text: "Testosterone" },
                            { letter: "B", text: "Oestrogen" }
                        ]
                    }
                ]
            },
            {
                id: "1.4",
                number: "1.4",
                prompt: "The diagrams below show the condition of the eyes for different light intensities when viewing the same object.",
                type: "long",
                marks: 8,
                image:"picture14.png",
                children: [
                    {
                        id: "1.4.1a",
                        label: "1.4.1 (a)",
                        type: "short",
                        marks: 2,
                        prompt: "Give the LETTER and NAME of the part that contains muscles"
                    },
                    {
                        id: "1.4.1b",
                        label: "1.4.1 (b)",
                        type: "short",
                        marks: 2,
                        prompt: "Give the LETTER and NAME of the part that is made up of tough white fibrous tissue"
                    },
                    {
                        id: "1.4.2a",
                        label: "1.4.2 (a)",
                        type: "short",
                        marks: 1,
                        prompt: "Which diagram (1, 2 or 3) represents the eye of a person in a very bright area"
                    },
                    {
                        id: "1.4.2b",
                        label: "1.4.2 (b)",
                        type: "short",
                        marks: 1,
                        prompt: "Which diagram (1, 2 or 3) represents the eye where the rods are stimulated the most"
                    },
                    {
                        id: "1.4.3a",
                        label: "1.4.3 (a)",
                        type: "short",
                        marks: 1,
                        prompt: "Which muscles are contracted in diagram 2"
                    },
                    {
                        id: "1.4.3b",
                        label: "1.4.3 (b)",
                        type: "short",
                        marks: 1,
                        prompt: "Which muscles are relaxed in diagram 3"
                    }
                ]
            },
            {
                id: "1.5",
                number: "1.5",
                prompt: "The diagram below shows the interaction between two endocrine glands.",
                type: "long",
                marks: 6,
                image:"picture15.png",
                children: [
                    {
                        id: "1.5.1",
                        label: "1.5.1",
                        type: "short",
                        marks: 1,
                        prompt: "Name the type of interaction that occurs between hormone A and gland B"
                    },
                    {
                        id: "1.5.2a",
                        label: "1.5.2 (a)",
                        type: "short",
                        marks: 1,
                        prompt: "Identify gland B"
                    },
                    {
                        id: "1.5.2b",
                        label: "1.5.2 (b)",
                        type: "short",
                        marks: 1,
                        prompt: "Identify hormone A"
                    },
                    {
                        id: "1.5.2c",
                        label: "1.5.2 (c)",
                        type: "short",
                        marks: 1,
                        prompt: "Identify hormone C"
                    },
                    {
                        id: "1.5.3",
                        label: "1.5.3",
                        type: "short",
                        marks: 1,
                        prompt: "Name the disorder that results when gland B is overstimulated and becomes enlarged"
                    },
                    {
                        id: "1.5.4",
                        label: "1.5.4",
                        type: "short",
                        marks: 1,
                        prompt: "Which hormone (A or C) will be expected to be high in the blood of the person with the disorder named in QUESTION 1.5.3"
                    }
                ]
            }
        ]
    },
    {
        id: "sectionB",
        title: "SECTION B – Questions 2 & 3",
        totalMarks: 100,
        questions: [
            {
                id: "2.1",
                number: "2.1",
                prompt: "The diagram below represents the human male reproductive system.",
                type: "long",
                marks: 9,
                image:"picture21.png",
                children: [
                    {
                        id: "2.1.1",
                        label: "2.1.1",
                        type: "short",
                        marks: 1,
                        prompt: "Identify structure A"
                    },
                    {
                        id: "2.1.2",
                        label: "2.1.2",
                        type: "short",
                        marks: 1,
                        prompt: "State ONE function of part D in reproduction"
                    },
                    {
                        id: "2.1.3",
                        label: "2.1.3",
                        type: "multi",
                        marks: 2,
                        prompt: "Give TWO reasons why structure B is NOT considered to be an endocrine gland"
                    },
                    {
                        id: "2.1.4",
                        label: "2.1.4",
                        type: "short",
                        marks: 1,
                        prompt: "Name the type of gametogenesis that occurs in part C"
                    },
                    {
                        id: "2.1.5",
                        label: "2.1.5",
                        type: "long",
                        marks: 4,
                        prompt: "Explain how the secretions of structures A and B improve the chances of fertilisation"
                    }
                ]
            },
            {
                id: "2.2",
                number: "2.2",
                prompt: "The diagrams below show the structure of a normal and an abnormal sperm. (The diagrams are drawn to scale.)",
                type: "long",
                marks: 8,
                image:"picture22.png",
                children: [
                    {
                        id: "2.2.1",
                        label: "2.2.1",
                        type: "short",
                        marks: 1,
                        prompt: "Identify part A"
                    },
                    {
                        id: "2.2.2",
                        label: "2.2.2",
                        type: "short",
                        marks: 1,
                        prompt: "Describe the role of structure B during fertilisation"
                    },
                    {
                        id: "2.2.3",
                        label: "2.2.3",
                        type: "long",
                        marks: 2,
                        prompt: "Explain the role of the organelles found in large numbers in part C"
                    },
                    {
                        id: "2.2.4",
                        label: "2.2.4",
                        type: "long",
                        marks: 4,
                        prompt: "Explain TWO reasons why sperm 1 is structurally better suited for fertilisation than sperm 2"
                    }
                ]
            },
            {
                id: "2.3",
                number: "2.3",
                prompt: "The graph below shows the levels of two hormones that are secreted by the pituitary gland during the menstrual cycle.",
                type: "long",
                marks: 10,
                image:"picture23.png",
                children: [
                    {
                        id: "2.3.1",
                        label: "2.3.1",
                        type: "multi",
                        marks: 2,
                        prompt: "State TWO functions of hormone B"
                    },
                    {
                        id: "2.3.2a",
                        label: "2.3.2 (a)",
                        type: "long",
                        marks: 3,
                        prompt: "Explain why a female who is struggling to get pregnant may be given pills containing hormone A as a treatment"
                    },
                    {
                        id: "2.3.2b",
                        label: "2.3.2 (b)",
                        type: "long",
                        marks: 2,
                        prompt: "Explain why a female who is struggling to get pregnant will have her levels of hormone B constantly monitored"
                    },
                    {
                        id: "2.3.3",
                        label: "2.3.3",
                        type: "long",
                        marks: 3,
                        prompt: "Explain how the levels of hormone A on days 0 to 5 will differ in a pregnant female"
                    }
                ]
            },
            {
                id: "2.4",
                number: "2.4",
                prompt: "Describe the secretion of the ovarian hormones and their role in the menstrual cycle.",
                type: "long",
                marks: 5
            },
            {
                id: "2.5",
                number: "2.5",
                prompt: "Read the extract below. Anchovy is a type of fish found in the Pacific Ocean. During the breeding season, the females and males gather in large groups and release ova and semen into the water. Once fertilised, the eggs float in the water and embryonic development occurs until hatching. The northern pike fish is found mainly in rivers. During the breeding season, the female releases thousands of ova and the male releases semen all around the female. The fertilised eggs attach to vegetation near the riverbed, where embryonic development occurs until hatching. The graph below shows the survival rate of both fish species.",
                type: "long",
                marks: 9,
                image:"picture25.png",
                children: [
                    {
                        id: "2.5.1",
                        label: "2.5.1",
                        type: "short",
                        marks: 1,
                        prompt: "Name the type of fertilisation that takes place in both fish species"
                    },
                    {
                        id: "2.5.2",
                        label: "2.5.2",
                        type: "long",
                        marks: 2,
                        prompt: "Explain why both fish species are oviparous"
                    },
                    {
                        id: "2.5.3",
                        label: "2.5.3",
                        type: "long",
                        marks: 2,
                        prompt: "Describe TWO ways in which the chances of fertilisation are increased in the northern pike fish"
                    },
                    {
                        id: "2.5.4",
                        label: "2.5.4",
                        type: "short",
                        marks: 1,
                        prompt: "Which graph (X or Y) represents the survival rate of the northern pike fish"
                    },
                    {
                        id: "2.5.5",
                        label: "2.5.5",
                        type: "long",
                        marks: 3,
                        prompt: "Explain your answer to QUESTION 2.5.4"
                    }
                ]
            },
            {
                id: "2.6",
                number: "2.6",
                prompt: "The diagram below shows the homeostatic control of blood glucose levels.",
                type: "long",
                marks: 9,
                image:"picture26.png",
                children: [
                    {
                        id: "2.6.1a",
                        label: "2.6.1 (a)",
                        type: "short",
                        marks: 1,
                        prompt: "Identify gland A"
                    },
                    {
                        id: "2.6.1b",
                        label: "2.6.1 (b)",
                        type: "short",
                        marks: 1,
                        prompt: "Identify hormone C"
                    },
                    {
                        id: "2.6.2a",
                        label: "2.6.2 (a)",
                        type: "long",
                        marks: 3,
                        prompt: "A certain disorder causes decreased production of hormone B. Explain how this will affect the blood glucose levels"
                    },
                    {
                        id: "2.6.2b",
                        label: "2.6.2 (b)",
                        type: "short",
                        marks: 1,
                        prompt: "Name the disorder"
                    },
                    {
                        id: "2.6.3",
                        label: "2.6.3",
                        type: "long",
                        marks: 3,
                        prompt: "Scientists have been investigating the use of adrenalin as a treatment for people who cannot produce hormone C. Explain why this treatment may work"
                    }
                ]
            },
            {
                id: "3.1",
                number: "3.1",
                prompt: "The diagram below shows a part of the human brain.",
                type: "long",
                marks: 6,
                image:"picture31.png",
                children: [
                    {
                        id: "3.1.1",
                        label: "3.1.1",
                        type: "short",
                        marks: 1,
                        prompt: "Identify part A"
                    },
                    {
                        id: "3.1.2",
                        label: "3.1.2",
                        type: "long",
                        marks: 2,
                        prompt: "Explain why a person may die if part C is damaged"
                    },
                    {
                        id: "3.1.3a",
                        label: "3.1.3 (a)",
                        type: "short",
                        marks: 1,
                        prompt: "Part B is damaged in a person's lower back. Identify part B"
                    },
                    {
                        id: "3.1.3b",
                        label: "3.1.3 (b)",
                        type: "long",
                        marks: 2,
                        prompt: "Explain why the person will have no control of the skeletal muscles of the legs"
                    }
                ]
            },
            {
                id: "3.2",
                number: "3.2",
                prompt: "The table below shows the recorded number of severe brain injuries per 100 000 people per year in different regions of the world.",
                type: "long",
                marks: 9,
                image:"picture32.png",
                children: [
                    {
                        id: "3.2.1",
                        label: "3.2.1",
                        type: "short",
                        marks: 1,
                        prompt: "Which region has the smallest number of severe brain injuries"
                    },
                    {
                        id: "3.2.2",
                        label: "3.2.2",
                        type: "long",
                        marks: 2,
                        prompt: "Explain why this data may not be accurate for the region named in QUESTION 3.2.1"
                    },
                    {
                        id: "3.2.3",
                        label: "3.2.3",
                        type: "long",
                        marks: 6,
                        prompt: "Draw a bar graph to represent the data in the table"
                    }
                ]
            },
            {
                id: "3.3",
                number: "3.3",
                prompt: "The diagram below represents a part of the human ear.",
                type: "long",
                marks: 13,
                image:"picture33.png",
                children: [
                    {
                        id: "3.3.1",
                        label: "3.3.1",
                        type: "short",
                        marks: 1,
                        prompt: "Identify part C"
                    },
                    {
                        id: "3.3.2a",
                        label: "3.3.2 (a)",
                        type: "short",
                        marks: 1,
                        prompt: "State ONE function of part D"
                    },
                    {
                        id: "3.3.2b",
                        label: "3.3.2 (b)",
                        type: "short",
                        marks: 1,
                        prompt: "State ONE function of the receptors found in part C"
                    },
                    {
                        id: "3.3.3",
                        label: "3.3.3",
                        type: "long",
                        marks: 2,
                        prompt: "Explain why a build-up of ear wax at part A may result in temporary hearing loss"
                    },
                    {
                        id: "3.3.4",
                        label: "3.3.4",
                        type: "long",
                        marks: 4,
                        prompt: "A grommet is a small device that allows the air to move into and out of the middle ear. This prevents pressure build-up in the middle ear. Explain how the use of grommets in the treatment of middle-ear infections prevents hearing loss"
                    },
                    {
                        id: "3.3.5",
                        label: "3.3.5",
                        type: "long",
                        marks: 4,
                        prompt: "Describe how the receptors in part B are involved in maintaining balance when there are changes in the speed and direction of movement of the head"
                    }
                ]
            },
            {
                id: "3.4",
                number: "3.4",
                prompt: "Wearing a face mask is recommended to reduce the spread of the coronavirus. There are some concerns about the efficiency of breathing when wearing a face mask. Scientists investigated the effect of wearing face masks on the carbon dioxide levels in blood. They: Obtained permission from 150 healthy volunteers, aged 30, to participate in the investigation Applied a sensor to the participants' skin to measure the carbon dioxide levels in the blood Asked the participants to: Sit still for 10 minutes without wearing a face mask Sit still for 10 minutes while wearing a face mask Exercise for 10 minutes without wearing a face mask Exercise for 10 minutes while wearing a face mask Allowed a 15-minute interval between each 10-minute phase Recorded the carbon dioxide levels at the end of each 10-minute phase Ensured that the face mask covered the nose and mouth",
                type: "long",
                marks: 15,
                children: [
                    {
                        id: "3.4.1a",
                        label: "3.4.1 (a)",
                        type: "short",
                        marks: 1,
                        prompt: "Identify the independent variable"
                    },
                    {
                        id: "3.4.1b",
                        label: "3.4.1 (b)",
                        type: "short",
                        marks: 1,
                        prompt: "Identify the dependent variable"
                    },
                    {
                        id: "3.4.2",
                        label: "3.4.2",
                        type: "multi",
                        marks: 2,
                        prompt: "State TWO factors that were taken into consideration in the selection of the participants"
                    },
                    {
                        id: "3.4.3",
                        label: "3.4.3",
                        type: "short",
                        marks: 1,
                        prompt: "Give ONE reason why the results at the end of this investigation may be considered reliable"
                    },
                    {
                        id: "3.4.4",
                        label: "3.4.4",
                        type: "long",
                        marks: 2,
                        prompt: "Explain why scientists allowed a 15-minute interval between each phase"
                    },
                    {
                        id: "3.4.5",
                        label: "3.4.5",
                        type: "short",
                        marks: 1,
                        prompt: "Give a reason why the carbon dioxide levels were measured while participants were sitting still"
                    },
                    {
                        id: "3.4.6",
                        label: "3.4.6",
                        type: "long",
                        marks: 7,
                        prompt: "Describe the homeostatic control of carbon dioxide when it is high in blood"
                    }
                ]
            },
            {
                id: "3.5",
                number: "3.5",
                prompt: "Read the extract below. Auxins control different aspects of growth and development in plants. They are known to influence the growth of stems and they also stimulate the development of new roots on stem cuttings in plant propagation. During plant propagation, a stem of a plant is cut and is then placed in water containing small quantities of artificial auxins. The auxins stimulate root development in the cuttings.",
                type: "long",
                marks: 7,
                image:"picture35.png",
                children: [
                    {
                        id: "3.5.1",
                        label: "3.5.1",
                        type: "multi",
                        marks: 2,
                        prompt: "Name TWO places in plants where auxins are produced"
                    },
                    {
                        id: "3.5.2",
                        label: "3.5.2",
                        type: "multi",
                        marks: 2,
                        prompt: "State TWO ways in which auxins cause an increase in the length of stems"
                    },
                    {
                        id: "3.5.3",
                        label: "3.5.3",
                        type: "short",
                        marks: 1,
                        prompt: "Name ONE other plant hormone that causes an increase in the length of stems"
                    },
                    {
                        id: "3.5.4",
                        label: "3.5.4",
                        type: "long",
                        marks: 2,
                        prompt: "Explain how auxins can be used in plant propagation to the advantage of nature conservation"
                    }
                ]
            }
        ]
    }
];

/* ------------------------------- Memo answers ------------------------------- */
// Official marking guidelines distilled into machine-gradable entries.
// For "long" answers, we use keyword matching (presence of memo-listed phrases).

const markingGuidelines = [
    // 1.1 MCQs
    { id: "1.1.1", marks: 2, type: "mcq", correct: "C" },
    { id: "1.1.2", marks: 2, type: "mcq", correct: "A" },
    { id: "1.1.3", marks: 2, type: "mcq", correct: "D" },
    { id: "1.1.4", marks: 2, type: "mcq", correct: "C" },
    { id: "1.1.5", marks: 2, type: "mcq", correct: "D" },
    { id: "1.1.6", marks: 2, type: "mcq", correct: "B" },
    { id: "1.1.7", marks: 2, type: "mcq", correct: "D" },
    { id: "1.1.8", marks: 2, type: "mcq", correct: "C" },
    { id: "1.1.9", marks: 2, type: "mcq", correct: "B" },
    { id: "1.1.10", marks: 2, type: "mcq", correct: "D" },

    // 1.2 terms
    { id: "1.2.1", marks: 1, type: "short", correct: "cranium" },
    { id: "1.2.2", marks: 1, type: "short", correct: "thermoregulation" },
    { id: "1.2.3", marks: 1, type: "short", correct: "cataract" },
    { id: "1.2.4", marks: 1, type: "short", correct: "umbilical artery" },
    { id: "1.2.5", marks: 1, type: "short", correct: "hypothalamus" },
    { id: "1.2.6", marks: 1, type: "short", correct: "peripheral nervous system" },
    { id: "1.2.7", marks: 1, type: "short", correct: "chorionic villi" },
    { id: "1.2.8", marks: 1, type: "short", correct: "aldosterone" },
    { id: "1.2.9", marks: 1, type: "short", correct: "amniotic fluid" },
    { id: "1.2.10", marks: 1, type: "short", correct: "fovea centralis" },
    { id: "1.2.10", marks: 1, type: "short", correct: "yellow spot" },

    // 1.3 matching
    { id: "1.3.1", marks: 2, type: "short", correct: "b only" },
    { id: "1.3.2", marks: 2, type: "short", correct: "a only" },
    { id: "1.3.3", marks: 2, type: "short", correct: "both a and b" },

    // 1.4 eye
    { id: "1.4.1a", marks: 2, type: "short", correct: "b iris" },
    { id: "1.4.1b", marks: 2, type: "short", correct: "a sclera" },
    { id: "1.4.2a", marks: 1, type: "short", correct: "2" },
    { id: "1.4.2b", marks: 1, type: "short", correct: "3" },
    { id: "1.4.3a", marks: 1, type: "short", correct: "circular" },
    { id: "1.4.3b", marks: 1, type: "short", correct: "circular" },

    // 1.5 endocrine
    { id: "1.5.1", marks: 1, type: "short", correct: "negative feedback mechanism" },
    { id: "1.5.2a", marks: 1, type: "short", correct: "thyroid" },
    { id: "1.5.2b", marks: 1, type: "short", correct: "tsh" },
    { id: "1.5.2b", marks: 1, type: "short", correct: "thyroid stimulating hormone" },
    { id: "1.5.2c", marks: 1, type: "short", correct: "thyroxin" },
    { id: "1.5.3", marks: 1, type: "short", correct: "goitre" },
    { id: "1.5.4", marks: 1, type: "short", correct: "a" },

    // 2.1 male repro
    { id: "2.1.1", marks: 1, type: "short", correct: "seminal vesicle" },
    { id: "2.1.2", marks: 1, type: "short", correct: "transports semen out of the body" },
    { id: "2.1.3", marks: 2, type: "multi", correct: ["transports secretions in ducts", "secretion not directly in blood", "does not produce a hormone"], policy: "firstTwo" },
    { id: "2.1.4", marks: 1, type: "short", correct: "spermatogenesis" },
    { id: "2.1.5", marks: 4, type: "long", correct: ["secretion alkaline neutralise acidity vagina urethra", "secretion contains nutrients energy movement", "secretion fluid mucus facilitates movement"] },

    // 2.2 sperm
    { id: "2.2.1", marks: 1, type: "short", correct: "acrosome" },
    { id: "2.2.2", marks: 1, type: "short", correct: "fuses with nucleus ovum carries genetic material" },
    { id: "2.2.3", marks: 2, type: "long", correct: ["produce energy cellular respiration", "needed movement sperm"] },
    { id: "2.2.4", marks: 4, type: "long", correct: ["oval torpedo shaped head facilitates faster movement", "presence acrosome enables penetrate ovum", "longer tail ensures faster movement"] },

    // 2.3 hormones graph
    { id: "2.3.1", marks: 2, type: "multi", correct: ["stimulates ovulation", "stimulates development corpus luteum"], policy: "firstTwo" },
    { id: "2.3.2a", marks: 3, type: "long", correct: ["fsh high concentration hormone a", "stimulates follicles develop", "ova produced increasing chances pregnant"] },
    { id: "2.3.2b", marks: 2, type: "long", correct: ["peak hormone b lh", "indicate ovulation happen", "ovum available fertilisation"] },
    { id: "2.3.3", marks: 3, type: "long", correct: ["levels remain low", "high progesterone pregnancy", "inhibits secretion fsh hormone a"] },

    // 2.4 ovarian hormones
    { id: "2.4", marks: 5, type: "long", correct: ["graafian follicle secretes oestrogen", "endometrium thicker glandular vascular", "corpus luteum secretes progesterone", "increases thickness endometrium", "high progesterone inhibits fsh secretion"] },

    // 2.5 fish
    { id: "2.5.1", marks: 1, type: "short", correct: "external" },
    { id: "2.5.2", marks: 2, type: "long", correct: ["embryos develop inside eggs", "outside body female"] },
    { id: "2.5.3", marks: 2, type: "long", correct: ["males release semen all around female", "large number gametes ova produced"] },
    { id: "2.5.4", marks: 1, type: "short", correct: "x" },
    { id: "2.5.5", marks: 3, type: "long", correct: ["higher number surviving embryos eggs offspring", "fertilised eggs attached vegetation", "protected predators washing away"] },

    // 2.6 glucose
    { id: "2.6.1a", marks: 1, type: "short", correct: "pancreas" },
    { id: "2.6.1a", marks: 1, type: "short", correct: "islets of langerhans" },
    { id: "2.6.1b", marks: 1, type: "short", correct: "glucagon" },
    { id: "2.6.2a", marks: 3, type: "long", correct: ["blood glucose levels remain high", "cells not able absorb glucose blood", "excess glucose not converted glycogen liver muscles"] },
    { id: "2.6.2b", marks: 1, type: "short", correct: "diabetes mellitus" },
    { id: "2.6.3", marks: 3, type: "long", correct: ["adrenalin stimulates liver", "convert glycogen glucose", "increase blood glucose levels"] },

    // 3.1 brain
    { id: "3.1.1", marks: 1, type: "short", correct: "corpus callosum" },
    { id: "3.1.2", marks: 2, type: "long", correct: ["controls vital processes heartbeat breathing", "stop damaged"] },
    { id: "3.1.3a", marks: 1, type: "short", correct: "spinal cord" },
    { id: "3.1.3b", marks: 2, type: "long", correct: ["impulses cerebrum", "not transmitted skeletal muscles"] },

    // 3.2 brain injuries
    { id: "3.2.1", marks: 1, type: "short", correct: "africa" },
    { id: "3.2.2", marks: 2, type: "long", correct: ["not all brain injuries recorded", "poor health facilities"] },
    { id: "3.2.3", marks: 6, type: "long", correct: ["bar graph type", "caption both variables", "axes labels", "equal scale intervals", "points plotted correctly 1-4", "all 5 points correctly 2"] },

    // 3.3 ear
    { id: "3.3.1", marks: 1, type: "short", correct: "cochlea" },
    { id: "3.3.2a", marks: 1, type: "short", correct: "absorbs excess pressure waves releases pressure inner ear prevents echo" },
    { id: "3.3.2b", marks: 1, type: "short", correct: "converts stimuli pressure waves impulses" },
    { id: "3.3.3", marks: 2, type: "long", correct: ["tympanic membrane not vibrate freely", "no less vibrations middle ear ossicles"] },
    { id: "3.3.4", marks: 4, type: "long", correct: ["release pressure build up drain fluid", "equalise pressure tympanic membrane prevent rupture", "allow ossicles vibrate freely"] },
    { id: "3.3.5", marks: 4, type: "long", correct: ["cristae stimulated convert stimuli impulses", "sent auditory nerve cerebellum", "interprets sends skeletal muscles restore balance"] },

    // 3.4 mask
    { id: "3.4.1a", marks: 1, type: "short", correct: "wearing facemask" },
    { id: "3.4.1b", marks: 1, type: "short", correct: "carbon dioxide levels blood" },
    { id: "3.4.2", marks: 2, type: "multi", correct: ["age", "healthy individuals"], policy: "firstTwo" },
    { id: "3.4.3", marks: 1, type: "short", correct: "150 volunteers used" },
    { id: "3.4.4", marks: 2, type: "long", correct: ["allow carbon dioxide levels blood normal", "each phase same starting point"] },
    { id: "3.4.5", marks: 1, type: "short", correct: "act control baseline see facemask affects not physical activity" },
    { id: "3.4.6", marks: 7, type: "long", correct: ["receptors carotid artery stimulated", "impulses medulla oblongata", "stimulates heart beat faster more co2 lungs", "breathing muscles intercostal diaphragm contract actively", "rate depth breathing increases", "more co2 exhaled", "carbon dioxide level blood decreases normal"] },

    // 3.5 auxins
    { id: "3.5.1", marks: 2, type: "multi", correct: ["apical tip stem bud", "apical tip root"], policy: "firstTwo" },
    { id: "3.5.2", marks: 2, type: "multi", correct: ["stimulate cell division mitosis", "stimulate cell elongation"], policy: "firstTwo" },
    { id: "3.5.3", marks: 1, type: "short", correct: "gibberellins" },
    { id: "3.5.4", marks: 2, type: "long", correct: ["increased plant growth", "saves species facing extinction"] }
];

/* ------------------------------- Evaluator ---------------------------------- */

function evaluateSubmission(answers, memo) {
    const perQuestion = {};
    let totalAwarded = 0;

    memo.forEach(entry => {
        const learner = answers[entry.id];
        const max = entry.marks;

        let awarded = 0;
        let feedback = "";

        if (entry.type === "mcq" || entry.type === "short") {
            const corr = entry.correct;
            const learnerStr = typeof learner === "string" ? learner : "";
            const left = normalize(learnerStr);
            const right = normalize(corr);

            awarded = left === right ? max : 0;
        } else if (entry.type === "multi") {
            const corrList = Array.isArray(entry.correct) ? entry.correct.map(normalize) : [normalize(entry.correct)];
            const learnerList = Array.isArray(learner)
                ? learner.map(normalize)
                : (typeof learner === "string" ? learner.split("\n").map(s => normalize(s)) : []);

            const firstCount =
                entry.policy === "firstOne" ? 1 :
                    entry.policy === "firstTwo" ? 2 :
                        entry.policy === "firstThree" ? 3 : corrList.length;

            const considered = learnerList.slice(0, firstCount);
            const correctHits = considered.filter(ans => corrList.includes(ans)).length;

            awarded = Math.min(correctHits, max);
            feedback = `Marked first ${firstCount} item(s). ${correctHits} correct item(s) recognised.`;
        } else if (entry.type === "long") {
            const corrList = Array.isArray(entry.correct) ? entry.correct : [entry.correct];
            const learnerStr = typeof learner === "string" ? normalize(learner) : "";
            const matches = corrList.filter(k => {
                const key = normalize(k);
                return key && learnerStr.includes(key);
            }).length;
            awarded = Math.min(matches, max);
            feedback = matches > 0 ? `Detected ${matches} key point(s).` : "No required key points detected.";
        }

        perQuestion[entry.id] = {
            awarded,
            max,
            correct: entry.correct,
            learner,
            feedback
        };
        totalAwarded += awarded;
    });

    return { totalAwarded, perQuestion };
}

function normalize(s) {
    return (s || "").trim().toLowerCase();
}

/* ------------------------------ UI components ------------------------------ */

const PaperInstructions = () => (
    <section className="instructions">
        <h3>Instructions and information</h3>
        <ul>
            <li>Answer ALL the questions.</li>
            <li>Write ALL the answers in the ANSWER BOOK (digitally captured here).</li>
            <li>Start the answers to EACH question at the top of a NEW page (sections are separated below).</li>
            <li>Number the answers correctly according to the numbering system used in this question paper.</li>
            <li>Present your answers according to the instructions of each question.</li>
            <li>Draw diagrams, tables or flow charts only when asked to do so.</li>
            <li>Use a non-programmable calculator, protractor and compass where necessary.</li>
            <li>Write neatly and legibly.</li>
        </ul>
    </section>
);

const Section = ({ section, answers, onChange }) => (
    <section className="paper-section">
        <h2>{section.title}</h2>
        <p className="marks">Total for this section: {section.totalMarks}</p>
        {section.questions.map(q => (
            <QuestionBlock
                key={q.id}
                question={q}
                answers={answers}
                onChange={onChange}
            />
        ))}
    </section>
);

const QuestionBlock = ({ question, answers, onChange }) => {
    const value = answers[question.id];

    return (
        <div className="question">

            {/* Header */}
            <div className="question-header">
                <strong>{question.number}</strong>
                <span className="marks">{question.marks} mark(s)</span>
            </div>

            {/* Prompt */}
            <p className="prompt">{question.prompt}</p>

            {/* ---------- IMAGE HERE ---------- */}
            {question.image && (
                <div className="question-image">
                    <img
                        src={`/assets3/${question.image}`}
                        alt="question visual"
                        style={{ maxWidth: "100%", marginTop: "10px" }}
                    />
                </div>
            )}
            {/* ---------- END IMAGE ---------- */}

            {/* Main Question (no children) */}
            {!question.children && (
                <InputForQuestion
                    qid={question.id}
                    type={question.type}
                    options={question.options}
                    value={value}
                    onChange={onChange}
                />
            )}

            {/* Sub-questions */}
            {question.children && (
                <div className="subparts">
                    {question.children.map(c => {
                        const subVal = answers[c.id];
                        return (
                            <div className="subpart" key={c.id}>

                                {c.label && <strong>{c.label}</strong>}
                                {c.prompt && <p className="prompt">{c.prompt}</p>}

                                {/* ---------- IMAGE FOR SUBPART ---------- */}
                                {c.image && (
                                    <img
                                        src={`/assets3/${c.image}`}
                                        alt="sub-question visual"
                                        style={{ maxWidth: "100%", margin: "8px 0" }}
                                    />
                                )}
                                {/* ---------- END IMAGE ---------- */}

                                <InputForQuestion
                                    qid={c.id}
                                    type={c.type}
                                    options={c.options}
                                    value={subVal}
                                    onChange={onChange}
                                />
                                <span className="marks small">{c.marks} mark(s)</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const InputForQuestion = ({ qid, type, options, value, onChange }) => {
    if (type === "mcq") {
        return (
            <div className="mcq">
                {options?.map(opt => (
                    <label key={opt.letter} className="mcq-option">
                        <input
                            type="radio"
                            name={qid}
                            value={opt.letter}
                            checked={value === opt.letter}
                            onChange={() => onChange(qid, opt.letter)}
                        />
                        <span>{opt.letter}. {opt.text}</span>
                    </label>
                ))}
            </div>
        );
    }
    if (type === "short") {
        return (
            <input
                type="text"
                placeholder="Your answer"
                value={value || ""}
                onChange={e => onChange(qid, e.target.value)}
            />
        );
    }
    if (type === "multi") {
        return (
            <textarea
                placeholder="Enter multiple items (one per line)"
                value={Array.isArray(value) ? value.join("\n") : value || ""}
                onChange={e =>
                    onChange(qid, e.target.value.split("\n").map(s => s.trim()).filter(Boolean))
                }
            />
        );
    }
    return (
        <textarea
            placeholder="Write your full answer"
            value={value || ""}
            onChange={e => onChange(qid, e.target.value)}
            rows={4}
        />
    );
};

const ResultsPanel = ({ result, totalMarks, questions, onReset }) => {
    const percentage = Math.round((result.totalAwarded / totalMarks) * 100);
    return (
        <section className="results">
            <h2>Your results</h2>
            <p>
                <strong>Score:</strong> {result.totalAwarded} / {totalMarks} ({percentage}%)
            </p>
            <div className="feedback-list">
                {questions.map(sec => (
                    <div className="feedback-section" key={sec.id}>
                        <h3>{sec.title}</h3>
                        {sec.questions.map(q => {
                            const entry = result.perQuestion[q.id];
                            return (
                                <div className="feedback-question" key={q.id}>
                                    <div className="feedback-header">
                                        <strong>{q.number}</strong>
                                        <span>{entry?.awarded ?? 0} / {entry?.max ?? q.marks}</span>
                                    </div>
                                    <p className="prompt">{q.prompt}</p>
                                    {!q.children && entry && (
                                        <div className="feedback-body">
                                            <p><strong>Your answer:</strong> {format(entry.learner)}</p>
                                            <p><strong>Correct answer:</strong> {format(entry.correct)}</p>
                                            {entry.feedback && <p className="feedback-note">{entry.feedback}</p>}
                                        </div>
                                    )}
                                    {q.children && q.children.map(c => {
                                        const sub = result.perQuestion[c.id];
                                        return (
                                            <div className="feedback-sub" key={c.id}>
                                                <p><strong>{c.label || ""}</strong> {sub?.awarded ?? 0} / {sub?.max ?? c.marks}</p>
                                                <p><strong>Your answer:</strong> {format(sub?.learner)}</p>
                                                <p><strong>Correct answer:</strong> {format(sub?.correct)}</p>
                                                {sub?.feedback && <p className="feedback-note">{sub.feedback}</p>}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <div className="actions">
                <button onClick={onReset}>Try again</button>
            </div>
            <blockquote>
                Marking follows the official memo (e.g., “mark first TWO only”, “first ONE only”, and keyword credit for long answers).
            </blockquote>
        </section>
    );
};

function format(val) {
    if (val === undefined) return "—";
    return Array.isArray(val) ? val.join("; ") : String(val);
}

/* --------------------------------- App root -------------------------------- */

function LifeScienceP1Nov2022Eng() {
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState(null);
    // Timer states
    const [timeLeft, setTimeLeft] = useState(105 * 60); // 105 minutes in seconds
    const [timerActive, setTimerActive] = useState(true);

    const totalMarks = useMemo(
        () => questions.reduce((sum, sec) => sum + sec.totalMarks, 0),
        [questions]
    );

    const onChange = useCallback((qid, value) => {
        setAnswers(prev => ({ ...prev, [qid]: value }));
    }, []);

    const onSubmit = useCallback(() => {
        const evalResult = evaluateSubmission(answers, markingGuidelines);
        setResult(evalResult);
        setSubmitted(true);
        setTimerActive(false); // Stop timer
    }, [answers, markingGuidelines]);

    const onReset = useCallback(() => {
        setAnswers({});
        setSubmitted(false);
        setResult(null);
        setTimeLeft(105 * 60);
        setTimerActive(true);
    }, []);

    // Countdown effect
    useEffect(() => {
        if (!timerActive || submitted) return;
        if (timeLeft <= 0) {
            onSubmit(); // Auto-submit
            return;
        }
        const interval = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft, timerActive, submitted, onSubmit]);

    // Format time
    const formatTime = (secs) => {
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = secs % 60;
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    // JSX RETURN STATEMENT - ENSURE THIS IS INSIDE THE FUNCTION
    return (
        <div className="app">
            <StyleInjector />
            <header>
                <h1>NATIONAL SENIOR CERTIFICATE</h1>
                <h2>GRADE 12 – LIFE SCIENCES P1 – NOVEMBER 2022</h2>
                <p>Marks: {totalMarks} | Time: 2½ hours</p>
                <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: timeLeft < 300 ? "red" : "green" }}>
                    ⏳ Time Remaining: {formatTime(timeLeft)}
                </div>
            </header>

            <PaperInstructions />

            {!submitted && (
                <>
                    {questions.map(section => (
                        <Section
                            key={section.id}
                            section={section}
                            answers={answers}
                            onChange={onChange}
                        />
                    ))}
                    <div className="actions">
                        <button onClick={onSubmit} disabled={Object.keys(answers).length === 0}>
                            Submit answers
                        </button>
                        <button className="secondary" onClick={onReset}>Clear all</button>
                    </div>
                </>
            )}

            {submitted && result && (
                <ResultsPanel
                    result={result}
                    totalMarks={totalMarks}
                    questions={questions}
                    onReset={onReset}
                />
            )}

            <footer>
                <p>This digital paper mirrors the DBE Life Sciences P1 November 2022. Marking uses the official memo.</p>
            </footer>
        </div>
    );
}  // <-- THIS CLOSING } MATCHES function App() {

export default LifeScienceP1Nov2022Eng;