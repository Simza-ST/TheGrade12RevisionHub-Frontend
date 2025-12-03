export const questions = [
    {
        id: "q1-instr",
        type: "instruction",
        text: "QUESTION 1: MULTIPLE-CHOICE QUESTIONS\n\n Various options are provided as possible answers to the following questions. Choose the answer and write only the letter (A–D) next to the question numbers (1.1 to 1.10) in the ANSWER BOOK, e.g. 1.11 E."
    },
    {
        id: "1.1",
        text: "Which ONE of the following represents a straight-chain SATURATED hydrocarbon?",
        type: "mcq",
        options: [
            "A. C₅H₈",
            "B. C₅H₁₀",
            "C. C₆H₁₂",
            "D. C₆H₁₄"],
        correctAnswer: "D",
        correctAnswerText: "C₆H₁₄",
        marks: 2
    },
    {
        id: "1.2",
        text: "Which ONE of the following is a SECONDARY alcohol?",
        type: "mcq",
        options: [
            "A. C(CH₃)₃OH",
            "B. CH₃(CH₂)₃OH",
            "C. CH₃(CH₂)₂CHO",
            "D. CH₃CH₂CH(OH)CH₃"
        ],
        correctAnswer: "D",
        correctAnswerText: "CH₃CH₂CH(OH)CH₃",
        marks: 2
    },
    {
        id: "1.3",
        text: "Which ONE of the following is a HYDROLYSIS reaction?",
        type: "mcq",
        options: [
            "A. CH₃CH₂Br + H₂O → CH₃CH₂OH + HBr",
            "B. CH₃CH₂OH + HBr → CH₃CH₂Br + H₂O",
            "C. CH₂CH₂ + H₂O → CH₃CH₂OH",
            "D. CH₂CH₂ + H₂ → CH₃CH₃"
        ],
        correctAnswer: "A",
        correctAnswerText: "CH₃CH₂Br + H₂O → CH₃CH₂OH + HBr",
        marks: 2
    },
    {
        id: "1.4",
        text: "Hydrochloric acid reacts with EXCESS zinc:\n\nZn(s) + 2HCℓ(aq) → ZnCℓ₂(aq) + H₂(g)\n\nDifferent reaction conditions are shown in the diagrams below. The mass of zinc used is the same in both test tubes.(Refer to the first image)\n\nHow will the INITIAL rate of reaction and FINAL VOLUME of H2(g) produced in test tube Y compare with that in test tube X?(Refer to the second image)",
        type: "mcq",
        images:["/images/chem_paper2_2023/1.4A.png","/images/chem_paper2_2023/1.4B.png"],
        options: [
            "A. Higher / Equal",
            "B. Lower / More",
            "C. Lower / Equal",
            "D. Higher / More"
        ],
        correctAnswer: "B",
        correctAnswerText: "Lower / More",
        marks: 2
    },
    {
        id: "1.5",
        text: "The diagram below represents a mixture of NO₂(g) and N₂O₄(g) molecules at equilibrium in a 1 dm3 container at T °C.(Refer to the image)\n\nThe balanced equation for this reaction is:\n\n2NO₂(g) ⇌ N₂O₄(g)\n\n Which ONE of the following is TRUE for the value of the equilibruim constant, Kc for the raection at T °C?",
        type: "mcq",
        image:"/images/chem_paper2_2023/1.5.png",
        options: [
            "A. Kc = 24",
            "B. Kc > 1",
            "C. Kc = 1",
            "D. 0 < Kc < 1"
        ],
        correctAnswer: "D",
        correctAnswerText: "0 < Kc < 1",
        marks: 2
    },
    {
        id: "1.6",
        text: "A reaction is at equilibrium in a closed container according to the following balanced equation:\n4CuO(s) ⇌ 2Cu₂O(s) + O₂(g)\n\nThe volume of the container is now increased while the temperature remains constant. A new equilibrium is reached.\n\nWhich ONE of the following combinations is CORRECT for the new equilibrium?",
        image:"/images/chem_paper2_2023/1.6.png",
        type: "mcq",
        options: [
            "A. Decreases/ Remains the same/ Increases",
            "B. Remains the same/ Decreases/ Remains the same",
            "C. Remains the same/ Increases/ Remains the same",
            "D. Decreases/ Increases/ Remains the same"
        ],
        correctAnswer: "C",
        correctAnswerText: "Remains the same/ Increases/ Remains the same",
        marks: 2
    },
    {
        id: "1.7",
        text: "Nitric acid, HNO₃(aq), and ethanoic acid, CH₃COOH(aq), of equal volumes and concentrations are compared.\n\nConsider the following statements regarding these solutions:\n\n(i) They have different pH values.\n(ii) Both have the same electrical conductivity.\n(iii) Both solutions require the same number of moles of KOH(aq) for complete neutralisation.\n\nWhich of the above statement(s) is/are TRUE?",
        type: "mcq",
        options: [
            "A. (i) only",
            "B. (i) and (ii) only",
            "C. (i) and (iii) only",
            "D. (ii) and (iii) only"
        ],
        correctAnswer: "C",
        correctAnswerText: "(i) and (iii) only",
        marks: 2
    },
    {
        id: "1.8",
        text: "The apparatus in the diagram below is used for the titration between HCℓ(aq) and KOH(aq).(Refer to image.)\n\nIn a titration, the learner accidentally exceeds the endpoint. Which ONE of the following will be TRUE for the titration mixture?",
        image:"/images/chem_paper2_2023/1.8.png",
        type: "mcq",
        options: [
            "A. [H⁺] > [OH⁻] and pH < 7",
            "B. [H⁺] < [OH⁻] and pH < 7",
            "C. [H⁺] < [OH⁻] and pH > 7",
            "D. [H⁺] > [OH⁻] and pH > 7"
        ],
        correctAnswer: "A",
        correctAnswerText: "[H⁺] > [OH⁻] and pH < 7",
        marks: 2
    },
    {
        id: "1.9",
        text: "The following hypothetical standard reduction potentials relate to a galvanic cell:\n\nX²⁺(aq) + 2e⁻ → X(s)    E° = +0.10 V\nY⁺(aq) + e⁻ → Y(s)      E° = -0.10 V\n\nConsider the following statements for this galvanic cell:\n\n(i) The emf of the cell is 0,20 V under standard conditions.\n(ii) Electrode Y is the anode.\n(iii) X is oxidised.\n\nWhich of the above statement(s) is/are TRUE for this galvanic cell?",
        type: "mcq",
        options: [
            "A. (i) only",
            "B. (i) and (ii) only",
            "C. (i) and (iii) only",
            "D. (ii) and (iii) only"
        ],
        correctAnswer: "B",
        correctAnswerText: "(i) and (ii) only",
        marks: 2
    },
    {
        id: "1.10",
        text: "Which ONE of the half-reactions below will be the MAIN reaction at the ANODE during the electrolysis of CONCENTRATED CuCl₂(aq)?",
        type: "mcq",
        options: [
            "A. Cu²⁺ + 2e⁻ → Cu",
            "B. 2H₂O + 2e⁻ → H₂ + 2OH⁻",
            "C. 2H₂O → O₂ + 4H⁺ + 4e⁻",
            "D. 2Cl⁻ → Cl₂ + 2e⁻"
        ],
        correctAnswer: "D",
        correctAnswerText: "2Cl⁻ → Cl₂ + 2e⁻",
        marks: 2
    },
    {
        id: "q2-instr",
        type: "instruction",
        text: "QUESTION 2:\n\nThe letters A to H in the table below represent eight organic compounds.",
        image:"/images/chem_paper2_2023/2.png"
    },
    {
        id: "2.1",
        text: "Define the term organic compound.",
        type: "short",
        correctAnswerText: [
            "Molecules/compunds containing carbon (atoms.)"
        ],
        correctKeywords: ["carbon", "containing carbon"],
        marks: 1
    },

    {
        id: "2.2",
        type: "instruction",
        text: "2.2 Write down the IUPAC name of compound:"
    },
    {
        id: "2.2.1",
        text: "E",
        type: "short",
        correctAnswerText: [
            "2,3-dimethyl but-1-ene",
            "2,3-dimethyl-1-butene"
        ],
        correctKeywords: ["2,3-dimethyl but-1-ene","2,3-dimethyl-1-butene"],
        marks: 2
    },

    {
        id: "2.2.2",
        text: "H",
        type: "short",
        correctAnswerText: [
            "Butan-2-one",
            "2-butanone",
            "butanone"
        ],
        correctKeywords: ["Butan-2-one", "2-butanone", "butanone"],
        marks: 2
    },

    {
        id: "2.3",
        type: "instruction",
        text: "2.3 Write down the:"
    },
    {
        id: "2.3.1",
        text: "STRUCTURAL formula of compound B",
        type: "short",
        solutionImages: "/images/chem_paper2_2023/2.3.1.png",
        marks: 2
    },

    {
        id: "2.3.2",
        text: "STRUCTURAL formula of compound C.",
        type: "short",
        solutionImages: "/images/chem_paper2_2023/2.3.2.png",
        marks: 3
    },

    {
        id: "2.3.3",
        text: "General formula of the homologous series to which compound E belongs",
        type: "short",
        correctAnswerText: ["CₙH₂ₙ"],
        correctKeywords: ["CₙH₂ₙ"],
        marks: 1
    },

    {
        id: "2.3.4",
        text: "STRUCTURAL formula of the FUNCTIONAL GROUP of compound F.",
        type: "short",
        solutionImages: "/images/chem_paper2_2023/2.3.4.png",
        marks: 1
    },

    {
        id: "2.3.5",
        text: "IUPAC name of the alcohol needed to produce compound B.",
        type: "short",
        correctAnswerText: ["Methanol"],
        correctKeywords: ["methanol"],
        marks: 2
    },

    {
        id: "2.4",
        type: "instruction",
        text: "2.3 Write down the letter(s) of the compound(s) that:"
    },
    {
        id: "2.4.1",
        text: "Is a FUNCTIONAL isomer of compound G.",
        type: "short",
        correctAnswerText: ["B"],
        correctKeywords: ["B"],
        marks: 1
    },

    {
        id: "2.4.2",
        text: "Are CHAIN isomers of each other.",
        type: "short",
        correctAnswerText: ["D and G"],
        correctKeywords: ["D", "G"],
        marks: 1
    },
    {
        id: "q3-instr",
        type: "instruction",
        text: "QUESTION 3:\n\nThe relationship between boiling point and the molecular mass of aldehydes, carboxylic acids and primary alcohols is investigated. Curves P, R and S are obtained. All compounds used are straight chain molecules.",
        image:"/images/chem_paper2_2023/3.png"
    },
    {
        id: "3.1",
        text: "Define the term boiling point.",
        type: "short",
        correctAnswerText: [
            "The temperature at which the vapour pressure of a substance equals atmospheric pressure."
        ],
        correctKeywords: [
            "vapour pressure equals atmospheric pressure",
            "temperature at which vapour pressure equals external pressure"
        ],
        marks: 2
    },

    {
        id: "3.2",
        text: "Write down the conclusion that can be made for curve P.",
        type: "short",
        correctAnswerText: [
            "The higher the molecular mass the higher the boiling point.",
            "OR",
            "As the molecular mass increases the boiling point increases.",
            "OR",
            "The longer the C-chain the higher boiling point.",
            "OR",
            "The boiling point and the molecular mass are proportional.",
            "OR",
            "Curve P represents carboxylic acids.",
            "For every molar mass, P has the highest boiling point."
        ],
        correctKeywords: [
            "molecular mass increases",
            "boiling point increases",
            "directly proportional",
            "carboxylic acids",
            "highest boiling point"
        ],
        marks: 2
    },

    {
        id: "3.3",
        text: "Explain the answer to QUESTION 3.2 in terms of the structures of the compounds.",
        type: "short",
        correctAnswerText: [
            "Strength of the intermolecular forces increases/More sites for London forces with increase of molar mass/chain length/surface area.",
            "More energy is needed to overcome/break intermolecular forces.",
            "OR",
            "Curve P/carboxylic acids has strongest intermolecular forces.",
            "Most energy is needed to overcome/break intermolecular forces"
        ],
        correctKeywords: [
            "stronger intermolecular forces",
            "more energy required",
            "London forces increase",
            "carboxylic acids",
            "strongest intermolecular forces",
            "needed to overcome/break intermolecular forces"
        ],
        marks: 2
    },

    {
        id: "3.4",
        type: "instruction",
        text: "3.4 Curve R represents the alcohols"
    },
    {
        id: "3.4.1",
        text: "Which homologous series is represented by curve S?",
        type: "short",
        correctAnswerText: ["Aldehyde"],
        correctKeywords: ["aldehyde"],
        marks: 1
    },

    {
        id: "3.4.2",
        text: "Explain the answer to QUESTION 3.4.1 by referring to the strength of intermolecular forces.",
        type: "short",
        correctAnswerText: [
            "Aldehydes/S have the weakest/weaker intermolecular forces.",
            "Therefore, aldehydes/S have the lowest/lower boiling points / least/lower energy needed to overcome/break intermolecular forces.",
            "OR",
            "The strength of the intermolecular forces in aldehydes/S is weaker than in alcohols/R / carboxylic acids/P.",
            "Therefore, aldehydes/S have lower boiling points / need less energy than alcohols/carboxylic acids to overcome/break intermolecular forces",
            "OR",
            "Carboxylic acids/P have the strongest intermolecular forces.",
            "Therefore, carboxylic acids/P have the highest boiling points / need most energy to overcome/break intermolecular forces.",
            "OR",
            "Carboxylic acids/P and alcohols/R have stronger intermolecular forces than aldehydes/S.",
            "Therefore, carboxylic acids/P and/or alcohols/R have higher boiling points/ need more energy than aldehydes to overcome/break intermolecular forces."
        ],
        correctKeywords: [
            "weaker intermolecular forces",
            "lower boiling point",
            "less energy required"
        ],
        marks: 2
    },

    {
        id: "3.5",
        type: "instruction",
        text: "3.5 For curve R, write down the:"
    },
    {
        id: "3.5.1",
        text: "Write down the molecular mass of the compound with a boiling point of 97 °C.",
        type: "short",
        correctAnswerText: ["60", "60 g·mol⁻¹"],
        correctKeywords: ["60"],
        marks: 1
    },

    {
        id: "3.5.2",
        text: "IUPAC name of the compound in QUESTION 3.5.1.",
        type: "short",
        correctAnswerText: ["propan-1-ol", "1-propanol"],
        correctKeywords: ["propan-1-ol", "1-propanol"],
        marks: 2
    },

    {
        id: "3.6",
        text: "Two compounds, A and B, used in this investigation have a both have a molecular mass of 74 g·mol⁻¹. A has a boiling point of 118 °C and B a boiling point of 142 °C. Explain the difference in these boiling points by referring to their structures of these compounds.",
        type: "short",
        correctAnswerText: [
            "Carboxylic acids/B/Propanoic acid have, (in addition to London forces and dipole-dipole forces), two sites for hydrogen bonding between molecules.",
            "OR",
            "Carboxylic acid/B/Propanoic acid can form dimers due to strong hydrogen bonding between molecules.",
            "Alcohols/A/Butan-1-ol have, (in addition to London forces and dipole-dipole forces), one site for hydrogen bonding between molecules.",
            "Intermolecular forces in carboxylic acids are stronger.",
            "More energy needed to overcome/break intermolecular forces in carboxylic acid/B/propanoic acid."
        ],
        correctKeywords: [
            "two sites for hydrogen bonding",
            "dimers",
            "stronger intermolecular forces",
            "carboxylic acid",
            "more energy required"
        ],
        marks: 3
    },

    {
        id: "q4-instr",
        type: "instruction",
        text: "QUESTION 4"
    },
    {
        id: "4.1",
        type: "instruction",
        text: "4.1 Consider the cracking reaction below.\n\nC₁₆H₃₄ → C₆H₁₄ + C₆Hₓ + 2CᵧHz"
    },
    {
        id: "4.1.1",
        text: "Define cracking.",
        type: "short",
        correctAnswerText: [
            "The chemical process/reaction in which longer chain hydrocarbon/alkane molecules/ are broken down to shorter (more useful) molecules"
        ],
        correctKeywords: [
            "long chain broken down",
            "shorter molecules",
            "chemical process",
            "hydrocarbons"
        ],
        marks: 2
    },

    {
        id: "4.1.2",
        text: "Write down the values represented by x, y and z in the equation above.",
        type: "short",
        correctAnswerText: ["x = 12", "y = 2", "z = 4"],
        correctKeywords: ["X=12", "Y=2", "Z=4"],
        marks: 3
    },

    {
        id: "",
        type: "instruction",
        text: "Compound C₆H₁₄ undergoes complete combustion."
    },
    {
        id: "4.1.3",
        text: "Using MOLECULAR FORMULAE, write down the balanced equation for this reaction.",
        type: "short",
        correctAnswerText: [
            "2C₆H₁₄ + 19O₂ → 12CO₂ + 14H₂O"
        ],
        correctKeywords: [
            "2C₆H₁₄",
            "19O₂",
            "12CO₂",
            "14H₂O"
        ],
        marks: 3
    },

    {
        id: "4.2",
        type: "instruction",
        text: "4.2 Consider the equations for reactions I to III below.\n\nA and B represent organic compounds that are POSITIONAL ISOMERS. X is an inorganic product.(Refer to the image)",
        image:"/images/chem_paper2_2023/4.2.png"
    },
    {
        id: "4.2.1",
        text: "Define positional isomers.",
        type: "short",
        correctAnswerText: [
            "Compounds with the same molecular formula, but different positions of the side chain / substituents / functional groups on the parent chain."
        ],
        correctKeywords: [
            "same molecular formula",
            "different positions",
            "functional group",
            "substituent"
        ],
        marks: 2
    },

    {
        id: "4.2.2",
        text: "Write down the type of reaction represented by reaction I.",
        type: "short",
        correctAnswerText: ["Addition/ Hydrohalogenation/ Hydrochlorination"],
        correctKeywords: ["addition", "hydrohalogenation", "hydrochlorination"],
        marks: 1
    },

    {
        id: "4.2.3",
        text: "Write down the STRUCTURAL formula of compound B",
        type: "short",
        solutionImages: "/images/chem_paper2_2023/4.2.3.png",
        marks: 3
    },

    {
        id: "4.2.4",
        text: "Write down the Formula of X",
        type: "short",
        correctAnswerText: ["HCl"],
        correctKeywords: ["HCl"],
        marks: 1
    },

    {
        id: "4.2.5",
        text: "Write down the inorganic reagent for reaction III.",
        type: "short",
        correctAnswerText: ["H₂SO₄  / sulphuric acid / H₃PO₄ / phosphoric acid"],
        correctKeywords: ["H₂SO₄ ", "H₃PO₄", "sulphuric acid", "phosphoric acid"],
        marks: 1
    },

    {
        id: "",
        type: "instruction",
        text: "Compound A can be converted directly to the organic product of reaction III."
    },
    {
        id: "4.2.6",
        text: "Besides heat, write down the reaction condition needed for this conversion.",
        type: "short",
        correctAnswerText: [
            "Concentrated strong base",
            "OR",
            "Concentrated NaOH / KOH / LiOH / sodium hydroxide/ potassium hydroxide/ lithium hydroxide",
            "OR",
            "Strong base/NaOH/KOH/LiOH/sodium hydroxide/ potassium hydroxide/lithium hydroxide in ethanol."
        ],
        correctKeywords: ["NaOH", "KOH", "strong base"],
        marks: 1
    },

    {
        id: "4.2.7",
        text: "Write down TWO terms that describe this type of reaction.",
        type: "short",
        correctAnswerText: [
            "Elimination",
            "Dehydrohalogenation",
            "Dehydrochlorination"
        ],
        correctKeywords: [
            "elimination",
            "dehydrohalogenation",
            "dehydrochlorination"
        ],
        marks: 2
    },
    {
        id: "q5-instr",
        type: "instruction",
        text: "QUESTION 5\n\nThe reaction between EXCESS dilute hydrochloric acid and sodium thiosulphate is used to investigate factors that influence reaction rate.\n\nNa₂S₂O₃(aq) + 2HCl(aq) → 2NaCl(aq) + S(s) + H₂O(l) + SO₂(g)\n\nThe concentration of HCℓ(aq) used is 1 mol·dm-3. The same volume of HCℓ(aq) is used in each run.\n\nThe time taken for the cross on the paper under the flask to become invisible is measured.(Refer to the first image)\n\nThe table below summarises the reaction conditions and results of the experiment.(Refer to the second)",
        images: ["/images/chem_paper2_2023/5a.png","/images/chem_paper2_2023/5b.png"]
    },
    {
        id: "5.1",
        text: "Define reaction rate.",
        type: "short",
        correctAnswerText: [
            "Change in concentration of products/reactants per (unit) time.",
            "Change in amount/number of moles/volume/mass of products or reactants per (unit) time.",
            "Amount/number of moles/volume/mass of products formed/reactants used per (unit) time.",
            "Rate of change in concentration/amount/number of moles/volume/ mass."
        ],
        correctKeywords: [
            "change in concentration",
            "per unit time",
            "reactants",
            "products",
            "change in amount/number of moles/volume/mass",
            "rate of change in concentration/amount/number of moles/volume/ mass."
        ],
        marks: 2
    },

    {
        id: "5.2",
        text: "Write down the independent variable for this investigation.",
        type: "short",
        correctAnswerText: ["Concentration of Na₂S₂O₃"],
        correctKeywords: ["concentration", "Na₂S₂O₃"],
        marks: 1
    },

    {
        id: "5.3",
        text: "Calculate the value of P in the table.",
        type: "short",
        correctAnswerText: ["0.078 mol·dm⁻³", "0.075 mol·dm⁻³", "7.8 × 10⁻² mol·dm⁻³"],
        correctKeywords: [
            "0.078",
            "0.075",
            "7.8 x 10^-2"
        ],
        solutionImages: ["/images/chem_paper2_2023/5.3.png"],
        marks: 3
    },

    {
        id: "5.4",
        text: "When 0,21 g of sulphur has formed in Run 1, the cross becomes invisible.\n\nCalculate the average reaction rate with respect to sodium thiosulphate, Na₂S₂O₃(aq), in g·s⁻¹",
        type: "short",
        correctAnswerText: ["0.051 g·s⁻¹", "0.05 g·s⁻¹"],
        correctKeywords: [
            "0.051",
            "0.05",
            "g/s"
        ],
        solutionImages: ["/images/chem_paper2_2023/5.4.png"],
        marks: 5
    },

    {
        id: "",
        type: "instruction",
        text: "Another investigation is performed at different temperatures."
    },
    {
        id: "5.5",
        text: "Sketch the Maxwell-Boltzmann distribution curve for the reaction at 20 °C. Label this curve as A. On the same set of axis, draw the curve that will be obtained at 35 °C and label it as B.",
        type: "short",
        solutionImages: ["/images/chem_paper2_2023/5.5.png"],
        marks: 4
    },

    {
        id: "5.6",
        text: "Explain the effect of temperature on reaction rate in terms of the collision theory.",
        type: "short",
        correctAnswerText: [
            "OPTION 1",
            "At higher temperature particles move faster/have higher kinetic energy.",
            "More molecules have enough/sufficient kinetic energy for an effective collision.",
            "OR",
            "More molecules have kinetic energy/Ek equal to or greater than the activation energy.",
            "More effective collisions per unit time/second.",
            "OR",
            "Frequency of effective collisions increases.",
            "Reaction rate increases.",
            "",
            "OPTION 2",
            "At a lower temperature particles move slower/have lower kinetic energy.",
            "Less molecules have enough/sufficient kinetic energy for an effective collision.",
            "OR",
            "Less molecules have kinetic energy/Ek equal to or greater than the activation energy.",
            "Less effective collisions per unit time/second",
            "OR",
            "Frequency of effective collisions decreases.",
            "Reaction rate decreases."
        ],
        correctKeywords: [
            "higher temperature",
            "move faster",
            "lower temperature",
            "move slower",
            "kinetic energy",
            "activation energy",
            "effective collisions",
            "reaction rate increases"
        ],
        marks: 4
    },
    {
        id: "q6-instr",
        type: "instruction",
        text: "QUESTION 6\n\nConsider the following hypothetical reaction reaching equilibrium in a 4 dm³ closed container at 150 °C.\n\n2AB(g) ⇌ A₂(g) + B₂(g)\n\nThe graph below shows the changes in the amounts of reactants and products over time.",
        images: ["/images/chem_paper2_2023/6.png"]
    },
    {
        id: "6.1",
        text: "Write down the meaning of the term reversible reaction.",
        type: "short",
        correctAnswerText: [
            "A reaction where products can be converted back to reactants.(and vice versa)",
            "OR",
            "Both forward and reverse reactions can take place.",
            "OR",
            "A reaction that can occur in both directions.",
            "OR",
            "Products can be converted back to reactants."
        ],
        correctKeywords: [
            "products converted back",
            "forward and reverse",
            "both directions"
        ],
        marks: 1
    },

    {
        id: "6.2",
        text: "State Le Chatelier's principle.",
        type: "short",
        correctAnswerText: [
            "When the equilibrium in a closed system is disturbed, the system will re-instate a new equilibrium by favouring the reaction that will cancel/oppose the disturbance."
        ],
        correctKeywords: [
            "equilibrium disturbed",
            "oppose disturbance",
            "closed system",
            "new equilibrium"
        ],
        marks: 2
    },

    {
        id: "6.3",
        type: "instruction",
        text: "6.3 A change was made to the equilibrium mixture at t = 80 s"
    },
    {
        id: "6.3.1",
        text: "Write down the change made at t = 80 s.",
        type: "short",
        correctAnswerText: [
            "The amount/concentration of A₂(g) was increased./A₂(g) was added to the container"
        ],
        correctKeywords: [
            "A₂(g) was increased",
            "A₂(g) was added"
        ],
        marks: 1
    },

    {
        id: "6.3.2",
        text: "Use Le Chatelier's principle to explain how the system reacts to this change.",
        type: "short",
        correctAnswerText: [
            "Increase in A₂ /concentration favours the reaction that uses or decreases the amount/concentration of A₂.",
            "The reverse reaction is favoured.",
            "OR",
            "Amount or concentration of products decreases.",
            "OR",
            "Amount or concentration of reactants increases."
        ],
        correctKeywords: [
            "favours reaction that uses A2",
            "reverse reaction favoured",
            "reactants increase"
        ],
        marks: 2
    },

    {
        id: "6.4",
        text: "Calculate the equilibrium constant, Kc, at t = 120 s.",
        type: "short",
        solutionImages: "/images/chem_paper2_2023/6.4.png",
        correctKeywords: ["0.16","0.44"],
        marks: 4
    },

    {
        id: "6.5",
        type: "instruction",
        text: "6.5 At t = 130 s the temperature of the system is decreased to 100 °C."
    },
    {
        id: "6.5.1",
        text: "Draw a potential energy diagram for this reaction.",
        type: "short",
        solutionImages: "/images/chem_paper2_2023/6.5.1.png",
        correctKeywords: [
            "endothermic",
            "products higher",
            "activation energy"
        ],
        marks: 3
    },

    {
        id: "6.5.2",
        text: "Will the equilibrium constant, Kc, at 100 °C be GREATER THAN, LESS THAN or EQUAL TO the Kc at 150 °C? Explain the answer.",
        type: "short",
        correctAnswerText: [
            "Less than.",
            "Amount/concentration of products/B2/A2 decreases.",
            "OR",
            "Amount/concentration of reactants/AB increases.",
            "OR",
            "The reverse reaction is favoured. / Equilibrium (position) shifts to the left."
        ],
        correctKeywords: [
            "less than",
            "reverse favoured",
            "Kc decreases",
            "temperature decrease"
        ],
        marks: 3
    },

    {
        id: "6.6",
        text: "The initial reaction now takes place in the presence of a catalyst at 150 °C.\nDescribe the changes that will be observed on the graph between t = 0 s and t = 60 s.",
        type: "short",
        correctAnswerText: [
            "Gradients (of all three curves) will be steeper and reach the same equilibrium values.",
            "OR",
            "Gradients of curve become zero at same equilibrium values before 40 s",
            "OR",
            "The curves are horizontal at same equilibrium values before 40 s / reaches same equilibrium sooner/less than 40 s."
        ],
        correctKeywords: [
            "become zero",
            "before 40 s",
            "steeper gradients",
            "reach equilibrium sooner",
            "same equilibrium",
            "curves are horizontal"
        ],
        marks: 3
    },
    {
        id: "q7-instr",
        type: "instruction",
        text: "QUESTION 7\n\nTo identify metal M in an unknown metal carbonate, MCO3, the following procedure is carried out:\n\n" +
            "Step 1: 0,198 g of IMPURE MCO₃ is reacted with 25 cm³ of 0.4 mol·dm⁻³ nitric acid, HNO₃(aq).\n"+
            "The EXCESS HNO₃(aq) is then neutralised with 20 cm³ of 0.15 mol·dm⁻³  barium hydroxide, Ba(OH)₂(aq) .\n\n" +
            "Assume that the volumes are additive.\n\n" +
            "The following reactions take place:" +
            "2HNO₃(aq) + MCO₃(s) → M(NO₃)₂(aq) + CO₂(g) + H₂O(l) \n" +
            "2HNO₃(aq) + Ba(OH)₂(aq) → Ba(NO₃)₂(aq) + 2H₂O(l)"
    },
    {
        id: "7.1",
        text: "Define the term strong base.",
        type: "short",
        correctAnswerText: [
            "A strong base (ionises) dissociates completely in water to form a high concentration of OH- ions.",
            "A strong base (ionises) dissociates completely in water."
        ],
        correctKeywords: [
            "dissociates completely",
            "OH- ions",
            "strong base"
        ],
        marks: 2
    },

    {
        id: "7.2",
        type: "instruction",
        text: "7.2 Calculate the:"
    },
    {
        id: "7.2.1",
        text: "Number of moles of Ba(OH)₂(aq) that reacted with the excess HNO₃(aq)",
        type: "short",
        correctAnswerText: [
            "n(Ba(OH)₂) = cV = (0.15)(0.02) = 0.003 mol"
        ],
        correctKeywords: [
            "0.003 mol",
            "cV",
            "Ba(OH)2"
        ],
        marks: 3
    },

    {
        id: "7.2.2",
        text: "pH of the solution after Step 1",
        type: "short",
        solutionImages: "/images/chem_paper2_2023/7.2.2.png",
        correctKeywords: ["pH", "0.62", "H3O+"],
        marks: 5
    },

    {
        id: "7.3",
        text: "The percentage purity of the MCO₃(s) is 85%. Identify metal M.",
        type: "short",
        solutionImages: "/images/chem_paper2_2023/7.3.png",
        correctKeywords: [
            "Mg",
            "Magnesium",
            "84 g/mol",
            "MCO₃(s)"
        ],
        marks: 8
    },
    {
        id: "q8-instr",
        type: "instruction",
        text: "QUESTION 8\n\nA cleaned pure copper strip, Cu(s), is placed in a beaker containing a colourless silver nitrate solution, AgNO₃(aq) , at 25 °C, as shown below.(Refer to image)\n\nAfter a while, it is observed that the solution in the beaker becomes blue.",
        images: ["/images/chem_paper2_2023/8.png"]
    },
    {
        id: "8.1",
        type: "instruction",
        text: "8.1 Write down:"
    },
    {
        id: "8.1.1",
        text: "ONE other OBSERVABLE change, besides the solution turning blue",
        type: "short",
        correctAnswerText: [
            "Copper strip becomes thinner/corrodes/decreases in mass/solid/silver coloured particles in solution/the copper becomes plated with silver."
        ],
        correctKeywords: [
            "silver",
            "thinner",
            "corrode",
            "solid forms",
            "plated"
        ],
        marks: 1
    },

    {
        id: "8.1.2",
        text: "The NAME or FORMULA of the oxidising agent",
        type: "short",
        correctAnswerText: [
            "Ag+ (ion/-ioon) / Silver ion/ AgNO₃/silver nitrate"
        ],
        correctKeywords: [
            "Ag+",
            "AgNO₃",
            "silver ion",
            "silver nitrate"
        ],
        marks: 1
    },

    {
        id: "8.2",
        text: "Explain the answer to QUESTION 8.1.1 by referring to the relative strengths of oxidising or reducing agents.",
        type: "short",
        correctAnswerText: [
            "Ag+ (ion) is a stronger oxidising agent than Cu2+ ion and will oxidise Cu to Cu2+ ion.",
            "Cu2+ (ion) is a weaker oxidising agent than Ag+ ion and Cu will be oxidised to Cu2+ ion.",
            "Cu/Copper is a stronger reducing agent than Ag/Silver and will reduce silver ions to silver"
        ],
        correctKeywords: [
            "stronger oxidising agent",
            "Cu oxidised",
            "Ag+ reduced",
            "reducing agent"
        ],
        marks: 3
    },

    {
        id: "8.3",
        type: "instruction",
        text: "A galvanic cell is now set up using Cu and Ag strips as electrodes. A simplified diagram of the cell is shown below.(Refer to the image)\n\n8.3 Write down the",
        image: "/images/chem_paper2_2023/8.3.png"
    },
    {
        id: "8.3.1",
        text: "NAME or FORMULA of electrode A",
        type: "short",
        correctAnswerText: [
            "Silver",
            "Ag"
        ],
        correctKeywords: [
            "Ag",
            "silver"
        ],
        marks: 1
    },

    {
        id: "8.3.2",
        text: "NAME or FORMULA of solution B",
        type: "short",
        correctAnswerText: [
            "CuSO₄ / CuSO₄ / Cu²⁺ /Copper (II) ions/copper(II) sulphate",
            "Any soluble copper(II) salt e.g. Cu(NO₃)₂"
        ],
        correctKeywords: [
            "CuSO4",
            "copper II",
            "Cu2+",
            "Cu(NO₃)₂"
        ],
        marks: 1
    },

    {
        id: "8.3.3",
        text: "Overall (net) balanced equation for the cell reaction",
        type: "short",
        correctAnswerText: [
            "2Ag⁺(aq) + Cu(s) → 2Ag(s) + Cu²⁺(aq)"
        ],
        correctKeywords: [
            "2Ag+",
            "Cu",
            "2Ag",
            "Cu²⁺(aq)"
        ],
        marks: 3
    },

    {
        id: "8.4",
        text: "The salt bridge contains KNO₃(aq).\nWrite down the FORMULA of the ion in the salt bridge that will move into the silver ion solution. Choose from K+(aq) or NO (aq).\nGive a reason for the answer.",
        type: "short",
        solutionImages: "/images/chem_paper2_2023/8.4.png",
        correctAnswerText: [
            "In silver half-cell concentration of positive ions decreases.",
            "OR",
            "The silver half-cell becomes negative.",
            "OR",
            "Maintain the ion balance/electrical neutrality."
        ],
        correctKeywords: [
            "K+",
            "maintain neutrality",
            "positive ions decrease",
            "balance charge"
        ],
        marks: 2
    },
    {
        id: "q9-instr",
        type: "instruction",
        text: "QUESTION 9\n\nAn electrolytic cell is set up to purify a piece of copper that contains silver and zinc as impurities. A simplified diagram of the cell is shown below. Electrode R is impure copper.",
        images: "/images/chem_paper2_2023/9.png"
    },
    {
        id: "9.1",
        text: "Define the term electrolysis.",
        type: "short",
        correctKeywords: [
            "chemical process",
            "electrical energy",
            "converted to",
            "chemical energy",
            "use of electrical energy",
            "produce a chemical change",
            "Decomposition",
            "ionic compound",
            "electrical energy",
            "electric current passes through",
            "solution/ionic liquid/molten ionic compound"
        ],
        correctAnswerText: [
            "The chemical process in which electrical energy is converted to chemical energy.",
            "The use of electrical energy to produce a chemical change.",
            "Decomposition of an ionic compound by means of electrical energy.",
            "The process during which an electric current passes through a solution/ionic liquid/molten ionic compound."
        ],
        marks: 2
    },
    {
        id: "9.2",
        text: "Write down the reaction taking place at electrode Q.",
        type: "short",
        correctKeywords: [
            "Cu²⁺(aq) + 2e⁻ → Cu(s)"
        ],
        correctAnswerText: ["Cu²⁺(aq) + 2e⁻ → Cu(s)"],
        marks: 2
    },
    {
        id: "9.3",
        text: "In which direction do the electrons flow in the external circuit? Choose from Q to R or R to Q.",
        type: "short",
        correctKeywords: ["R to Q"],
        correctAnswerText: ["R to Q"],
        marks: 1
    },
    {
        id: "9.4",
        text: "Calculate the current needed to form 16 g of copper when the cell operates for five hours.",
        type: "short",
        solutionImages: "/images/chem_paper2_2023/9.4.png",
        correctKeywords: [
            "63,5",
            "0,25",
            "1,5 x 10^23",
            "3 x 10^23",
            "48 160",
            "2,68",
            "1,34",
            "5",
            "60",
            "3600",
            "2,68 A"
        ],
        marks: 5
    },
    {
        id: "9.5",
        text: "During this electrolysis, only copper and zinc are oxidised.\nGive a reason why the silver is not oxidised.",
        type: "short",
        correctKeywords: [
            "Ag/silver is a weaker reducing agent",
            "than Cu/coper or Zn/zinc",
            "will not be oxidised",
            "Cu/coper or Zn/zinc is a stronger reducing agent",
            "than Ag/silver",
            "Voltage of power source is not effective enough",
            "potensiaalverskil van die energiebron is nie effektief genoeg"
        ],
        correctAnswerText: [
            "Ag/silver is a weaker reducing agent than Cu/coper or Zn/zinc and will not be oxidised.",
            "OR",
            "Cu/coper or Zn/zinc is a stronger reducing agent than Ag/silver and Ag will not be oxidised.",
            "OR",
            "Voltage of power source is not effective enough (to oxidise Ag/silver)."
        ],
        marks: 2
    }
];

export function totalPossibleMarks(list) {
    return list.reduce((sum, q) => sum + (q.marks || 0), 0);
}

export default questions;