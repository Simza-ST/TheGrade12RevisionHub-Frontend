// App.js
// Complete single-file React app (JavaScript) that digitizes
// Life Sciences P2 November 2021 with answering, submission,
// auto-marking, per-question feedback, and results.
//
// Usage:
// - Drop this into a Create React App or Vite React project as src/App.js
// - Ensure React is installed
// - Add the style tag below to index.html or keep styles inline here (see StyleInjector)

import React, { useMemo, useState, useEffect, useCallback } from "react";
import LifeScienceP1Nov2021Eng from "../Paper1/LifeScienceP1Nov2021Eng";

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
                prompt:
                    "Various options are provided as possible answers to the following questions.  \nChoose the answer and write only the letter (A to D) next to the question \n numbers (1.1.1 to 1.1.9) in the ANSWER BOOK, e.g. 1.1.10 D.",
                type: "long",
                marks: 18,
                children: [
                    {
                        id: "1.1.1",
                        label: "1.1.1",
                        type: "mcq",
                        marks: 2,
                        prompt: "DNA and RNA are examples of …",
                        options: [
                            { letter: "A", text: "amino acids." },
                            { letter: "B", text: "enzymes." },
                            { letter: "C", text: "nucleic acids." },
                            { letter: "D", text: "proteins." }
                        ]
                    },
                    {
                        id: "1.1.2",
                        label: "1.1.2",
                        type: "mcq",
                        marks: 2,
                        prompt: "Which ONE of the following is a product of meiosis?",
                        options: [
                            { letter: "A", text: "Muscle cell" },
                            { letter: "B", text: "Ovary" },
                            { letter: "C", text: "Nerve cell" },
                            { letter: "D", text: "Ovum" }
                        ]
                    },
                    {
                        id: "1.1.3",
                        label: "1.1.3",
                        type: "mcq",
                        marks: 2,
                        prompt: "An individual is heterozygous for a harmful recessive allele but is \nunaffected by it.  \nWhich ONE of the following best represents the genetic \ncomposition of this individual?",
                        options: [
                            { letter: "A", text: "Two dominant normal alleles" },
                            { letter: "B", text: "One harmful recessive allele and one harmful dominant \nallele" },
                            { letter: "C", text: "One harmful recessive allele and one normal dominant allele" },
                            { letter: "D", text: "One harmful dominant allele and one normal recessive allele" }
                        ]
                    },
                    {
                        id: "1.1.4",
                        label: "1.1.4",
                        type: "mcq",
                        marks: 2,
                        prompt: "A person has the genotype IAi for blood type. \nWhat is this person's blood group?",
                        options: [
                            { letter: "A", text: "A" },
                            { letter: "B", text: "B" },
                            { letter: "C", text: "O" },
                            { letter: "D", text: "AB" }
                        ]
                    },
                    {
                        id: "1.1.5",
                        label: "1.1.5",
                        type: "mcq",
                        marks: 2,
                        prompt: "In a car accident, the biological father of a girl and three other men \nwere killed. The men could not be identified due to their injuries.  \nDNA profiling was used to identify the girl's father.  \nThe diagram below shows the DNA profiles of the girl, her mother \nand the four men. \nWhich ONE of the men is most likely to have been the father of the \ngirl?",
                        options: [
                            { letter: "A", text: "4" },
                            { letter: "B", text: "3" },
                            { letter: "C", text: "2" },
                            { letter: "D", text: "1" }
                        ]
                    },
                    {
                        id: "1.1.6",
                        label: "1.1.6",
                        type: "mcq",
                        marks: 2,
                        prompt: "A DNA template strand codes for the amino acid serine with any of \nthe following base triplets: \nAGA AGG AGT TCA TCG AGC \nThe anticodon that codes for the amino acid serine is …",
                        options: [
                            { letter: "A", text: "AGT." },
                            { letter: "B", text: "UGA." },
                            { letter: "C", text: "TCG." },
                            { letter: "D", text: "UCG." }
                        ]
                    },
                    {
                        id: "1.1.7",
                        label: "1.1.7",
                        type: "mcq",
                        marks: 2,
                        image : "picture117.png",
                        prompt: "The diagram below represents two phases of meiosis. \nWhich ONE of the following represents the correct sequence of \nphases between phase A and phase B?",
                        options: [
                            { letter: "A", text: "Anaphase I, Metaphase I, Prophase II and Telophase II" },
                            { letter: "B", text: "Metaphase I, Telophase I, Prophase II and Metaphase II" },
                            { letter: "C", text: "Anaphase I, Telophase I, Prophase II, Metaphase II and \nAnaphase II" },
                            { letter: "D", text: "Prophase I, Telophase I, Prophase II, Metaphase II and \nTelophase II" }
                        ]
                    },
                    {
                        id: "1.1.8",
                        label: "1.1.8",
                        type: "mcq",
                        marks: 2,
                        image : "picture118.png",
                        prompt: "The diagram below represents a process that occurs during protein \nsynthesis. \nWhich ONE of the following is CORRECT?",
                        options: [
                            { letter: "A", text: "S represents an anticodon" },
                            { letter: "B", text: "W represents mRNA" },
                            { letter: "C", text: "T represents tRNA" },
                            { letter: "D", text: "U represents an amino acid" }
                        ]
                    },
                    {
                        id: "1.1.9",
                        label: "1.1.9",
                        type: "mcq",
                        marks: 2,
                        prompt: "Evidence of hominid cultural evolution can be found in the fossil \nrecord.  \nThis evidence would include the …",
                        options: [
                            { letter: "A", text: "position of the attachment of the spine to the head." },
                            { letter: "B", text: "length of the upper limbs compared to the length of the lower \nlimbs." },
                            { letter: "C", text: "number of teeth present in the skull." },
                            { letter: "D", text: "presence of stone tools." }
                        ]
                    },
                ]
            },
            {
                id: "1.2",
                number: "1.2",
                prompt: "Give the correct biological term for each of the following descriptions.  \nWrite only the term next to the question numbers (1.2.1 to 1.2.6) in the \nANSWER BOOK.",
                type: "long",
                marks: 6,
                children: [
                    { id: "1.2.1", label: "1.2.1", type: "short", marks: 1, prompt: "A diagrammatic representation showing possible evolutionary \nrelationships between different species" },
                    { id: "1.2.2", label: "1.2.2", type: "short", marks: 1, prompt: "The type of bond found between amino acids" },
                    { id: "1.2.3", label: "1.2.3", type: "short", marks: 1, prompt: "The theory that describes evolution as consisting of long periods of \nlittle/no change alternating with short periods of rapid change" },
                    { id: "1.2.4", label: "1.2.4", type: "short", marks: 1, prompt: "Similar structures that perform different functions in different \norganisms" },
                    { id: "1.2.5", label: "1.2.5", type: "short", marks: 1, prompt: "The breeding of plants and animals by humans for desired \ncharacteristics" },
                    { id: "1.2.6", label: "1.2.6", type: "short", marks: 1, prompt: "The type of dominance where both alleles of a gene are expressed \nin the phenotype in the heterozygous condition" },
                ]
            },
            {
                id: "1.3",
                number: "1.3",
                prompt: "Indicate whether each of the statements in COLUMN I apply to A ONLY,  \nB ONLY, BOTH A AND B or NONE of the items in COLUMN II. Write A only, \nB only, both A and B, or none next to the question number (1.3.1 to 1.3.3) in \nthe ANSWER BOOK.",
                type: "long",
                marks: 6,
                image: "picture13.png",
                children: [
                    {
                        id: "1.3.1",
                        label: "1.3.1",
                        type: "mcq",
                        marks: 2,
                        prompt: "Mechanisms of reproductive \nisolation",
                        options: [
                            { letter: "A", text: "Species-specific courtship \nbehaviour" },
                            { letter: "B", text: "Breeding at different times of the \nyear" }
                        ]
                    },
                    {
                        id: "1.3.2",
                        label: "1.3.2",
                        type: "mcq",
                        marks: 2,
                        prompt: "Fossils found in South Africa",
                        options: [
                            { letter: "A", text: "Little Foot" },
                            { letter: "B", text: "Taung Child" }
                        ]
                    },
                    {
                        id: "1.3.3",
                        label: "1.3.3",
                        type: "mcq",
                        marks: 2,
                        prompt: "Proposed the 'law of use and \ndisuse'",
                        options: [
                            { letter: "A", text: "Eldredge" },
                            { letter: "B", text: "Gould" }
                        ]
                    },
                ]
            },
            {
                id: "1.4",
                number: "1.4",
                prompt: "The diagram below represents part of a DNA molecule.",
                type: "long",
                marks: 8,
                image: "picture14.png",
                children: [
                    { id: "1.4.1a", label: "1.4.1 (a)", type: "short", marks: 1, prompt: "Identify the: \n(a) Molecule X" },
                    { id: "1.4.1b", label: "1.4.1 (b)", type: "short", marks: 1, prompt: "(b) Sugar at Y" },
                    { id: "1.4.1c", label: "1.4.1 (c)", type: "short", marks: 1, prompt: "(c) Bond W" },
                    { id: "1.4.2", label: "1.4.2", type: "short", marks: 1, prompt: "Give the collective name of parts X, Y and Z." },
                    { id: "1.4.3", label: "1.4.3", type: "short", marks: 1, prompt: "State the natural shape of the DNA molecule." },
                    { id: "1.4.4", label: "1.4.4", type: "short", marks: 1, prompt: "Name the process whereby DNA makes a copy of itself." },
                    { id: "1.4.5", label: "1.4.5", type: "multi", marks: 2, prompt: "Name TWO places in an animal cell where DNA is located." },
                ]
            },
            {
                id: "1.5",
                number: "1.5",
                prompt: "The diagram below represents a chromosome pair undergoing a process \nduring meiosis.",
                type: "long",
                marks: 5,
                image: "picture15.png",
                children: [
                    { id: "1.5.1a", label: "1.5.1 (a)", type: "short", marks: 1, prompt: "Name the: \n(a) Organ in the human male where meiosis occurs" },
                    { id: "1.5.1b", label: "1.5.1 (b)", type: "short", marks: 1, prompt: "(b) Process represented in the diagram" },
                    { id: "1.5.2a", label: "1.5.2 (a)", type: "short", marks: 1, prompt: "Label: \n(a) Area P" },
                    { id: "1.5.2b", label: "1.5.2 (b)", type: "short", marks: 1, prompt: "(b) Structure Q" },
                    { id: "1.5.2c", label: "1.5.2 (c)", type: "short", marks: 1, prompt: "(c) Structure R" },
                ]
            },
            {
                id: "1.6",
                number: "1.6",
                prompt: "In humans, short fingers (F) and a widow's peak (H) are dominant over long \nfingers and continuous hairline. A man and a woman, both heterozygous for \nthe two characteristics, plan on having a child. \nThe table below shows the possible genotypes of the offspring.",
                type: "long",
                marks: 7,
                image: "picture16.png",
                children: [
                    { id: "1.6.1", label: "1.6.1", type: "short", marks: 1, prompt: "State the genotype at Z." },
                    { id: "1.6.2a", label: "1.6.2 (a)", type: "short", marks: 2, prompt: "Give the: \n(a) Genotype of the parents" },
                    { id: "1.6.2b", label: "1.6.2 (b)", type: "short", marks: 1, prompt: "(b) Number of genotypes that could result in offspring with short \nfingers and a continuous hairline" },
                    { id: "1.6.2c", label: "1.6.2 (c)", type: "short", marks: 1, prompt: "(c) Allele for a continuous hairline" },
                    { id: "1.6.2d", label: "1.6.2 (d)", type: "short", marks: 2, prompt: "(d) Phenotype of a child who is homozygous recessive for both \ncharacteristics" },
                ]
            },
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
                prompt: "The diagram below represents two processes that occur during protein \nsynthesis.",
                type: "long",
                marks: 10,
                image: "picture21.png",
                children: [
                    { id: "2.1.1a", label: "2.1.1 (a)", type: "short", marks: 1, prompt: "Where in the cell does EACH of the following processes occur? \n(a) X" },
                    { id: "2.1.1b", label: "2.1.1 (b)", type: "short", marks: 1, prompt: "(b) Y" },
                    { id: "2.1.2", label: "2.1.2", type: "short", marks: 2, prompt: "State ONE difference between the types of nitrogenous bases \nfound in DNA and RNA." },
                    { id: "2.1.3", label: "2.1.3", type: "long", marks: 6, prompt: "Name and describe process X." },
                ]
            },
            {
                id: "2.2",
                number: "2.2",
                prompt: "Describe how non-disjunction may lead to Down syndrome.",
                type: "long",
                marks: 5
            },
            {
                id: "2.3",
                number: "2.3",
                prompt: "The diagram below represents the chromosomes from the human somatic cells \nof two individuals who are twins.",
                type: "long",
                marks: 10,
                image: "picture23.png",
                children: [
                    { id: "2.3.1", label: "2.3.1", type: "short", marks: 1, prompt: "What are somatic cells?" },
                    { id: "2.3.2", label: "2.3.2", type: "short", marks: 1, prompt: "Name the specific type of chromosomes numbered 1 to 22." },
                    { id: "2.3.3a", label: "2.3.3 (a)", type: "multi", marks: 2, prompt: "Each of the pairs shown is a homologous pair of chromosomes. \n(a) State the origin of each chromosome in a homologous pair \nduring zygote formation." },
                    { id: "2.3.3b", label: "2.3.3 (b)", type: "multi", marks: 3, prompt: "(b) List THREE characteristics that chromosomes in a \nhomologous pair have in common." },
                    { id: "2.3.4", label: "2.3.4", type: "long", marks: 3, prompt: "Explain ONE observable reason why the two individuals are not \nidentical twins." },
                ]
            },
            {
                id: "2.4",
                number: "2.4",
                prompt: "One type of deafness in humans is carried on a single allele. The diagram \nbelow shows the inheritance of deafness in a family.",
                type: "long",
                marks: 9,
                image: "picture24.png",
                children: [
                    { id: "2.4.1a", label: "2.4.1 (a)", type: "short", marks: 1, prompt: "How many: \n(a) Generations are represented in this pedigree diagram" },
                    { id: "2.4.1b", label: "2.4.1 (b)", type: "short", marks: 1, prompt: "(b) Children of Paul and Lizzy are able to hear" },
                    { id: "2.4.2", label: "2.4.2", type: "short", marks: 1, prompt: "Which phenotype is dominant?" },
                    { id: "2.4.3", label: "2.4.3", type: "long", marks: 4, prompt: "Use the offspring of Bob and Ann to explain your answer to \nQUESTION 2.4.2." },
                    { id: "2.4.4", label: "2.4.4", type: "multi", marks: 2, prompt: "Use the letter 'A' to represent the dominant allele and the letter 'a' \nfor the recessive allele to give ALL the possible genotypes for a \nhearing individual." },
                ]
            },
            {
                id: "2.5",
                number: "2.5",
                prompt: "Use a genetic cross to show how gender in human offspring is determined by \nthe sex chromosomes of the parents.",
                type: "long",
                marks: 6
            },
            {
                id: "2.6",
                number: "2.6",
                prompt: "Read the extract below. \nResearchers have discovered that members of a particular family have high \nbone density that may be caused by a gene mutation. High bone density \nreduces the risk of bone fractures. \nTwenty members of the family had their bone density measured and DNA \nsamples taken. Seven had high bone density. The high bone density occurred \nthroughout their bodies but especially in the spine and hips.",
                type: "long",
                marks: 10,
                image: "picture26.png",
                children: [
                    { id: "2.6.1", label: "2.6.1", type: "multi", marks: 2, prompt: "From the extract, identify TWO areas in the body where bone density \ncan mainly be measured." },
                    { id: "2.6.2", label: "2.6.2", type: "long", marks: 2, prompt: "Describe what a gene mutation is." },
                    { id: "2.6.3", label: "2.6.3", type: "long", marks: 2, prompt: "Explain why it was necessary for the researchers to collect DNA \nsamples." },
                    { id: "2.6.4", label: "2.6.4", type: "short", marks: 1, prompt: "State the effect of this mutation." },
                    { id: "2.6.5", label: "2.6.5", type: "long", marks: 3, prompt: "Calculate the percentage of the family members who had normal \nbone density. Show ALL your workings." },
                ]
            },
            {
                id: "3.1",
                number: "3.1",
                prompt: "Some horses have straight hair and others have curly hair. A scientist wanted \nto clone a straight-haired male horse to meet the demand for horses with \nstraight hair. \nThe scientist used the following procedure: \n• The nucleus of a somatic cell was taken from a straight-haired male \nhorse (horse S). \n• An unfertilised ovum was removed from a curly-haired female horse \n(horse T). \n• The nucleus from the somatic cell of horse S was placed into the ovum \ntaken from horse T. \n• This ovum was then placed into the uterus of a female surrogate horse \n(horse R).",
                type: "long",
                marks: 8,
                children: [
                    { id: "3.1.1", label: "3.1.1", type: "long", marks: 3, prompt: "Explain why a somatic cell and NOT a sperm cell from horse S \nwould provide the nucleus for the procedure." },
                    { id: "3.1.2", label: "3.1.2", type: "long", marks: 2, prompt: "Before inserting the nucleus from the somatic cell of horse S, the \nnucleus from the ovum of horse T was removed.  \nExplain the significance of this procedure." },
                    { id: "3.1.3", label: "3.1.3", type: "short", marks: 1, prompt: "To which of the three horses (S, T or R) will the cloned offspring be \ngenetically identical?" },
                    { id: "3.1.4", label: "3.1.4", type: "multi", marks: 2, prompt: "State TWO benefits of cloning." },
                ]
            },
            {
                id: "3.2",
                number: "3.2",
                prompt: "The present-day distribution of three closely related species of the dog family, \nthe coyote, jackal and dingo, is shown on the world map below.",
                type: "long",
                marks: 11,
                image: "picture32.png",
                children: [
                    { id: "3.2.1", label: "3.2.1", type: "short", marks: 1, prompt: "What type of evidence for evolution is represented here?" },
                    { id: "3.2.2", label: "3.2.2", type: "long", marks: 3, prompt: "What is a biological species?" },
                    { id: "3.2.3", label: "3.2.3", type: "long", marks: 7, prompt: "Describe how these three species could have evolved from a \ncommon ancestor." },
                ]
            },
            {
                id: "3.3",
                number: "3.3",
                prompt: "Some farmers add low doses of antibiotics to the feed for cattle. The use of \nantibiotics in cattle feed could result in the evolution of antibiotic-resistant \nbacteria. \nThe graph below shows the effect of different doses of antibiotics on the \nnumber of harmful bacteria in the cattle.",
                type: "long",
                marks: 10,
                image: "picture33.png",
                children: [
                    { id: "3.3.1", label: "3.3.1", type: "long", marks: 4, prompt: "Use evidence from the graph to explain why higher doses of \nantibiotics will benefit the farmer economically." },
                    { id: "3.3.2", label: "3.3.2", type: "long", marks: 6, prompt: "Explain how the use of antibiotics in animal feed may result in the \nevolution of antibiotic resistant bacteria." },
                ]
            },
            {
                id: "3.4",
                number: "3.4",
                prompt: "Female gallflies lay eggs on the stems of plants. The eggs hatch to form \nlarvae that secrete a substance into the plant tissue. The secretions cause the \nplant cells to grow and form ball-like structures, called galls, which are high in \nnutrients. Predatory birds feed on the larvae in the galls. \nThe size of the galls produced actually depends on genetic variation in the \ngallfly.  \nThe diagram below shows the gallfly and a gall on a plant stem.  \nScientists wanted to investigate whether the size of the galls had an effect on \nthe percentage of gallfly larvae killed by predatory birds. \nThe table below shows the results of their investigation.",
                type: "long",
                marks: 13,
                image: "picturenew.png ",

                children: [
                    { id: "3.4.1a", label: "3.4.1 (a)", type: "short", marks: 1, prompt: "State the: \n(a) Independent variable" },
                    { id: "3.4.1b", label: "3.4.1 (b)", type: "short", marks: 1, prompt: "(b) Dependent variable" },
                    { id: "3.4.2", label: "3.4.2", type: "short", marks: 1, prompt: "Give ONE advantage of the gall to the gallfly larvae." },
                    { id: "3.4.3", label: "3.4.3", type: "short", marks: 1, prompt: "State why the size of the galls produced is an example of \ncontinuous variation." },
                    { id: "3.4.4", label: "3.4.4", type: "long", marks: 3, prompt: "Explain how the percentage of gallfly larvae killed by predatory \nbirds is influenced by the size of the gall." },
                    { id: "3.4.5", label: "3.4.5", type: "long", marks: 6, prompt: "Draw a line graph to represent the information in the table." },
                ]
            },
            {
                id: "3.5",
                number: "3.5",
                prompt: "The diagram below represents the pelvic structure and the ventral view of the \nskulls of three organisms. The diagrams are drawn to scale.",
                type: "long",
                marks: 8,
                image: "picture35.png",
                children: [
                    { id: "3.5.1a", label: "3.5.1 (a)", type: "multi", marks: 2, prompt: "Write down the LETTER(S) of the diagram(s) that represent the: \n(a) Skulls of bipedal organisms" },
                    { id: "3.5.1b", label: "3.5.1 (b)", type: "short", marks: 1, prompt: "(b) Pelvic structure of a quadrupedal organism" },
                    { id: "3.5.2", label: "3.5.2", type: "long", marks: 2, prompt: "Give a reason for your answer to QUESTION 3.5.1(b)." },
                    { id: "3.5.3", label: "3.5.3", type: "long", marks: 3, prompt: "Describe ONE other structural difference between a bipedal and a \nquadrupedal organism." },
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
    { id: "1.1.3", marks: 2, type: "mcq", correct: "C" },
    { id: "1.1.4", marks: 2, type: "mcq", correct: "A" },
    { id: "1.1.5", marks: 2, type: "mcq", correct: "B" },
    { id: "1.1.6", marks: 2, type: "mcq", correct: "D" },
    { id: "1.1.7", marks: 2, type: "mcq", correct: "C" },
    { id: "1.1.8", marks: 2, type: "mcq", correct: "C" },
    { id: "1.1.9", marks: 2, type: "mcq", correct: "D" },

    // 1.2 terms (allow synonyms by duplicating entries)
    { id: "1.2.1", marks: 1, type: "short", correct: "phylogenetic tree" },
    { id: "1.2.1", marks: 1, type: "short", correct: "cladogram" },
    { id: "1.2.2", marks: 1, type: "short", correct: "peptide bond" },
    { id: "1.2.3", marks: 1, type: "short", correct: "punctuated equilibrium" },
    { id: "1.2.4", marks: 1, type: "short", correct: "homologous structures" },
    { id: "1.2.5", marks: 1, type: "short", correct: "artificial selection" },
    { id: "1.2.5", marks: 1, type: "short", correct: "selective breeding" },
    { id: "1.2.6", marks: 1, type: "short", correct: "co-dominance" },

    // 1.3 column matching (exact strings)
    { id: "1.3.1", marks: 2, type: "short", correct: "both a and b" },
    { id: "1.3.2", marks: 2, type: "short", correct: "both a and b" },
    { id: "1.3.3", marks: 2, type: "short", correct: "none" },

    // 1.4 DNA
    { id: "1.4.1a", marks: 1, type: "short", correct: "nitrogenous base" },
    { id: "1.4.1a", marks: 1, type: "short", correct: "guanine" },
    { id: "1.4.1a", marks: 1, type: "short", correct: "cytosine" },
    { id: "1.4.1b", marks: 1, type: "short", correct: "deoxyribose" },
    { id: "1.4.1b", marks: 1, type: "short", correct: "sugar" },
    { id: "1.4.1c", marks: 1, type: "short", correct: "hydrogen bond" },
    { id: "1.4.2", marks: 1, type: "short", correct: "nucleotide" },
    { id: "1.4.3", marks: 1, type: "short", correct: "double helix" },
    { id: "1.4.4", marks: 1, type: "short", correct: "replication" },
    { id: "1.4.5", marks: 2, type: "multi", correct: ["nucleus", "chromosome", "chromatid", "chromatin", "nucleoplasm", "mitochondria"], policy: "firstTwo" },

    // 1.5 meiosis diagram
    { id: "1.5.1a", marks: 1, type: "short", correct: "testis" },
    { id: "1.5.1b", marks: 1, type: "short", correct: "crossing over" },
    { id: "1.5.2a", marks: 1, type: "short", correct: "chiasma" },
    { id: "1.5.2b", marks: 1, type: "short", correct: "centromere" },
    { id: "1.5.2c", marks: 1, type: "short", correct: "chromatid" },

    // 1.6 dihybrid
    { id: "1.6.1", marks: 1, type: "short", correct: "ffhh" },
    { id: "1.6.2a", marks: 2, type: "short", correct: "FfHh" },
    { id: "1.6.2b", marks: 1, type: "short", correct: "3" },
    { id: "1.6.2c", marks: 1, type: "short", correct: "h" },
    { id: "1.6.2d", marks: 2, type: "short", correct: "long fingers and continuous hairline" },

    // 2.1 protein synthesis
    { id: "2.1.1a", marks: 1, type: "short", correct: "nucleus" },
    { id: "2.1.1a", marks: 1, type: "short", correct: "nucleoplasm" },
    { id: "2.1.1b", marks: 1, type: "short", correct: "ribosome" },
    { id: "2.1.1b", marks: 1, type: "short", correct: "cytoplasm" },
    { id: "2.1.2", marks: 2, type: "short", correct: "dna contains thymine whereas rna contains uracil" },
    { id: "2.1.3", marks: 6, type: "long", correct: [
            "dna unwinds", "unzips", "hydrogen bonds break", "template strand",
            "mrna forms", "free rna nucleotides", "complementary base pairing a-u g-c",
            "mrna carries coded message"
        ] },

    // 2.2 down syndrome
    { id: "2.2", marks: 5, type: "long", correct: [
            "chromosome pair 21 fails to separate", "during anaphase",
            "gamete has extra chromosome", "fertilised by normal gamete 23",
            "zygote 47 chromosomes trisomy 21"
        ] },

    // 2.3 somatic/homologous
    { id: "2.3.1", marks: 1, type: "short", correct: "body cells" },
    { id: "2.3.2", marks: 1, type: "short", correct: "autosomes" },
    { id: "2.3.3a", marks: 2, type: "multi", correct: ["sperm/father", "ovum/mother"], policy: "firstTwo" },
    { id: "2.3.3b", marks: 3, type: "multi", correct: ["shape", "size", "position of genes", "same characteristics", "location of centromere"], policy: "firstThree" },
    { id: "2.3.4", marks: 3, type: "long", correct: [
            "gonosomes not identical", "individual 1 xy male", "individual 2 xx female"
        ] },

    // 2.4 pedigree
    { id: "2.4.1a", marks: 1, type: "short", correct: "3" },
    { id: "2.4.1b", marks: 1, type: "short", correct: "2" },
    { id: "2.4.2", marks: 1, type: "short", correct: "hearing" },
    { id: "2.4.3", marks: 4, type: "long", correct: [
            "bob and ann can both hear", "child is deaf aa",
            "each parent carries allele for deafness heterozygous Aa",
            "masked by dominant allele for hearing"
        ] },
    { id: "2.4.4", marks: 2, type: "multi", correct: ["AA", "Aa"], policy: "firstTwo" },

    // 2.5 sex determination – credit key steps
    { id: "2.5", marks: 6, type: "long", correct: [
            "male gametes x and y", "female gametes x and x", "offspring xx female", "offspring xy male",
            "meiosis and fertilisation shown", "correct genotypes/phenotypes"
        ] },

    // 2.6 bone density
    { id: "2.6.1", marks: 2, type: "multi", correct: ["spine", "hips"], policy: "firstTwo" },
    { id: "2.6.2", marks: 2, type: "long", correct: ["change in sequence", "of nitrogenous bases/nucleotides in dna"] },
    { id: "2.6.3", marks: 2, type: "long", correct: ["check for gene mutation", "if results in high bone density"] },
    { id: "2.6.4", marks: 1, type: "short", correct: "produces high bone density reduces risk of fractures" },
    { id: "2.6.5", marks: 3, type: "long", correct: [
            "7 of 20 high = 35%", "100 - 35 = 65%", "65% normal bone density"
        ] },

    // 3.1 cloning
    { id: "3.1.1", marks: 3, type: "long", correct: [
            "somatic nucleus diploid full set chromosomes", "sperm haploid half set", "somatic carries desired characteristic straight hair"
        ] },
    { id: "3.1.2", marks: 2, type: "long", correct: [
            "remove ovum dna curly hair", "only desired dna present correct number of chromosomes"
        ] },
    { id: "3.1.3", marks: 1, type: "short", correct: "s" },
    { id: "3.1.4", marks: 2, type: "multi", correct: [
            "produce organisms with desired traits", "conservation of threatened species", "create tissues/organs for transplant"
        ], policy: "firstTwo" },

    // 3.2 speciation
    { id: "3.2.1", marks: 1, type: "short", correct: "biogeography" },
    { id: "3.2.2", marks: 3, type: "long", correct: [
            "similar organisms", "interbreed", "produce fertile offspring"
        ] },
    { id: "3.2.3", marks: 7, type: "long", correct: [
            "common ancestor on large continent", "separated by continental drift oceans",
            "no gene flow among populations", "different environments",
            "natural selection independently", "became different genotypically phenotypically",
            "cannot interbreed produce fertile offspring different species"
        ] },

    // 3.3 antibiotics
    { id: "3.3.1", marks: 4, type: "long", correct: [
            "higher dose decreases harmful bacteria most", "prevents disease less medical expenses",
            "decreases mortality maintains cattle numbers", "increase profit"
        ] },
    { id: "3.3.2", marks: 6, type: "long", correct: [
            "natural selection", "variation/mutation", "some resistant some non-resistant",
            "antibiotic added to feed", "non-resistant killed", "resistant survive reproduce",
            "resistance passed to offspring", "higher proportion resistant next generation"
        ] },

    // 3.4 gallfly
    { id: "3.4.1a", marks: 1, type: "short", correct: "gall size" },
    { id: "3.4.1b", marks: 1, type: "short", correct: "percentage of larvae killed" },
    { id: "3.4.2", marks: 1, type: "short", correct: "nutrition" },
    { id: "3.4.2", marks: 1, type: "short", correct: "food" },
    { id: "3.4.2", marks: 1, type: "short", correct: "protection" },
    { id: "3.4.2", marks: 1, type: "short", correct: "space" },
    { id: "3.4.3", marks: 1, type: "short", correct: "range of intermediate values" },
    { id: "3.4.4", marks: 3, type: "long", correct: [
            "30mm galls eaten more", "more visible to birds", "contain more/larger larvae",
            "smaller <=25mm eaten less", "less visible", "contain fewer/smaller larvae"
        ] },
    { id: "3.4.5", marks: 6, type: "long", correct: [
            "line graph type", "caption includes both variables",
            "axes labels with units", "equal scale intervals",
            "points plotted correctly (1–4)", "all 5 points correctly (2)"
        ] },

    // 3.5 bipedal vs quadrupedal
    { id: "3.5.1a", marks: 2, type: "multi", correct: ["x", "z"], policy: "firstTwo" },
    { id: "3.5.1b", marks: 1, type: "short", correct: "c" },
    { id: "3.5.2", marks: 2, type: "long", correct: ["pelvis is long", "and narrow"] },
    { id: "3.5.3", marks: 3, type: "long", correct: [
            "spine s-shaped bipedal c-shaped quadrupedal",
            "foramen magnum forward bipedal backward quadrupedal"
        ] },
];

/* ------------------------------- Evaluator ---------------------------------- */


// ... (keep your questions, markingGuidelines, evaluator, components etc. as before)


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
                        src={`/assets2/${question.image}`}
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
                                        src={`/assets2/${c.image}`}
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

function LifeScienceP2Nov2021Eng () {
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
                <h2>GRADE 12 – LIFE SCIENCES P2 – NOVEMBER 2021</h2>
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
                <p>This digital paper mirrors the DBE Life Sciences P2 November 2021. Marking uses the official memo.</p>
            </footer>
        </div>
    );
}  // <-- THIS CLOSING } MATCHES function App() {

export default LifeScienceP2Nov2021Eng;