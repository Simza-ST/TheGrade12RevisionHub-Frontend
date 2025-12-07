
// App.js
// Complete single-file React app (JavaScript) that digitizes
// Life Sciences P2 November 2023 with answering, submission,
// auto-marking, per-question feedback, and results.
//
// Usage:
// - Drop this into a Create React App or Vite React project as src/App.js
// - Ensure React is installed
// - Add the style tag below to index.html or keep styles inline here (see StyleInjector)

import React, { useMemo, useState, useEffect, useCallback } from "react";
import LifeScienceP1Nov2023Eng from "../Paper1/LifeScienceP1Nov2023Eng";

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
                prompt: "Various options are provided as possible answers to the following questions. Choose the answer and write only the letter (A–D) next to the question numbers (1.1.1 to 1.1.9) in the ANSWER BOOK, e.g. 1.1.11 D.",
                type: "long",
                marks: 18,
                children: [
                    {
                        id: "1.1.1",
                        label: "1.1.1",
                        type: "mcq",
                        marks: 2,
                        prompt: "The base pairing in DNA was discovered by …",
                        options: [
                            { letter: "A", text: "Watson and Wilkins." },
                            { letter: "B", text: "Franklin and Wilkins." },
                            { letter: "C", text: "Franklin and Crick." },
                            { letter: "D", text: "Crick and Watson." }
                        ]
                    },
                    {
                        id: "1.1.2",
                        label: "1.1.2",
                        type: "mcq",
                        marks: 2,
                        prompt: "A gene codes for the production of …",
                        options: [
                            { letter: "A", text: "a chromosome." },
                            { letter: "B", text: "an allele." },
                            { letter: "C", text: "DNA." },
                            { letter: "D", text: "a protein." }
                        ]
                    },
                    {
                        id: "1.1.3",
                        label: "1.1.3",
                        type: "mcq",
                        marks: 2,
                        prompt: "Which ONE of the following is a characteristic of stem cells?",
                        options: [
                            { letter: "A", text: "They are easily obtained from any organ." },
                            { letter: "B", text: "They divide by meiosis." },
                            { letter: "C", text: "They are haploid." },
                            { letter: "D", text: "They can be stimulated to form any type of cell needed." }
                        ]
                    },
                    {
                        id: "1.1.4",
                        label: "1.1.4",
                        type: "mcq",
                        marks: 2,
                        prompt: "The chances of having a female child in humans is …",
                        options: [
                            { letter: "A", text: "25%" },
                            { letter: "B", text: "50%" },
                            { letter: "C", text: "75%" },
                            { letter: "D", text: "100%" }
                        ]
                    },
                    {
                        id: "1.1.5",
                        label: "1.1.5",
                        type: "mcq",
                        marks: 2,
                        prompt: "Which ONE of the following is part of the reason why colour-blindness is more common in males than in females?",
                        options: [
                            { letter: "A", text: "The allele for colour-blindness is recessive and located on the X-chromosome." },
                            { letter: "B", text: "Colour-blind males have two copies of the allele for colour-blindness." },
                            { letter: "C", text: "The allele for colour-blindness is recessive and located on the Y-chromosome." },
                            { letter: "D", text: "Fathers pass the allele of colour-blindness to their sons only." }
                        ]
                    },
                    {
                        id: "1.1.6",
                        label: "1.1.6",
                        type: "mcq",
                        marks: 2,
                        image:"picture116.png",
                        prompt: "The DNA profile of four individuals are given below. Which individuals are possible members of the same family? (Diagram shows profiles W, X, Y, Z)",
                        options: [
                            { letter: "A", text: "X and Z only" },
                            { letter: "B", text: "X, Y and Z only" },
                            { letter: "C", text: "W, Y and Z only" },
                            { letter: "D", text: "W, X and Y only" }
                        ]
                    },
                    {
                        id: "1.1.7",
                        label: "1.1.7",
                        type: "mcq",
                        marks: 2,
                        image:"picture117.png",
                        prompt: "When two plants heterozygous for a characteristic are crossed, the expected ratio is:",
                        options: [
                            { letter: "A", text: "3 : 1" },
                            { letter: "B", text: "1 : 2" },
                            { letter: "C", text: "1 : 3" },
                            { letter: "D", text: "1 : 1" }
                        ]
                    },
                    {
                        id: "1.1.8",
                        label: "1.1.8",
                        type: "mcq",
                        marks: 2,
                        image:"picture118.png",
                        prompt: "The diagram below represents the structure of chromosomes at different stages of meiotic cell division. Which ONE of the following chromosomes would be found in a cell during late Anaphase II? (Diagram Q, R, S, T)",
                        options: [
                            { letter: "A", text: "Q" },
                            { letter: "B", text: "R" },
                            { letter: "C", text: "S" },
                            { letter: "D", text: "T" }
                        ]
                    },
                    {
                        id: "1.1.9",
                        label: "1.1.9",
                        type: "mcq",
                        marks: 2,
                        prompt: "The scientist who discovered Little Foot is …",
                        options: [
                            { letter: "A", text: "Lee Berger." },
                            { letter: "B", text: "Raymond Dart." },
                            { letter: "C", text: "Ron Clarke." },
                            { letter: "D", text: "Robert Broom." }
                        ]
                    },
                ]
            },
            {
                id: "1.2",
                number: "1.2",
                prompt: "Give the correct biological term for each of the following descriptions. Write only the term next to the question numbers (1.2.1 to 1.2.10) in the ANSWER BOOK.",
                type: "long",
                marks: 10,
                children: [
                    { id: "1.2.1", label: "1.2.1", type: "short", marks: 1, prompt: "The position of a gene on a chromosome" },
                    { id: "1.2.2", label: "1.2.2", type: "short", marks: 1, prompt: "The type of evolution characterised by long periods of little or no change followed by short periods of rapid change" },
                    { id: "1.2.3", label: "1.2.3", type: "short", marks: 1, prompt: "The natural shape of a DNA molecule" },
                    { id: "1.2.4", label: "1.2.4", type: "short", marks: 1, prompt: "The type of bond found between two amino acids" },
                    { id: "1.2.5", label: "1.2.5", type: "short", marks: 1, prompt: "The type of vision shared in primates that allows for depth perception" },
                    { id: "1.2.6", label: "1.2.6", type: "short", marks: 1, prompt: "The type of dominance which results in an intermediate phenotype in the heterozygous condition" },
                    { id: "1.2.7", label: "1.2.7", type: "short", marks: 1, prompt: "The fluid of the nucleus where free nucleotides are found" },
                    { id: "1.2.8", label: "1.2.8", type: "short", marks: 1, prompt: "A tangled mass of chromosomes located within the nucleus" },
                    { id: "1.2.9", label: "1.2.9", type: "short", marks: 1, prompt: "The division of the cytoplasm after a nuclear division" },
                    { id: "1.2.10", label: "1.2.10", type: "short", marks: 1, prompt: "The name for the X and Y sex chromosomes in humans" },
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
                        prompt: "A genetic disorder caused by a chromosomal mutation: A - Haemophilia / B - Colour-blindness"
                    },
                    {
                        id: "1.3.2",
                        label: "1.3.2",
                        type: "short",
                        marks: 2,
                        prompt: "The importance of meiosis: A - Formation of gametes / B - Halving of the chromosome number"
                    },
                    {
                        id: "1.3.3",
                        label: "1.3.3",
                        type: "short",
                        marks: 2,
                        prompt: "The organelle where DNA is found in plants: A - Mitochondria / B - Chloroplast"
                    },
                ]
            },
            {
                id: "1.4",
                number: "1.4",
                prompt: "The diagram below shows the inheritance of blood groups in a family. (Diagram: Pedigree with Bob (B), Ann (A), Lina (A), Vusi (O), Athi (O), Chris (O))",
                type: "long",
                marks: 8,
                image:"picture14.png",
                children: [
                    { id: "1.4.1", label: "1.4.1", type: "short", marks: 1, prompt: "Name the type of diagram shown." },
                    { id: "1.4.2", label: "1.4.2", type: "short", marks: 1, prompt: "Give the number of alleles that control blood groups." },
                    { id: "1.4.3", label: "1.4.3", type: "short", marks: 1, prompt: "How many generations are represented in the diagram?" },
                    { id: "1.4.4", label: "1.4.4", type: "multi", marks: 2, prompt: "Lina’s genotype is I^A i. State ALL the possible genotypes of Vusi." },
                    { id: "1.4.5", label: "1.4.5", type: "short", marks: 1, prompt: "Give the genotype of Bob." },
                    { id: "1.4.6", label: "1.4.6", type: "short", marks: 2, prompt: "Give the name of the individual which displays co-dominance." },
                ]
            },
            {
                id: "1.5",
                number: "1.5",
                prompt: "The diagram below is a schematic representation of protein synthesis. (Diagram with strands 1 and 2, molecule R, organelle Q, area P, S, O, Z)",
                type: "long",
                marks: 8,
                image:"picture15.png",
                children: [
                    { id: "1.5.1a", label: "1.5.1 (a)", type: "short", marks: 1, prompt: "Identify: (a) Process Z" },
                    { id: "1.5.1b", label: "1.5.1 (b)", type: "short", marks: 1, prompt: "(b) Molecule R" },
                    { id: "1.5.1c", label: "1.5.1 (c)", type: "short", marks: 1, prompt: "(c) Organelle Q" },
                    { id: "1.5.2", label: "1.5.2", type: "short", marks: 1, prompt: "Give the collective name of nitrogenous bases O." },
                    { id: "1.5.3", label: "1.5.3", type: "short", marks: 1, prompt: "Determine the sequence of the nitrogenous bases at area S." },
                    { id: "1.5.4", label: "1.5.4", type: "short", marks: 1, prompt: "Which strand (1 or 2) was used as a template for the formation of molecule R?" },
                    { id: "1.5.5", label: "1.5.5", type: "short", marks: 1, prompt: "Which amino acid (3, 4 or 5) will be brought to area P?" },
                    { id: "1.5.6", label: "1.5.6", type: "short", marks: 1, prompt: "Name the type of sugar that forms part of the structure of molecule R." },
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
                id: "2",
                number: "QUESTION 2",
                marks: 50,
                children: [
                    {
                        id: "2.1",
                        number: "2.1",
                        prompt: "The diagrams below represent two stages of meiotic cell division. (Diagram 1: Prophase I with A chiasmata, B centriole, C spindle; Diagram 2: Metaphase I with D chromosomes)",
                        type: "long",
                        marks: 15,
                        image:"picture21.png",
                        children: [
                            { id: "2.1.1a", label: "2.1.1 (a)", type: "short", marks: 1, prompt: "Name structure: (a) B" },
                            { id: "2.1.1b", label: "2.1.1 (b)", type: "short", marks: 1, prompt: "(b) C" },
                            { id: "2.1.2", label: "2.1.2", type: "short", marks: 1, prompt: "Identify the phase represented in Diagram 1." },
                            { id: "2.1.3", label: "2.1.3", type: "multi", marks: 3, prompt: "Give THREE reasons for your answer to QUESTION 2.1.2." },
                            { id: "2.1.4", label: "2.1.4", type: "long", marks: 3, prompt: "Describe the process taking place at A." },
                            { id: "2.1.5a", label: "2.1.5 (a)", type: "short", marks: 1, prompt: "Identify the phase represented in Diagram 2." },
                            { id: "2.1.5b", label: "2.1.5 (b)", type: "long", marks: 2, prompt: "Describe the difference in the events that take place in the phase mentioned in (a) and the same phase during mitosis." },
                            { id: "2.1.6", label: "2.1.6", type: "long", marks: 3, prompt: "Describe the results at the end of meiosis if the chromosomes at D failed to separate." },
                        ]
                    },
                    {
                        id: "2.2",
                        number: "2.2",
                        prompt: "Describe the process of DNA replication.",
                        type: "long",
                        marks: 6
                    },
                    {
                        id: "2.3",
                        number: "2.3",
                        prompt: "Read the information below: A gene, VKORC1, codes for a blood-clotting factor in humans. This gene is made up of 163 amino acids. A mutation occurred that affected amino acid 128 and 139, the sequence CTG changed to CAG and the TAT became TCT. This mutation has been transmitted as an autosomal dominant characteristic through the generations. The mutation has resulted in resistance to Warfarin drugs in humans. Warfarin is used in the treatment of thrombosis. Thrombosis results in the formation of a blood clot in the artery. Warfarin causes the thinning of blood to break down the blood clot.",
                        type: "long",
                        marks: 14,
                        image:"picture23.png",
                        children: [
                            { id: "2.3.1", label: "2.3.1", type: "short", marks: 1, prompt: "Give ONE piece of evidence from the information that shows that the mutation for this gene occurred in the DNA molecule." },
                            { id: "2.3.2", label: "2.3.2", type: "short", marks: 2, prompt: "How many nitrogenous bases code for the VKORC1 gene?" },
                            { id: "2.3.3", label: "2.3.3", type: "long", marks: 3, prompt: "Describe what is meant by an autosomal dominant allele." },
                            { id: "2.3.4a", label: "2.3.4 (a)", type: "long", marks: 5, prompt: "The table below shows the amino acids and their corresponding codons. Explain how the mutation on the VKORC1 gene resulted in resistance to Warfarin in humans." },
                            { id: "2.3.4b", label: "2.3.4 (b)", type: "long", marks: 3, prompt: "The effect of this mutation on humans with thrombosis." },
                        ]
                    },
                    {
                        id: "2.4",
                        number: "2.4",
                        prompt: "Polydactyly is a condition that leads to extra fingers or toes. It is caused by a dominant allele. A man who is heterozygous for polydactyly has a wife who is not polydactyl. Using the letters R and r, do a genetic cross to show the percentage chance that their children will have polydactyly.",
                        type: "long",
                        marks: 6
                    },
                    {
                        id: "2.5",
                        number: "2.5",
                        prompt: "In summer squash plants, white fruit colour (B) is dominant over yellow fruit colour (b), and round fruit (D) is dominant over oval fruit (d). A summer squash plant that is homozygous for white and round fruit is crossed with a plant that is homozygous for yellow and oval fruit.",
                        type: "long",
                        marks: 9,
                        children: [
                            { id: "2.5.1a", label: "2.5.1 (a)", type: "short", marks: 2, prompt: "State the genotypes of the P1-parents." },
                            { id: "2.5.1b", label: "2.5.1 (b)", type: "short", marks: 2, prompt: "Phenotypes of the F1-generation." },
                            { id: "2.5.2a", label: "2.5.2 (a)", type: "multi", marks: 2, prompt: "Two plants that are heterozygous for both characteristics were crossed. Give ALL the possible genotypes in the gametes that will be formed." },
                            { id: "2.5.2b", label: "2.5.2 (b)", type: "short", marks: 1, prompt: "How many plants in the next generation are likely to have yellow and oval fruit?" },
                            { id: "2.5.3", label: "2.5.3", type: "short", marks: 2, prompt: "Give the possible genotypes of both parents that must be crossed if a farmer wants summer squash that are white with oval fruit only." },
                        ]
                    },
                ]
            },
            {
                id: "3",
                number: "QUESTION 3",
                marks: 50,
                children: [
                    {
                        id: "3.1",
                        number: "3.1",
                        prompt: "The graph below shows the results of artificial selection for protein content in mealie plants over 50 generations. (Graph showing increase from ~8% to ~20%)",
                        type: "long",
                        marks: 8,
                        image:"picture31.png",
                        children: [
                            { id: "3.1.1", label: "3.1.1", type: "long", marks: 3, prompt: "Describe how this farmer did artificial selection of the mealie plant." },
                            { id: "3.1.2", label: "3.1.2", type: "short", marks: 1, prompt: "What was the average percentage of the protein content in the mealie grains (kernels) at the 15th generation?" },
                            { id: "3.1.3", label: "3.1.3", type: "long", marks: 2, prompt: "By how many times did the average percentage of the protein content in the mealie grains (kernels) increase between the 40th and 50th generation? Show ALL working." },
                            { id: "3.1.4", label: "3.1.4", type: "long", marks: 2, prompt: "Describe ONE way in which the process of artificial selection differs from genetic engineering." },
                        ]
                    },
                    {
                        id: "3.2",
                        number: "3.2",
                        prompt: "Describe how natural selection occurs in a population.",
                        type: "long",
                        marks: 7
                    },
                    {
                        id: "3.3",
                        number: "3.3",
                        prompt: "The diagram below shows the heads of three species of lizards: A (small head), B (medium), C (large head). The table shows average bite force and head height. (Table: Species A: Bite 10N, Height 5mm; B: 15N, 7mm; C: 20N, 9mm)",
                        type: "long",
                        marks: 12,
                        image:"picture33.png",
                        children: [
                            { id: "3.3.1a", label: "3.3.1 (a)", type: "short", marks: 1, prompt: "Which variable was changed? (a) Height of the head" },
                            { id: "3.3.1b", label: "3.3.1 (b)", type: "short", marks: 1, prompt: "(b) Bite force" },
                            { id: "3.3.2", label: "3.3.2", type: "multi", marks: 2, prompt: "State TWO ways in which the investigation was designed to ensure reliable results." },
                            { id: "3.3.3", label: "3.3.3", type: "short", marks: 1, prompt: "What type of variation is shown by the head height of the lizards?" },
                            { id: "3.3.4", label: "3.3.4", type: "long", marks: 2, prompt: "Explain the relationship between head height and bite force." },
                            { id: "3.3.5", label: "3.3.5", type: "short", marks: 1, prompt: "Which species has the highest head height?" },
                            { id: "3.3.6", label: "3.3.6", type: "long", marks: 2, prompt: "Explain why this species has a higher bite force." },
                            { id: "3.3.7", label: "3.3.7", type: "short", marks: 1, prompt: "Which species has the lowest bite force?" },
                            { id: "3.3.8", label: "3.3.8", type: "long", marks: 2, prompt: "Suggest a reason for this species having a lower bite force." },
                        ]
                    },
                    {
                        id: "3.4",
                        number: "3.4",
                        prompt: "The timeline below shows the evolution of hominids. (Timeline: H. habilis 2.5mya, H. erectus 1.8mya, H. heidelbergensis 0.6mya, H. sapiens 0.3mya, with tools and brain size)",
                        type: "long",
                        marks: 11,
                        image:"picture34.png",
                        children: [
                            { id: "3.4.1", label: "3.4.1", type: "short", marks: 1, prompt: "Name the hominid that used Oldowan tools." },
                            { id: "3.4.2", label: "3.4.2", type: "short", marks: 2, prompt: "How many million years ago did H. erectus evolve after H. habilis? Show working." },
                            { id: "3.4.3", label: "3.4.3", type: "short", marks: 1, prompt: "Name the hominid that first used fire." },
                            { id: "3.4.4", label: "3.4.4", type: "multi", marks: 2, prompt: "Give TWO uses of stone tools by early hominids." },
                            { id: "3.4.5", label: "3.4.5", type: "multi", marks: 2, prompt: "Name TWO hominids that co-existed with H. sapiens." },
                            { id: "3.4.6", label: "3.4.6", type: "long", marks: 3, prompt: "Explain how an increase in brain size led to cultural evolution in hominids." },
                        ]
                    },
                    {
                        id: "3.5",
                        number: "3.5",
                        prompt: "Read the following extract: A. sediba is a transitional form between Australopithecus and Homo. It has a small brain but human-like teeth and pelvis. (Diagrams of A. sediba and H. sapiens skulls and pelvis)",
                        type: "long",
                        marks: 12,
                        image:"picture35.png",
                        children: [
                            { id: "3.5.1", label: "3.5.1", type: "short", marks: 1, prompt: "Name the genus to which A. sediba belongs." },
                            { id: "3.5.2", label: "3.5.2", type: "short", marks: 1, prompt: "Give ONE skeletal adaptation for bipedalism in A. sediba." },
                            { id: "3.5.3", label: "3.5.3", type: "long", marks: 2, prompt: "Define the term 'transitional fossil'." },
                            { id: "3.5.4", label: "3.5.4", type: "short", marks: 1, prompt: "Which diagram shows A. sediba?" },
                            { id: "3.5.5", label: "3.5.5", type: "long", marks: 2, prompt: "Explain why the pelvis of A. sediba is considered transitional." },
                            { id: "3.5.6", label: "3.5.6", type: "long", marks: 5, prompt: "Explain TWO differences in the skulls of A. sediba and H. sapiens and suggest a reason for each." },
                        ]
                    },
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
    { id: "1.1.1", marks: 2, type: "mcq", correct: "D" },
    { id: "1.1.2", marks: 2, type: "mcq", correct: "D" },
    { id: "1.1.3", marks: 2, type: "mcq", correct: "D" },
    { id: "1.1.4", marks: 2, type: "mcq", correct: "B" },
    { id: "1.1.5", marks: 2, type: "mcq", correct: "A" },
    { id: "1.1.6", marks: 2, type: "mcq", correct: "C" },
    { id: "1.1.7", marks: 2, type: "mcq", correct: "A" },
    { id: "1.1.8", marks: 2, type: "mcq", correct: "C" },
    { id: "1.1.9", marks: 2, type: "mcq", correct: "C" },

    // 1.2 terms
    { id: "1.2.1", marks: 1, type: "short", correct: "locus" },
    { id: "1.2.2", marks: 1, type: "short", correct: "punctuated equilibrium" },
    { id: "1.2.3", marks: 1, type: "short", correct: "double helix" },
    { id: "1.2.4", marks: 1, type: "short", correct: "peptide bond" },
    { id: "1.2.5", marks: 1, type: "short", correct: "stereoscopic vision" },
    { id: "1.2.5", marks: 1, type: "short", correct: "binocular vision" },
    { id: "1.2.6", marks: 1, type: "short", correct: "incomplete dominance" },
    { id: "1.2.7", marks: 1, type: "short", correct: "nucleoplasm" },
    { id: "1.2.8", marks: 1, type: "short", correct: "chromatin network" },
    { id: "1.2.9", marks: 1, type: "short", correct: "cytokinesis" },
    { id: "1.2.10", marks: 1, type: "short", correct: "gonosomes" },

    // 1.3 matching
    { id: "1.3.1", marks: 2, type: "short", correct: "none" },
    { id: "1.3.2", marks: 2, type: "short", correct: "both a and b" },
    { id: "1.3.3", marks: 2, type: "short", correct: "both a and b" },

    // 1.4 pedigree
    { id: "1.4.1", marks: 1, type: "short", correct: "pedigree diagram" },
    { id: "1.4.2", marks: 1, type: "short", correct: "3" },
    { id: "1.4.3", marks: 1, type: "short", correct: "3" },
    { id: "1.4.4", marks: 2, type: "multi", correct: ["i^a i", "i^b i", "ii"], policy: "firstThree" },
    { id: "1.4.5", marks: 1, type: "short", correct: "ii" },
    { id: "1.4.6", marks: 2, type: "short", correct: "ann" },

    // 1.5 protein synthesis
    { id: "1.5.1a", marks: 1, type: "short", correct: "transcription" },
    { id: "1.5.1b", marks: 1, type: "short", correct: "mrna" },
    { id: "1.5.1b", marks: 1, type: "short", correct: "messenger rna" },
    { id: "1.5.1c", marks: 1, type: "short", correct: "ribosome" },
    { id: "1.5.2", marks: 1, type: "short", correct: "anticodon" },
    { id: "1.5.3", marks: 1, type: "short", correct: "agt" },
    { id: "1.5.4", marks: 1, type: "short", correct: "1" },
    { id: "1.5.5", marks: 1, type: "short", correct: "4" },
    { id: "1.5.6", marks: 1, type: "short", correct: "ribose" },

    // 2.1 meiosis
    { id: "2.1.1a", marks: 1, type: "short", correct: "centriole" },
    { id: "2.1.1a", marks: 1, type: "short", correct: "centrosome" },
    { id: "2.1.1b", marks: 1, type: "short", correct: "spindle fibre" },
    { id: "2.1.2", marks: 1, type: "short", correct: "prophase i" },
    { id: "2.1.3", marks: 3, type: "multi", correct: ["pairing of homologous chromosomes", "bivalents visible", "spindle fibres develop", "crossing over", "centriole to poles", "nuclear membrane disintegrates"], policy: "firstThree" },
    { id: "2.1.4", marks: 3, type: "long", correct: ["homologous chromosomes overlap", "genetic material exchanged", "at chiasmata"] },
    { id: "2.1.5a", marks: 1, type: "short", correct: "metaphase i" },
    { id: "2.1.5b", marks: 2, type: "long", correct: ["meiosis i chromosomes in pairs at equator", "mitosis chromosomes singly at equator"] },
    { id: "2.1.6", marks: 3, type: "long", correct: ["four daughter cells", "two with five chromosomes", "two with three chromosomes"] },

    // 2.2 dna replication
    { id: "2.2", marks: 6, type: "long", correct: ["double helix unwinds", "unzips", "hydrogen bonds break", "strands as templates", "complementary strand built", "a-t c-g pairing", "free nucleotides", "two identical molecules"] },

    // 2.3 vkorc1
    { id: "2.3.1", marks: 1, type: "short", correct: "presence of t thymine" },
    { id: "2.3.2", marks: 2, type: "short", correct: "489" },
    { id: "2.3.3", marks: 3, type: "long", correct: ["form of gene", "on autosome", "always expressed in heterozygous"] },
    { id: "2.3.4a", marks: 5, type: "long", correct: ["codon gac to guc", "leu to gln", "aua to aga", "try to arg", "amino acid sequence changed", "different protein"] },
    { id: "2.3.4b", marks: 3, type: "long", correct: ["harmful effect", "blood clot not broken", "blockage of arteries"] },

    // 2.4 polydactyly cross
    { id: "2.4", marks: 6, type: "long", correct: ["p1 rr x rr", "gametes r r", "f1 rr rr", "50% polydactyly", "p1 f1 shown", "meiosis fertilisation"] },

    // 2.5 squash
    { id: "2.5.1a", marks: 2, type: "short", correct: "bbdd" },
    { id: "2.5.1b", marks: 2, type: "short", correct: "white round" },
    { id: "2.5.2a", marks: 2, type: "multi", correct: ["bd", "bd", "bd", "bd"], policy: "firstFour" },
    { id: "2.5.2b", marks: 1, type: "short", correct: "1" },
    { id: "2.5.3", marks: 2, type: "short", correct: "bbdd bbdd" },

    // 3.1 artificial selection
    { id: "3.1.1", marks: 3, type: "long", correct: ["interbred high protein plants", "over generations"] },
    { id: "3.1.2", marks: 1, type: "short", correct: "12.8" },
    { id: "3.1.3", marks: 2, type: "long", correct: ["20 / 14 = 1.43 times"] },
    { id: "3.1.4", marks: 2, type: "long", correct: ["artificial interbreed desired", "genetic insert genes"] },

    // 3.2 natural selection
    { id: "3.2", marks: 7, type: "long", correct: ["variation in population", "change environment competition", "favourable survive", "unfavourable die", "survivors reproduce", "pass allele", "higher proportion favourable"] },

    // 3.3 lizards
    { id: "3.3.1a", marks: 1, type: "short", correct: "head height" },
    { id: "3.3.1b", marks: 1, type: "short", correct: "bite force" },
    { id: "3.3.2", marks: 2, type: "multi", correct: ["similar reproductive age", "same measuring tool", "similar environmental conditions", "same species groups"], policy: "firstTwo" },
    { id: "3.3.3", marks: 1, type: "short", correct: "continuous" },
    { id: "3.3.4", marks: 2, type: "long", correct: ["increased head height stronger bite", "decreased head height weaker bite"] },
    { id: "3.3.5", marks: 1, type: "short", correct: "c" },
    { id: "3.3.6", marks: 2, type: "long", correct: ["strongest bite 20.4 n", "break tough plant material"] },
    { id: "3.3.7", marks: 1, type: "short", correct: "a" },
    { id: "3.3.8", marks: 2, type: "long", correct: ["weakest bite", "soft food diet"] },

    // 3.4 hominids
    { id: "3.4.1", marks: 1, type: "short", correct: "h. habilis" },
    { id: "3.4.2", marks: 2, type: "short", correct: "0.7" },
    { id: "3.4.3", marks: 1, type: "short", correct: "h. erectus" },
    { id: "3.4.4", marks: 2, type: "multi", correct: ["scraping", "pounding", "chopping"], policy: "firstTwo" },
    { id: "3.4.5", marks: 2, type: "multi", correct: ["h. neanderthalensis", "h. erectus"], policy: "firstTwo" },
    { id: "3.4.6", marks: 3, type: "long", correct: ["increased brain size intelligence", "development complex tools"] },

    // 3.5 a. sediba
    { id: "3.5.1", marks: 1, type: "short", correct: "australopithecus" },
    { id: "3.5.2", marks: 1, type: "short", correct: "s-shaped spine" },
    { id: "3.5.3", marks: 2, type: "long", correct: ["intermediate characteristics", "between two genera species"] },
    { id: "3.5.4", marks: 1, type: "short", correct: "a" },
    { id: "3.5.5", marks: 2, type: "long", correct: ["transitional pelvis", "shorter wider than b", "longer narrower than c"] },
    { id: "3.5.6", marks: 5, type: "long", correct: ["prognathous sediba non h sapiens", "smaller jaw teeth", "reduced chewing muscles", "changed diet soft cooked food"] },
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
                        src={`/assets6/${question.image}`}
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
                                        src={`/assets6/${c.image}`}
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

function LifeScienceP2Nov2023Eng() {
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
                <h2>GRADE 12 – LIFE SCIENCES P2 – NOVEMBER 2023</h2>
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
                <p>This digital paper mirrors the DBE Life Sciences P2 November 2023. Marking uses the official memo.</p>
            </footer>
        </div>
    );
}  // <-- THIS CLOSING } MATCHES function App() {

export default LifeScienceP2Nov2023Eng;