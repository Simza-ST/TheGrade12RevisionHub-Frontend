export const questions = [
    {
        id: 1,
        instructions:
            "Various options are provided as possible answers to the following questions. Each question has only ONE correct answer. Choose the answer and write only the letter (A–D) next to the question numbers (1.1 to 1.10) in the ANSWER BOOK, e.g. 1.11 E.",
        items: [
            // ------------- 1.1 (NO DIAGRAM) -------------
            {
                number: "1.1",
                type: "mcq",
                question:
                    "A constant net force is applied to a block. Which ONE of the following statements is CORRECT? The block will move with a …",
                options: [
                    "constant velocity.",
                    "constant acceleration.",
                    "constantly increasing acceleration.",
                    "constantly decreasing acceleration."
                ],
                marks: 2
            },

            // ------------- 1.2 (HAS DIAGRAM) -------------
            {
                type: "diagram",
                diagram: "/images/diagram1.1.jpg"
            },
            {
                number: "1.2",
                type: "mcq",
                question:
                    "A crate of mass m is stationary on a plane inclined at an angle θ with the \n" +
                    "horizontal. \"Which ONE of the following statements regarding the magnitude of the +\n" +
                    " frictional force acting on the crate is CORRECT?" +
                    "                     \n" +
                    "                    \"The magnitude of the frictional force acting on the crate is … ",
                options: [
                    "equal to the component of the weight of the crate which is parallel to the plane.",

                    "larger than the component of the weight of the crate which is parallel to the plane.",

                    "equal to the component of the weight of the crate which is perpendicular to the plane.",

                    "larger than the component of the weight of the crate which is perpendicular to the plane."

                ],
                marks: 2
            },

            // ------------- 1.3 (HAS DIAGRAM) -------------
            {
                type: "diagram",
                diagram: "/images/diagram1.3.jpg"
            },
            {
                number: "1.3",
                type: "mcq",
                question:
                    "A ball is projected vertically upwards from the top edge of a building. Points P, \n" +
                    "Q, R and S represent different positions during the motion of the ball, as \n" +
                    "shown in the diagram below.\n Ignore the effects of air friction.   \n" +
                    " \n" +
                    " Between which two points will the ball undergo the greatest change in kinetic \n" +
                    "energy?",
                options: ["P and S", "P and R", "R and S", "Q and S"],
                marks: 2
            },

            // ------------- 1.4 (HAS DIAGRAM) -------------
            {
                type: "diagram",
                diagram: "/images/diagram1.4.jpg"
            },
            {
                number: "1.4",
                type: "mcq",
                question:
                    "A ball is dropped from height h and strikes the floor with momentum p. The \n" +
                    "ball is then dropped from height ½h. Ignore the effects of air friction.   \n" +
                    " \n\n" +
                    " Which ONE of the following represents the momentum of the ball when it \n" +
                    "strikes the floor after being dropped from height ½h?  ?",
                options: ["p", "p/2", "√(p/2)", "2p"],
                marks: 2
            },

            // ------------- 1.5 (HAS DIAGRAM) -------------
            {
                type: "diagram",
                diagram: "/images/diagram1.5.jpg"
            },
            {
                number: "1.5",
                type: "mcq",
                question:
                    "A box moves on a horizontal surface. The diagram below shows all the forces \n" +
                    "acting on the box.\n  Which ONE of the following combinations of forces do work on the box?",
                options: [
                    "P and R only",
                    "Q and S only",
                    "Q, R and S only",
                    "P, Q, R and S"
                ],
                marks: 2
            },

            // ------------- 1.6 (NO DIAGRAM) -------------
            {
                number: "1.6",
                type: "mcq",
                question:
                    "A train moving at a constant velocity towards a stationary listener emits sound \n" +
                    "waves of constant frequency.\n Which ONE the following statements about the sound waves observed by the \n" +
                    "listener is CORRECT? \n \n" +
                    "The observed …   ",
                options: ["frequency is higher than the emitted frequency. ",
                    " \n" +
                    "wavelength is longer than the emitted wavelength. ",
                    "\n" +
                    "frequency is lower than the emitted frequency.",
                    " \n" +
                    "wavelength is equal to the emitted wavelength. "],
                marks: 2
            },

            // ------------- 1.7 (HAS DIAGRAM) -------------
            {
                question: "Refer to the diagram below. \n" +
                    " \n" +
                    "Q and R are small spheres suspended by light insulated strings. \n" +
                    " \n" +
                    "When a negatively charged rod is brought close to sphere Q, sphere Q is \n" +
                    "repelled. When the negatively charged rod is brought close to sphere R, \n" +
                    "sphere R is attracted.  ",
                type: "diagram",
                diagram: "/images/diagram1.7.jpg"
            },
            {
                number: "1.7",
                type: "table",
                question:
                    "Which ONE of the combinations below can be possible for the nature of the \n" +
                    "charges on spheres Q and R?  ",
                tableHeader: [
                    "Option",
                    "Nature of the charge on sphere Q",
                    "Nature of the charge on sphere R"
                ],
                tableRows: [
                    {letter: "A", col1: "Negative", col2: "Negative"},
                    {letter: "B", col1: "Positive", col2: "Neutral"},
                    {letter: "C", col1: "Neutral", col2: "Positive"},
                    {letter: "D", col1: "Negative", col2: "Neutral"}
                ],
                marks: 2
            },

            // ------------- 1.8 (HAS DIAGRAM) -------------
            {
                question: "Four voltmeters, V1, V2, V3 and V4, are connected in a circuit, as shown in the \n" +
                    "diagram below.",
                type: "diagram",
                diagram: "/images/diagram1.8.jpg"
            },
            {
                number: "1.8",
                type: "mcq",
                question:
                    "Which voltmeter(s) will have the same reading as voltmeter V1 when the \n" +
                    "switch is open? ",
                options: ["V2 only", "V3 only", "V4 only", "V2 and V4"],
                marks: 2
            },

            // ------------- 1.9 (NO DIAGRAM) -------------
            {
                info: "A split-ring commutator connects the coil of a generator to an external circuit. \n" +
                    "Which ONE of the combinations below is CORRECT for the magnitude and \n" +
                    "direction of the induced current in the external circuit?",
                number: "1.9",
                type: "table",
                question:
                    "A split-ring commutator connects the coil of a generator to an external circuit. \n" +
                    "Which ONE of the combinations below is CORRECT for the magnitude and \n" +
                    "direction of the induced current in the external circuit?",
                tableHeader: [
                    "Option",
                    "Magnitude of the induced current",
                    "Direction of the induced current"
                ],
                tableRows: [
                    {letter: "A", col1: "Constant", col2: "Constant"},
                    {letter: "B", col1: "Constant", col2: "Changes"},
                    {letter: "C", col1: "Changes", col2: "Constant"},
                    {letter: "D", col1: "Changes", col2: "Changes"}
                ],
                marks: 2
            },

            // ------------- 1.10 (NO DIAGRAM) -------------
            {
                number: "1.10",
                type: "mcq",
                question:
                    "Light of a suitable frequency is shone on the surface of a metal and electrons \n" +
                    "are ejected from the metal.  \n" +
                    "Which ONE of the following is equal to the ratio of the work function to the \n" +
                    "threshold frequency of the metal?",
                options: [
                    "Planck’s constant",
                    "The inverse of Planck’s constant",
                    "The energy of the incident photons",
                    "The maximum kinetic energy of the ejected electrons"
                ],
                marks: 2
            }
        ]
    },


    // ============================
    //         QUESTION 2
    // ============================
    {
        id: 2,
        instructions:
            " \n" +
            "Two blocks, A, of mass 4 kg, and B, of mass 9 kg, are connected by a light \n" +
            "inextensible string. The blocks are held at rest on a plane which is inclined at an angle \n" +
            "of 35º with the horizontal.  \n" +
            " \n" +
            "A constant force, F, acting parallel to the plane, is applied to block B, as shown in the \n" +
            "diagram below. The blocks now accelerate up the plane at 2 m·s-2.",
        diagram: "/images/diagram2.jpg",

        items: [
            {
                type: "info",
                text:
                    "\n" +
                    "The kinetic frictional forces acting on blocks A and B are 5,88 N and 13,23 N \n" +
                    "respectively. "
            },

            {
                number: "2.1",
                type: "written",
                question: "State Newton's Second Law of Motion in words.",
                marks: 2
            },

            {
                number: "2.2",
                type: "diagram-label",
                question:
                    "Draw a labelled free-body diagram showing all the forces acting on block A.",
                marks: 4
            },

            {
                number: "2.3.1",
                type: "calculation", // ✅ ADDED
                question: "Calculate the magnitude of the tension in the string.",
                marks: 4
            },

            {
                number: "2.3.2",
                type: "calculation", // ✅ ADDED
                question: "Calculate the magnitude of force F.",
                marks: 3
            },

            {
                number: "2.4.1",
                type: "mcq",
                question:
                    "How will this change the kinetic frictional force acting on block A?",
                options: ["INCREASES", "DECREASES", "REMAINS THE SAME"],
                marks: 1
            },

            {
                number: "2.4.2",
                type: "written",
                question: "Explain the answer to QUESTION 2.4.1.",
                marks: 2
            }
        ]
    },

    // ============================
    //         QUESTION 3
    // ============================
    {
        id: 3,
        instructions:
            " ball of mass 0,5 kg is thrown vertically upwards from the top edge of a building which \n" +
            "is 15,3 m high. The ball reaches a maximum height of 5,89 m above the top of the \n" +
            "building. The ball strikes the ground and bounces vertically upwards, reaching a \n" +
            "maximum height at point P, as shown in the diagram below. .",
        diagram: "/images/diagram3.jpg",

        items: [
            {
                type: "info",
                text: "Ignore the effects of air friction."

            },

            {
                number: "3.1",
                type: "written",
                question: "Define the term free fall.",
                marks: 2
            },

            {
                number: "3.2",
                type: "calculation", // ✅ ADDED
                question:
                    "Using only EQUATIONS OF MOTION, calculate the speed at which the ball was projected upwards.",
                marks: 3
            },

            {
                type: "info",
                text:
                    "After the collision with the ground, the ball leaves the ground with a speed of 11,92 m·s-1."
            },

            {
                number: "3.3.1",
                type: "calculation", // ✅ ADDED
                question:
                    "Calculate the amount of kinetic energy lost by the ball during the collision with the ground.",
                marks: 5
            },

            {
                number: "3.3.2",
                type: "calculation", // ✅ ADDED
                question:
                    "Calculate the time taken for the ball to reach point P after leaving the ground.",
                marks: 3
            },

            {
                number: "3.4",
                type: "info",
                text:
                    "The velocity-time graph for the motion of the ball from the instant it is \n" +
                    "projected upwards from the top edge of the building until the time it reaches \n" +
                    "point P is shown below. \n\n\n",
                diagram: "/images/diagram3.4.jpg",

            },

            {
                number: "3.4.1",
                type: "written",
                question: "Write down the numerical value of K.",
                marks: 1
            },

            {
                number: "3.4.2",
                type: "written",
                question: "Write down the numerical value of L.",
                marks: 1
            },

            {
                number: "3.4.3",
                type: "written",
                question: "Write down the numerical value of t2 − t1.",
                marks: 1
            }
        ]
    },

    // ============================
    //         QUESTION 4
    // ============================
    {
        id: 4,
        instructions:
            " \n" +
            "A wooden trolley of mass 2,7 kg moves to the left with a constant velocity of 3 m∙s-1.             \n" +
            "A bullet of mass 0,03 kg is fired horizontally from the left towards the trolley.           \n" +
            "(See DIAGRAM 1.) \n" +
            " \n" +
            "The bullet strikes the trolley and comes to rest inside the trolley in 0,02 s. The average \n" +
            "net force exerted by the trolley on the bullet during this time is 591 N. The bullet-trolley \n" +
            "combination now moves to the right. (See DIAGRAM 2.) ",

        diagram: "/images/diagram4.jpg",

        items: [
            {
                type: "info",
                text: "\n" +
                    "Ignore all frictional and rotational effects. "

            },

            {
                number: "4.1",
                type: "written",
                question:
                    "Write down the magnitude and direction of the average net force that the bullet exerts on the trolley.",
                marks: 1
            },

            {
                number: "4.2",
                type: "calculation", // ✅ ADDED
                question:
                    "Calculate the magnitude of the velocity with which the bullet strikes the trolley.",
                marks: 4
            },

            {
                number: "4.3",
                type: "written",
                question:
                    "State the principle of conservation of linear momentum in words.",
                marks: 2
            },

            {
                number: "4.4",
                type: "calculation", // ✅ ADDED
                question:
                    "Calculate the magnitude of the velocity of the bullet-trolley combination after the collision.",
                marks: 4
            }
        ]

    },



    // ============================
    //         QUESTION 5
    // ============================
    {
        id: 5,
        instructions:
            "Learners conduct an experiment to determine how the initial kinetic energy given to a \n" +
            "trolley affects the distance the trolley moves on a rough horizontal surface. A learner \n" +
            "pushes a trolley of unknown mass until it reaches point A with kinetic energy EkA. The \n" +
            "horizontal distance (Δx) travelled by the trolley before it comes to rest is then \n" +
            "measured. See the diagram below.\n",
        diagram: "/images/diagram5.jpg",
        items: [
            {
                type: "info",
                text: "\n" +
                    "The experiment is repeated with the trolley moving on the same rough horizontal \n" +
                    "surface but with different initial kinetic energies at point A. \n" +
                    " \n" +
                    "The results obtained are shown in the graph below.\n ",
                diagram: "/images/diagram5.0.jpg",


            },

            {
                number: "5.1",
                type: "written", // diagram-label replaced by written
                question:
                    "Draw a labelled free-body diagram showing all the forces acting on the trolley during its motion after passing point A.",
                marks: 3
            },

            {
                number: "5.2",
                type: "written",
                question: "Name the independent variable in this experiment.",
                marks: 1
            },

            {
                number: "5.3",
                type: "written",
                question: "State the work-energy theorem in words.",
                marks: 2
            },

            {
                number: "5.4",
                type: "calculation", // ✅ ADDED
                question:
                    "Calculate the mass of the trolley if the coefficient of kinetic friction is 0,18.",
                marks: 6
            }
        ]
    },
    {
        id: 6,
        instructions: "An ambulance is moving away from a stationary listener with a constant \n" +
            "velocity of 25 m∙s-1. The siren of the ambulance emits sound waves at a \n" +
            "frequency of 550 Hz. The listener detects the frequency of these sound waves \n" +
            "to be 512,64 Hz. \n" +
            " \n" +
            " \n" +
            " \n" +
            " Ignore the effects of wind. ",
        items: [
            {
                number: "6.1.1",
                type: "written",
                marks: 2,
                question: "State the Doppler effect in words."
            },
            {
                number: "6.1.2",
                type: "calculation",
                marks: 5,
                question: "Use the given information to calculate the speed of sound in air."
            },
            {
                number: "6.1.3a",
                type: "mcq",
                marks: 1,
                question: "If the ambulance moves away at a speed greater than 25 m/s, how will the speed of sound in air change?",
                options: ["Increases", "Decreases", "Remains the same"]
            },
            {
                number: "6.1.3b",
                type: "mcq",
                marks: 1,
                question: "If the ambulance moves away at a speed greater than 25 m/s, how will the frequency emitted by the siren change?",
                options: ["Increases", "Decreases", "Remains the same"]
            },
            {
                number: "6.1.3c",
                type: "mcq",
                marks: 1,
                question: "If the ambulance moves away at a speed greater than 25 m/s, how will the frequency detected by the listener change?",
                options: ["Increases", "Decreases", "Remains the same"]
            },
            {
                number: "6.2.1",
                type: "mcq",
                marks: 1,
                question: "The spectrum of a distant star is red-shifted. Is the star moving AWAY FROM or TOWARDS the Earth?",
                options: ["Away from Earth", "Towards Earth"]
            },
            {
                number: "6.2.2",
                type: "written",
                marks: 2,
                question: "Use the Doppler effect to explain your answer to QUESTION 6.2.1."
            }
        ]
    },
    {
        id: 7,
        instructions:
            "Two point charges, A and B, each with a charge of +3 × 10⁻⁹ C, are stationary on a horizontal surface. " +
            "Point P is r metres from charge A and 2r metres from charge B, as shown in the diagram.",
        diagram: "/images/diagram7.jpg", // optional if you add the image
        items: [
            {
                number: "7.1",
                type: "written",
                marks: 2,
                question: "Describe an electric field."
            },
            {
                number: "7.2",
                type: "written",
                marks: 3,
                question: "Draw the resultant electric field pattern due to charges A and B."
            },
            {
                number: "7.3",
                type: "calculation",
                marks: 5,
                question: "The magnitude of the net electric field at point P is 27 N·C⁻¹. Calculate the value of r."
            },
            {
                number: "7.4",
                type: "calculation",
                marks: 3,
                question:
                    "Calculate the magnitude of the net electrostatic force that an electron would experience if placed at point P."
            }
        ]
    },
    // ========================
// QUESTION 8
// ========================
    {
        id: 8,
        instructions: `The circuit diagram below shows a battery with an emf of 12 V and an internal resistance of 0,5 Ω connected to three resistors, a light bulb, a switch, an ammeter and connecting wires. The ammeter and connecting wires have negligible resistance. Switch S is initially CLOSED.`,

        // If you have the diagram image, set it here — otherwise remove line
        diagram: "/images/diagram8.jpg",

        items: [
            {
                number: "8.1",
                question: "State Ohm’s law in words.",
                type: "written",
                marks: 2
            },

            // 8.2 calculations
            {
                number: "8.2.1",
                question: "Calculate the total external resistance of the circuit.",
                type: "calculation",
                marks: 5
            },
            {
                number: "8.2.2",
                question: "Calculate the reading on the ammeter.",
                type: "calculation",
                marks: 3
            },
            {
                number: "8.2.3",
                question: "Calculate the power dissipated by resistor R3.",
                type: "calculation",
                marks: 4
            },


            {
                number: "8.3.1",
                question: "When switch S is OPENED, how will the brightness of the bulb be affected? Choose from INCREASES, DECREASES or REMAINS THE SAME.",
                type: "written",
                marks: 1
            },
            {
                number: "8.3.2",
                question: "Explain the answer to QUESTION 8.3.1.",
                type: "written",
                marks: 3
            }
        ]
    },

    {
        id: 9,
        instructions: "A simplified diagram of a DC electric motor is shown below.",

        items: [
            // ------------------ 9.1 Section ------------------
            {
                number: "9.1-instruction",
                type: "info",
                text: "A simplified diagram of a DC electric motor is shown below."
            },

            // 🔹 INSERTED DIAGRAM PLACEHOLDER (9.1 MOTOR)
            {
                number: "9.1-diagram",
                type: "diagram",
                diagram: "/images/diagram9.jpg"
            },

            {
                number: "9.1.1",
                type: "short",
                question: "Write down the name of component A.",
                marks: 1
            },
            {
                number: "9.1.2",
                type: "short",
                question: "State the energy conversion that takes place in the motor.",
                marks: 1
            },
            {
                number: "9.1.3",
                type: "mcq",
                question: "In which direction will the coil rotate?",
                options: ["Clockwise", "Anticlockwise"],
                marks: 2
            },
            {
                number: "9.1.4.1",
                type: "short",
                question: "State ONE change that can be made to the motor for the coil to rotate faster.",
                marks: 1
            },
            {
                number: "9.1.4.2",
                type: "short",
                question: "State ANOTHER change that can be made to the motor for the coil to rotate faster.",
                marks: 1
            },

            // ------------------ 9.2 Section ------------------
            {
                number: "9.2-instruction",
                type: "info",
                text: "The circuit diagram below shows an electric kettle and a toaster connected to an AC source with an rms voltage of 220 V. The ammeter, connecting wires and switches S₁ and S₂ have negligible resistance."
            },

            // 🔹 INSERTED DIAGRAM PLACEHOLDER (9.2 CIRCUIT)
            {
                number: "9.2-diagram",
                type: "diagram",
                diagram: "/images/diagram9.2.jpg"
            },

            {
                number: "9.2.1",
                type: "short",
                question: "Define the term root mean square (rms) current.",
                marks: 2
            },
            {
                number: "9.2.2",
                type: "numeric",
                question: "When switch S₁ is CLOSED and switch S₂ is OPEN, the maximum current is 3.6 A. Calculate the rms current.",
                marks: 3,
                answer: 2.55,
                tolerance: 0.05
            },
            {
                number: "9.2.3",
                type: "numeric",
                question: "When S₁ is OPEN and S₂ is CLOSED, the rms current is 2.62 A. Calculate the energy consumed by the toaster in two minutes.",
                marks: 3,
                answer: 69168,
                tolerance: 50
            }
        ]
    },
    {
        id: 10,
        instructions: "Study the diagram(s) and answer the questions that follow.",

        items: [
            // ========================================================
            // 10.1 — PHOTOELECTRIC EFFECT SETUP
            // ========================================================
            {
                number: "10.1-instruction",
                type: "info",
                text: "Two small spheres, A and B, made of pure zinc are at rest 0,1 m apart on a \n" +
                    "wooden table. Sphere A is negatively charged and is free to move on the \n" +
                    "table, while sphere B is uncharged and fixed to the table, as shown in the \n" +
                    "diagram below.  ",
                diagram: "/images/diagram10.1.jpg"
            },

            // -------- 10.1.1
            {
                number: "10.1.1",
                type: "short",
                question: "Define the term work function of a metal.",
                marks: 2
            },

            // -------- 10.1.2
            {
                number: "10.1.2",
                type: "numeric",
                question:
                    "High-intensity ultraviolet light of frequency 2.8 × 10¹⁶ Hz shines on sphere B. The work function of zinc is 6.63 × 10⁻¹⁹ J. Using a suitable calculation, explain why electrons will be ejected from sphere B.",
                marks: 4,
                answer: 1.86e-17, // energy of photon
                tolerance: 2e-18
            },

            // -------- 10.1.3
            {
                number: "10.1.3",
                type: "numeric",
                question:
                    "Sphere A carries a charge of -5.4 × 10⁻⁶ C and requires a minimum force of 0.027 N to move from rest. Calculate the minimum number of photons that must strike sphere B to cause sphere A to move.",
                marks: 6,
                answer: 3.47e10,
                tolerance: 1e9
            },

            // ========================================================
            // 10.2 — SPECTRA
            // ========================================================
            {
                number: "10.2-instruction",
                type: "info",
                text:
                    "A beam of white light is shone through a cold gas. The emerging light is dispersed and a line spectrum is observed on the screen."
            },

            // -------- 10.2.1
            {
                number: "10.2.1",
                type: "short",
                question: "Name the type of line spectrum observed.",
                marks: 1
            },

            // -------- 10.2.2
            {
                number: "10.2.2",
                type: "short",
                question: "Describe the spectrum observed in QUESTION 10.2.1.",
                marks: 2
            },

            // -------- 10.2.3 (DIAGRAM CHOICE)
            {
                number: "10.2.3",
                type: "mcq",
                question:
                    "Which ONE of the diagrams shows possible energy transitions that result in the spectrum identified in QUESTION 10.2.1?",
                options: ["DIAGRAM A", "DIAGRAM B"],
                marks: 2,
                diagram: "/images/diagram10.2.jpg",

            }
        ]
    }

    ];
