export const formulas = {
    title: "DATA FOR PHYSICAL SCIENCES GRADE 12 — PAPER 1 (PHYSICS)",
    constantsTable: {
        titleEN: "TABLE 1: PHYSICAL CONSTANTS",
        titleAF: "TABEL 1: FISIESE KONSTANTES",
        rows: [
            { nameEN: "Acceleration due to gravity", nameAF: "Swaartekragversnelling", symbol: "g", value: "9,8 m·s⁻2" },
            { nameEN: "Universal gravitational constant", nameAF: "Universele gravitasiekonstante", symbol: "G", value: "6,67 × 10⁻¹¹ N·m²·kg⁻²" },
            { nameEN: "Radius of the Earth", nameAF: "Radius van die Aarde", symbol: "R_E", value: "6,38 × 10^6 m" },
            { nameEN: "Mass of the Earth", nameAF: "Massa van die Aarde", symbol: "M_E", value: "5,98 × 10^24 kg" },
            { nameEN: "Speed of light in a vacuum", nameAF: "Spoed van lig in 'n vakuum", symbol: "c", value: "3,00 × 10^8 m·s⁻1" },
            { nameEN: "Planck's constant", nameAF: "Planck se konstante", symbol: "h", value: "6,63 × 10⁻³⁴ J·s" },
            { nameEN: "Coulomb's constant", nameAF: "Coulomb se konstante", symbol: "k", value: "9,0 × 10^9 N·m²·C⁻²" },
            { nameEN: "Charge on electron", nameAF: "Lading op elektron", symbol: "e", value: "-1,60 × 10⁻¹⁹ C" },
            { nameEN: "Electron mass", nameAF: "Elektronmassa", symbol: "m_e", value: "9,11 × 10⁻³¹ kg" }
        ]
    },

    sections: [
        {
            id: "MOTION",
            titleEN: "MOTION / BEWEGING",
            items: [
                "v_f = v_i + a Δt",
                "Δx = v_i Δt + ½ a Δt²",
                "v_f² = v_i² + 2 a Δx",
                "Δx = (v_i + v_f)/2 × Δt"
            ]
        },

        {
            id: "FORCE",
            titleEN: "FORCE / KRAG",
            items: [
                "F_net = m a",
                "p = m v",
                "f_s(max) = μ_s N",
                "f_k = μ_k N",
                "Δp = m v_f - m v_i",
                "F = Δp / Δt",
                "w = m g",
                "Newtonian gravitational force: F = G (m1 m2) / r²",
                "Gravitational field at surface: g = G M / r²"
            ]
        },

        {
            id: "WORK_ENERGY",
            titleEN: "WORK, ENERGY AND POWER / ARBEID, ENERGIE EN DRYWING",
            items: [
                "W = F Δx cos θ",
                "U = m g h  (gravitational potential energy)",
                "K = ½ m v²  (kinetic energy)",
                "ΔK = W_net",
                "W_net = ΔE_k  (work–energy theorem)",
                "W_nc + ΔU + ΔK = 0  (conservation forms shown in sheet)",
                "P = W / Δt",
                "P_ave = F v_ave"
            ]
        },

        {
            id: "WAVES_SOUND_LIGHT",
            titleEN: "WAVES, SOUND AND LIGHT / GOLWE, KLANK EN LIG",
            items: [
                "v = f λ",
                "T = 1 / f",
                "Doppler (general forms): f_L = (v ± v_L) / (v ± v_S) × f_S (use correct sign convention)",
                "Photon energy: E = h f  OR E = h c / λ",
                "Photoelectric: E_photon = W_0 + K_max  (hf = W_0 + K_max)",
                "K_max = ½ m v_max²"
            ]
        },

        {
            id: "ELECTROSTATICS",
            titleEN: "ELECTROSTATICS / ELEKTROSTATIKA",
            items: [
                "Coulomb: F = k Q1 Q2 / r²",
                "Electric field (point charge): E = k Q / r²",
                "Potential: V = W / q",
                "Relation: F = q E",
                "Number of charges: n = Q / e  (or Q = n e)"
            ]
        },

        {
            id: "ELECTRIC_CIRCUITS",
            titleEN: "ELECTRIC CIRCUITS / ELEKTRIESE STROOMBANE",
            items: [
                "Ohm: V = I R",
                "emf: ε = I (R + r)",
                "Series: R_total = R1 + R2 + ...",
                "Parallel: 1 / R_p = 1 / R1 + 1 / R2 + ...",
                "Charge: q = I Δt",
                "Energy (work): W = V q",
                "W = V I Δt",
                "W = I² R Δt",
                "P = W / Δt",
                "P = V I",
                "P = I² R",
                "P = V² / R"
            ]
        },

        {
            id: "ALTERNATING_CURRENT",
            titleEN: "ALTERNATING CURRENT / WISSELSTROOM",
            items: [
                "I_rms = I_max / √2",
                "V_rms = V_max / √2",
                "P_ave = V_rms I_rms",
                "P_ave = I_rms² R",
                "P_ave = V_rms² / R"
            ]
        }
    ]
};

export default formulas;
