export const memo = {
    // ============================
    // QUESTION 1 (MCQ)
    // ============================
    1: {
        "1.1": "B",
        "1.2": "A",
        "1.3": "D",
        "1.4": "B",
        "1.5": "B",
        "1.6": "A",
        "1.7": "D",
        "1.8": "B",
        "1.9": "C",
        "1.10": "A"
    },

    // ============================
    // QUESTION 2
    // ============================
    2: {
        "2.1": {
            type: "keyphrases",
            phrases: [
                "net force",
                "accelerate",
                "direction of the force",
                "directly proportional",
                "inversely proportional",
                "mass"
            ]
        },

        "2.2": `
Accepted labels (any):
• N (Normal force)
• w or mg
• f_k (opposite motion)
• T (tension)
• w_parallel, w_perpendicular
`,

        // 2.3.1 — calculation
        "2.3.1": {
            answer: 36.36, // canonical numeric value
            working: `
Tension in string:

m_A = 4 kg
a = 2 m·s⁻²
f_k = 5,88 N
θ = 35°

w_parallel = 4 * 9.8 * sin35°
           = 22.484 N

T = m a + f_k + w_parallel
T = 8 + 5.88 + 22.484
T ≈ 36.36 N
`
        },

        // 2.3.2 — calculation
        "2.3.2": {
            answer: 118.18,
            working: `
Force F on block B:

m_B = 9 kg
T = 36.36 N
f_k(B) = 13.23 N

w_parallel(B) = 9 * 9.8 * sin35°
               = 50.589 N

F = m a + T + f_k + w_parallel
F ≈ 118.18 N
`
        },

        "2.4.1": "INCREASES",

        "2.4.2": {
            type: "keyphrases",
            phrases: [
                "normal force increases",
                "friction proportional",
                "friction increases",
                "f is proportional to N"
            ]
        }
    },

    // ============================
    // QUESTION 3
    // ============================
    3: {
        "3.1": {
            type: "keyphrases",
            phrases: [
                "gravity only",
                "only force acting is gravity",
                "weight only"
            ]
        },

        // 3.2 — calculation
        "3.2": {
            answer: 10.74,
            working: `
Using v² = u² + 2aΔy:

0 = v_i² - 2(9.8)(5.89)
v_i² = 115.444
v_i = 10.74 m·s⁻¹
`
        },

        // 3.3.1 — calculation
        "3.3.1": {
            answer: 68.31,
            working: `
ΔE_k = 1/2 m (v_before² - v_after²)

v_before = 20.38 m/s
v_after  = 11.92 m/s

ΔE_k = 0.25 * (415.344 - 142.086)
     = 68.31 J
`
        },

        // 3.3.2 — calculation
        "3.3.2": {
            answer: 1.22,
            working: `
0 = 11.92 - 9.8 t
t = 11.92 / 9.8
t ≈ 1.22 s
`
        },

        "3.4.1": "11,92 m·s⁻¹",
        "3.4.2": "10,74 m·s⁻¹",
        "3.4.3": "1,22 s"
    },

    // ============================
    // QUESTION 4
    // ============================
    4: {
        "4.1": "591 N to the right",

        // 4.2 — calculation
        "4.2": {
            answer: 395.58,
            working: `
Impulse = F Δt = 591 * 0.02 = 11.82 Ns

p_tf = p_ti + J
v_f = 3.72 / 2.7 = 1.38 m/s

Use momentum conservation to solve:
v_bi = 395.58 m/s
`
        },

        "4.3": {
            type: "keyphrases",
            phrases: [
                "momentum remains constant",
                "isolated system",
                "total momentum before equals after"
            ]
        },

        // 4.4 — calculation
        "4.4": {
            answer: 1.38,
            working: `
p_final = 3.72 kg·m/s
mass = 2.73 kg

v = p/m = 3.72 / 2.73 = 1.38 m/s
`
        }
    },

    // ============================
    // QUESTION 5
    // ============================
    5: {
        "5.1": `
• Weight (mg) downward
• Normal force upward
• Kinetic friction fₖ opposite motion
`,

        "5.2": "Initial kinetic energy EkA",

        "5.3": {
            type: "keyphrases",
            phrases: [
                "work done equals change in kinetic energy",
                "net work equals change in kinetic energy",
                "work-energy theorem"
            ]
        },

        // 5.4 — calculation
        "5.4": {
            answer: 2.7,
            working: `
m = EkA / (μ_k g Δx)

Using memo point:
EkA = 4 J
Δx = 0.85 m

m = 4 / (0.18 * 9.8 * 0.85)
m = 2.7 kg
`
        }
    },
    6: {
        "6.1.1": {
            type: "keyphrases",
            phrases: [
                "change in frequency",
                "relative motion",
                "source and observer",
                "detected frequency"
            ],
            working:
                `The change in frequency (pitch) detected by a listener because 
the source and listener have different velocities relative to the medium.`
        },

        "6.1.2": {
            answer: 343.04,
            tolerance: 0.5,
            working:
                `Given:
f_S = 550 Hz
f_L = 512.64 Hz
v_s = 25 m/s
Listener stationary.

Doppler formula:
f_L = (v / (v + v_s)) * f_S

Substitute:
512.64 = (v / (v + 25)) * 550

Solve:
512.64 / 550 = v / (v + 25)
0.93298 = v / (v + 25)

0.93298(v + 25) = v
0.93298v + 23.3245 = v
v - 0.93298v = 23.3245
0.06702v = 23.3245

v = 343.04 m·s⁻¹

Acceptable range: 332.14 – 343.04 m·s⁻¹`
        },

        "6.1.3a": "Remains the same",
        "6.1.3b": "Remains the same",
        "6.1.3c": "Decreases",

        "6.2.1": "Away from Earth",

        "6.2.2": {
            type: "keyphrases",
            phrases: [
                "lower frequency",
                "longer wavelength",
                "red end of spectrum",
                "red shift"
            ],
            working:
                `A lower frequency / longer wavelength is detected.
The spectral lines shift to the red end of the spectrum.`
        }
    },
    7: {
        "7.1": {
            type: "keyphrases",
            phrases: [
                "region",
                "space",
                "electric charge experiences a force",
                "force on a test charge"
            ],
            working:
                `Electric field is a region/space in which an electric charge experiences a force.

Alternative:
A region where a test charge experiences a force.`
        },

        "7.2": {
            type: "keyphrases",
            phrases: [
                "correct direction of field lines",
                "correct shape between charges",
                "field lines do not cross",
                "field lines start on positive charges"
            ],
            working:
                `• Correct direction of electric field lines  
• Correct shape between and outside charges  
• No field lines crossing  
• Lines start on + charges and extend outward  
(3 marks)`
        },

        "7.3": {
            answer: 0.87,
            tolerance: 0.02,
            working:
                `Given:
Charge A = Charge B = +3×10⁻⁹ C
E_net at P = 27 N·C⁻¹
Distances: A–P = r , B–P = 2r

Electric field from a point charge:
E = kQ / r²

E_A = k(3×10⁻⁹) / r²
E_B = k(3×10⁻⁹) / (2r)² = k(3×10⁻⁹) / 4r²

Net field (same direction):
E_net = E_A – E_B
27 = (k(3×10⁻⁹)/r²) – (k(3×10⁻⁹)/4r²)

Factor:
27 = k(3×10⁻⁹)(3/4r²)

Solve for r:
r = 0.87 m

Acceptable range: 0.85 – 0.89 m.`
        },

        "7.4": {
            answer: 4.3e-18,
            tolerance: 0.1e-18,
            working:
                `Use: F = Eq
Given:
E = 27 N·C⁻¹
q_electron = 1.6×10⁻¹⁹ C

F = (27)(1.6×10⁻¹⁹)
F = 4.32 × 10⁻¹⁸ N

NOTE:
Do not penalize for negative substitution (electron),  
but final answer must be POSITIVE magnitude.`
        }
    },
    8: {
        // --------------------
        // 8.1 Ohm’s Law
        // --------------------
        "8.1": {
            type: "keyphrases",
            phrases: [
                "potential difference directly proportional to current",
                "voltage directly proportional to current",
                "if temperature is constant",
                "ratio of voltage to current is constant"
            ]
        },

        // --------------------
        // 8.2.1 Total external resistance
        // --------------------
        "8.2.1": {
            answer: 7.5,
            working: `
Step 1: Combine R1 and R2 (10 Ω and 10 Ω) in parallel:
R_parallel = (R1 * R2) / (R1 + R2)
           = (10 × 10) / (10 + 10)
           = 100 / 20
           = 5 Ω

Step 2: Add the light bulb (10 Ω):
R_12L = 5 + 10 = 15 Ω

Step 3: Combine with R3 (15 Ω) in parallel:
Rp = (15 × 15) / (15 + 15)
   = 225 / 30
   = 7.5 Ω

Therefore external resistance: 7.5 Ω
`
        },

        // --------------------
        // 8.2.2 Ammeter reading (I)
        // --------------------
        "8.2.2": {
            answer: 1.5,
            working: `
Use emf equation: ε = I(R_total + r)

Given:
ε = 12 V
R_external = 7.5 Ω
r_internal = 0.5 Ω

12 = I(7.5 + 0.5)
12 = I(8)
I = 12 / 8
I = 1.5 A
`
        },

        // --------------------
        // 8.2.3 Power in R3
        // --------------------
        "8.2.3": {
            answer: 8.44,
            working: `
Current through R3 = 0.75 A
(From current splitting in parallel: I_R3 = 0.75 A)

Use P = I²R:
P = (0.75)² × 15
P = 0.5625 × 15
P = 8.44 W
`
        },

        // --------------------
        // 8.3.1 bulb brightness
        // --------------------
        "8.3.1": "INCREASES",

        // --------------------
        // 8.3.2 Explanation
        // --------------------
        "8.3.2": {
            type: "keyphrases",
            phrases: [
                "total resistance increases",
                "current decreases",
                "internal voltage drop decreases",
                "external voltage increases",
                "power increases",
                "brightness increases"
            ]
        }
    },
// ============================
    // QUESTION 9 (YOUR VERSION)
    // ============================
    9: {
        "9.1.1": {
            answer: "Split ring / Commutator",
            marks: 1
        },
        "9.1.2": {
            answer: "Electrical energy → Mechanical (kinetic) energy",
            marks: 1
        },
        "9.1.3": {
            answer: "Clockwise",
            marks: 2
        },
        "9.1.4.1": {
            answer:
                "Increase the magnetic field strength OR increase current OR increase number of turns OR increase coil area",
            marks: 1
        },
        "9.1.4.2": {
            answer:
                "Increase the magnetic field strength OR increase current OR increase number of turns OR increase coil area",
            marks: 1
        },

        "9.2.1": {
            answer:
                "RMS current is the value of an AC current that produces the same heating effect (energy dissipation) as an equivalent DC current.",
            marks: 2
        },

        "9.2.2": {
            working: [
                "Irms = Imax / √2",
                "Irms = 3.6 / 1.414",
                "Irms = 2.55 A"
            ],
            answer: 2.55,
            tolerance: 0.05,
            marks: 3
        },

        "9.2.3": {
            working: [
                "Energy = VIΔt",
                "Δt = 2 min = 120 s",
                "W = (220)(2.62)(120)",
                "W = 69168 J"
            ],
            answer: 69168,
            tolerance: 50,
            marks: 3
        }
    },
    10: {
        // ============================
        // 10.1 PHOTOELECTRIC EFFECT
        // ============================

        "10.1.1": {
            type: "keyphrases",
            phrases: [
                "minimum energy",
                "incident photons",
                "eject electrons",
                "metal surface"
            ],
            working: `The minimum energy of incident photons that can eject 
electrons from the surface of a metal.`
        },

        "10.1.2": {
            type: "long",
            working: `
OPTION 1:
E = hf
E = (6.63 × 10⁻³⁴)(2.8 × 10¹⁶)
E = 1.86 × 10⁻¹⁷ J

Since E > W₀ (6.63 × 10⁻¹⁹ J), electrons will be ejected.

OPTION 2:
W₀ = hf₀
6.63 × 10⁻¹⁹ = (6.63 × 10⁻³⁴) f₀
f₀ = 1 × 10¹⁵ Hz
Since f > f₀, electrons will be ejected.

OPTION 3:
W₀ = hc / λ₀
λ₀ = 3 × 10⁻⁷ m
λ = c / f = 3×10⁸ / 2.8×10¹⁶ = 1.07 × 10⁻⁸ m
Since λ < λ₀, electrons are ejected.

OPTION 4:
hf = W₀ + Ek(max)
(6.63×10⁻³⁴)(2.8×10¹⁶) = 6.63×10⁻¹⁹ + Ek(max)
Ek(max) = 1.79 × 10⁻¹⁷ J > 0
Therefore electrons are ejected.
        `,
            answer: "Electrons are ejected because photon energy exceeds the work function."
        },

        // ============================
        // 10.1.3 Coulomb + photons
        // ============================

        "10.1.3": {
            answer: 3.47e10,
            tolerance: 5e8,
            working: `
Given:
Force required: F = 0.027 N
Distance: r = 0.1 m
Charge on A: Q_A = -5.4 × 10⁻⁶ C

STEP 1 — Calculate charge on sphere B:
F = k Q_A Q_B / r²
Q_B = 5.56 × 10⁻⁹ C

STEP 2 — Convert charge to number of electrons:
n = Q / e
n = (5.56 × 10⁻⁹) / (1.6×10⁻¹⁹)
n = 3.47 × 10¹⁰ electrons

Minimum number of photons = 3.47 × 10¹⁰
        `
        },

        // ============================
        // 10.2 SPECTRA
        // ============================

        "10.2.1": "Absorption spectrum",

        "10.2.2": {
            type: "keyphrases",
            phrases: [
                "continuous spectrum",
                "rainbow of colours",
                "dark lines",
                "missing frequencies"
            ],
            working: `
A continuous spectrum of white light with dark/black absorption 
lines where specific wavelengths are removed.
        `
        },

        "10.2.3": "Diagram B"
    }


};
