import MathematicsP1Nov2022Eng
    from "../components/dashboardSidebarPages/quiz/DigitizedQuestionPapersComponents.js/maths/paper1Nov2022/MathematicsP1Nov2022Eng";
import EnglishFALP12020
    from "../components/dashboardSidebarPages/quiz/DigitizedQuestionPapersComponents.js/EnglishFALP12020";
import MathematicsP2Nov2022Eng
    from "../components/dashboardSidebarPages/quiz/DigitizedQuestionPapersComponents.js/maths/paper2Nov2022/MathematicsP2Nov2022Eng";

// Map filenames to components
const paperComponents = {
    "Mathematics P1 Nov 2022 Eng": MathematicsP1Nov2022Eng,
    "Mathematics P2 Nov 2022 Eng": MathematicsP2Nov2022Eng,
    "EnglishFALP12020": EnglishFALP12020,
    // Add more filename mappings as needed:
    // "PhysicsP1May2023": PhysicsP1May2023,
    // "ChemistryP2Sep2022": ChemistryP2Sep2022,
};

export const getPaperComponent = (fileName) => {
    return paperComponents[fileName] || null;
};