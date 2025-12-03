export const questions = [
    {
        id: "q1-instr",
        type: "instruction",
        text: "QUESTION 1: MULTIPLE-CHOICE QUESTIONS\n\n Various options are provided as possible answers to the following questions. Choose the answer and write only the letter (A–D) next to the question numbers (1.1 to 1.10) in the ANSWER BOOK, e.g. 1.11 E."
    },
    {
        id: "1.1",
        text: "Which formula shows the way in which atoms are bonded in a molecule but does not show all the bond lines?",
        type: "mcq",
        options: [
            "A. Empirical",
            "B. Molecular",
            "C. Structural",
            "D. Condensed structural"
        ],
        correct: "D",
        correctAnswerText: "Condensed structural",
        marks: 2
    },
    {
        id: "1.2",
        text: "Which ONE of the following compounds has hydrogen bonds between its molecules?",
        type: "mcq",
        options: [
            "A. CH₃(CH₂)₂CH₃",
            "B. CH₃COCH₂CH₃",
            "C. CH₃COOCH₂CH₃",
            "D. CH₃CH(OH)CH₂CH₃"
        ],
        correct: "D",
        correctAnswerText: "CH₃CH(OH)CH₂CH₃",
        marks: 2
    },
    {
        id: "1.3",
        text: "Consider the compound below.\nWhich ONE of the following is the IUPAC name of this compound?",
        type: "mcq",
        image: "/images/chem_paper2_2021/1.3.png",
        options: [
            "A. 2-methylpentan-3-one",
            "B. 4-methylpentan-3-one",
            "C. 2,3-dimethylbutan-2-one",
            "D. 2,2,4-trimethylpropan-2-one"
        ],
        correct: "A",
        correctAnswerText: "2-methylpentan-3-one",
        marks: 2
    },
    {
        id: "1.4",
        text:
            "A 2 g piece of magnesium reacts with EXCESS hydrochloric acid:\nMg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)\nWhich ONE of the following changes will INCREASE the YIELD of H₂(g)?",
        type: "mcq",
        options: [
            "A. Crush the piece of magnesium.",
            "B. Use a 3 g piece of magnesium.",
            "C. Use a greater volume of the acid.",
            "D. Use a higher concentration of the acid."
        ],
        correct: "B",
        correctAnswerText: "Use a 3 g piece of magnesium.",
        marks: 2
    },
    {
        id: "1.5",
        text:
            "The Maxwell-Boltzmann distribution curve P is shown.\nCurve Q appears after a change.\nWhich ONE of the following changes resulted in curve Q?",
        type: "mcq",
        image: "/images/chem_paper2_2021/1.5.png",  // REPLACE with real path
        options: [
            "A. Addition of a catalyst",
            "B. Increase in temperature",
            "C. Increase in activation energy",
            "D. Increase in concentration of reactants"
        ],
        correct: "D",
        correctAnswerText: "Increase in concentration of reactants",
        marks: 2
    },
    {
        id: "1.6",
        text:
            "The expression for the equilibrium constant is:\nKc = ([Y]³ [Z]) / [X]²\nWhich reaction matches the expression?",
        type: "mcq",
        options: [
            "A. Z(g) + 2Y(g) ⇌ 3X(s)",
            "B. Z(aq) + 2Y(aq) ⇌ 3X(ℓ)",
            "C. Z(g) + Y₂(g) ⇌ 3X(aq) + Q(s)",
            "D. Z(aq) + 2Y(aq) ⇌ 3X(aq) + Q(s)"
        ],
        correct: "D",
        correctAnswerText: "Z(aq) + 2Y(aq) ⇌ 3X(aq) + Q(s)",
        marks: 2
    },
    {
        id: "1.7",
        text:
            "Two dilute acids of equal concentrations are added to separate test tubes.\nConsider the following statements regarding these acids:\nI: The pH of each is less than 7.\nII: Both will react at the same rate with 5 g of magnesium powder.\nIII: Both will neutralise the same number of moles of NaOH(aq).\nWhich statements are TRUE?",
        type: "mcq",
        image: "/images/chem_paper2_2021/1.7.png",
        options: [
            "A. I only",
            "B. I, II and III",
            "C. I and III only",
            "D. II and III only"
        ],
        correct: "C",
        correctAnswerText: "I and III only",
        marks: 2
    },
    {
        id: "1.8",
        text: "Which ONE of the following is the conjugate base of H₂PO₄⁻?",
        type: "mcq",
        options: [
            "A. PO₄³⁻",
            "B. HPO₄²⁻",
            "C. H₃PO₄",
            "D. H₄PO₄⁺"
        ],
        correct: "B",
        correctAnswerText: "HPO₄²⁻",
        marks: 2
    },
    {
        id: "1.9",
        text: "The diagram represents a voltaic cell.\nWhich describes the movement of ions?",
        type: "mcq",
        image: "/images/chem_paper2_2021/1.9.png", // REPLACE with real path
        options: [
            "A. Cl⁻ moves Y → X",
            "B. SO₄²⁻ moves X → Y",
            "C. Cu²⁺ moves Y → X",
            "D. K⁺ moves Y → X"
        ],
        correct: "A",
        correctAnswerText: "Cl⁻ moves Y → X",
        marks: 2
    },
    {
        id: "1.10",
        text:
            "The diagram shows a cell used for refining copper.\nWhich ONE of the following statements is TRUE?",
        type: "mcq",
        image: "/images/chem_paper2_2021/1.10.png",
        options: [
            "A. X is made of platinum.",
            "B. The mass of X increases.",
            "C. X is the electrode where oxidation takes place.",
            "D. X is connected to the positive terminal of the power supply."
        ],
        correct: "B",
        correctAnswerText: "The mass of X increases.",
        marks: 2
    },
    {
        id: "q2_instruction",
        type: "instruction",
        text:"QUESTION 2\n\nThe letters A to H in the table below represent eight organic compounds.",
        image: "/images/chem_paper2_2021/2.png"
    },

// -------------------
// 2.1
// -------------------
    {
        id: "2.1",
        text: "Define the term unsaturated compound.",
        type: "short",
        correctKeywords: ["double", "multiple", "not only single"],
        correctAnswerText: ["A compound that contains a double bond/multiple bond/does NOT contain only single bonds (between C atoms)."],
        marks: 2
    },

// -------------------
// 2.2.1
// -------------------
    {
        id: "2.2",
        type: "instruction",
        text: "2.2 Write down the:"
    },
    {
        id: "2.2.1",
        text: "Letter that represents an UNSATURATED compound.",
        type: "short",
        correctKeywords: ["b","e"],
        correctAnswerText: ["B/E"],
        marks: 1
    },

// -------------------
// 2.2.2
// -------------------
    {
        id: "2.2.2",
        text: "NAME of the functional group of compound C.",
        type: "short",
        correctAnswerText: [
            "Carbonyl(group bonded to two C atoms)",
            "Accept: Ketone"
        ],
        correctKeywords: ["carbonyl", "ketone"],
        marks: 1
    },

// -------------------
// 2.2.3
// -------------------
    {
        id: "2.2.3",
        text: "Letter that represents a CHAIN ISOMER of compound C.",
        type: "short",
        correct: "F",
        correctAnswerText: "F",
        marks: 2
    },

// -------------------
// 2.2.4
// -------------------
    {
        id: "2.2.4",
        text: "IUPAC name of compound G.",
        type: "short",
        correctAnswerText: "2,5-dichloro-3-methylhexane",
        correctKeywords: ["2,5-dichloro-3-methylhexane"],
        marks: 3
    },

// -------------------
// 2.2.5
// -------------------
    {
        id: "2.2.5",
        text: "General formula of the homologous series to which compound E belongs.",
        type: "short",
        correctAnswerText: "CₙH₂ₙ",
        correct: "CₙH₂ₙ",
        marks: 1
    },

// -------------------
// 2.3
// -------------------
    {
        id: "2.3",
        text: "Define the term functional isomers.",
        type: "short",
        correctAnswerText: ["Compounds with the same molecular formula, but different functional groups/homologous series."],
        correctKeywords: ["same molecular formula", "different functional groups", "different homologous series"],
        marks: 2
    },

// -------------------
// 2.4.1
// -------------------
    {
        id: "2.4",
        type: "instruction",
        text: "2.4 For compound A, write down the:"
    },
    {
        id: "2.4.1",
        text: "Homologous series to which it belongs.",
        type: "short",
        correctAnswerText: "Carboxylic acids",
        correctKeywords: ["carboxylic acids"],
        marks: 1
    },

// -------------------
// 2.4.2 (STRUCTURAL FORMULA)
// -------------------
    {
        id: "2.4.2",
        text: "STRUCTURAL FORMULA of the FUNCTIONAL isomer.",
        type: "short",
        solutionImages: ["/images/chem_paper2_2021/2.4.2.png"],
        marks: 2
    },

// -------------------
// 2.5.1
// -------------------
    {
        id: "2.5",
        type: "instruction",
        text: "2.5 Compound D undergoes a dehydration reaction. Write down the:",
    },
    {
        id: "2.5.1",
        text: "IUPAC name of compound D.",
        type: "short",
        correctAnswerText: "Ethanol",
        correctKeywords: ["ethanol"],
        marks: 1
    },

// -------------------
// 2.5.2
// -------------------
    {
        id: "2.5.2",
        text: "Letter that represents a product of this reaction.",
        type: "short",
        correctAnswerText: ["E", "C₂H₄"],
        correctKeywords: ["e", "C₂H₄"],
        marks: 1
    },

// -------------------
// 2.5.3
// -------------------
    {
        id: "2.5.3",
        text: "NAME or FORMULA of the inorganic reactant used in this reaction.",
        type: "short",
        correctAnswerText: ["(Concentrated) sulphuric acid/H₂SO₄/(concentrated) phosphoric acid/H₃PO₄\n" +
        ""],
        correctKeywords: ["h2so4", "sulphuric", "h3po4", "phosphoric"],
        marks: 1
    },
    // --------------------------------------------
// QUESTION 3  (18 MARKS)
// --------------------------------------------

    {
        id: "q3_instruction",
        type: "instruction",
        text:"QUESTION 3\n\nThe melting points and boiling points of four straight-chain ALKANES are shown in the table below.",
        image: "/images/chem_paper2_2021/3.png"
    },

// -------------------
// 3.1
// -------------------
    {
        id: "3.1",
        text: "Define the term melting point.",
        type: "short",
        correctAnswerText:
            "The temperature at which the solid and liquid phases of a substance are in equilibrium.",
        correctKeywords: ["temperature", "solid", "liquid", "equilibrium"],
        marks: 2
    },

// -------------------
// 3.2
// -------------------
    {
        id: "3.2",
        text: "Write down the general conclusion that can be made about the melting points of straight-chain alkanes.",
        type: "short",
        correctAnswerText: [
            "As the chain length/number of C atoms/molecular mass/surface area/strength of the intermolecular forces increases, the melting points increase.",
            "As the chain length/ number of C atoms/molecular mass/surface area/strength of the intermolecular forces decreases, the melting points decrease."
        ],
        correctKeywords: ["increase", "chain length", "carbon", "molecular mass", "surface area"],
        marks: 2
    },

// -------------------
// 3.3
// -------------------
    {
        id: "3.3",
        text: "Name the type of Van der Waals forces between molecules of octane.",
        type: "short",
        correctAnswerText: [
            "London forces",
            "Dispersion forces",
            "Induced dipole forces"
        ],
        correctKeywords: ["london forces", "dispersion forces", "induced dipole forces"],
        marks: 1
    },

// -------------------
// 3.4.1
// -------------------
    {
        id: "3.4",
        type: "instruction",
        text: "3.4 Write down the predominant phase of the following alkanes at -100 °C.\n\nChoose from GAS, LIQUID or SOLID."
    },
    {
        id: "3.4.1",
        text: "Pentane",
        type: "short",
        correct: "liquid",
        correctAnswerText: "Liquid",
        marks: 1
    },

// -------------------
// 3.4.2
// -------------------
    {
        id: "3.4.2",
        text: "Octane",
        type: "short",
        correct: "solid",
        correctAnswerText: "Solid",
        marks: 1
    },

// -------------------
// 3.5.1
// -------------------
    {
        id: "3.5",
        type: "instruction",
        text: "3.5 Hexane is now compared to 2,2-dimethylbutane."
    },
    {
        id: "3.5.1",
        text:
            "Is the molecular mass of hexane GREATER THAN, LESS THAN or EQUAL to that of 2,2-dimethylbutane? Give a reason.",
        type: "short",
        correctAnswerText: [
            "Equal to",
            "Same molecular formula/Isomers/same number and types of atoms/same number of C and H atoms"
        ],
        correctKeywords: ["equal", "same molecular formula", "same atoms", "isomers"],
        marks: 2
    },

// -------------------
// 3.5.2
// -------------------
    {
        id: "3.5.2",
        text:"Is the boiling point of 2,2-dimethylbutane HIGHER THAN, LOWER THAN or EQUAL TO that of hexane?",
        type: "short",
        correctAnswerText:"Lower than",
        correct:"lower than",
        marks: 1
    },

// -------------------
// 3.5.3
// EXPLANATION — 3 MARKS
// -------------------
    {
        id: "3.5.3",
        text:
            "Fully explain the answer to QUESTION 3.5.2.",
        type: "short",
        correctAnswerText: [
            "2,2-dimethylbutane",
            "Structure",
            "More branched/more compact/more spherical/smaller surface area (over which intermolecular forces act).",
            "Intermolecular forces:",
            "Weaker/less intermolecular forces/Van der Waals forces/London forces/dispersion forces.",
            "Energy:",
            "Lesser energy needed to overcome or break intermolecular forces/Van der Waals forces.",
            "OR",
            "Hexane",
            "Structure",
            "Longer chain length/unbranched/less compact/less spherical/larger surface area (over which intermolecular forces act).",
            "Intermolecular forces:",
            "Stronger/more intermolecular forces/Van der Waals forces/London forces/dispersion forces",
            "Energy",
            "More energy needed to overcome or break intermolecular forces/Van der Waals forces."
        ],
        correctKeywords: [
            "branched", "compact", "surface area","lesser energy needed to overcome or break intermolecular forces",
            "weaker forces", "weaker intermolecular","longer chain length","intermolecular forces",
            "london forces", "dispersion forces","stronger/more intermolecular forces",
            "less energy", "structure","energy","more energy needed to overcome or break intermolecular forces"
        ],
        marks: 3
    },
    // --------------------------------------------
// QUESTION 4  (21 MARKS)
// --------------------------------------------
    {
        id: "q4_instruction",
        type: "instruction",
        text:"QUESTION 4\n\n4.1 Compound P is used as a starting reactant in each of two reactions as shown in the flow diagram below. I, II and III represent organic reactions",
        image: "/images/chem_paper2_2021/4.1.png"
    },

// ------------------------------
// 4.1.1
// ------------------------------
    {
        id: "4.1.1",
        text: "Name the type of reaction represented by I.",
        type: "short",
        correctAnswerText: "Substitution / Hydrolysis",
        correctKeywords: ["substitution", "hydrolysis"],
        marks: 1
    },

// ------------------------------
// 4.1.2
// ------------------------------
    {
        id: "4.1.2",
        text: "Is 2-methylbutan-1-ol a PRIMARY, SECONDARY or TERTIARY alcohol? Give a reason.",
        type: "short",
        correctAnswerText: [
            "Primary(alcohol)",
            "ANY ONE",
            "The C atom of the functional group is the terminal C atom.",
            "The C-atom bonded to the hydroxyl/-OH is bonded to (only) one other C-atom.",
            "The hydroxyl/-OH is bonded to a C-atom which is bonded to two hydrogen atoms.",
            "The hydroxyl/-OH is bonded to a primary C atom/terminal C atom/first C atom."
        ],
        correctKeywords: ["primary", "alcohol", "C-atom bonded to the hydroxyl/-OH is bonded to (only) one other C-atom", "hydroxyl/-OH is bonded to a C-atom which is bonded to two hydrogen atoms","a primary C atom/terminal"],
        marks: 2
    },

// ------------------------------
// 4.1.3
// STRUCTURAL FORMULA OF P
// (Compound is 1-bromo-2-methylbutane)
// ------------------------------
    {
        id: "4.1.3",
        text: "Write down the STRUCTURAL FORMULA of compound P.",
        type: "short",
        solutionImages: "/images/chem_paper2_2021/4.1.3.png",
        marks: 3
    },

// ------------------------------
// 4.1.4
// ------------------------------
    {
        id: "4.1.4",
        text: "Name the type of reaction represented by II.",
        type: "short",
        correctAnswerText: [
            "Elimination",
            "Dehydrohalogenation",
            "Dehydrobromination"
        ],
        correctKeywords: ["elimination", "dehydrohalogenation", "dehydrobromination"],
        marks: 1
    },

// ------------------------------
// 4.1.5
// ------------------------------
    {
        id: "4.1.5",
        text: "To which homologous series does compound Q belong?",
        type: "short",
        correctAnswerText: "Alkenes",
        correctKeywords: ["alkene", "alkenes"],
        marks: 1
    },

// ------------------------------
// 4.1.6
// ------------------------------
    {
        id: "4.1.6",
        text: "Name the type of reaction represented by III.\n\nChoose from ADDITION, ELIMINATION or SUBSTITUTION.",
        type: "short",
        correct: "ADDITION",
        correctAnswerText: "Addition",
        marks: 1
    },

// ------------------------------
// 4.1.7
// ------------------------------
    {
        id: "4.1.7",
        text: "Write down the IUPAC name of compound R.",
        type: "short",
        correctAnswerText: "2-bromo-2-methylbutane",
        correctKeywords: ["2-bromo", "2-methyl", "butane"],
        marks: 2
    },

// --------------------------------------------------------
// QUESTION 4.2 — second flow diagram
// --------------------------------------------------------
    {
        id: "q4_flowdiagram2",
        type: "instruction",
        text:"4.2 1,2-dibromopropane can be prepared from but-2-ene by a three-step process as shown in the flow diagram below.",
        image: "/images/chem_paper2_2021/4.2.png"
    },

// ------------------------------
// 4.2.1  Equation (condensed forms)
// ------------------------------
    {
        id: "4.2.1",
        text:
            "Using CONDENSED STRUCTURAL FORMULAE, write a balanced equation for step 1. Indicate reaction conditions on the arrow.",
        type: "short",
        solutionImages: "/images/chem_paper2_2021/4.2.1.png",
        marks: 4
    },

// ------------------------------
// 4.2.2
// ------------------------------
    {
        id: "4.2.2",
        text: "Write down the type of reaction in step 2.",
        type: "short",
        correctAnswerText: "Elimination / Cracking",
        correctKeywords: ["elimination", "cracking"],
        marks: 1
    },

// ------------------------------
// 4.2.3
// ------------------------------
    {
        id: "4.2.3",
        text: "Write down the IUPAC name of compound B.",
        type: "short",
        correctAnswerText: [
            "Propene",
            "Prop-1-ene",
            "1-propene"
        ],
        correctKeywords: ["propene", "prop-1-ene", "1-propene"],
        marks: 2
    },

// ------------------------------
// 4.2.4   Equation for step 3
// ------------------------------
    {
        id: "4.2.4",
        text:
            "Using CONDENSED STRUCTURAL FORMULAE, write down a balanced equation for step 3.",
        type: "short",
        solutionImages: "/images/chem_paper2_2021/4.2.4.png",
        marks: 3
    },
    // --------------------------------------------
// QUESTION 5  (15 MARKS)
// --------------------------------------------
    {
        id: "q5_instruction",
        type: "instruction",
        text: `QUESTION 5\n\nThe reaction of 15 g of an IMPURE sample of calcium carbonate CaCO₃ with EXCESS hydrochloric acid HCl of concentration 1.0 mol·dm⁻³ is investigate the rate of reaction. The balanced equation for the reaction is:\n  
                CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g)\n\nThe volume of CO₂(g) produced is measured at regular intervals. A sketch graph representing the total volume of carbon dioxide gas produced as a function of time is shown below.`,
        image: "/images/chem_paper2_2021/5.png"
    },

// ------------------------------
// 5.1  Definition of reaction rate
// ------------------------------
    {
        id: "5.1",
        text: "Define the term reaction rate.",
        type: "short",
        correctAnswerText: [
            "Change in concentration of products/reactants per(unit)time.",
            "Change in amount/number of moles/volume/mass of products formed/reactants used per (unit) time.",
            "Amount/number of moles/volume/mass of products formed/reactants used per (unit) time.",
            "Rate of change in concentration/amount of moles/number of moles/volume/ mass."

        ],
        correctKeywords: ["change", "concentration", "per unit time", "products", "reactants"],
        marks: 2
    },

// ------------------------------
// 5.2  Gradient decreases
// ------------------------------
    {
        id: "5.2",
        text: "Give a reason why the gradient of the graph decreases between t₂ and t₃.",
        type: "short",
        correctAnswerText: [
            "Reaction rate decreases./Concentration of HCl decreases/decreases./Concentration of reactant decreases./Reactants are used up/Mass of CaCO₃ decreases or is used up."
        ],
        correctKeywords: ["reactants used up", "rate decreases", "concentration decreases"],
        marks: 1
    },

// ------------------------------
// 5.3.1  exo/endothermic
// ------------------------------
    {
        id: "q5.3",
        type: "instruction",
        text:"5.3 Changes in the graph between t₂ and t₃ are due to temperature changes within the reaction mixture."
    },
    {
        id: "5.3.1",
        text: "Is the reaction EXOTHERMIC or ENDOTHERMIC?",
        type: "short",
        correct: "exothermic",
        correctAnswerText: "Exothermic",
        marks: 1
    },

// ------------------------------
// 5.3.2  Explain using the graph
// ------------------------------
    {
        id: "5.3.2",
        text: "Explain the answer by referring to the graph.",
        type: "short",
        correctAnswerText: [
            "Gradient increases/becomes steeper. / Curve becomes steeper.",
            "Reaction rate increases/More (or larger volume) of CO2 is produced per unit time.",
            "Temperature increases./Energy is released/Average kinetic energy of the molecules increases."
        ],
        correctKeywords: ["steeper", "rate increases", "temperature increases", "energy released"],
        marks: 3
    },
    {
        id: "5.4",
        text:"The percentage purity of the sample is 82,5%.\nCalculate the value of X on the graph assuming that the gas is collected at 25 °C. Take the molar gas volume at 25 °C as 24 000 cm³.",
        type: "short",
        solutionImages: ["/images/chem_paper2_2021/5.4a.png","/images/chem_paper2_2021/5.4b.png"],
        correctAnswerText: [
            "2976 cm³",
            "2.976 dm³"],
        correctKeywords: ["2976", "2.976", "cm3", "dm3", "purity"],
        marks: 5
    },
    {
        id: "5.5",
        text:
            "How will the reaction rate change if 15 g of a PURE sample of CaCO₃ reacts with the same HCl solution?\nChoose from INCREASES, DECREASES or REMAINS THE SAME.",
        type: "short",
        correct: "increases",
        correctAnswerText: "Increases",
        marks: 1
    },

// ------------------------------
// 5.6 Collision theory explanation
// ------------------------------
    {
        id: "5.6",
        text: "Use the collision theory to explain the answer to QUESTION 5.5.",
        type: "short",
        correctAnswerText: [
            "More (CaCO₃) particles with correct orientation/exposed./Greater (exposed) surface area.",
            "More effective collisions per unit time./Higher frequency of effective collisions."
        ],
        correctKeywords: ["more particles", " greater surface area", "more effective collisions per unit time", "higher frequency of effective collisions"],
        marks: 2
    },
    // --------------------------------------------
// QUESTION 6  (18 MARKS)
// --------------------------------------------
    {
        id: "q6_instruction",
        type: "instruction",
        text:
            `QUESTION 6\n\nConsider the balanced equation for a hypothetical reaction that takes place in a sealed 2 dm³ container at 300 K:
            2P(g) + Q₂(g) ⇌ 2PQ(g)`
    },

// 6.1 Chemical equilibrium definition
    {
        id: "6.1",
        text: "Define the term chemical equilibrium.",
        type: "short",
        correctAnswerText: [
            "The stage in a chemical reaction where the rate of the forward reaction equals the rate of the reverse reaction.",
            "The stage where the concentrations of reactants and products remain constant."
        ],
        correctKeywords: ["forward equals reverse", "rate", "constant concentration"],
        marks: 2
    },

// ------------------------------
// 6.2 Data given in table
// ------------------------------
    {
        id: "6.2",
        type: "instruction",
        text:"6.2 The amount of each substance present in the equilibrium mixture at 300 K is shown in the table below.\nThe temperature of the container is now increased to 350 K.\n" +
            "When a NEW equilibrium is established, it is found that 1,2 mol P(g) is present in the container.",
        image: "/images/chem_paper2_2021/6.2.png",
    },

// 6.2.1 sign of ΔH
    {
        id: "6.2.1",
        text: "Is the heat of the reaction (ΔH) POSITIVE or NEGATIVE?",
        type: "short",
        correct: "negative",
        correctAnswerText: "Negative",
        marks: 1
    },

// 6.2.2 Le Chatelier explanation
    {
        id: "6.2.2",
        text: "Use Le Chatelier's principle to explain the answer to QUESTION 6.2.1.",
        type: "short",
        correctAnswerText: [
            "Increase in temperature favours an endothermic reaction.",
            "Accept: Decrease in temperature favours an exothermic.",
            "Reverse reaction is favoured./Concentration of reactants increases./ Concentration of products decreases.",
            "(Forward) reaction is exothermic.",
            "Accept: Reverse reaction is endothermic"
        ],
        correctKeywords: [
            "increase temperature favours endothermic",
            "reverse reaction favoured",
            "forward reaction exothermic"
        ],
        marks: 3
    },

// 6.2.3 Kc calculation
    {
        id: "6.2.3",
        text: "Calculate the equilibrium constant at 350 K.",
        type: "short",
        solutionImages: [
            "/images/chem_paper2_2021/6.2.3.1.png",
            "/images/chem_paper2_2021/6.2.3.1.png",
            "/images/chem_paper2_2021/6.2.3.2.png",
            "/images/chem_paper2_2021/6.2.3.3.png"
        ],
        correctAnswerText: [
            "10.89",
            "10.889"
        ],
        correctKeywords: [
            "Kc", "10.89", "concentration", "ratio", "equilibrium", "2 dm3"
        ],
        marks: 8
    },
// 6.2.4 Effect of volume change
    {
        id: "6.2.4",
        text: "How will the equilibrium constant calculated in QUESTION 6.2.3 be affected when the volume of the container is decreased at constant temperature?\nChoose from INCREASES, DECREASES or REMAINS THE SAME.\nGive a reason for the answer.",
        type: "short",
        correctAnswerText: [
            "Remains the same",
            "Only temperature can change Kc./Temperature remains constant"
        ],
        correctKeywords: ["remains the same", "temperature remains constant"],
        marks: 2
    },

// -------------------------------------
// 6.3 Adding Q₂
// -------------------------------------
    {
        id: "6.3",
        type: "instruction",
        text: "6.3 More Q2(g) is now added to the reaction mixture at constant temperature.\n"+
            "How will EACH of the following be affected?\n"+
            "Choose from INCREASES, DECREASES or REMAINS THE SAME.",
    },
    {
        id: "6.3.1",
        text: "The yield of PQ(g)",
        type: "short",
        correct: "increases",
        correctAnswerText: "Increases",
        marks: 1
    },

    {
        id: "6.3.2",
        text: "Number of moles of P(g)",
        type: "short",
        correct: "decreases",
        correctAnswerText: "Decreases",
        marks: 1
    },
    {
        id: "7",
        type: "instruction",
        text: "QUESTION 7\n\n7.1 Sulphuric acid, H₂SO₄, ionises into two steps:\n\nI: H₂SO₄(aq) + H₂O(l) → HSO₄⁻(aq) + H₃O⁺(aq)   Ka = 1 × 10³\nII: HSO₄⁻(aq) + H₂O(l) → SO₄²⁻(aq) + H₃O⁺(aq)   Ka = 1 × 10⁻²"
    },

    {
        id: "7.1.1",
        type: "short",
        text: "Define an acid in terms of the Lowry–Brønsted theory.",
        correctKeywords: ["(It is a) proton/H₃O⁺ (ion)/H+ (ion) donor."],
        correctAnswerText: "A proton (H⁺) donor.",
        marks: 2,
    },

    {
        id: "7.1.2",
        type: "short",
        text: "Write down the NAME or FORMULA of the substance that acts as an ampholyte in the above equations.\nGive a reason.",
        correctKeywords: ["HSO₄⁻/hydrogen sulphate ion","OR","It acts as base in reaction I and as acid in reaction II","Acts as acid and base"],
        correctAnswerText: ["HSO₄⁻/hydrogen sulphate ion","OR","It acts as base in reaction I and as acid in reaction II","Acts as acid and base"],
        marks: 2,
    },

    {
        id: "7.1.3",
        type: "short",
        text: "The conductivity of solutions of HSO₄⁻(aq) or H₂SO₄(aq) are compared. Which solution will have a LOWER conductivity?\nExplain the answer..",
        solutionImage: "/images/chem_paper2_2021/7.1.3.png",
        marks: 3,
    },
    {
        id: "7.2",
        type: "instruction",
        text:"7.2 The pH of a hydrochloric acid solution, HCℓ(aq), is 1,02 at 25 °C."
    },
    {
        id: "7.2.1",
        type: "short",
        text: "Calculate the concentration of the HCℓ(aq).",
        solutionImage: "/images/chem_paper2_2021/7.2.1.png",
        marks: 3,
    },
    {
        id: "7.2",
        type: "instruction",
        text:"This HCℓ solution reacts with sodium carbonate, Na₂CO₃ , according to the following balanced equation:\n\n2HCl(aq) + Na₂CO₃(aq) → 2NaCl(aq) + CO₂(g) + H₂O(l)  \n\n50 cm³ of the HCℓ solution is added to 25 cm3 of a 0,075 mol∙dm-3 Na₂CO₃  solution."
    },
    {
        id: "7.2.2",
        type: "short",
        text: "Calculate the concentration of EXCESS HCl in the final solution.",
        solutionImages: ["/images/chem_paper2_2021/7.2.2a.png","/images/chem_paper2_2021/7.2.2b.png"],
        marks: 8,
    },
    {
        id: "8",
        type: "instruction",
        text: "QUESTION 8\nThe table below shows two half-cells used to assemble an electrochemical cell under standard conditions.",
        image: "/images/chem_paper2_2021/8.png"
    },

    {
        id: "8.1",
        type: "short",
        text: "State the energy conversion that takes place in this cell.",
        marks: 1,
        correctAnswerText: "Chemical energy → Electrical energy.",
        correctKeywords:"Chemical (energy) to electrical (energy)",
    },

    {
        id: "8.2",
        type: "calculation",
        text: "Calculate the mass of AgNO₃ needed to prepare 150 cm³ of a 1 mol·dm⁻³ Ag⁺ solution.",
        marks: 4,
        correctKeywords:"25,50 g",
        solutionImages: "/images/chem_paper2_2021/8.2.png"
    },

    {
        id: "8.3",
        type: "short",
        text: "Define the term reducing agent.",
        correctKeywords:["A substance that loses/donates electrons.","A substance that is oxidised.","A substance whose oxidation number increases."],
        marks: 2,
        correctAnswerText: ["A substance that loses/donates electrons.",
            "A substance that is oxidised.",
            "A substance whose oxidation number increases"]
    },

    {
        id: "8.4.1",
        type: "short",
        text: "Write down the NAME or FORMULA of the reducing agent.",
        correctKeywords:["Cu","copper"],
        marks: 1,
        correctAnswerText: "Cu — Copper."
    },

    {
        id: "8.4.2",
        type: "short",
        text: "Write down the balanced equation for the reaction that takes place in the cell.",
        marks: 3,
        correctKeywords:["Cu(s) + 2Ag⁺(aq) → Cu²⁺(aq) + 2Ag(s)","Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s)"],
        correctAnswerText: ["Cu(s) + 2Ag⁺(aq) → Cu²⁺(aq) + 2Ag(s)",
            "Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s)"]
    },

    {
        id: "8.5",
        type: "calculation",
        text: "Calculate the initial emf of this cell.",
        marks: 4,
        solutionImages: "/images/chem_paper2_2021/8.5.png",
        correctKeywords: "E° = +0.46 V",
        correctAnswerText: "E° = +0.46 V"
    },

    {
        id: "8.6",
        type: "short",
        text: "How will the emf of the cell be affected if the concentration of the copper ions in half-cell A increases?\n\nChoose from INCREASES, DECREASES or REMAINS THE SAME.",
        marks: 1,
        correctKeywords: "decrease",
        correctAnswerText: "Decreases."
    },
    {
        id: "9",
        type: "instruction",
        text: "QUESTION 9 \nThe diagram below shows a simplified electrolytic cell used to electroplate a ring.",
        image: "/images/chem_paper2_2021/9.png"
    },

    {
        id: "9.1",
        type: "short",
        text: "Define the term electrolyte.",
        marks: 2,
        correctKeywords: ["(aqueous) solution contains ions","dissolves in water to give a solution that conducts electricity","forms ions in water","solution that conducts electricity"],
        correctAnswerText: ["A substance whose (aqueous) solution contains ions.",
            "Substance that dissolves in water to give a solution that conducts electricity.",
            "A substance that forms ions in water / when melted.",
            "A solution that conducts electricity through the movement of ions."]
    },

    {
        id: "9.2",
        type: "short",
        text: "Is the pure chromium metal the ANODE or CATHODE of the cell? Give a reason for your answer.",
        marks: 2,
        correctKeywords: "Chromium is oxidised./Oxidation takes place (at the anode)./Chromium (it) loses electrons./Mass decreases (Cr → Cr³⁺ + 3e⁻).",
        correctAnswerText: "Chromium is oxidised./Oxidation takes place (at the anode)./Chromium (it) loses electrons./Mass decreases (Cr → Cr³⁺ + 3e⁻)."
    },

    {
        id: "9.3",
        type: "short",
        text: "Write down the half-reaction that occurs at the ring.",
        marks: 2,
        correctKeywords: "Cr³⁺(aq) + 3e⁻ → Cr(s)",
        correctAnswerText: "Cr³⁺(aq) + 3e⁻ → Cr(s)"
    },

    {
        id: "9.4",
        type: "short",
        text: "Calculate the total charge transferred when the mass of chromium changes by 2 g.",
        marks: 5,
        correctKeywords: "11 113,85 C",
        solutionImage: "/images/chem_paper2_2021/9.4.png"
    }
];

export function totalPossibleMarks(list) {
    return list.reduce((sum, q) => sum + (q.marks || 0), 0);
}

export default questions;