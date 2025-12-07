// App.js
// Complete single-file React app (JavaScript) that digitizes
// Life Sciences P1 November 2021 with answering, submission,
// auto-marking, per-question feedback, and results.
//
// Usage:
// - Drop this into a Create React App or Vite React project as src/App.js
// - Ensure React is installed
// - Add the style tag below to index.html or keep styles inline here (see StyleInjector)

import React, { useMemo, useState, useEffect, useCallback } from "react";


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
                        prompt: "Grommets are used in the treatment of …",
                        options: [
                            { letter: "A", text: "deafness." },
                            { letter: "B", text: "blindness." },
                            { letter: "C", text: "middle-ear infection." },
                            { letter: "D", text: "multiple sclerosis." }
                        ]
                    },
                    {
                        id: "1.1.2",
                        label: "1.1.2",
                        type: "mcq",
                        marks: 2,
                        prompt: "The function of the umbilical vein is to transport …",
                        options: [
                            { letter: "A", text: "carbon dioxide from the foetus to the mother." },
                            { letter: "B", text: "nutrients from the foetus to the mother." },
                            { letter: "C", text: "carbon dioxide from the mother to the foetus." },
                            { letter: "D", text: "nutrients from the mother to the foetus." }
                        ]
                    },
                    {
                        id: "1.1.3",
                        label: "1.1.3",
                        type: "mcq",
                        marks: 2,
                        prompt: "The diagram below represents the events that occur during the homeostatic control of blood glucose. Which ONE of the following represents gland X and hormone Y?",
                        options: [
                            { letter: "A", text: "Pancreas / Glucagon" },
                            { letter: "B", text: "Pituitary / Glucagon" },
                            { letter: "C", text: "Pancreas / Insulin" },
                            { letter: "D", text: "Pituitary / Insulin" }
                        ]
                    },
                    {
                        id: "1.1.4",
                        label: "1.1.4",
                        type: "mcq",
                        marks: 2,
                        prompt: "Which ONE of the following is CORRECT regarding the homeostatic control of the carbon dioxide concentration in the blood?",
                        options: [
                            { letter: "A", text: "The lungs have receptors." },
                            { letter: "B", text: "High oxygen levels is the stimulus." },
                            { letter: "C", text: "Breathing muscles are the effectors." },
                            { letter: "D", text: "The process is controlled by the cerebrum." }
                        ]
                    },
                    {
                        id: "1.1.5",
                        label: "1.1.5",
                        type: "mcq",
                        marks: 2,
                        prompt: "The plant hormones that can be used to kill broad-leaved weeds are …",
                        options: [
                            { letter: "A", text: "abscisic acid only." },
                            { letter: "B", text: "abscisic acid and gibberellins." },
                            { letter: "C", text: "auxins only." },
                            { letter: "D", text: "abscisic acid and auxins." }
                        ]
                    },
                    {
                        id: "1.1.6",
                        label: "1.1.6",
                        type: "mcq",
                        marks: 2,
                        prompt: "A girl looking at a car moving away from her is able to focus on the letters on the number plate. Which ONE of the following changes occurred in her eyes?",
                        options: [
                            { letter: "A", text: "The suspensory ligaments slackened." },
                            { letter: "B", text: "The ciliary muscles relaxed." },
                            { letter: "C", text: "Light rays were refracted more." },
                            { letter: "D", text: "The lens became more convex." }
                        ]
                    },
                    {
                        id: "1.1.7",
                        label: "1.1.7",
                        type: "mcq",
                        marks: 2,
                        image: "picture1_1_7.png",
                        prompt: "One of the characteristics of a sperm that causes it to move faster is the …",
                        options: [
                            { letter: "A", text: "oval-shaped head." },
                            { letter: "B", text: "haploid nucleus." },
                            { letter: "C", text: "presence of enzymes in the acrosome." },
                            { letter: "D", text: "absence of a middle piece." }
                        ]
                    },
                    {
                        id: "1.1.8",
                        label: "1.1.8",
                        type: "mcq",
                        marks: 2,
                        prompt: "In a person suffering from long-sightedness, …",
                        options: [
                            { letter: "A", text: "the eyeball is longer than normal." },
                            { letter: "B", text: "light rays fall behind the retina." },
                            { letter: "C", text: "light rays are refracted more by the lens." },
                            { letter: "D", text: "distant objects will appear blurred." }
                        ]
                    },
                    {
                        id: "1.1.9",
                        label: "1.1.9",
                        type: "mcq",
                        marks: 2,
                        prompt: "The graph below shows the results of an investigation done to determine the effect of light intensity on the size of the pupil. Which ONE of the following statements is a conclusion that can be made from the results?",
                        options: [
                            { letter: "A", text: "As the distance from the light source increases, the size of the pupil increases." },
                            { letter: "B", text: "As the distance from the light source decreases, the size of the pupil increases." },
                            { letter: "C", text: "As the size of the pupil increases, the distance from the light source increases." },
                            { letter: "D", text: "As the size of the pupil decreases, the distance from the light source increases." }
                        ]
                    },
                    {
                        id: "1.1.10",
                        label: "1.1.10",
                        type: "mcq",
                        marks: 2,
                        prompt: "The following is a list of events that occur in the female body: (i) Puberty (ii) Ovulation (iii) Development of the corpus luteum (iv) Oogenesis (v) Thickening of the endometrium. Which ONE of the following is a combination of events that are influenced by LH (luteinising hormone)?",
                        options: [
                            { letter: "A", text: "(i), (ii), (iii), (iv) and (v)" },
                            { letter: "B", text: "(ii), (iii), (iv) and (v) only" },
                            { letter: "C", text: "(ii) and (iii) only" },
                            { letter: "D", text: "(iii) only" }
                        ]
                    },
                ]
            },
            {
                id: "1.2",
                number: "1.2",
                prompt: "Give the correct biological term for each of the following descriptions. Write only the term next to the question numbers (1.2.1 to 1.2.8) in the ANSWER BOOK.",
                type: "long",
                marks: 8,
                image: "picyure12.png",
                children: [
                    { id: "1.2.1", label: "1.2.1", type: "short", marks: 1, prompt: "The release of an ovum from the ovary" },
                    { id: "1.2.2", label: "1.2.2", type: "short", marks: 1, prompt: "The microscopic gap between two consecutive neurons" },
                    { id: "1.2.3", label: "1.2.3", type: "short", marks: 1, prompt: "The period of development of the foetus in the uterus" },
                    { id: "1.2.4", label: "1.2.4", type: "short", marks: 1, prompt: "The growth movement of a plant in response to a stimulus" },
                    { id: "1.2.5", label: "1.2.5", type: "short", marks: 1, prompt: "The type of development in birds where the young are able to independently move and feed themselves after hatching" },
                    { id: "1.2.6", label: "1.2.6", type: "short", marks: 1, prompt: "The extra-embryonic membrane that is responsible for the excretion of waste in an amniotic egg" },
                    { id: "1.2.7", label: "1.2.7", type: "short", marks: 1, prompt: "Tubules in the testes where spermatogenesis occurs" },
                    { id: "1.2.8", label: "1.2.8", type: "short", marks: 1, prompt: "The plant hormone that brings about seed dormancy when conditions are unfavourable" },
                ]
            },
            {
                id: "1.3",
                number: "1.3",
                prompt: "Indicate whether each of the descriptions in COLUMN I apply to A ONLY, B ONLY, BOTH A AND B or NONE of the items in COLUMN II. Write A only, B only, both A and B, or none next to the question number (1.3.1 to 1.3.3) in the ANSWER BOOK.",
                type: "long",
                marks: 6,
                image: "picture13.png",
                children: [
                    {
                        id: "1.3.1",
                        label: "1.3.1",
                        type: "short",
                        marks: 2,
                        prompt: "An exocrine gland",
                        options: [
                            { letter: "A", text: "Cowper's gland" },
                            { letter: "B", text: "Pancreas" }
                        ]
                    },
                    {
                        id: "1.3.2",
                        label: "1.3.2",
                        type: "short",
                        marks: 2,
                        prompt: "A component of the peripheral nervous system",
                        options: [
                            { letter: "A", text: "Cranial nerves" },
                            { letter: "B", text: "Spinal cord" }
                        ]
                    },
                    {
                        id: "1.3.3",
                        label: "1.3.3",
                        type: "short",
                        marks: 2,
                        prompt: "A disorder of the nervous system characterised by the degeneration of the brain cells",
                        options: [
                            { letter: "A", text: "Goitre" },
                            { letter: "B", text: "Alzheimer's disease" }
                        ]
                    },
                ]
            },
            {
                id: "1.4",
                number: "1.4",
                prompt: "The diagram below shows the parts of the male reproductive system.",
                type: "long",
                marks: 11,
                image: "picture14.png", // Assume image for male reproductive system diagram
                children: [
                    {
                        id: "1.4.1a",
                        label: "1.4.1 (a)",
                        type: "short",
                        marks: 1,
                        prompt: "Identify part: (a) C"
                    },
                    {
                        id: "1.4.1b",
                        label: "1.4.1 (b)",
                        type: "short",
                        marks: 1,
                        prompt: "(b) F"
                    },
                    {
                        id: "1.4.1c",
                        label: "1.4.1 (c)",
                        type: "short",
                        marks: 1,
                        prompt: "(c) H"
                    },
                    {
                        id: "1.4.2a",
                        label: "1.4.2 (a)",
                        type: "short",
                        marks: 2,
                        prompt: "Give the LETTER and NAME of the part that: (a) Stores sperm temporarily"
                    },
                    {
                        id: "1.4.2b",
                        label: "1.4.2 (b)",
                        type: "short",
                        marks: 2,
                        prompt: "(b) Transports both semen and urine"
                    },
                    {
                        id: "1.4.2c",
                        label: "1.4.2 (c)",
                        type: "short",
                        marks: 2,
                        prompt: "(c) Produces testosterone"
                    },
                    {
                        id: "1.4.3",
                        label: "1.4.3",
                        type: "multi",
                        marks: 2,
                        prompt: "Give the LETTERS of TWO parts that contribute to the formation of semen."
                    }
                ]
            },
            {
                id: "1.5",
                number: "1.5",
                prompt: "The diagram below represents an ovum and a sperm.",
                type: "long",
                marks: 7,
                image: "picture15.png",
                children: [
                    { id: "1.5.1a", label: "1.5.1 (a)", type: "short", marks: 1, prompt: "Identify part: (a) B" },
                    { id: "1.5.1b", label: "1.5.1 (b)", type: "short", marks: 1, prompt: "(b) D" },
                    { id: "1.5.1c", label: "1.5.1 (c)", type: "short", marks: 1, prompt: "(c) H" },
                    { id: "1.5.2", label: "1.5.2", type: "short", marks: 1, prompt: "Name the organelle found in large numbers in part G." },
                    { id: "1.5.3", label: "1.5.3", type: "multi", marks: 2, prompt: "Give the LETTERS of the TWO parts that fuse during fertilisation." },
                    { id: "1.5.4", label: "1.5.4", type: "short", marks: 1, prompt: "Name the meiotic process whereby ova are produced." },
                ]
            },
        ]
    },
    {
        id: "sectionB",
        title: "SECTION B – Question 2",
        totalMarks: 50,
        questions: [
            {
                id: "2.1",
                number: "2.1",
                prompt: "In some frog species, during mating, the male climbs onto the back of the female and grasps her with his front legs. The female releases about 6 000 ova, while the male releases sperm onto the female. This mating behaviour is called amplexus.",
                type: "long",
                marks: 7,
                children: [
                    { id: "2.1.1", label: "2.1.1", type: "short", marks: 1, prompt: "Name the type of fertilisation that occurs during reproduction in frogs." },
                    { id: "2.1.2", label: "2.1.2", type: "long", marks: 2, prompt: "Explain why the fertilised eggs of these frogs do not survive on land." },
                    { id: "2.1.3", label: "2.1.3", type: "long", marks: 2, prompt: "Explain how amplexus increases the chances of fertilisation in frogs." },
                    { id: "2.1.4", label: "2.1.4", type: "long", marks: 2, prompt: "From the information above, explain ONE other strategy that contributes to the reproductive success of the frog species." },
                ]
            },
            {
                id: "2.2",
                number: "2.2",
                prompt: "The diagram below represents the structure of the human eye.",
                type: "long",
                marks: 13,
                image: "picture22.png",
                children: [
                    { id: "2.2.1", label: "2.2.1", type: "short", marks: 1, prompt: "Identify part C." },
                    { id: "2.2.2", label: "2.2.2", type: "short", marks: 1, prompt: "Give ONE function of part E." },
                    { id: "2.2.3", label: "2.2.3", type: "short", marks: 1, prompt: "State why the clearest image will form when light rays fall on part D." },
                    { id: "2.2.4", label: "2.2.4", type: "long", marks: 4, prompt: "Explain ONE way in which part B is structurally different from part F." },
                    { id: "2.2.5", label: "2.2.5", type: "long", marks: 3, prompt: "Describe how the muscles in part A function to increase the amount of light entering the eye." },
                    { id: "2.2.6", label: "2.2.6", type: "long", marks: 3, prompt: "Describe how a blurred image forms if a person with normal vision wears spectacles with biconvex lenses while reading a book." },
                ]
            },
            {
                id: "2.3",
                number: "2.3",
                prompt: "Read the extract below. Ovarian cysts are fluid-filled structures that develop inside the ovaries of some women. The two most common types are follicular cysts and corpus luteum cysts. Follicular cysts develop when a Graafian follicle fails to rupture and release the ovum. The follicle continues to grow because of continued hormonal stimulation. A corpus luteum cyst develops when the corpus luteum does not degenerate, even when a person is not pregnant. Women often show no symptoms and the cysts disappear, but in rare cases ovarian cysts may rupture increasing leading to internal bleeding. Such cysts will require surgical removal.",
                type: "long",
                marks: 8,
                image: "picture23.png",
                children: [
                    { id: "2.3.1", label: "2.3.1", type: "short", marks: 1, prompt: "From the extract, give: (a) TWO structures in the ovary that may develop into cysts (b) TWO symptoms associated with very large cysts" },
                    { id: "2.3.2", label: "2.3.2", type: "multi", marks: 2, prompt: "Name the hormone: (a) Responsible for the growth of the follicle under normal conditions (b) That will be high in concentration in the blood of women where follicular cysts develop" },
                    { id: "2.3.3", label: "2.3.3", type: "short", marks: 1, prompt: "Give a reason for your answer to QUESTION 2.3.2(b)." },
                    { id: "2.3.4", label: "2.3.4", type: "long", marks: 4, prompt: "Explain why a woman will not be able to fall pregnant if she has a corpus luteum cyst that does not disappear." },
                ]
            },
            {
                id: "2.4",
                number: "2.4",
                prompt: "Describe the process of hearing.",
                type: "long",
                marks: 7
            },
            {
                id: "2.5",
                number: "2.5",
                prompt: "The efficiency and speed of the knee-jerk reaction is very important for balance and posture. The stimulation of the patellar tendon, just below the knee cap (patella), causes the contraction and relaxation of the quadriceps muscle in the upper leg. The diagram contains only ONE synapse. The arrows indicate the transmission of nerve impulses.",
                type: "long",
                marks: 13,
                image: "picture25.png",
                children: [
                    { id: "2.5.1", label: "2.5.1", type: "long", marks: 2, prompt: "What is a reflex action?" },
                    { id: "2.5.2a", label: "2.5.2 (a)", type: "short", marks: 1, prompt: "State: (a) ONE reason why a synapse is significant" },
                    { id: "2.5.2b", label: "2.5.2 (b)", type: "short", marks: 1, prompt: "(b) The importance of the knee-jerk reaction" },
                    { id: "2.5.3", label: "2.5.3", type: "long", marks: 9, prompt: "Describe the pathway of the impulse in this reflex arc to bring about the knee-jerk reaction." },
                ]
            },
        ]
    },
    {
        id: "sectionB2",
        title: "SECTION B – Question 3",
        totalMarks: 50,
        questions: [
            {
                id: "3.1",
                number: "3.1",
                prompt: "Read the extract below. Age and family history are the known risk factors for Alzheimer’s disease. The most common symptom of Alzheimer’s disease is a worsening ability to remember new information. Regular exercise may help to reduce the risk of developing Alzheimer’s disease because it can improve blood flow to the hippocampus. The hippocampus is located deep inside the cerebrum and plays a major role in learning ability and orientation. Scientists conducted an investigation to determine if regular exercise reduces the risk of Alzheimer’s disease in humans. They: Used 37 female participants between the ages of 65 and 75 in an exercise programme. The start of the investigation did not show symptoms of Alzheimer’s disease at the start. Conducted the investigation three times a week for three months. The results showed an improvement in higher-order thinking abilities and an increase in blood flow to the cerebrum.",
                type: "long",
                marks: 14,
                image: "picture31.png",
                children: [
                    { id: "3.1.1", label: "3.1.1", type: "short", marks: 1, prompt: "State ONE change in the nerve tissue of the brain that can cause Alzheimer’s disease." },
                    { id: "3.1.2a", label: "3.1.2 (a)", type: "short", marks: 1, prompt: "From the extract, state: (a) ONE symptom of Alzheimer’s disease" },
                    { id: "3.1.2b", label: "3.1.2 (b)", type: "short", marks: 1, prompt: "(b) A genetic risk factor" },
                    { id: "3.1.2c", label: "3.1.2 (c)", type: "multi", marks: 2, prompt: "(c) TWO functions of the hippocampus" },
                    { id: "3.1.3", label: "3.1.3", type: "multi", marks: 2, prompt: "Name TWO factors that were considered when selecting the participants for this investigation." },
                    { id: "3.1.4", label: "3.1.4", type: "multi", marks: 2, prompt: "State TWO ways in which the scientists improved the reliability of their results." },
                    { id: "3.1.5", label: "3.1.5", type: "long", marks: 2, prompt: "Explain why this investigation cannot be used to conclude that exercise reduces the risk of getting Alzheimer’s disease." },
                    { id: "3.1.6", label: "3.1.6", type: "long", marks: 3, prompt: "From the extract, explain how regular exercise can reduce the risk of Alzheimer’s disease." },
                ]
            },
            {
                id: "3.2",
                number: "3.2",
                prompt: "The diagrams below show the human brain and human kidney.",
                type: "long",
                marks: 14,
                image: "picture32.png",
                children: [
                    { id: "3.2.1a", label: "3.2.1 (a)", type: "short", marks: 1, prompt: "Identify part A." },
                    { id: "3.2.1b", label: "3.2.1 (b)", type: "short", marks: 1, prompt: "(b) Part C" },
                    { id: "3.2.2", label: "3.2.2", type: "short", marks: 1, prompt: "A person sustained a head injury in a car accident and lost his memory. Write down the LETTER and NAME of the part of the brain that was affected." },
                    { id: "3.2.3", label: "3.2.3", type: "long", marks: 2, prompt: "During an emergency situation, gland E releases a hormone that prepares the body for a 'fight or flight' response by stimulating an increase in breathing rate and heart rate. This increase leads to increased energy production in the skeletal muscles and an increase in blood carbon dioxide levels. Name the hormone secreted by gland E in an emergency situation." },
                    { id: "3.2.4a", label: "3.2.4 (a)", type: "long", marks: 4, prompt: "(a) Explain how an increase in breathing rate and heart rate results in increased energy production in skeletal muscles." },
                    { id: "3.2.4b", label: "3.2.4 (b)", type: "long", marks: 4, prompt: "(b) Describe how part B is involved in carbon dioxide homeostasis." },
                    { id: "3.2.5", label: "3.2.5", type: "long", marks: 1, prompt: "Identify blood vessel B." },
                ]
            },
            {
                id: "3.3",
                number: "3.3",
                prompt: "A twelve-year-old boy participated in physical exercise for 45 minutes, measured and the results were recorded. The skin temperature of the boy was measured and the results were recorded before and after the exercise. The diagram below represents the skin of the boy before exercise. The graph below shows the changes in skin temperature over a period of time.",
                type: "long",
                marks: 13,
                children: [
                    { id: "3.3.1a", label: "3.3.1 (a)", type: "short", marks: 1, prompt: "Name the: (a) Homeostatic mechanism that brings about the change in skin temperature" },
                    { id: "3.3.1b", label: "3.3.1 (b)", type: "short", marks: 1, prompt: "(b) Part of the brain that is responsible for the mechanism named in QUESTION 3.3.1(a)" },
                    { id: "3.3.2a", label: "3.3.2 (a)", type: "short", marks: 1, prompt: "State ONE effector involved in the control of body temperature." },
                    { id: "3.3.2b", label: "3.3.2 (b)", type: "short", marks: 1, prompt: "(b) ONE structure in the skin that transports blood to the surface of the skin." },
                    { id: "3.3.3", label: "3.3.3", type: "long", marks: 3, prompt: "Calculate the percentage decrease in skin temperature from 37.4 °C to 35.4 °C. Show ALL your working." },
                    { id: "3.3.4", label: "3.3.4", type: "long", marks: 6, prompt: "Explain why the skin temperature decreased." },
                ]
            },
            {
                id: "3.4",
                number: "3.4",
                prompt: "A group of learners conducted an investigation to determine the effect of auxins on the growth of stems in bean seedlings. The procedure was as follows: 30 bean seeds were allowed to germinate for 5 days to produce seedlings. The seedlings were divided into 3 groups (A, B and C) of 10 seedlings each. The tips of all the seedlings were cut at the same length. In group A, the cut tip was placed back on top of the young stem. In group B, the tip was not placed back. In group C, a piece of plastic was placed on top of the cut surface and the tip was then placed on top of the plastic. The seedlings in all the groups were placed in a dark cupboard for a week. The growth of the stem was then observed. The diagram below shows how the seedlings in each group were treated.",
                type: "long",
                marks: 10,
                image: "picture34.png",
                children: [
                    { id: "3.4.1", label: "3.4.1", type: "short", marks: 1, prompt: "Identify the dependent variable in this investigation." },
                    { id: "3.4.2", label: "3.4.2", type: "short", marks: 1, prompt: "Why did the learners cut the tips of the young stems?" },
                    { id: "3.4.3", label: "3.4.3", type: "short", marks: 1, prompt: "Give ONE reason why 10 bean seedlings were used in each group." },
                    { id: "3.4.4", label: "3.4.4", type: "short", marks: 2, prompt: "Write down the LETTER(S) (A, B or C) of the group(s) where there will be no upward growth of the stem." },
                    { id: "3.4.5", label: "3.4.5", type: "long", marks: 3, prompt: "Describe how auxins cause apical dominance." },
                    { id: "3.4.6a", label: "3.4.6 (a)", type: "short", marks: 1, prompt: "Name the plant hormone: (a) Other than auxins, that promotes the germination of seeds" },
                    { id: "3.4.6b", label: "3.4.6 (b)", type: "short", marks: 1, prompt: "(b) That inhibits the germination of seeds" },
                ]
            },
            {
                id: "3.5",
                number: "3.5",
                prompt: "Read the extract below. The bluefin tuna, the great white shark and the bottlenose dolphin are three aquatic species that are found in the Indian Ocean. An adult bluefin tuna releases up to 540 000 000 eggs into the water annually, while the great white shark female produces 2 to 12 offspring through ovovivipary every two years. A bottlenose dolphin female, being a mammal, is viviparous and produces one offspring every two to three years.",
                type: "long",
                marks: 7,
                image: "picture35.png",
                children: [
                    { id: "3.5.1", label: "3.5.1", type: "short", marks: 1, prompt: "Name the type of fertilisation that takes place in the bottlenose dolphin." },
                    { id: "3.5.2", label: "3.5.2", type: "long", marks: 4, prompt: "Explain how TWO of the reproductive strategies of the great white shark increase its reproductive success." },
                    { id: "3.5.3", label: "3.5.3", type: "long", marks: 2, prompt: "Explain ONE reason why the bluefin tuna releases a large number of eggs." },
                ]
            },
        ]
    }
];

/* ------------------------------- Memo answers ------------------------------- */
// Official marking guidelines distilled into machine-gradable entries.
// For "long" answers, we use keyword matching (presence of memo-listed phrases).

const markingGuidelines = [
    // 1.1 MCQs
    { id: "1.1.1", marks: 2, type: "mcq", correct: "C" },
    { id: "1.1.2", marks: 2, type: "mcq", correct: "D" },
    { id: "1.1.3", marks: 2, type: "mcq", correct: "A" },
    { id: "1.1.4", marks: 2, type: "mcq", correct: "C" },
    { id: "1.1.5", marks: 2, type: "mcq", correct: "C" },
    { id: "1.1.6", marks: 2, type: "mcq", correct: "B" },
    { id: "1.1.7", marks: 2, type: "mcq", correct: "A" },
    { id: "1.1.8", marks: 2, type: "mcq", correct: "B" },
    { id: "1.1.9", marks: 2, type: "mcq", correct: "D" },

    { id: "1.1.10", marks: 2, type: "mcq", correct: "C" },

    // 1.2 terms
    { id: "1.2.1", marks: 1, type: "short", correct: "ovulation" },
    { id: "1.2.2", marks: 1, type: "short", correct: "synapse" },
    { id: "1.2.3", marks: 1, type: "short", correct: "gestation" },
    { id: "1.2.4", marks: 1, type: "short", correct: "tropism" },
    { id: "1.2.5", marks: 1, type: "short", correct: "precocial" },
    { id: "1.2.6", marks: 1, type: "short", correct: "allantois" },
    { id: "1.2.7", marks: 1, type: "short", correct: "seminiferous tubules" },
    { id: "1.2.8", marks: 1, type: "short", correct: "abscisic acid" },

    // 1.3
    { id: "1.3.1", marks: 2, type: "short", correct: "b only" },
    { id: "1.3.2", marks: 2, type: "short", correct: "a only" },
    { id: "1.3.3", marks: 2, type: "short", correct: "b only" },

    // 1.4 ear
    { id: "1.4.1a", marks: 1, type: "short", correct: "c" },
    { id: "1.4.1b", marks: 1, type: "short", correct: "c" },
    { id: "1.4.1c", marks: 1, type: "short", correct: "b" },
    { id: "1.4.2a", marks: 2, type: "short", correct: "e cochlea" },
    { id: "1.4.2b", marks: 2, type: "short", correct: "d ossicles" },
    { id: "1.4.3a", marks: 2, type: "multi", correct: ["a", "b"], policy: "firstTwo" },

    // 1.5
    { id: "1.5.1a", marks: 1, type: "short", correct: "b" },
    { id: "1.5.1b", marks: 1, type: "short", correct: "f" },
    { id: "1.5.1c", marks: 1, type: "short", correct: "h" },
    { id: "1.5.2", marks: 1, type: "short", correct: "mitochondria" },
    { id: "1.5.3", marks: 2, type: "multi", correct: ["a", "e"], policy: "firstTwo" },
    { id: "1.5.4", marks: 1, type: "short", correct: "oogenesis" },

    // 2.1 frog
    { id: "2.1.1", marks: 1, type: "short", correct: "external" },
    { id: "2.1.2", marks: 2, type: "long", correct: ["dry out", "no protection", "predators"] },
    { id: "2.1.3", marks: 2, type: "long", correct: ["close contact", "sperm directly on eggs"] },
    { id: "2.1.4", marks: 2, type: "long", correct: ["many eggs", "external fertilisation"] },

    // 2.2 eye
    { id: "2.2.1", marks: 1, type: "short", correct: "choroid" },
    { id: "2.2.2", marks: 1, type: "short", correct: "holds lens" },
    { id: "2.2.3", marks: 1, type: "short", correct: "most cones" },
    { id: "2.2.4", marks: 4, type: "long", correct: ["sclera opaque", "lens transparent", "sclera non-elastic", "lens elastic"] },
    { id: "2.2.5", marks: 3, type: "long", correct: ["radial contract", "circular relax", "pupil dilate"] },
    { id: "2.2.6", marks: 3, type: "long", correct: ["spectacles refract", "eye lens refract", "focus front retina"] },

    // 2.3 cysts
    { id: "2.3.1", marks: 1, type: "multi", correct: ["follicle", "corpus luteum"], policy: "firstTwo" },
    { id: "2.3.2", marks: 2, type: "multi", correct: ["pain", "rupture"], policy: "firstTwo" },
    { id: "2.3.3a", marks: 1, type: "short", correct: "fsh" },
    { id: "2.3.3b", marks: 1, type: "short", correct: "oestrogen" },
    { id: "2.3.4", marks: 4, type: "long", correct: ["progesterone inhibits fsh", "no follicle", "no oestrogen", "no endometrium"] },

    // 2.4 hearing
    { id: "2.4", marks: 7, type: "long", correct: ["pinna traps", "canal directs", "tympanic vibrate", "ossicles vibrate", "oval window", "pressure waves", "corti stimulated", "impulses auditory nerve", "cerebrum"] },

    // 2.5 reflex
    { id: "2.5.1", marks: 2, type: "long", correct: ["rapid", "involuntary", "stimulus"] },
    { id: "2.5.2a", marks: 1, type: "short", correct: "one way" },
    { id: "2.5.2b", marks: 1, type: "short", correct: "balance" },
    { id: "2.5.3", marks: 9, type: "long", correct: ["receptor tendon", "sensory dorsal", "interneuron", "motor ventral", "quadriceps"] },

    // 3.1 alzheimer
    { id: "3.1.1", marks: 1, type: "short", correct: "degeneration" },
    { id: "3.1.2a", marks: 1, type: "short", correct: "memory" },
    { id: "3.1.2b", marks: 1, type: "short", correct: "family" },
    { id: "3.1.2c", marks: 2, type: "multi", correct: ["learning", "orientation"], policy: "firstTwo" },
    { id: "3.1.3", marks: 2, type: "multi", correct: ["female", "65-75", "no symptoms"], policy: "firstTwo" },
    { id: "3.1.4", marks: 2, type: "multi", correct: ["37", "three times", "three months"], policy: "firstTwo" },
    { id: "3.1.5", marks: 2, type: "long", correct: ["no tissue measured", "no control"] },
    { id: "3.1.6", marks: 3, type: "long", correct: ["blood flow", "hippocampus", "thinking"] },

    // 3.2 brain kidney
    { id: "3.2.1a", marks: 1, type: "short", correct: "cerebellum" },
    { id: "3.2.1b", marks: 1, type: "short", correct: "connects hemispheres" },
    { id: "3.2.2", marks: 1, type: "short", correct: "cerebrum" },
    { id: "3.2.3", marks: 2, type: "short", correct: "adrenaline" },
    { id: "3.2.4a", marks: 4, type: "long", correct: ["more air oxygen", "blood faster", "transport glucose", "respiration"] },
    { id: "3.2.4b", marks: 4, type: "long", correct: ["medulla stimulated", "impulses heart breathing", "more blood lungs", "co2 exhaled"] },
    { id: "3.2.5", marks: 1, type: "short", correct: "umbilical vein" },

    // 3.3 skin temp
    { id: "3.3.1a", marks: 1, type: "short", correct: "negative feedback" },
    { id: "3.3.1b", marks: 1, type: "short", correct: "hypothalamus" },
    { id: "3.3.2a", marks: 1, type: "short", correct: "sweat glands" },
    { id: "3.3.2b", marks: 1, type: "short", correct: "arterioles" },
    { id: "3.3.3", marks: 3, type: "long", correct: ["2/37.4 x 100 = 5.35"] },
    { id: "3.3.4", marks: 6, type: "long", correct: ["vasodilation", "more blood", "sweat", "evaporation", "heat loss"] },

    // 3.4 auxins
    { id: "3.4.1", marks: 1, type: "short", correct: "stem growth" },
    { id: "3.4.2", marks: 1, type: "short", correct: "remove auxins" },
    { id: "3.4.3", marks: 1, type: "short", correct: "reliability" },
    { id: "3.4.4", marks: 2, type: "short", correct: "b c" },
    { id: "3.4.5", marks: 3, type: "long", correct: ["auxins tip", "upward growth", "inhibit lateral"] },
    { id: "3.4.6a", marks: 1, type: "short", correct: "gibberellins" },
    { id: "3.4.6b", marks: 1, type: "short", correct: "abscisic acid" },

    // 3.5 reproduction
    { id: "3.5.1", marks: 1, type: "short", correct: "internal" },
    { id: "3.5.2", marks: 4, type: "long", correct: ["internal fertilisation", "ovovivipary protection"] },
    { id: "3.5.3", marks: 2, type: "long", correct: ["external", "survival chance"] },
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

            // Award proportional up to max marks
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
                        src={`/assets1/${question.image}`}
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
                                        src={`/assets1/${c.image}`}
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

function LifeScienceP1Nov2021Eng() {
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState(null);
    // Timer states
    const [timeLeft, setTimeLeft] = useState(105 * 60); // 2.5 hours in seconds
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
                <h2>GRADE 12 – LIFE SCIENCES P1 – NOVEMBER 2021</h2>
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
                <p>This digital paper mirrors the DBE Life Sciences P1 November 2021. Marking uses the official memo.</p>
            </footer>
        </div>
    );
}  // <-- THIS CLOSING } MATCHES function App() {

export default LifeScienceP1Nov2021Eng;
