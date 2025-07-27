
import EnglishFALP12020 from "../components/dashboardSidebarPages/quiz/DigitizedQuestionPapersComponents.js/EnglishFALP12020";
import MathematicsP1Nov2022Eng
    from "../components/dashboardSidebarPages/quiz/DigitizedQuestionPapersComponents.js/maths/MathematicsP1Nov2022Eng";
import MathematicsP2Nov2022Eng
    from "../components/dashboardSidebarPages/quiz/DigitizedQuestionPapersComponents.js/maths/MathematicsP2Nov2022Eng";

const paperComponents = {
    "Mathematics P1 Nov 2022 Eng": MathematicsP1Nov2022Eng,
    "Mathematics P2 Nov 2022 Eng": MathematicsP2Nov2022Eng,
    "English P2 Nov 2022 Eng": EnglishFALP12020,
    // Add more mappings as needed
};

export const getPaperComponent = (fileName) => {
    // Remove any file extensions and decode URI components
    const baseName = decodeURIComponent(fileName)
        .replace(/\.[^/.]+$/, ""); // Remove extension if present

    return paperComponents[baseName] || null;
};