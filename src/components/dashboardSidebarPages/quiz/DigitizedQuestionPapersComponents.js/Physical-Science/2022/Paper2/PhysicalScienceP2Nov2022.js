export const questions = [
    {
        id: "q1-instr",
        type: "instruction",
        text: "QUESTION 1: MULTIPLE-CHOICE QUESTIONS\n\nVarious options are provided as possible answers to the following questions. Each question has only ONE correct answer. Choose the answer and write only the letter (A–D) next to the question numbers (1.1 to 1.10) in the ANSWER BOOK, e.g. 1.11 E."
    },

    {
        id: "1.1",
        text: "Which ONE of the following terms describes hydrocarbons that contain only single bonds?",
        type: "mcq",
        options: [
            "A. Isomers",
            "B. Saturated",
            "C. Unsaturated",
            "D. Homologous series"
        ],
        correct: "B",
        correctAnswerText: "Saturated",
        marks: 2
    },

    {
        id: "1.2",
        text: "Which ONE of the following combinations correctly indicates the STRONGEST intermolecular forces found in ethanoic acid and methyl propanoate respectively?",
        type: "mcq",
        image:"/images/chem_paper2_2022/1.2.png",
        options: [
            "A. Hydrogen bonds / Hydrogen bonds",
            "B. Dipole-dipole forces / London forces",
            "C. Hydrogen bonds / London forces",
            "D. Hydrogen bonds / Dipole-dipole forces"
        ],
        correct: "D",
        correctAnswerText: "Hydrogen bonds / Dipole-dipole forces",
        marks: 2
    },

    {
        id: "1.3",
        text: "A test tube contains a liquid hydrocarbon. When bromine water (Br₂) is added, the mixture decolourises immediately. Which ONE of the following combinations correctly identifies the compound and the type of reaction?",
        type: "mcq",
        image:"/images/chem_paper2_2022/1.3.png",
        options: [
            "A. Hexane / Addition",
            "B. Hexane / Substitution",
            "C. Hex-2-ene / Addition",
            "D. Hex-2-ene / Substitution"
        ],
        correct: "C",
        correctAnswerText: "Hex-2-ene / Addition",
        marks: 2
    },

    {
        id: "1.4",
        text: "Which ONE of the following statements is the CORRECT definition for the rate of a reaction?",
        type: "mcq",
        options: [
            "A. The time taken for the reaction to take place",
            "B. The speed at which the reaction takes place",
            "C. The rate of change in concentration of the products or reactants",
            "D. The rate of change in concentration of the products or reactants per unit time"
        ],
        correct: "C",
        correctAnswerText: "The rate of change in concentration of the products or reactants",
        marks: 2
    },

    {
        id: "1.5",
        text: "Consider the balanced equation for the reaction between magnesium powder and EXCESS dilute hydrochloric acid, HCℓ(aq):\n\nMg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)\nWhich ONE of the following will NOT increase the rate of reaction?",
        type: "mcq",
        options: [
            "A. Increasing the volume of HCl(aq)",
            "B. Increasing the temperature of HCl(aq)",
            "C. Increasing the concentration of HCl(aq)",
            "D. Adding more magnesium powder"
        ],
        correct: "A",
        correctAnswerText: "Increasing the volume of HCl(aq)",
        marks: 2
    },

    {
        id: "1.6",
        text: "Two sealed gas jars R and S, initially contain gases as shown below.(Refer to image)\n\nEquilibrium is reached in both gas jars at 500 °C according to the following balanced equation:\n\nH₂(g) + I₂(g) ⇌ 2HI(g)\n\nWhich ONE of the following statements is TRUE at equilibrium?",
        image:"/images/chem_paper2_2022/1.6.png",
        type: "mcq",
        options: [
            "A. S will contain 1 mole of I₂(g).",
            "B. R will contain a larger amount of I₂(g) than S.",
            "C. R and S will contain the same amount of HI(g).",
            "D. S will contain a larger amount of HI(g) than R."
        ],
        correct: "C",
        correctAnswerText: "R and S will contain the same amount of HI(g).",
        marks: 2
    },

    {
        id: "1.7",
        text: "Which ONE of the following salts, when dissolved in water, will NOT change the pH of the water?",
        type: "mcq",
        options: [
            "A. Na₂CO₃",
            "B. (COO)₂Na₂",
            "C. NH₄Cl",
            "D. NaCl"
        ],
        correct: "D",
        correctAnswerText: "NaCl",
        marks: 2
    },

    {
        id: "1.8",
        text: "A dilute acid is titrated against a potassium hydroxide solution, KOH(aq). At the equivalence point the pH is 7. Which ONE of the following combinations correctly identifies the acid and indicator?",
        type: "mcq",
        image:"/images/chem_paper2_2022/1.8.png",
        options: [
            "A. (COOH)₂(aq) / Phenolphthalein",
            "B. (COOH)₂(aq) / Bromothymol blue",
            "C. HCl(aq) / Phenolphthalein",
            "D. HCl(aq) / Bromothymol blue"
        ],
        correct: "D",
        correctAnswerText: "HCl(aq) / Bromothymol blue",
        marks: 2
    },

    {
        id: "1.9",
        text: "Which ONE of the following statements is TRUE for an oxidising agent?",
        type: "mcq",
        options: [
            "A. It gains electrons.",
            "B. It causes another species to be reduced.",
            "C. Its oxidation number does not change.",
            "D. Its oxidation number increases."
        ],
        correct: "A",
        correctAnswerText: "It gains electrons.",
        marks: 2
    },

    {
        id: "1.10",
        text: "Which ONE of the following metals will reduce Cd²⁺(aq) to Cd(s), but will NOT reduce Mn²⁺(aq) to Mn(s)?",
        type: "mcq",
        options: [
            "A. Zn",
            "B. Ag",
            "C. Ni",
            "D. Mg"
        ],
        correct: "A",
        correctAnswerText: "Zn",
        marks: 2
    },
    {
        id: "q2-instr",
        type: "instruction",
        text: "QUESTION 2\nA to F in the table below represent six organic compounds.",
        image:"/images/chem_paper2_2022/2.png"
    },

    // 2.1.1
    {
        id: "2.1",
        type: "instruction",
        text: "2.1 Write down the:"
    },
    {
        id: "2.1.1",
        text: "Letters that represent TWO organic compounds that are isomers of each other.",
        type: "short",
        correctKeywords: "C & D",
        correctAnswerText: "C & D",
        marks: 1
    },

    // 2.1.2
    {
        id: "2.1.2",
        text: "Type of isomers (CHAIN, FUNCTIONAL or POSITIONAL) identified in QUESTION 2.1.1",
        type: "short",
        correctKeywords: "functional",
        correctAnswerText: "Functional",
        marks: 1
    },

    // 2.1.3
    {
        id: "2.1.3",
        text: "GENERAL FORMULA of the homologous series to which compound B belongs.",
        type: "short",
        correctKeywords: "CₙH₂ₙ₋₂",
        correctAnswerText: "CₙH₂ₙ₋₂",
        marks: 1
    },

    // 2.1.4
    {
        id: "2.1.4",
        text: "NAME of the functional group of compound F.",
        type: "short",
        correctKeywords: "hydroxyl",
        correctAnswerText: "Hydroxyl",
        marks: 1
    },

    // 2.2 instruction
    {
        id: "2.2",
        type: "instruction",
        text: "2.2 Write down the IUPAC name of:"
    },

    // 2.2.1
    {
        id: "2.2.1",
        text: "Compound A",
        type: "short",
        correctAnswerText: "4-bromo-3,3-dimethylhexane",
        correctKeywords: ["bromo", "dimethyl", "hexane"],
        marks: 3
    },

    // 2.2.2
    {
        id: "2.2.2",
        text: "Compound B",
        type: "short",
        correctAnswerText: ["4,4-dimethylpent-2-yne","4,4-dimethyl-2-pentyne"],
        correctKeywords: ["dimethyl", "pent", "yne", "2"],
        marks: 2
    },

    // 2.2.3
    {
        id: "2.2.3",
        text: "Compound C",
        type: "short",
        correctAnswerText: "Butanal",
        correctKeywords: ["butanal", "al"],
        marks: 2
    },

    // 2.3 instruction
    {
        id: "2.3",
        type: "instruction",
        text: "2.3 Compound F reacts with a carboxylic acid to form compound S in the presence of a strong acid."
    },

    // 2.3.1
    {
        id: "2.3.1",
        text: "Write down the type of reaction that takes place.",
        type: "short",
        correctAnswerText: "Esterification / condensation",
        correctKeywords: ["esterification", "condensation"],
        marks: 1
    },

    // 2.3.2
    {
        id: "2.3.2",
        text: "Compound S has an empirical formula of C₃H₆O and a molecular mass of 116 g·mol⁻¹. Write down the MOLECULAR FORMULA of the carboxylic acid.",
        type: "short",
        solutionImages: "/images/chem_paper2_2022/2.3.2.png",
        correctAnswerText: "C₂H₄O₂",
        correctKeywords: ["C₂H₄O₂"],
        marks: 3
    },
    {
        id: "q3-instr",
        type: "instruction",
        text: "QUESTION 3\n\n3.1 The melting points of some organic compounds are given in the table below.",
        image:"/images/chem_paper2_2022/3.1.png"
    },
    {
        id: "3.1.1",
        text: "To which homologous series do the above compounds belong?",
        type: "short",
        correctAnswerText: ["Ketones", "Ketone"],
        correctKeywords: ["ketone"],
        marks: 1
    },

    {
        id: "3.1.2",
        text: "The melting points of compounds A, B and C are compared.\nWrite down the controlled variable for this comparison.",
        type: "short",
        correctAnswerText: ["Functional group", "Homologous series"],
        correctKeywords: ["functional", "homologous"],
        marks: 1
    },

    {
        id: "3.1.3",
        text: "The melting points of compounds C and D are compared.\nFully explain the difference in the melting points of compounds C and D.",
        type: "short",
        correctAnswerText: [
            "Pentan-2-one/C",
            "Structure: Longer chain length/less branched/less compact/less spherical/larger surface area (over which intermolecular forces act)",
            "Intermolecular forces: Stronger/more intermolecular forces/Van der Waals forces/London forces/ dipole-dipole forces",
            "Energy: More energy needed to overcome or break intermolecular forces/Van der Waals forces/dipole-dipole forces. Higher melting point.",
            "OR",
            "3-methylbutanone/D",
            "Structure: Shorter chain length/more branched/more compact more spherical/smaller surface area (over which intermolecular forces act).",
            "Intermolecular forces: Weaker/less intermolecular forces/Van der Waals forces/London forces/ dipole-dipole forces.",
            "Energy: Less energy needed to overcome or break intermolecular forces/Van der Waals force/dipole-dipole forces. Lower melting point."
        ],
        correctKeywords: [
            "longer chain", "branched", "intermolecular forces",
            "energy", "melting point"
        ],
        marks: 4
    },
    {
        id: "3.2",
        type: "instruction",
        text: "3.2 The table below shows the results obtained from an experiment to determine the vapour pressure of different STRAIGHT CHAIN primary alcohols at 300 K.",
        image:"/images/chem_paper2_2022/3.2.png"
    },

    {
        id: "3.2.1",
        text: "Define the term vapour pressure.",
        type: "short",
        correctAnswerText: [
            "The pressure exerted by a vapour at equilibrium with its liquid in a closed system."
        ],
        correctKeywords: [
            "pressure exerted", "equilibrium", "liquid", "closed system"
        ],
        marks: 2
    },

    {
        id: "3.2.2",
        text: "Write down a suitable conclusion for this investigation.",
        type: "short",
        correctAnswerText: [
            "Vapour pressure decreases with increase in number of C atoms/chain length.",
            "Vapour pressure increases with decrease in number of C atoms/chain length."
        ],
        correctKeywords: [
            "vapour pressure", "decreases", "increases", "carbon atoms", "chain length"
        ],
        marks: 2
    },

    {
        id: "3.2.3",
        text: "Write down the IUPAC name of the alcohol with the highest boiling point.",
        type: "short",
        correctAnswerText: [
            "Hexan-1-ol",
            "1-Hexanol"
        ],
        correctKeywords: ["hexan", "hexanol"],
        marks: 3
    },

    {
        id: "3.2.4",
        text: "The experiment is now repeated at 320 K.\nWill the vapour pressure of each compound INCREASE, DECREASE or REMAIN THE SAME?",
        type: "short",
        correctAnswerText: ["Increases"],
        correctKeywords: ["increases"],
        marks: 1
    },
    // =========================
// QUESTION 4
// =========================
    {
        id: "q4-instr",
        type: "instruction",
        text: "QUESTION 4\n\nThe flow diagram below shows how compound A can be used as a starting reactant to prepare two different compounds.",
        image:"/images/chem_paper2_2022/4.png"
    },
    {
        id: "4.1",
        text: "Is compound A a PRIMARY, SECONDARY or TERTIARY haloalkane? Give a reason.",
        type: "short",
        solutionImages: "/images/chem_paper2_2022/4.1.png",
        correctAnswerText: [
            "Tertiary",
            "The halogen/bromine/functional group (-X) is bonded to a C atom that is bonded to three other C atoms/ a tertiary C atom."
        ],
        correctKeywords: [
            "tertiary", "three other carbon atoms"
        ],
        marks: 2
    },
    {
        id: "4.2",
        type: "instruction",
        text: "4.2 Consider reaction I."
    },
    {
        id: "4.2.1",
        text: "Besides heat, write down the other reaction condition needed.",
        type: "short",
        correctAnswerText: [
            "Concentrated strong base",
            "Concentrated NaOH/KOH/LiOH/sodium hydroxide/ potassium hydroxide/ lithium hydroxide",
            "Strong base/NaOH/KOH/LiOH/sodium hydroxide/ potassium hydroxide/lithium hydroxide in ethanol."
        ],
        correctKeywords: ["concentrated", "base", "NaOH", "KOH", "ethanol"],
        marks: 1
    },

    {
        id: "4.2.2",
        text: "Write down the type of reaction that takes place.",
        type: "short",
        correctAnswerText: [
            "Elimination",
            "Dehydrohalogenation",
            "Dehydrobromination"
        ],
        correctKeywords: ["elimination", "dehydro"],
        marks: 1
    },

    {
        id: "4.2.3",
        text: "Using STRUCTURAL FORMULAE for the organic compounds, write down a balanced equation for the reaction.",
        type: "short",
        solutionImages: [
            "/images/chem_paper2_2021/4.2.3.png"
        ],
        correctAnswerText: [
            ""
        ],
        correctKeywords: [
            "alkene", "NaBr", "H2O", "="
        ],
        marks: 5
    },
    {
        id: "4.3",
        type: "instruction",
        text: "4.3 Consider reaction II.\n\nWrite down the:"
    },
    {
        id: "4.3.1",
        text: "STRUCTURAL FORMULA of compound C",
        type: "short",
        solutionImages: [
            "/images/chem_paper2_2021/4.3.1.png"
        ],
        correctAnswerText: [
            "Pentanol structure with OH on carbon 1"
        ],
        correctKeywords: ["OH", "C5H12O", "pentanol"],
        marks: 2
    },

    {
        id: "4.3.2",
        text: "NAME or FORMULA of the inorganic reagent needed",
        type: "short",
        correctAnswerText: ["Water", "H2O"],
        correctKeywords: ["water", "H2O"],
        marks: 1
    },

    {
        id: "4.3.3",
        text: "Type of addition reaction that takes place",
        type: "short",
        correctAnswerText: ["Hydration"],
        correctKeywords: ["hydration"],
        marks: 1
    },
    {
        id: "4.4",
        type: "instruction",
        text: "4.4 Consider reaction III."
    },
    {
        id: "4.4.1",
        text: "Write down of the type of reaction that takes place.",
        type: "short",
        correctAnswerText: ["Substitution", "Hydrolysis"],
        correctKeywords: ["substitution", "hydrolysis"],
        marks: 1
    },

    {
        id: "4.4.2",
        text: "Besides heat, write down the other reaction condition needed.",
        type: "short",
        correctAnswerText: [
            "Dilute strong base",
            "OR: Dilute NaOH/KOH/LiOH/sodium hydroxide/potassium hydroxide/lithium hydroxide",
            "OR: NaOH(aq)/KOH(aq)/LiOH(aq)",
            "OR: (Add) water/H2O"
        ],
        correctKeywords: ["dilute", "base", "NaOH", "aqueous"],
        marks: 1
    },
    // =========================
// QUESTION 5
// =========================
    {
        id: "q5-instr",
        type: "instruction",
        text: "QUESTION 5\n\nThree experiments, A, B and C, are carried out to investigate some of the factors that affect the rate of decomposition of hydrogen peroxide, H₂O₂(l).\n\nThe balanced equation for the reaction is: 2H₂O₂(l) → 2H₂O(l) + O₂(g)\nIdentical samples of hydrogen peroxide are used in each experiment.\nThe conditions used in each experiment are summarised in the table below.",
        image:"/images/chem_paper2_2022/5.png"
    },
    {
        id: "5.1",
        text: "In which experiment, A or B, is the reaction rate higher? Use the collision theory to explain the answer.",
        type: "short",
        correctAnswerText: [
            "Experiment B.",
            "The catalyst provides an alternative route of lower activation energy.",
            "More molecules have enough/sufficient (kinetic) energy./More molecules have (kinetic) energy equal to or higher than the activation energy.",
            "More effective collisions per unit time./Higher frequency of effective collisions."
        ],
        correctKeywords: [
            "B", "lower activation energy", "activation energy", "kinetic energy",
            "effective collisions", "collision theory"
        ],
        marks: 4
    },

    {
        id: "5.2",
        text: "The Maxwell-Boltzmann distribution curves, X and Y, for two of the above experiments are shown below.\nIdentify the curve (X or Y) that represents experiment C.",
        type: "short",
        image: "/images/chem_paper2_2022/5.2.png",
        correctAnswerText: ["Y"],
        correctKeywords: ["Y"],
        marks: 2
    },
    {
        id: "5.3",
        type: "instruction",
        text: "5.3 The volume of oxygen gas, O₂(g), produced in experiment B during the first 3,6 s is collected in a syringe, as shown below.",
        image:"/images/chem_paper2_2022/5.3.png"
    },
    {
        id: "5.3.1",
        text: "Write down the volume of O₂(g) collected in the syringe.",
        type: "short",
        correctAnswerText: ["560 cm³", "0.56 dm³"],
        correctKeywords: ["560", "0.56"],
        marks: 2
    },

    {
        id: "5.3.2",
        text: "The balanced equation for the reaction is: 2H₂O₂(l) → 2H₂O(l) + O₂(g)\nCalculate the mass of H₂O(l) produced during the first 3.6 s. Molar gas volume = 24 000 cm³·mol⁻¹.",
        type: "short",
        solutionImage: "/images/chem_paper2_2022/5.3.2.png",
        correctAnswerText: [
            "0.83 g"
        ],
        correctKeywords: [
            "0.83", "0.72", "0.9", "mass", "moles", "ratio", "H2O"
        ],
        marks: 4
    },
    {
        id: "5.4",
        type: "instruction",
        text: "5.4 The graph below, NOT drawn to scale, is obtained for the mass of oxygen gas produced over a period of time in experiment A.(Refer to image)Use the information in the graph to answer the following questions:",
        image:"/images/chem_paper2_2022/5.4.png"
    },
    {
        id: "5.4.1",
        text: "Write down the rate of production of oxygen gas for the interval 30 s to 36 s.",
        type: "short",
        correctAnswerText: ["0", "zero"],
        correctKeywords: ["0", "zero"],
        marks: 1
    },

    {
        id: "5.4.2",
        text: "Will the rate of the reaction in the interval 3 s to 9 s be GREATER THAN, SMALLER THAN or EQUAL TO the rate of the reaction in the interval 9 s to 20 s?",
        type: "short",
        correctAnswerText: ["Greater than"],
        correctKeywords: ["greater"],
        marks: 1
    },

    {
        id: "5.4.3",
        text: "The average rate of decomposition of hydrogen peroxide is 2.1 × 10⁻³ mol·s⁻¹. Calculate the value of time t on the graph.",
        type: "short",
        solutionImage: "/images/chem_paper2_2022/5.4.3.png",
        correctAnswerText: [
            "26.67 s"
        ],
        correctKeywords: [
            "26.67", "28", "mol", "rate", "time"
        ],
        marks: 5
    },
    // =========================
// QUESTION 6
// =========================
    {
        id: "q6-instr",
        type: "instruction",
        text: "QUESTION 6\n\nCarbon, C(s), reacts with sulphur, S(g), according to the following balanced equation:\nC(s) + 2S(g) ⇌ CS₂(g)    ΔH > 0\nThe system reaches equilibrium at temperature T in a sealed 2 dm3 container.\n\nThe Kc value is 9,4 at temperature T."
    },

    {
        id: "6.1",
        text: "State Le Chatelier's principle.",
        type: "short",
        correctAnswerText: [
            "When the equilibrium in a closed system is disturbed, the system will re-instate a new equilibrium by favouring the reaction that will cancel/oppose the disturbance."
        ],
        correctKeywords: [
            "disturbed", "oppose", "counteract", "new equilibrium", "closed system"
        ],
        marks: 2
    },

    {
        id: "6.2",
        text: "At equilibrium, 1 mole of carbon disulphide, CS2(g), is present in the container.\nCalculate the concentration of S(g) present at equilibrium.",
        type: "short",
        solutionImage: "/images/chem_paper2_2022/6.2.png",
        correctAnswerText: [
            "0.23 mol·dm⁻³"
        ],
        correctKeywords: [
            "Kc", "9.4", "concentration", "S(g)", "0.23"
        ],
        marks: 4
    },

    {
        id: "6.3",
        text: "The volume of the container is now DOUBLED at temperature T. After a while, a NEW equilibrium is established.\nHow will the amount of S(g) change as this new equilibrium is established? Choose from INCREASES, DECREASES or REMAINS THE SAME.",
        type: "short",
        correctAnswerText: ["Increases"],
        correctKeywords: ["increase"],
        marks: 1
    },

    {
        id: "6.4",
        text: "Explain the answer to QUESTION 6.3 in terms of Le Chatelier's principle.",
        type: "short",
        correctAnswerText: [
            "Increasing/doubling the volume will decrease the pressure.",
            "The reaction that produces a greater number of moles/amount of gas (1 mole gas to 2 moles gas) is favoured.",
            "Reverse reaction is favoured."
        ],
        correctKeywords: [
            "pressure decreases",
            "more moles gas",
            "reverse reaction",
            "favoured"
        ],
        marks: 3
    },

    {
        id: "6.5",
        text: "If the concentration of CS₂ changes by x mol·dm⁻³, write an expression for Kc in terms of x. Show ALL your workings. NO simplification or solving for x is required.",
        type: "short",
        solutionImages: ["/images/chem_paper2_2022/6.5a.png","/images/chem_paper2_2022/6.5b.png"],
        correctAnswerText: [
            "Kc = (0.115 + 2x)² / (0.25 − x)"
        ],
        correctKeywords: [
            "Kc", "expression", "x", "0.115", "0.25", "ratio"
        ],
        marks: 5
    },
    {
        id: "6.6",
        type: "instruction",
        text: "6.6 The reaction rate-time graph below represents further changes made to the equilibrium mixture. The volume of the container is kept constant.",
        image:"/images/chem_paper2_2022/6.6.png"
    },
    {
        id: "6.6.1",
        text: "What do the parallel lines between tA and tB represent?",
        type: "short",
        correctAnswerText: "(Chemical) equilibrium / Rate of the forward and reverse reactions are equal. /Concentrations of reactants and products are constant",
        correctKeywords: ["equilibrium", "equal"],
        marks: 1
    },

    {
        id: "6.6.2",
        text: "What change was made to the equilibrium mixture at tB?",
        type: "short",
        correctAnswerText:" Increase in the amount/concentration of S/reactant OR S was added",
        correctKeywords: ["added", "increase", "S"],
        marks: 1
    },

    {
        id: "6.6.3",
        text: "Give a reason for the sudden change in reaction rate at tC.",
        type: "short",
        correctAnswerText: ["Decrease in temperature"],
        correctKeywords: ["temperature", "decrease"],
        marks: 1
    },

    {
        id: "6.6.4",
        text: "Fully explain the answer to QUESTION 6.6.3.",
        type: "short",
        correctAnswerText: [
            "The rates of the forward and reverse reactions decrease.",
            "The reverse reaction is favoured / faster than the forward reaction.",
            "OR",
            "The forward reaction decreases more.",
            "A decrease in temperature favours the exothermic reaction."
        ],
        correctKeywords: [
            "kinetic energy",
            "reaction rate decreases",
            "exothermic favoured",
            "reverse reaction"
        ],
        marks: 3
    },
    // =========================
// QUESTION 7
// =========================
    {
        id: "q7-instr",
        type: "instruction",
        text: "QUESTION 7"
    },
    {
        id: "7.1",
        type: "instruction",
        text: "7.1 Ethanoic acid is a weak acid that reacts with water according to the following balanced equation:\n\nCH₃COOH(aq) + H₂O(l) ⇌ CH₃COO⁻(aq) + H₃O⁺(aq)"
    },
    {
        id: "7.1.1",
        text: "Define an acid in terms of the Lowry-Brønsted theory.",
        type: "short",
        correctAnswerText:
            "(An acid is a) proton donor/H+ (ion) donor.",
        correctKeywords: [
            "proton donor", "H+", "donor"
        ],
        marks: 2
    },

    {
        id: "7.1.2",
        text: "Give a reason why ethanoic acid is classified as a WEAK acid.",
        type: "short",
        correctAnswerText:
            "(Weak acids) ionise/dissociate incompletely/partially (in water)/have a low Ka value.",
        correctKeywords: [
            "partial", "incomplete", "ionise", "dissociate"
        ],
        marks: 1
    },

    {
        id: "7.1.3",
        text: "Write down the formulae of the TWO bases in the equation above.",
        type: "short",
        correctAnswerText: [
            "H₂O ",
            "CH₃COO⁻"
        ],
        correctKeywords: [
            "H₂O ", "CH₃COO⁻"
        ],
        marks: 2
    },
    {
        id: "7.2",
        type: "instruction",
        text: "7.2 A flask contains 300 cm³  of dilute sodium hydroxide, NaOH(aq), of concentration 0.167 mol·dm⁻³."
    },
    {
        id: "7.2.1",
        text: "Calculate the number of moles of sodium hydroxide in the flask.",
        type: "short",
        solutionImages: "/images/chem_paper2_2022/7.2.1.png",
        correctAnswerText: [
            "0.05 mol"
        ],
        correctKeywords: [
            "n=cV", "0.05", "0.167", "0.300"
        ],
        marks: 3
    },
    {
        id: "",
        type: "instruction",
        text: "Ethanoic acid of volume 500 cm³ and of unknown concentration, X, is now added to this flask to give a solution of volume 800 cm³. It is found that the pH of the mixture is 11,4.\n\nThe balanced equation for the reaction is:\nNaOH(aq) + CH₃COOH(aq) → CH₃COONa(aq) + H₂O(l)\n\nCalculate the:"
    },
    {
        id: "7.2.2",
        text: "Calculate the concentration of the OH⁻(aq) in the mixture.",
        type: "short",
        solutionImage: "/images/chem_paper2_2022/7.2.2.png",
        correctAnswerText: [
            "2.51 × 10⁻3 mol·dm⁻³",
            "0.00251 mol·dm⁻³"
        ],
        correctKeywords: [
            "pH", "pOH", "10^-", "2.51", "0.00251"
        ],
        marks: 4
    },

    {
        id: "7.2.3",
        text: "Initial concentration, X, of the ethanoic acid solution.",
        type: "short",
        solutionImage: "/images/chem_paper2_2022/7.2.3.png",
        correctAnswerText: [
            "0.096 mol·dm⁻³"
        ],
        correctKeywords: [
            "0.096", "NaOH reacted", "0.048 mol", "c = n/V"
        ],
        marks: 6
    },
    // =========================
// QUESTION 8
// =========================
    {
        id: "q8-instr",
        type: "instruction",
        text: "QUESTION 8"
    },
    {
        id: "8.1",
        type: "instruction",
        text: "8.1 A piece of zinc (Zn) is placed in a test tube containing an acidified permanganate solution, MnO₄⁻(aq). After some time, it is found that a redox reaction has taken place.\nUse the Table of Standard Reduction Potentials to answer the following questions:"
    },
    {
        id: "8.1.1",
        text: "Write down the NAME or FORMULA of the reducing agent.",
        type: "short",
        correctAnswerText: [
            "Zn",
            "Zinc"
        ],
        correctKeywords: [
            "Zn", "zinc"
        ],
        marks: 1
    },

    {
        id: "8.1.2",
        text: "Refer to the relative strengths of the OXIDISING AGENTS to explain why a redox reaction has taken place.",
        type: "short",
        correctAnswerText: [
            "MnO₄⁻ is a stronger oxidising agent than Zn²⁺/Zn(||) and will oxidise Zn (Zn²⁺/Zn(||))",
            "Zn²⁺/Zn(||) ion is a weaker oxidising agent than MnO₄⁻ and therefore MnO₄⁻ will be reduced (to Mn²⁺/Mn(II) ions)"
        ],
        correctKeywords: [
            "stronger oxidising agent",
            "MnO4",
            "oxidise Zn",
            "reduced"
        ],
        marks: 3
    },
    {
        id: "8.2",
        type: "instruction",
        text: "8.2 A standard electrochemical cell is set up as shown below.",
        image: "/images/chem_paper2_2022/8.2.png"
    },
    {
        id: "8.2.1",
        text: "Write down the function of component Y.",
        type: "short",
        correctAnswerText: [
            "Provides path for movement of ions. / Completes the circuit. / Ensures electrical neutrality in the cell. / Restore charge balance.",
        ],
        correctKeywords: [
            "ion movement", "complete circuit", "neutrality"
        ],
        marks: 1
    },

    {
        id: "8.2.2",
        text: "In which direction will electrons flow in the external circuit? Choose from 'Ni to Mn' OR 'Mn to Ni'.",
        type: "short",
        correctAnswerText: [
            "Mn to Ni"
        ],
        correctKeywords: [
            "Mn to Ni"
        ],
        marks: 2
    },

    {
        id: "8.2.3",
        text: "Calculate the initial emf of this cell.",
        type: "short",
        solutionImages: [
            "/images/chem_paper2_2021/8.2.3.png"
        ],
        correctAnswerText: [
            "0.91 V"
        ],
        correctKeywords: [
            "E°cell", "0.91", "-0.27", "1.18"
        ],
        marks: 4
    },

    {
        id: "8.2.4",
        text: "Write down the balanced equation for the net cell reaction taking place.",
        type: "short",
        correctAnswerText: [
            "Ni²⁺ + Mn → Mn²⁺ + Ni"
        ],
        correctKeywords: [
            "Ni2+", "Mn", "Mn2+", "Ni"
        ],
        marks: 3
    },

    {
        id: "8.2.5",
        text: "The concentration of Ni²⁺(aq) is now increased. Will the reading on the voltmeter INCREASE, DECREASE or REMAIN THE SAME?",
        type: "short",
        correctAnswerText: [
            "Increase"
        ],
        correctKeywords: [
            "increase"
        ],
        marks: 1
    },
    // =========================
// QUESTION 9
// =========================
    {
        id: "q9-instr",
        type: "instruction",
        text: "QUESTION 9\n\nThe diagram below represents a simplified cell used for the electrolysis of CONCENTRATED chromium(III) chloride, CrCl₃(aq). Electrodes R and T are made of carbon.(Refer to image)The net cell reaction is: 2CrCl₃(aq) → 2Cr(s) + 3Cl₂(g)",
        image: "/images/chem_paper2_2022/9.png"
    },
    {
        id: "9.1",
        text: "Define the term electrolysis.",
        type: "short",
        correctAnswerText: [
            "The chemical process in which electrical energy is converted to chemical energy.",
            "The use of electrical energy to cause a chemical change.",
            "A process where an electric current passes through a solution or molten ionic compound."
        ],
        correctKeywords: [
            "electrical energy",
            "chemical change",
            "electric current"
        ],
        marks: 2
    },
    {
        id: "9.2",
        type: "instruction",
        text: "9.2 The graph below, NOT drawn to scale, represents the changes in the mass of electrode T during electrolysis.",
        image: "/images/chem_paper2_2022/9.2.png"
    },
    {
        id: "9.2.1",
        text: "Write down the half-reaction that takes place at electrode T.",
        type: "short",
        correctAnswerText: [
            "Cr³⁺ + 3e⁻ → Cr"
        ],
        correctKeywords: [
            "Cr3+", "3e", "Cr", "reduction"
        ],
        marks: 2
    },
    {
        id: "",
        type: "instruction",
        text: "A current of 2,5 A passes through the cell for 10 hours.\nCalculate the:"
    },
    {
        id: "9.2.2",
        text: "Total charge that flows through the cell during this time",
        type: "short",
        solutionImages: [
            "/images/chem_paper2_2021/9.2.2.png"
        ],
        correctAnswerText: [
            "9 × 10⁴ C",
            "90000 C"
        ],
        correctKeywords: [
            "Q = It",
            "90000",
            "9 x 10^4"
        ],
        marks: 3
    },

    {
        id: "9.2.3",
        text: "Value of X as shown on the graph.",
        type: "short",
        solutionImages: [
            "/images/chem_paper2_2021/9.2.3.png"
        ],
        correctAnswerText: [
            "18.32 g",
        ],
        correctKeywords: [
            "Cr",
            "mass change",
            "Faraday",
            "calculation",
            "18.32 g"
        ],
        marks: 6
    }
];

export function totalPossibleMarks(list) {
    return list.reduce((sum, q) => sum + (q.marks || 0), 0);
}

export default questions;