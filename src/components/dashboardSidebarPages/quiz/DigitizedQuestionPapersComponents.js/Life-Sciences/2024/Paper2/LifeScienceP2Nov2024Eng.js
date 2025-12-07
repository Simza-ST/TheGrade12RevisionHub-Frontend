
// App.js
// Complete single-file React app (JavaScript) that digitizes
// Life Sciences P2 November 2024 with answering, submission,
// auto-marking, per-question feedback, and results.
//
// Usage:
// - Drop this into a Create React App or Vite React project as src/App.js
// - Ensure React is installed
// - Add the style tag below to index.html or keep styles inline here (see StyleInjector)

import React, { useMemo, useState, useEffect, useCallback } from "react";
import LifeScienceP1Nov2024Eng from "../Paper1/LifeScienceP1Nov2024Eng";

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
                        prompt: "Which ONE of the following organelles is the site of protein synthesis?",
                        options: [
                            { letter: "A", text: "Ribosomes" },
                            { letter: "B", text: "Chloroplasts" },
                            { letter: "C", text: "Mitochondria" },
                            { letter: "D", text: "Centrosomes" }
                        ]
                    },
                    {
                        id: "1.1.2",
                        label: "1.1.2",
                        type: "mcq",
                        marks: 2,
                        image:"picture112.png",
                        prompt: "In humans, the gonosomes determine the gender. Which combination below shows the CORRECT gonosomes for males and females?",
                        options: [
                            { letter: "A", text: "MALE: XY FEMALE: YY" },
                            { letter: "B", text: "MALE: YY FEMALE: XY" },
                            { letter: "C", text: "MALE: XY FEMALE: XX" },
                            { letter: "D", text: "MALE: XX FEMALE: XY" }
                        ]
                    },
                    {
                        id: "1.1.3",
                        label: "1.1.3",
                        type: "mcq",
                        marks: 2,
                        prompt: "An organism has the genotype TT. The CORRECT term which describes this organism's genotype is …",
                        options: [
                            { letter: "A", text: "heterozygous dominant." },
                            { letter: "B", text: "heterozygous recessive." },
                            { letter: "C", text: "homozygous dominant." },
                            { letter: "D", text: "homozygous recessive." }
                        ]
                    },
                    {
                        id: "1.1.4",
                        label: "1.1.4",
                        type: "mcq",
                        marks: 2,
                        prompt: "Down syndrome is a genetic disorder where an individual has an extra copy of chromosome 21. Which ONE of the following may lead to Down syndrome?",
                        options: [
                            { letter: "A", text: "Failure of chromosomes to replicate during mitosis" },
                            { letter: "B", text: "Failure of chromosome pairs to separate during meiosis" },
                            { letter: "C", text: "Failure of chromosomes to form pairs during fertilisation" },
                            { letter: "D", text: "Failure of chromosome pairs to cross over during meiosis" }
                        ]
                    },
                    {
                        id: "1.1.5",
                        label: "1.1.5",
                        type: "mcq",
                        marks: 2,
                        prompt: "A gradual change in the characteristics of a species over time is known as …",
                        options: [
                            { letter: "A", text: "punctuated equilibrium." },
                            { letter: "B", text: "genetic engineering." },
                            { letter: "C", text: "speciation." },
                            { letter: "D", text: "biological evolution." }
                        ]
                    },
                    {
                        id: "1.1.6",
                        label: "1.1.6",
                        type: "mcq",
                        marks: 2,
                        prompt: "Which ONE of the following is a reproductive isolation mechanism?",
                        options: [
                            { letter: "A", text: "Adaptation to the same pollinator" },
                            { letter: "B", text: "Species-specific courtship behaviour" },
                            { letter: "C", text: "Production of fertile offspring" },
                            { letter: "D", text: "Breeding at the same time of the year" }
                        ]
                    },
                    {
                        id: "1.1.7",
                        label: "1.1.7",
                        type: "mcq",
                        marks: 2,
                        prompt: "Analysis of mitochondrial DNA is an example of this line of evidence:",
                        options: [
                            { letter: "A", text: "Fossil evidence" },
                            { letter: "B", text: "Modification by descent" },
                            { letter: "C", text: "Biogeography" },
                            { letter: "D", text: "Genetic evidence" }
                        ]
                    },
                    {
                        id: "1.1.8",
                        label: "1.1.8",
                        type: "mcq",
                        marks: 2,
                        image:"picture118.png",
                        prompt: "Which option in the table below shows the CORRECT comparison between mitosis and meiosis? (Table with options)",
                        options: [
                            { letter: "A", text: "Produces four daughter cells / Produces two daughter cells" },
                            { letter: "B", text: "Produces genetically different cells / Produces genetically identical cells" },
                            { letter: "C", text: "The chromosome number remains the same / The chromosome number is halved" },
                            { letter: "D", text: "Two divisions occur / Four divisions occur" }
                        ]
                    },
                    {
                        id: "1.1.9",
                        label: "1.1.9",
                        type: "mcq",
                        marks: 2,
                        prompt: "Which ONE of the following scientists discovered the fossil Taung Child?",
                        options: [
                            { letter: "A", text: "Lee Berger" },
                            { letter: "B", text: "Ron Clarke" },
                            { letter: "C", text: "Raymond Dart" },
                            { letter: "D", text: "Robert Broom" }
                        ]
                    },
                    {
                        id: "1.1.10",
                        label: "1.1.10",
                        type: "mcq",
                        marks: 2,
                        prompt: "Which ONE of the following is produced at the end of translation?",
                        options: [
                            { letter: "A", text: "A DNA molecule" },
                            { letter: "B", text: "A messenger RNA molecule" },
                            { letter: "C", text: "A protein" },
                            { letter: "D", text: "An amino acid" }
                        ]
                    },
                ]
            },
            {
                id: "1.2",
                number: "1.2",
                prompt: "Give the correct biological term for EACH of the following descriptions. Write only the term next to the question numbers (1.2.1 to 1.2.9) in the ANSWER BOOK.",
                type: "long",
                marks: 9,
                children: [
                    { id: "1.2.1", label: "1.2.1", type: "short", marks: 1, prompt: "A nucleic acid that carries hereditary information" },
                    { id: "1.2.2", label: "1.2.2", type: "short", marks: 1, prompt: "The chromosome condition of a cell that has a single set of chromosomes" },
                    { id: "1.2.3", label: "1.2.3", type: "short", marks: 1, prompt: "The structure that holds the two chromatids of a chromosome together" },
                    { id: "1.2.4", label: "1.2.4", type: "short", marks: 1, prompt: "The type of RNA that carries specific amino acids to the site of protein synthesis" },
                    { id: "1.2.5", label: "1.2.5", type: "short", marks: 1, prompt: "The analysis of DNA samples to identify individuals or relationships between individuals" },
                    { id: "1.2.6", label: "1.2.6", type: "short", marks: 1, prompt: "A representation of the number and structure of all the chromosomes that occur in the nucleus of a somatic cell" },
                    { id: "1.2.7", label: "1.2.7", type: "short", marks: 1, prompt: "A group of similar organisms that are able to interbreed to produce fertile offspring" },
                    { id: "1.2.8", label: "1.2.8", type: "short", marks: 1, prompt: "The phase of meiosis where paired chromosomes are arranged at the equator" },
                    { id: "1.2.9", label: "1.2.9", type: "short", marks: 1, prompt: "The biotechnological process that produces genetically identical organisms" },
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
                        prompt: "A source of variation in populations",
                        options: [
                            { letter: "A", text: "Random fertilisation" },
                            { letter: "B", text: "Random mating" }
                        ]
                    },
                    {
                        id: "1.3.2",
                        label: "1.3.2",
                        type: "short",
                        marks: 2,
                        prompt: "Discovery of the structure of the DNA molecule",
                        options: [
                            { letter: "A", text: "Franklin and Wilkins" },
                            { letter: "B", text: "Lamarck and Darwin" }
                        ]
                    },
                    {
                        id: "1.3.3",
                        label: "1.3.3",
                        type: "short",
                        marks: 2,
                        prompt: "Occurs during meiosis",
                        options: [
                            { letter: "A", text: "Karyokinesis" },
                            { letter: "B", text: "Cytokinesis" }
                        ]
                    },
                ]
            },
            {
                id: "1.4",
                number: "1.4",
                prompt: "The diagram below represents a DNA molecule undergoing an important biological process.",
                type: "long",
                marks: 6,
                image:"picture14.png",
                children: [
                    { id: "1.4.1a", label: "1.4.1 (a)", type: "short", marks: 1, prompt: "Process shown in the diagram" },
                    { id: "1.4.1b", label: "1.4.1 (b)", type: "short", marks: 1, prompt: "Chemical bond labelled 1" },
                    { id: "1.4.2a", label: "1.4.2 (a)", type: "short", marks: 1, prompt: "Collective name for the parts labelled 2, 3 and 4" },
                    { id: "1.4.2b", label: "1.4.2 (b)", type: "short", marks: 1, prompt: "Full name of the nitrogenous base labelled 5" },
                    { id: "1.4.3", label: "1.4.3", type: "short", marks: 1, prompt: "During which phase of the cell cycle does this process take place?" },
                    { id: "1.4.4", label: "1.4.4", type: "short", marks: 1, prompt: "Where in the cell does this process occur?" },
                ]
            },
            {
                id: "1.5",
                number: "1.5",
                prompt: "In a certain species of butterfly, one gene controls wing-spot colour and another controls eye colour. The wing-spot colour can be red spots (R) or grey spots (r), while eye colour can be black (E) or brown (e). Butterflies that are heterozygous for both genes were crossed.",
                type: "long",
                marks: 9,
                children: [
                    { id: "1.5.1", label: "1.5.1", type: "short", marks: 1, prompt: "Name the type of cross represented above." },
                    { id: "1.5.2", label: "1.5.2", type: "multi", marks: 2, prompt: "Give the dominant characteristic of EACH gene." },
                    { id: "1.5.3a", label: "1.5.3 (a)", type: "multi", marks: 4, prompt: "ALL the possible genotypes at X" },
                    { id: "1.5.3b", label: "1.5.3 (b)", type: "short", marks: 1, prompt: "The phenotype at Y" },
                    { id: "1.5.3c", label: "1.5.3 (c)", type: "short", marks: 1, prompt: "The genotype of the gametes produced by a butterfly with grey spots and brown eyes" },
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
                prompt: "The diagram below represents a certain stage of protein synthesis. (The sequence of bases is read from left to right.)",
                type: "long",
                marks: 12,
                image:"picture21.png",
                children: [
                    { id: "2.1.1", label: "2.1.1", type: "short", marks: 1, prompt: "Identify molecule Y." },
                    { id: "2.1.2", label: "2.1.2", type: "long", marks: 6, prompt: "Describe the process that resulted in the formation of molecule Y." },
                    { id: "2.1.3", label: "2.1.3", type: "short", marks: 2, prompt: "Give ONE structural difference between molecule X and molecule Y." },
                    { id: "2.1.4", label: "2.1.4", type: "short", marks: 1, prompt: "Give the sequence of bases at triplet Z on strand 2." },
                    { id: "2.1.5", label: "2.1.5", type: "multi", marks: 2, prompt: "Identify the first and last amino acids coded for by this section of molecule Y." },
                ]
            },
            {
                id: "2.2",
                number: "2.2",
                prompt: "The diagram below represents a phase of meiosis II.",
                type: "long",
                marks: 12,
                image:"picture22.png",
                children: [
                    { id: "2.2.1", label: "2.2.1", type: "short", marks: 1, prompt: "Identify the phase of meiosis shown." },
                    { id: "2.2.2", label: "2.2.2", type: "short", marks: 2, prompt: "State ONE difference between the phase shown in the diagram above and the same phase in meiosis I." },
                    { id: "2.2.3a", label: "2.2.3 (a)", type: "short", marks: 1, prompt: "Identify structure: A" },
                    { id: "2.2.3b", label: "2.2.3 (b)", type: "short", marks: 1, prompt: "Identify structure: B" },
                    { id: "2.2.4", label: "2.2.4", type: "short", marks: 2, prompt: "Describe the role of structure B during cell division." },
                    { id: "2.2.5", label: "2.2.5", type: "long", marks: 5, prompt: "Draw a labelled diagram representing the cell above as it would have appeared in metaphase II. NOTE: The diagram should show the correct shading and include labels (exclude labels for A and B)." },
                ]
            },
            {
                id: "2.3",
                number: "2.3",
                prompt: "The diagram below represents part of the female reproductive system.",
                type: "long",
                marks: 15,
                image:"picture23.png",
                children: [
                    { id: "2.3.1a", label: "2.3.1 (a)", type: "short", marks: 1, prompt: "Identify part: A" },
                    { id: "2.3.1b", label: "2.3.1 (b)", type: "short", marks: 1, prompt: "Identify part: B" },
                    { id: "2.3.2a", label: "2.3.2 (a)", type: "multi", marks: 2, prompt: "Give TWO characteristics of the endometrium that make it suitable for implantation." },
                    { id: "2.3.2b", label: "2.3.2 (b)", type: "short", marks: 2, prompt: "Give TWO visible reasons why there is an increased chance of fertilisation in this female." },
                    { id: "2.3.3", label: "2.3.3", type: "short", marks: 1, prompt: "Identify and describe the type of gametogenesis that leads to the formation of structure C." },
                    { id: "2.3.4", label: "2.3.4", type: "long", marks: 3, prompt: "In an ectopic pregnancy, the fertilised ovum can become implanted in part A. This normally results in the death of the embryo and may endanger the mother's life. Explain why an ectopic pregnancy may result in the death of an embryo." },
                ]
            },
            {
                id: "2.4",
                number: "2.4",
                prompt: "The table below shows the percentage of blood donors for each of the blood groups in South Africa for 2018.",
                type: "long",
                marks: 13,
                image:"picture24.png",
                children: [
                    { id: "2.4.1", label: "2.4.1", type: "short", marks: 1, prompt: "According to the data, which is the most common blood group among the donors?" },
                    { id: "2.4.2", label: "2.4.2", type: "short", marks: 1, prompt: "Name the type of dominance shown by the inheritance of blood group A." },
                    { id: "2.4.3", label: "2.4.3", type: "long", marks: 5, prompt: "Explain how it is possible for a man with blood group A and a woman with blood group AB to have a child with blood group B." },
                    { id: "2.4.4", label: "2.4.4", type: "long", marks: 6, prompt: "Plot a bar graph to represent the data in the table." },
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
                prompt: "Read the passage below. GENETICALLY MODIFIED MAIZE The bacterium Bacillus thuringiensis produces a toxin, called Bt, that kills insects. This bacterium is used to genetically modify maize to contain the Bt toxin. This Bt maize is toxic to insects.",
                type: "long",
                marks: 7,
                image:"picture31.png",
                children: [
                    { id: "3.1.1", label: "3.1.1", type: "long", marks: 3, prompt: "Describe how the Bt maize is genetically modified to be insect resistant." },
                    { id: "3.1.2", label: "3.1.2", type: "multi", marks: 4, prompt: "Explain TWO reasons why farmers might want to grow Bt maize." },
                ]
            },
            {
                id: "3.2",
                number: "3.2",
                prompt: "The phylogenetic tree below shows the evolutionary relationship between some species.",
                type: "long",
                marks: 9,
                image:"picture32.png",
                children: [
                    { id: "3.2.1", label: "3.2.1", type: "short", marks: 1, prompt: "Give the LETTER representing the common ancestor for ALL the species shown in the phylogenetic tree." },
                    { id: "3.2.2", label: "3.2.2", type: "short", marks: 1, prompt: "Identify the species that is most closely related to Old-world monkeys." },
                    { id: "3.2.3", label: "3.2.3", type: "short", marks: 1, prompt: "Give a reason for your answer to QUESTION 3.2.2." },
                    { id: "3.2.4", label: "3.2.4", type: "multi", marks: 3, prompt: "Identify THREE species that share the common ancestor R." },
                    { id: "3.2.5", label: "3.2.5", type: "multi", marks: 3, prompt: "State THREE characteristics of the upper limbs that humans share with group P." },
                ]
            },
            {
                id: "3.3",
                number: "3.3",
                prompt: "A group of researchers conducted an investigation to determine the influence of the type of milk on the height of children drinking the milk. (The investigation was conducted over a period of 7 years from age 3 to age 10). They: Selected 4 146 healthy 3-year-old children of the same race and gender Divided the children into two equal groups: One group was given 1 litre of cow's milk to drink daily The other group was given 1 litre of soy milk to drink daily Ensured that each group had: The same additional diet Similar daily activities Similar living conditions Provided the milk from the same supplier Measured the children's height at the end of the investigation and calculated the average The table below shows the results at the end of the investigation compared to the expected average height of 10-year-olds.",
                type: "long",
                marks: 12,
                image:"picture33.png",
                children: [
                    { id: "3.3.1a", label: "3.3.1 (a)", type: "short", marks: 1, prompt: "Identify the: (a) Independent variable" },
                    { id: "3.3.1b", label: "3.3.1 (b)", type: "short", marks: 1, prompt: "(b) Dependent variable" },
                    { id: "3.3.2", label: "3.3.2", type: "short", marks: 1, prompt: "Name the type of variation displayed by the height of a person." },
                    { id: "3.3.3", label: "3.3.3", type: "multi", marks: 2, prompt: "State TWO planning steps that the researchers had to consider at the beginning of this investigation." },
                    { id: "3.3.4", label: "3.3.4", type: "multi", marks: 3, prompt: "State THREE ways in which the validity of this investigation was ensured." },
                    { id: "3.3.5", label: "3.3.5", type: "short", marks: 1, prompt: "State ONE factor that could have negatively affected the validity of this investigation." },
                    { id: "3.3.6", label: "3.3.6", type: "short", marks: 1, prompt: "How did the researchers ensure the reliability of the results?" },
                    { id: "3.3.7", label: "3.3.7", type: "short", marks: 2, prompt: "State the conclusion for this investigation." },
                ]
            },
            {
                id: "3.4",
                number: "3.4",
                prompt: "The passage below describes Homo erectus fossils. Evidence from fossils of Homo erectus shows that they appeared in Africa about 2 million years ago. They spread to many parts of Asia. Homo erectus is the oldest known species to be fully bipedal and have a human-like body. Their brain size was smaller than that of humans today. A prominent brow ridge was present over their eye sockets.",
                type: "long",
                marks: 13,
                image:"picture34.png",
                children: [
                    { id: "3.4.1", label: "3.4.1", type: "long", marks: 3, prompt: "Describe how the fossils of Homo erectus are used to support the 'Out-of-Africa' hypothesis." },
                    { id: "3.4.2", label: "3.4.2", type: "long", marks: 4, prompt: "Describe how all OTHER fossil evidence is used to support the 'Out-of-Africa' hypothesis." },
                    { id: "3.4.3", label: "3.4.3", type: "long", marks: 5, prompt: "Use the information in the passage regarding Homo erectus and tabulate TWO differences between the features of Homo erectus and Homo sapiens." },
                    { id: "3.4.4", label: "3.4.4", type: "short", marks: 1, prompt: "What observation of the skull of Homo erectus would have led scientists to conclude that Homo erectus was bipedal?" },
                ]
            },
            {
                id: "3.5",
                number: "3.5",
                prompt: "Read the passage below. NATURAL SELECTION IN WOLVES In 1986 there was a huge radioactive disaster in Chernobyl and all humans immediately left the area because of the deadly high radiation. Animals exposed to this high radiation developed cancer or died. Almost 40 years later, scientists have been studying the wolves that live in this highly radioactive environment where they are exposed to high radiation. They found that these wolves have a mutation that makes them immune to cancer.",
                type: "long",
                marks: 9,
                image:"picture35.png",
                children: [
                    { id: "3.5.1", label: "3.5.1", type: "short", marks: 1, prompt: "What is a mutation?" },
                    { id: "3.5.2", label: "3.5.2", type: "short", marks: 1, prompt: "What effect does exposure to high radiation have on animals?" },
                    { id: "3.5.3", label: "3.5.3", type: "long", marks: 7, prompt: "Use Darwin's theory of natural selection to explain the development of immunity to cancer in these wolves." },
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
    { id: "1.1.1", marks: 2, type: "mcq", correct: "A" },
    { id: "1.1.2", marks: 2, type: "mcq", correct: "C" },
    { id: "1.1.3", marks: 2, type: "mcq", correct: "C" },
    { id: "1.1.4", marks: 2, type: "mcq", correct: "B" },
    { id: "1.1.5", marks: 2, type: "mcq", correct: "D" },
    { id: "1.1.6", marks: 2, type: "mcq", correct: "B" },
    { id: "1.1.7", marks: 2, type: "mcq", correct: "D" },
    { id: "1.1.8", marks: 2, type: "mcq", correct: "C" },
    { id: "1.1.9", marks: 2, type: "mcq", correct: "C" },
    { id: "1.1.10", marks: 2, type: "mcq", correct: "C" },

    // 1.2 terms
    { id: "1.2.1", marks: 1, type: "short", correct: "dna" },
    { id: "1.2.2", marks: 1, type: "short", correct: "haploid" },
    { id: "1.2.3", marks: 1, type: "short", correct: "centromere" },
    { id: "1.2.4", marks: 1, type: "short", correct: "trna" },
    { id: "1.2.5", marks: 1, type: "short", correct: "dna profiling" },
    { id: "1.2.6", marks: 1, type: "short", correct: "karyotype" },
    { id: "1.2.7", marks: 1, type: "short", correct: "species" },
    { id: "1.2.8", marks: 1, type: "short", correct: "metaphase i" },
    { id: "1.2.9", marks: 1, type: "short", correct: "cloning" },

    // 1.3
    { id: "1.3.1", marks: 2, type: "short", correct: "both a and b" },
    { id: "1.3.2", marks: 2, type: "short", correct: "a only" },
    { id: "1.3.3", marks: 2, type: "short", correct: "both a and b" },

    // 1.4
    { id: "1.4.1a", marks: 1, type: "short", correct: "dna replication" },
    { id: "1.4.1b", marks: 1, type: "short", correct: "hydrogen bond" },
    { id: "1.4.2a", marks: 1, type: "short", correct: "nucleotide" },
    { id: "1.4.2b", marks: 1, type: "short", correct: "thymine" },
    { id: "1.4.3", marks: 1, type: "short", correct: "interphase" },
    { id: "1.4.4", marks: 1, type: "short", correct: "nucleus" },

    // 1.5
    { id: "1.5.1", marks: 1, type: "short", correct: "dihybrid cross" },
    { id: "1.5.2", marks: 2, type: "multi", correct: ["red spots", "black eyes"], policy: "firstTwo" },
    { id: "1.5.3a", marks: 4, type: "multi", correct: ["rree", "rree"], policy: "firstTwo" },
    { id: "1.5.3b", marks: 1, type: "short", correct: "red spots black eyes" },
    { id: "1.5.3c", marks: 1, type: "short", correct: "re" },

    // 2.1
    { id: "2.1.1", marks: 1, type: "short", correct: "mrna" },
    { id: "2.1.2", marks: 6, type: "long", correct: ["dna unwinds", "unzips", "hydrogen bonds break", "template strand", "mrna forms", "free rna nucleotides", "complementary base pairing"] },
    { id: "2.1.3", marks: 2, type: "short", correct: "double stranded single stranded" },
    { id: "2.1.4", marks: 1, type: "short", correct: "tac" },
    { id: "2.1.5", marks: 2, type: "multi", correct: ["arginine", "proline"], policy: "firstTwo" },

    // 2.2
    { id: "2.2.1", marks: 1, type: "short", correct: "anaphase ii" },
    { id: "2.2.2", marks: 2, type: "short", correct: "centromeres do not split i split ii" },
    { id: "2.2.3a", marks: 1, type: "short", correct: "centriole" },
    { id: "2.2.3b", marks: 1, type: "short", correct: "spindle fibre" },
    { id: "2.2.4", marks: 2, type: "short", correct: "pulls chromatids poles" },
    { id: "2.2.5", marks: 5, type: "long", correct: ["equator", "two chromosomes", "shading", "labels", "metaphase ii"] },

    // 2.3
    { id: "2.3.1a", marks: 1, type: "short", correct: "fallopian tube" },
    { id: "2.3.1b", marks: 1, type: "short", correct: "uterus" },
    { id: "2.3.2a", marks: 2, type: "multi", correct: ["vascular", "glandular"], policy: "firstTwo" },
    { id: "2.3.2b", marks: 2, type: "short", correct: "sperm closer ovum ovulation" },
    { id: "2.3.3", marks: 1, type: "short", correct: "oogenesis" },
    { id: "2.3.4", marks: 3, type: "long", correct: ["no space", "no blood supply", "no nutrients"] },

    // 2.4
    { id: "2.4.1", marks: 1, type: "short", correct: "o" },
    { id: "2.4.2", marks: 1, type: "short", correct: "complete dominance" },
    { id: "2.4.3", marks: 5, type: "long", correct: ["man ia i", "woman ia ib", "child ib i", "heterozygous b"] },
    { id: "2.4.4", marks: 6, type: "long", correct: ["bar graph", "caption", "labels", "scale", "plotting", "correct"] },

    // 3.1
    { id: "3.1.1", marks: 3, type: "long", correct: ["cut bt gene", "insert maize dna", "recombinant dna toxin"] },
    { id: "3.1.2", marks: 4, type: "multi", correct: ["fewer pesticides", "higher yield"], policy: "firstTwo" },

    // 3.2
    { id: "3.2.1", marks: 1, type: "short", correct: "v" },
    { id: "3.2.2", marks: 1, type: "short", correct: "gibbons" },
    { id: "3.2.3", marks: 1, type: "short", correct: "share recent ancestor" },
    { id: "3.2.4", marks: 3, type: "multi", correct: ["humans", "chimpanzees", "gorillas"], policy: "firstThree" },
    { id: "3.2.5", marks: 3, type: "multi", correct: ["rotating arms", "long arms", "opposable thumb"], policy: "firstThree" },

    // 3.3
    { id: "3.3.1a", marks: 1, type: "short", correct: "type of milk" },
    { id: "3.3.1b", marks: 1, type: "short", correct: "height" },
    { id: "3.3.2", marks: 1, type: "short", correct: "continuous" },
    { id: "3.3.3", marks: 2, type: "multi", correct: ["sample size", "duration"], policy: "firstTwo" },
    { id: "3.3.4", marks: 3, type: "multi", correct: ["same age race gender", "large sample"], policy: "firstThree" },
    { id: "3.3.5", marks: 1, type: "short", correct: "genetics" },
    { id: "3.3.6", marks: 1, type: "short", correct: "large number" },
    { id: "3.3.7", marks: 2, type: "short", correct: "cow milk better growth" },

    // 3.4
    { id: "3.4.1", marks: 3, type: "long", correct: ["oldest africa", "younger asia", "migration africa"] },
    { id: "3.4.2", marks: 4, type: "long", correct: ["oldest africa", "younger elsewhere"] },
    { id: "3.4.3", marks: 5, type: "long", correct: ["brain size", "brow ridge", "table"] },
    { id: "3.4.4", marks: 1, type: "short", correct: "foramen magnum forward" },

    // 3.5
    { id: "3.5.1", marks: 1, type: "short", correct: "change genetic" },
    { id: "3.5.2", marks: 1, type: "short", correct: "cancer death" },
    { id: "3.5.3", marks: 7, type: "long", correct: ["variation", "radiation kills non immune", "immune reproduce", "pass allele", "higher proportion"] },
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
    return (s || "").trim().toLowerCase().replace(/[^\w\s]/g, '');
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
                        src={`/assets8/${question.image}`}
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
                                        src={`/assets8/${c.image}`}
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

function LifeScienceP2Nov2024Eng () {
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

    return (
        <div className="app">
            <StyleInjector />
            <header>
                <h1>NATIONAL SENIOR CERTIFICATE</h1>
                <h2>GRADE 12 – LIFE SCIENCES P2 – NOVEMBER 2024</h2>
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
                <p>This digital paper mirrors the DBE Life Sciences P2 November 2024. Marking uses the official memo.</p>
            </footer>
        </div>
    );
}

export default LifeScienceP2Nov2024Eng;