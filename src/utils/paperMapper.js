import MathemathicsP1Nov2022Eng from "../components/dashboardSidebarPages/quiz/DigitizedQuestionPapersComponents.js/maths/MathematicsP1Nov2022Eng";
import EnglishFALP12020 from "../components/dashboardSidebarPages/quiz/DigitizedQuestionPapersComponents.js/EnglishFALP12020";

// Map filenames to components
const paperComponents = {
    "Mathematics P1 Nov 2022 Eng": MathemathicsP1Nov2022Eng,
    "EnglishFALP12020": EnglishFALP12020,
    // Add more filename mappings as needed:
    // "PhysicsP1May2023": PhysicsP1May2023,
    // "ChemistryP2Sep2022": ChemistryP2Sep2022,
};

export const getPaperComponent = (fileName) => {
    return paperComponents[fileName] || null;
};