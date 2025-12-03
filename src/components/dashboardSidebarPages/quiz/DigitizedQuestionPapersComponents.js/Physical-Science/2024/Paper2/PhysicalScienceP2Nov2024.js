export const questions = [
    {
        id: "q1-instr",
        type: "instruction",
        text: "QUESTION 1: MULTIPLE-CHOICE QUESTIONS\n\nVarious options are provided as possible answers to the following questions. Each question has only ONE correct answer. Choose the answer and write only the letter (A–D) next to the question numbers (1.1 to 1.10) in the ANSWER BOOK, e.g. 1.11 E."
    },
    {
        id: "1.1",
        text: "Which ONE of the following compounds has hydrogen bonds between its molecules?",
        type: "mcq",
        options: [
            "A. CH₃CH₂CHO",
            "B. CH₃COOCH₃",
            "C. CH₃CH₂CH₂OH",
            "D. CH₃COCH₃",
        ],
        correct: "C",
        correctAnswerText: "CH₃CH₂CH₂OH",
        marks: 2
    },
    {
        id: "1.2",
        text: "Which ONE of the following is a CORRECT GENERAL FORMULA for the carboxylic acids?",
        type: "mcq",
        options: [
            "A. CₙH₂ₙ₊₁O₂",
            "B. CₙH₂ₙO₂ₙ",
            "C. CₙH₂ₙO₂",
            "D. CₙHₙO₂"
        ],
        correct: "C",
        correctAnswerText: "CₙH₂ₙO₂",
        marks: 2
    },
    {
        id: "1.3",
        text: "Study the reactions below.(Refer to image)",
        image:"/images/chem_paper2_2024/1.3.png",
        type: "mcq",
        options: [
            "A. Compound P: But-1-ene; Compound Q: Butane",
            "B. Compound P: But-2-ene; Compound Q: Butane",
            "C. Compound P: But-1-ene; Compound Q: Butan-2-ol",
            "D. Compound P: But-2-ene; Compound Q: Butan-2-ol"
        ],
        correct: "B",
        correctAnswerText: "Compound P: But-2-ene, Compound Q: Butane",
        marks: 2
    },
    {
        id: "1.4",
        text: "The potential energy diagram below is for the following hypothetical chemical reaction:?",
        image:"/images/chem_paper2_2024/1.4.png",
        type: "mcq",
        options: [
            "A. ΔH(forward): -400 kJ·mol–1; EA(forward): 300 kJ·mol–1; EA(reverse): 100 kJ·mol–1",
            "B. ΔH(forward): -200 kJ·mol–1; EA(forward): 300 kJ·mol–1; EA(reverse): 100 kJ·mol–1",
            "C. ΔH(forward): +400 kJ·mol–1; EA(forward): 100 kJ·mol–1; EA(reverse): 300 kJ·mol–1",
            "D. ΔH(forward): -200 kJ·mol–1; EA(forward): 100 kJ·mol–1; EA(reverse): 300 kJ·mol–1"
        ],
        correct: "D",
        correctAnswerText: "ΔH(forward): -200 kJ·mol–1; EA(forward): 100 kJ·mol–1; EA(reverse): 300 kJ·mol–1",
        marks: 2
    },
    {
        id: "1.5",
        text: "Initially, an equal number of moles of hydrogen gas, H₂(g) , and iodine gas, I₂(g), are mixed in a closed container. The reaction reaches equilibrium at a constant temperature according to the balanced equation:\n\nH₂(g) + I₂(g) ⇌ 2HI(g)\n\nWhich ONE of the following is ALWAYS TRUE at equilibrium?",
        type: "mcq",
        options: [
            "A. [H₂] = [I₂]",
            "B. [HI] = [I₂]",
            "C. [HI] = 2[H₂]",
            "D. [H₂] = [I₂] = [HI]"
        ],
        correct: "A",
        correctAnswerText: "[H₂] = [I₂]",
        marks: 2
    },
    {
        id: "1.6",
        text: "Consider the following reaction at equilibrium:\n\n2SO₂(g) + O₂(g) ⇌ 2SO₃(g)    ΔH = −188 kJ·mol⁻¹\n\nWhich ONE of the changes to the reaction conditions below will increase the yield of SO₃?",
        type: "mcq",
        options: [
            "A. The addition of O₂(g)",
            "B. The addition of a catalyst",
            "C. An increase in temperature",
            "D. An increase in the volume of the container at a constant temperature"
        ],
        correct: "A",
        correctAnswerText: "The addition of O₂(g)",
        marks: 2
    },
    {
        id: "1.7",
        text: "The table below shows the ionisation constants, Ka, for two acids at 25 °C.\n\n(Refer to image)Consider the following statements for these two acids when they have equal concentration at 25 °C:\n\n(i) Both are weak acids.\n(ii) Butanoic acid is a stronger acid than ethanoic acid.\n(iii) The butanoic acid solution has a lower concentration of hydronium ion, H₃O⁺(aq), than the ethanoic acid solution.\n\nWhich of the above statements are TRUE?",
        type: "mcq",
        image: "/images/chem_paper2_2024/1.7.png",
        options: [
            "A. (i) and (ii) only",
            "B. (i) and (iii) only",
            "C. (ii) and (iii) only",
            "D. (i), (ii) and (iii)"
        ],
        correct: "B",
        correctAnswerText: "(i) and (iii) only",
        marks: 2
    },
    {
        id: "1.8",
        text: "Which ONE of the following pairs of acids and bases, all of the same concentration, react to give the highest pH at the equivalence point in a titration at 25 °C?",
        type: "mcq",
        options: [
            "A. HCl and NH₃",
            "B. HCl and NaOH",
            "C. HNO₃ and KOH",
            "D. CH₃COOH and NaOH"
        ],
        correct: "D",
        correctAnswerText: "CH₃COOH and NaOH",
        marks: 2
    },
    {
        id: "1.9",
        text: "A standard galvanic cell is set up, as shown below.(Refer to image)",
        image:"/images/chem_paper2_2024/1.9.png",
        type: "mcq",
        options: [
            "A. Metal Used as Cathode: Cd; Electron Flow Direction: Cd to Ag",
            "B. Metal Used as Cathode: Ag; Electron Flow Direction: Cd to Ag",
            "C. Metal Used as Cathode: Cd; Electron Flow Direction: Ag to Cd",
            "D. Metal Used as Cathode: Ag; Electron Flow Direction: Ag to Cd"
        ],
        correct: "B",
        correctAnswerText: "Metal Used as Cathode: Ag; Electron Flow Direction: Cd to Ag",
        marks: 2
    },
    {
        id: "1.10",
        text: "An electrolytic cell is set up to electroplate an iron rod with nickel, as shown in the diagram below.(Refer to image)",
        image: "/images/chem_paper2_2024/1.10.png",
        type: "mcq",
        options: [
            "A. (i) and (ii) only",
            "B. (i) and (iii) only",
            "C. (ii) and (iii) only",
            "D. (i), (ii) and (iii)"
        ],
        correct: "D",
        correctAnswerText: "(i), (ii) and (iii)",
        marks: 2
    },

    // ----------------------------------------------------
    // QUESTION 2
    // ----------------------------------------------------

    {
        id: "q2-instr",
        type: "instruction",
        text: "QUESTION 2:\n\nThe letters A to H in the table below represent organic compounds.",
        image:"/images/chem_paper2_2024/2.png"
    },
    {
        id: "2.1",
        type: "instruction",
        text: "2.1 Write down the LETTER that represents EACH of the following:"
    },
    {
        id: "2.1.1",
        text: "An alcohol.",
        type: "short",
        correctKeywords: ["D"],
        correctAnswerText: ["D"],
        marks: 1
    },
    {
        id: "2.1.2",
        text: "A compound with a formyl group.",
        type: "short",
        correctKeywords: ["A"],
        correctAnswerText: ["A"],
        marks: 1
    },
    {
        id: "2.1.3",
        text: "An unsaturated compound.",
        type: "short",
        correctKeywords: ["E"],
        correctAnswerText: ["E"],
        marks: 1
    },
    {
        id: "2.2",
        type: "instruction",
        text: "2.2 Write down the IUPAC name of compound:"
    },
    {
        id: "2.2.1",
        text: "B",
        type: "short",
        correctKeywords: [
            "hexane",
            "bromo and methyl",
            "3,3-dibromo-4,4-dimethylhexane",
            "3,3-dibromo-4,4-dimetielheksaan"
        ],
        correctAnswerText: ["3,3-dibromo-4,4-dimethylhexane"],
        marks: 3
    },
    {
        id: "2.2.2",
        text: "E",
        type: "short",
        correctKeywords: [
            "pentyne",
            "dimethyl",
            "4,4-dimethylpent-2-yne",
            "4,4-dimethyl-2-pentyne"
        ],
        correctAnswerText: ["4,4-dimethylpent-2-yne"],
        marks: 3
    },
    {
        id: "2.3",
        type: "instruction",
        text: "Two different compounds in the above table are functional isomers."
    },
    {
        id: "2.3.1",
        text: "Define the term functional isomer.",
        type: "short",
        correctKeywords: [
            "same molecular formula",
            "different functional groups",
            "different homologous series"
        ],
        correctAnswerText: [
            "Compounds with the same molecular formula, but different functional groups/homologous series."
        ],
        marks: 2
    },
    {
        id: "2.3.2",
        text: "Write down the LETTERS that represent these functional isomers.",
        type: "short",
        correctKeywords: ["A and C", "A en C"],
        correctAnswerText: ["A and C"],
        marks: 1
    },
    {
        id: "2.4",
        type: "instruction",
        text: "Compound F is formed when a carboxylic acid reacts with another organic compound, X, in the presence of a catalyst.\n\nWrite down the:"
    },
    {
        id: "2.4.1",
        text: "NAME or FORMULA of the catalyst.",
        type: "short",
        correctKeywords: [
            "H₂SO₄",
            "Sulfuric acid"],
        correctAnswerText: ["Sulfuric acid (H₂SO₄)"],
        marks: 1
    },
    {
        id: "2.4.2",
        text: "Type of reaction.",
        type: "short",
        correctKeywords: [
            "Esterification",
            "Condensation"
        ],
        correctAnswerText: ["Esterification/Condensation"],
        marks: 1
    },
    {
        id: "2.4.3",
        text: "STRUCTURAL FORMULA of compound F.",
        type: "short",
        solutionImages: "/images/chem_paper2_2024/2.4.3.png",
        marks: 2
    },
    {
        id: "2.4.4",
        text: "IUPAC name of compound X.",
        type: "short",
        correctKeywords: [
            "Propanol",
            "Propan-1-ol",
            "1-propanol"
        ],
        correctAnswerText: ["Propan-1-ol"],
        marks: 2
    },
    // ----------------------------------------------------
    // QUESTION 3
    // ----------------------------------------------------

    {
        id: "q3-instr",
        type: "instruction",
        text: "QUESTION 3:\n\nThe vapour pressures of different organic compounds are determined at 20 °C. The vapour pressures of compounds A, B and C are NOT shown in the table.",
        image: "/images/chem_paper2_2024/3.png"
    },
    {
        id: "3.1",
        text: "Define the term vapour pressure.",
        type: "short",
        correctKeywords: [
            "pressure exerted by a vapour",
            "at equilibrium",
            "with its liquid",
            "in a closed system"
        ],
        correctAnswerText: [
            "The pressure exerted by a vapour at equilibrium with its liquid in a closed system."
        ],
        marks: 2
    },
    {
        id: "3.2",
        type: "instruction",
        text: "3.2 The vapour pressures of compounds A, B and C are given in random order below: 79 kPa, 146 kPa, 58 kPa."
    },
    {
        id: "3.2.1",
        text: "Write down the vapour pressure of compound C.",
        type: "short",
        correctKeywords: ["146", "146 kPa", "146 000 Pa"],
        correctAnswerText: ["146 kPa","146 000 Pa"],
        marks: 1
    },
    {
        id: "3.2.2",
        text: "Fully explain your answer to QUESTION 3.2.1.",
        type: "short",
        correctKeywords: [
            "Compare structures",
            "Compare the strength of intermolecular forces",
            "Compare the energy required to overcome intermolecular forces",
            "more branched",
            "Shorter chain length",
            "most compact",
            "most spherical",
            "smallest surface area",
            "weaker/less intermolecular forces",
            "Van der Waals forces/London forces",
            "Lesser energy needed to overcome or break",
            "IMF"
        ],
        correctAnswerText: [
            "Comparing compound C/2,2-dimethylpropane with compounds A/pentane and B/2-methylbutane",
            "Structure: Compound C is more branched than compounds A and B/Shorter chain length/most compact most spherical/smallest surface area (over which intermolecular forces act).",
            "Intermolecular forces: Compound C has weaker/less intermolecular forces/Van der Waals forces/London forces than A and B.",
            "Energy: Lesser energy needed to overcome or break intermolecular forces/Van der Waals force in compound C than A and B."
        ],
        marks: 3
    },
    {
        id: "3.3",
        type: "instruction",
        text: "3.3 Compounds D and E are compared."
    },
    {
        id: "3.3.1",
        text: "Which compound has the lower boiling point?",
        type: "short",
        correctKeywords: ["E", "butanal"],
        correctAnswerText: ["E"],
        marks: 1
    },
    {
        id: "3.3.2",
        text: "Fully explain the difference in the vapour pressures between compounds D and E.",
        type: "short",
        correctKeywords: [
            "Strongest intermolecular forces in compound D: Hydrogen bond",
            "Strongest intermolecular forces in compound E: Dipole-dipole forces",
            "Compare the strength of intermolecular forces",
            "Compare the energy required to overcome intermolecular forces",
            "D/Propanoic acid has hydrogen bonding",
            "E/Butanal has dipole-dipole forces",
            "stronger than",
            "More energy is needed to overcome/break",
            "IMF",
            "weaker than",
            "Lesser energy is needed to overcome/break"
        ],
        correctAnswerText: [
            "Compound D/Propanoic acid has hydrogen bonding (dipoledipole and London forces) between molecules.",
            "Compound E/Butanal has dipoledipole forces (and London forces) between molecules.",
            "Intermolecular forces between molecules of compound D/propanoic acid are stronger than intermolecular forces between molecules of compound E/butanal.",
            "More energy is needed to overcome/break intermolecular forces between molecules of compound D/propanoic acid than in compound E/butanal",
            "OR",
            "Compound D/Propanoic acid has hydrogen bonding (dipoledipole and London forces) between molecules",
            "Compound E/Butanal has dipoledipole forces (and London forces) between molecules.",
            "Intermolecular forces between molecules of compound E/butanal are weaker than intermolecular forces between compound D/propanoic acid",
            "Lesser energy is needed to overcome/break intermolecular forces between molecules of compound E/butanal than in compound D/propanoic acid"
        ],
        marks: 4
    },
    {
        id: "q4-instr",
        type: "instruction",
        text: "QUESTION 4:\n\nStudy the flow diagram below.\nReaction I is a CRACKING REACTION forming two organic compounds, W and T, as the ONLY products.",
        image:"/images/chem_paper2_2024/4.png"
    },
    {
        id: "4.1",
        text: "Define the term cracking reaction.",
        type: "short",
        correctKeywords: [
            "chemical process/reaction",
            "longer chain hydrocarbon/alkane molecules",
            "broken down to shorter (more useful) molecules"
        ],
        correctAnswerText: [
            "The chemical process/reaction in which longer chain hydrocarbon/alkane molecules/are broken down to shorter (more useful) molecules."
        ],
        marks: 2
    },
    {
        id: "4.2",
        text: "Is the product in reaction II a PRIMARY, SECONDARY or TERTIARY haloalkane? Give a reason for the answer.",
        type: "short",
        solutionImages:"/images/chem_paper2_2024/4.2.png",
        correctKeywords: [
            "Primary/Primêre",
            "halogen/bromine/functional group (-X)",
            "bonded to a C atom that is bonded to one other C atom",
            "Br/bromine (atom)/X/halogen is bonded to first /last/ terminal C-atom"
        ],
        correctAnswerText: [
            "Primary. The halogen/bromine/functional group (-X) is bonded to a C atom that is bonded to one other C atom.",
            "Accept: The Br/bromine (atom)/X/halogen is bonded to first /last/ terminal C-atom."
        ],
        marks: 2
    },
    {
        id: "4.3",
        type: "instruction",
        text: "4.3 Write down the:"
    },
    {
        id: "4.3.1",
        text: "STRUCTURAL FORMULA of compound W.",
        type: "short",
        solutionImages:"/images/chem_paper2_2024/4.3.1.png",
        marks: 3
    },
    {
        id: "4.3.2",
        text: "MOLECULAR formula of compound U.",
        type: "short",
        correctKeywords: ["C₈H₁₈"],
        correctAnswerText: ["C₈H₁₈"],
        marks: 1
    },
    {
        id: "4.4",
        type: "instruction",
        text: "4.4 For reaction II, write down:"
    },
    {
        id: "4.4.1",
        text: "The NAME or FORMULA of the inorganic reactant.",
        type: "short",
        correctKeywords: ["Br₂", "Bromine"],
        correctAnswerText: ["Br₂"],
        marks: 1
    },
    {
        id: "4.4.2",
        text: "The type of reaction (Choose from SUBSTITUTION, ADDITION or ELIMINATION.)",
        type: "short",
        correctKeywords: ["Substitution"],
        correctAnswerText: ["Substitution"],
        marks: 1
    },
    {
        id: "4.4.3",
        text: "ONE reaction condition.",
        type: "short",
        correctKeywords: ["UV", "(Sun)light", "Heat"],
        correctAnswerText: ["UV light/Sunlight/Heat"],
        marks: 1
    },
    {
        id: "4.5",
        text: "Write down the TYPE of elimination in reaction III.",
        type: "short",
        correctKeywords: [
            "Dehydrohalogenation",
        ],
        correctAnswerText: ["Dehydrohalogenation"],
        marks: 1
    },
    {
        id: "4.6",
        type: "instruction",
        text: "4.6 Compounds R and T are positional isomers. The inorganic reagents shown below are available for reactions IV and V\n\nBr₂  |  H₂SO₄(conc.)  |  NaOH(conc.)  |  HBr  |  H₂.\n\nWrite down:"
    },
    {
        id: "4.6.1",
        text: "The balanced equation for reaction IV, using STRUCTURAL FORMULAE and the correct inorganic reagent shown above.",
        type: "short",
        solutionImages: "/images/chem_paper2_2024/4.6.1.png",
        correctKeywords: [
            "Functional group of alkene on first C atom",
            "Whole structural formula of alkene correct",
            "HBr",
            "Functional group of haloalkane correct",
            "Whole structural formula of haloalkane correct (halogen on second/first C-atom)"
        ],
        marks: 5
    },
    {
        id: "4.6.2",
        text: "The balanced equation for reaction V, using STRUCTURAL formulae and the correct reagent shown above.",
        type: "short",
        solutionImages: "/images/chem_paper2_2024/4.6.2.png",
        correctKeywords: [
            "NaOH",
            "Whole structural formula of alkene correct (functional group on second/ first C atom)",
            "NaBr + H₂O"
        ],
        marks: 3
    },
    {
        id: "4.6.3",
        text: "The IUPAC name of compound T.",
        type: "short",
        correctKeywords: [
            "But-2-ene",
            "2-butene",
            "but-1-ene",
            "1-butene"
        ],
        correctAnswerText: ["But-2-ene/But-1-ene"],
        marks: 2
    },

    // ----------------------------------------------------
    // QUESTION 5
    // ----------------------------------------------------

    {
        id: "q5-instr",
        type: "instruction",
        text: "QUESTION 5\n\n5.1 The reaction between pure aluminium, Aℓ(s), and EXCESS hydrochloric acid, HCℓ(aq), is used to investigate the factors that affect the rate of a reaction.\n\nThe balanced equation for the reaction is:\n\n2Al(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂(g)"
    },
    {
        id: "5.1.1",
        text: "Define the term reaction rate.",
        type: "short",
        correctKeywords: [
            "Change in concentration",
            "products/reactants per (unit) time",
            "Change in amount/number of moles/volume/mass",
            "products or reactants per (unit) time",
            "Amount/number of moles/volume/mass of products formed/reactants used per (unit) time",
            "Rate of change in concentration/amount/number of moles/volume/ mass"
        ],
        correctAnswerText: [
            "Change in concentration of products/reactants per (unit) time.",
            "Change in amount/number of moles/volume/mass of products or reactants per (unit) time.",
            "Amount/number of moles/volume/mass of products formed/reactants used per (unit) time.",
            "Rate of change in concentration/amount/number of moles/volume/ mass."
        ],
        marks: 2
    },
    {
        id: "",
        type: "instruction",
        text: "EXPERIMENT I\n\nIn this experiment, 1 mol∙dm-3 HCℓ solution reacts with a 0,5 g Aℓ strip from an aluminium roll at room temperature.\n\nThe graph of volume H₂(g) versus time for this experiment, not drawn to scale, is shown below.",
        image: "/images/chem_paper2_2024/5.1.1.png"
    },
    {
        id: "5.1.2",
        text: "For the time interval t = 0 to t = 5 minutes, the average reaction rate for the formation of H₂(g) is 0.033 dm³·min⁻¹.\nCalculate the mass of Aℓ present in the container at = 5 minutes. Take the molar gas volume as 24.5 dm³·mol⁻¹.\nAssume that the concentration of the HCℓ(aq) stays constant for the duration of the reaction.",
        type: "short",
        solutionImages: "/images/chem_paper2_2024/5.1.2.png",
        correctKeywords: [
            "0,033 and 5",
            "24,5",
            "mol ratio: n(Aℓ) : n(H2) = 2 : 3",
            "27 g∙mol-1",
            "Subtract m(Aℓ)t=5 from m(Aℓ)ini / n(Aℓ)t=5 from n(Aℓ)ini",
            "0,38 g",
            "0,165",
            "6,74 x 10-3",
            "4,49 x 10-3",
            "0,12"
        ],
        correctAnswerText: ["0,38 g"],
        marks: 6
    },
    {
        id: "5.1.3",
        text: "Use the collision theory to explain the change in the reaction rate from t = 0 to t = 5 minutes.",
        type: "short",
        correctKeywords: [
            "surface area/contact area/mass/size of aluminium decreases",
            "Less particles exposed",
            "Less effective collisions per unit time/second",
            "Lower frequency of effective collisions",
            "Reaction rate decreases"
        ],
        correctAnswerText: [
            "The surface area/contact area/mass/size of aluminium decreases.",
            "Less particles exposed",
            "Less effective collisions per unit time/second.",
            "OR",
            "Lower frequency of effective collisions.",
            "Reaction rate decreases./Lower reaction rate./Reaction slows down."
        ],
        marks: 4
    },
    {
        id: "",
        type: "instruction",
        text: "EXPERIMENT II\n\nExperiment I is repeated using a 2 mol·dm⁻³ HCℓ solution."
    },
    {
        id: "5.1.4",
        text: "Redraw the above graph (NO numerical values need to be shown) in your ANSWER BOOK and label the curve A. On the same set of axes, draw the curve that will be obtained for Experiment II. Label this as curve B.",
        type: "short",
        solutionImages: "/images/chem_paper2_2024/5.1.4.png",
        correctKeywords: [
            "Curve B starts at the origin and ends at the same point as curve A",
            "Gradient of curve B steeper for the whole duration"
        ],
        marks: 2
    },
    {
        id: "",
        type: "instruction",
        text: "EXPERIMENT III\n\nExperiment I is repeated using 0,5 g pure powdered Aℓ."
    },
    {
        id: "5.1.5",
        text: "How will the volume of H₂(g) produced in Experiment III compare to that in Experiment I? Choose from GREATER THAN, LESS THAN or EQUAL TO.",
        type: "short",
        correctKeywords: ["Equal to"],
        correctAnswerText: ["Equal to"],
        marks: 1
    },
    {
        id: "5.2",
        type: "instruction",
        text: "5.2 Curve X is the Maxwell Boltzmann distribution curve for a reaction under a set of reaction conditions. A change was made to one of the reaction conditions to obtain curve Y.",
        image:"/images/chem_paper2_2024/5.2.png"
    },
    {
        id: "5.2.1",
        text: "What change was made to obtain curve Y?",
        type: "short",
        correctKeywords: ["An increase in temperature"],
        correctAnswerText: ["An increase in temperature."],
        marks: 1
    },
    {
        id: "5.2.2",
        text: "Give a reason for the answer to QUESTION 5.2.1.",
        type: "short",
        correctKeywords: [
            "Curve Y has a peak/maximum at a higher kinetic energy",
            "Peak shifted to the right",
            "The (average) kinetic energy (of the particles) increases",
            "More particles with higher kinetic energy",
            "Larger area with higher kinetic energy"
        ],
        correctAnswerText: [
            "Curve Y has a peak/maximum at a higher kinetic energy, or the peak shifted to the right.",
            "OR",
            "The (average) kinetic energy (of the particles) increases./More particles with higher kinetic energy./Larger area with higher kinetic energy."
        ],
        marks: 1
    },
    // ----------------------------------------------------
    // QUESTION 6
    // ----------------------------------------------------

    {
        id: "q6-instr",
        type: "instruction",
        text: "QUESTION 6\n\nThe reaction of carbon monoxide gas, CO(g), with oxygen gas, O₂(g), is investigated. The reaction reaches equilibrium in a closed container at constant temperature T °C, according to the balanced equation:\n\n2CO(g) + O₂(g) ⇌ 2CO₂(g)    ΔH < 0\n\nChanges to the conditions of equilibrium are made at different times. The graph shows the results obtained. X, Y and Z represent the gases in the above reaction.",
        image: "/images/chem_paper2_2024/6.1.png"
    },
    {
        id: "6.1.1",
        text: "Define the term chemical equilibrium.",
        type: "short",
        correctKeywords: [
            "rate of the forward reaction equals the rate of the reverse reaction",
            "rate of the forward reaction equals the rate of the reverse reaction",
            "concentrations of the reactants and products remain constant"
        ],
        correctAnswerText: [
            "The dynamic equilibrium when the rate of the forward reaction equals the rate of the reverse reaction.",
            "The stage in a chemical reaction when the concentrations of the reactants and products remain constant."
        ],
        marks: 2
    },
    {
        id: "6.1.2",
        text: "Use the graph to answer the questions below.\n\nAt t1, oxygen, O₂(g), was added to the container. Write down the letter that represents O₂(g). Choose from X, Y or Z.",
        type: "short",
        correctKeywords: ["X"],
        correctAnswerText: ["X"],
        marks: 1
    },
    {
        id: "6.1.3",
        text: "At t2, the pressure is adjusted by changing the volume of the container. Was the pressure INCREASED or DECREASED?",
        type: "short",
        correctKeywords: ["Decreased"],
        correctAnswerText: ["Decreased"],
        marks: 1
    },
    {
        id: "6.1.4",
        text: "Give a reason for the answer to QUESTION 6.1.3.",
        type: "short",
        correctKeywords: [
            "The concentrations of (all) the gases decreased",
            "The reverse reaction was favoured",
            "All concentrations decreased"
        ],
        correctAnswerText: [
            "The concentrations of (all) the gases decreased./The reverse reaction was favoured.",
            "All concentrations decreased."
        ],
        marks: 1
    },
    {
        id: "6.1.5",
        text: "Write down the NAME or FORMULA of the gas that is represented by the letter Z.",
        type: "short",
        correctKeywords: ["CO(g)", "carbon monoxide"],
        correctAnswerText: ["CO(g)/carbon monoxide"],
        marks: 1
    },
    {
        id: "6.1.6",
        text: "Give a reason for the answer to QUESTION 6.1.5.",
        type: "short",
        correctKeywords: [
            "The concentration of Z (CO) decreased with a decrease in the concentration of X (O2)",
            "The concentration of Z (CO) increased with an increase in the concentration of X (O2)",
            "Z (CO) behaves like X (O2)",
            "Z (CO) and X(O2) are both reactants",
            "Y(CO2) is the product"
        ],
        correctAnswerText: [
            "The concentration of Z (CO) decreased with a decrease in the concentration of X (O₂).",
            "OR",
            "The concentration of Z (CO) increased with an increase in the concentration of X (O₂).",
            "OR",
            "Z (CO) behaves like X (O₂)/Follows the same trend as X (O₂).",
            "Z (CO) and X(O₂) are both reactants/ Y(CO₂) is the product.",
            "OR",
            "The reverse reaction is favoured to increase the number of moles."
        ],
        marks: 1
    },
    {
        id: "6.1.7",
        text: "What change in temperature is made at t3? Choose between INCREASED or DECREASED.",
        type: "short",
        correctKeywords: ["Decreased"],
        correctAnswerText: ["Decreased"],
        marks: 1
    },
    {
        id: "6.1.8",
        text: "Use Le Chatelier's principle to explain the answer to QUESTION 6.1.7.",
        type: "short",
        correctKeywords: [
            "Concentration of products/Y/CO₂ increases",
            "Concentration of reactant/Z/X/CO/O₂ decreases",
            "forward reaction is favoured",
            "forward reaction is exothermic",
            "decrease in temperature favours the exothermic reaction"
        ],
        correctAnswerText: [
            "Concentration of products/Y/CO₂ increases.",
            "OR",
            "Concentration of reactant/Z/X/CO/O₂ decreases.",
            "OR",
            "The forward reaction is favoured.",
            "The forward reaction is exothermic.",
            "A decrease in temperature favours the exothermic reaction."
        ],
        marks: 3
    },
    {
        id: "6.2",
        text: "Carbon monoxide gas, CO(g), reacts with water vapour, H₂O(g), at T °C. The reaction reaches chemical equilibrium according to the balanced equation:\n\nCO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g)\n\nInitially, 0,6 moles of CO(g), 0,6 moles of H₂O(g), 0,1 moles of carbon dioxide gas, CO₂(g), and 0,1 moles of hydrogen gas, H₂(g), were mixed and sealed in a 2 dm³ flask.\nIf the equilibrium constant, Kc, for this reaction at T °C is 4, calculate the mass of CO(g) present in the flask at equilibrium.",
        type: "short",
        solutionImages: ["/images/chem_paper2_2024/6.2a.png","/images/chem_paper2_2024/6.2b.png","/images/chem_paper2_2024/6.2c.png","/images/chem_paper2_2024/6.2d.png","/images/chem_paper2_2024/6.2e.png","/images/chem_paper2_2024/6.2f.png","/images/chem_paper2_2024/6.2g.png","/images/chem_paper2_2024/6.2h.png"],
        correctKeywords: ["6,44g","6.72g"],
        correctAnswerText: ["6,44g","6.72g"],
        marks: 9
    },
    // ----------------------------------------------------
    // QUESTION 7
    // ----------------------------------------------------

    {
        id: "q7-instr",
        type: "instruction",
        text: "QUESTION 7: \n\nHydrated potassium carbonate, K₂CO₃·xH₂O, is a WEAK BASE. A solution is prepared by dissolving some of this solid in water."
    },
    {
        id: "7.1",
        text: "Define the term weak base.",
        type: "short",
        correctKeywords: [
            "dissociate/ionise incompletely/partially in water",
            "low concentration of hydroxide/OH- ions"
        ],
        correctAnswerText: [
            "Weak bases dissociate/ionise incompletely/partially in water to form a low concentration of hydroxide/OH─ ions"
        ],
        marks: 2
    },
    {
        id: "7.2",
        text: "Write down the formula of the conjugate acid of the carbonate ion, CO₃²⁻(aq) .",
        type: "short",
        correctKeywords: ["HCO₃⁻(aq)"],
        correctAnswerText: ["HCO₃⁻(aq)"],
        marks: 1
    },
    {
        id: "7.3",
        type: "instruction",
        text: "A hydrochloric acid solution, HCℓ(aq), of concentration 0.1 mol·dm⁻³ is titrated with the prepared potassium carbonate solution, K₂CO₃(aq), of unknown concentration.\n\nThe balanced equation for the reaction is:\nK₂CO₃(aq) + 2HCl(aq) → 2KCl(aq) + CO₂(g) + H₂O(l)\nThe results of the titration are given below.(Refer to image)\n\n7.3 Determine the value of:",
        image: "/images/chem_paper2_2024/7.2.png"
    },
    {
        id: "7.3.1",
        text: "p",
        type: "short",
        correctKeywords: ["26,55 (cm³)"],
        correctAnswerText: ["26,55 (cm³)"],
        marks: 1
    },
    {
        id: "7.3.2",
        text: "q",
        type: "short",
        correctKeywords: ["28,15 (cm³)"],
        correctAnswerText: ["28,15 (cm³)"],
        marks: 1
    },
    {
        id: "7.4",
        text: "METHYL ORANGE is used as the indicator. Explain why methyl orange is the most suitable indicator for this titration by referring to the pH at the equivalence point.",
        type: "short",
        correctKeywords: [
            "equivalence point/colour change is in pH range less than 7",
            "Solution is acidic",
            "reaction of strong acid and weak base has equivalence point at pH less than 7",
            "end point of this titration is within the pH range in which methyl orange/indicator changes colour"
        ],
        correctAnswerText: [
            "The titration’s equivalence point/colour change is in pH range less than 7./ Solution is acidic/ The reaction of strong acid and weak base has equivalence point at pH less than 7.",
            "The end point of this titration is within the pH range in which methyl orange/indicator changes colour./Methyl orange changes colour at a pH less than 7."
        ],
        marks: 2
    },
    {
        id: "7.5",
        text: "Calculate the concentration of the K₂CO₃ solution.",
        type: "short",
        solutionImages: "/images/chem_paper2_2024/7.5.png",
        correctKeywords: [
            "0,0622 mol∙dm⁻³",
            "0,06"
        ],
        correctAnswerText: [            "0,0622 mol∙dm⁻³",
            "0,06"],
        marks: 5
    },
    {
        id: "7.6",
        text: "The above K2CO3 solution used in the titration, was prepared by completely dissolving 6,525 g of the hydrated potassium carbonate, K₂CO₃·xH₂O, in 600 cm³ water.\nCalculate the value of x in the formula K₂CO₃·xH₂O .",
        type: "short",
        solutionImages: ["/images/chem_paper2_2024/7.6.png","/images/chem_paper2_2024/7.6a.png"],
        correctKeywords: [
            "x = 2"
        ],
        correctAnswerText: ["2"],
        marks: 5
    },

    // ----------------------------------------------------
    // QUESTION 8
    // ----------------------------------------------------

    {
        id: "q8-instr",
        type: "instruction",
        text:"QUESTION 8:\n\n8.1 Dilute hydrochloric acid, HCℓ(aq), reacts with magnesium, Mg(s), at 25 °C according to the following balanced equation:\nMg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)"
    },
    {
        id: "8.1.1",
        text: "Use oxidation numbers for EACH of the reactants and explain why this reaction is a redox reaction.",
        type: "short",
        correctKeywords: [
            "oxidation number of H changes from +1 to 0",
            "oxidation number of Mg changes from 0 to +2",
            "Mg0 Oxidation number increases",
            "H+ → H₂0 Oxidation number decreases"
        ],
        correctAnswerText: [
            "The oxidation number of H changes from +1 to 0 AND the oxidation number of Mg changes from 0 to +2.",
            "OR",
            "Mg0 → Mg2+ Oxidation number increases.",
            "H+ → H₂0 Oxidation number decreases."
        ],
        marks: 2
    },
    {
        id: "8.1.2",
        text: "Write down the FORMULA of the oxidising agent in this reaction.",
        type: "short",
        correctKeywords: ["H+", "HCℓ"],
        correctAnswerText: ["H+", "HCℓ"],
        marks: 1
    },
    {
        id: "8.1.3",
        text: "It is observed that dilute hydrochloric acid does not react with copper, Cu(s), at 25 °C.\nExplain this observation by referring to the relative strengths of the reducing agents.",
        type: "short",
        correctKeywords: [
            "Cu/copper is a weaker reducing agent",
            "than hydrogen/H₂",
            "will not reduce H+/hydrogen ion to H₂"
        ],
        correctAnswerText: [
            "Cu/copper is a weaker reducing agent than hydrogen/H₂ (and will not reduce H+/hydrogen ion to H₂).",
            "Cu/copper is too weak a reducing agent to reduce H+/hydrogen ion (to H₂)."
        ],
        marks: 2
    },
    {
        id: "8.1.4",
        text: "Will dilute nitric acid, HNO₃(aq), react with copper, Cu(s), at 25 °C? Choose from YES or NO.\nExplain the answer in terms of the relative strengths of the oxidising agents.",
        type: "short",
        correctKeywords: [
            "Yes",
            "NO₃⁻/Nitrate ion/Nitric acid is a stronger oxidising agent",
            "than Cu²⁺/copper (II) ion"
        ],
        correctAnswerText: [
            "Yes. NO₃⁻/Nitrate ion/Nitric acid is a stronger oxidising agent than Cu²⁺/copper (II) ion (therefore Cu/copper will be oxidised to Cu²⁺/copper (II) ion)."
        ],
        marks: 3
    },
    {
        id: "8.2",
        type: "instruction",
        text: "8.2 A galvanic cell is represented by the following cell notation:\n\nPb(s) | Pb²⁺(aq) || Fe³⁺(aq), Fe²⁺(aq) | Pt(s)"
    },
    {
        id: "8.2.1",
        text: "Write down the balanced net ionic equation for this cell.",
        type: "short",
        correctKeywords: [
            "Reactants",
            "Products",
            "Balancing",
            "Pb(s) + 2Fe³⁺(aq) → Pb²⁺(aq) + 2Fe²⁺(aq)","OR","Pb + 2Fe³⁺ → Pb²⁺ + 2Fe²⁺"
        ],
        correctAnswerText: [
            "Pb(s) + 2Fe³⁺(aq) → Pb²⁺(aq) + 2Fe²⁺(aq)","OR","Pb + 2Fe³⁺ → Pb²⁺ + 2Fe²⁺"
        ],
        marks: 3
    },
    {
        id: "8.2.2",
        text: "A stronger reducing agent is now used with the same oxidising agent under the same conditions. How will this affect the initial emf of the cell? Choose from INCREASES, DECREASES or NO EFFECT.",
        type: "short",
        correctKeywords: ["Increases"],
        correctAnswerText: ["Increases"],
        marks: 1
    },
    {
        id: "q9-instr",
        type: "instruction",
        text: "QUESTION 9"
    },
    {
        id: "9.1",
        text: "9.1 A strip of silver is added to a 1 mol·dm⁻³ solution of Pb(NO₃)₂ at 25 °C.(Refer to image)\nConsider the reaction below.\n2Ag(s) + Pb²⁺(aq) → 2Ag⁺(aq) + Pb(s)\nBy means of a calculation, determine whether this reaction is SPONTANEOUS or NON-SPONTANEOUS.",
        type: "short",
        image:"/images/chem_paper2_2024/9.1.png",
        solutionImages: "/images/chem_paper2_2024/9.1_solution.png",
        correctKeywords: [
            "-0,93 V",
            "non-spontaneous"
        ],
        correctAnswerText: [
        ],
        marks: 5
    },
    {
        id: "9.2",
        type: "instruction",
        text: "9.2 The simplified diagram below represents an electrolytic cell. The electrodes are made of carbon.\n\n",
        image: "/images/chem_paper2_2024/9.2.png"
    },
    {
        id: "9.2.1",
        text: "Define an electrolyte.",
        type: "short",
        correctKeywords: [
            "substance of which the (aqueous) solution contains ions",
            "substance that dissolves in water to give a solution that conducts electricity",
            "solution/substance that conducts electricity through the movement of ions"
        ],
        correctAnswerText: [
            "A substance of which the (aqueous) solution contains ions.",
            "OR",
            "A substance that dissolves in water to give a solution that conducts electricity.",
            "A substance that forms ions in water / when melted.",
            "A solution/substance that conducts electricity through the movement of ions."
        ],
        marks: 2
    },
    {
        id: "9.2.2",
        text: "Write down the PREDOMINANT oxidation half-reaction that takes place in this cell.",
        type: "short",
        correctKeywords: [
            "2Cl⁻ → Cl₂ + 2e⁻"
        ],
        correctAnswerText: [
            "2Cl⁻ → Cl₂ + 2e⁻"
        ],
        marks: 2
    },
    {
        id: "9.2.3",
        text: "Write down the NAMES or FORMULAE of the products formed at electrode Q.",
        type: "short",
        correctKeywords: [
            "Hydroxide ions/OH-",
            "Sodium hydroxide/NaOH",
            "Hydrogen/H₂"
        ],
        correctAnswerText: [
            "Hydroxide ions/OH-/Sodium hydroxide/NaOH",
            "Hydrogen/H₂"
        ],
        marks: 2
    },
    {
        id: "9.2.4",
        text: "Explain the answer to QUESTION 9.2.3 by referring to the relative strengths of the oxidising agents involved.",
        type: "short",
        correctKeywords: [
            "Water/H₂O is a stronger oxidising agent",
            "than Na+/sodium ion",
            "water/H₂O will be reduced",
            "Na+/sodium ion is a weaker oxidising agent than water/H₂O"
        ],
        correctAnswerText: [
            "Water/H₂O is a stronger oxidising agent (than Na+/sodium ion) and water/H₂O will be reduced.",
            "OR",
            "Na+/sodium ion is a weaker oxidising agent than water/H₂O and water/H₂O will be reduced."
        ],
        marks: 2
    }
];


export function totalPossibleMarks(list) {
    return list.reduce((sum, q) => sum + (q.marks || 0), 0);
}

export default questions;