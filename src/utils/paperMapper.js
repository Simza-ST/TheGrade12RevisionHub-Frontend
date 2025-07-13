import MathemathicsP1Nov2022Eng from "../components/dashboardSidebarPages/quiz/DigitizedQuestionPapersComponents.js/maths/MathematicsP1Nov2022Eng";
import EnglishFALP12020 from "../components/dashboardSidebarPages/quiz/DigitizedQuestionPapersComponents.js/EnglishFALP12020";

// Map paper IDs directly to components
const paperComponents = {
    50: MathemathicsP1Nov2022Eng,       // ID 1 = Maths paper
    17: EnglishFALP12020,     // ID 2 = English paper
    // Add more ID mappings as needed:
    // 3: PhysicsP1May2023,
    // 4: ChemistryP2Sep2022,
};

export const getPaperComponent = (paperId) => {
    return paperComponents[paperId] || null;
};