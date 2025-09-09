import MathematicsP1Nov2022Eng
    from "../components/dashboardSidebarPages/quiz/DigitizedQuestionPapersComponents.js/maths/paper1Nov2022/MathematicsP1Nov2022Eng";
import EnglishFALP12020
    from "../components/dashboardSidebarPages/quiz/DigitizedQuestionPapersComponents.js/EnglishFALP12020";
import MathematicsP2Nov2022Eng
    from "../components/dashboardSidebarPages/quiz/DigitizedQuestionPapersComponents.js/maths/paper2Nov2022/MathematicsP2Nov2022Eng";
import MathematicsP1Nov2020Eng
    from "../components/dashboardSidebarPages/quiz/DigitizedQuestionPapersComponents.js/maths/paper1Nov2020/MathematicsP1Nov2020Eng";
import MathematicsP1Nov2024Eng
    from "../components/dashboardSidebarPages/quiz/DigitizedQuestionPapersComponents.js/maths/paper1Nov2024/MathematicsP1Nov2024Eng";
import MathematicsP2Nov2024Eng
    from "../components/dashboardSidebarPages/quiz/DigitizedQuestionPapersComponents.js/maths/paper2Nov2024/MathematicsP2Nov2024Eng";
import MathematicsP2Nov2023Eng
    from "../components/dashboardSidebarPages/quiz/DigitizedQuestionPapersComponents.js/maths/paper2Nov2023/MathematicsP2Nov2023Eng";
import MathematicsP1Nov2023Eng
    from "../components/dashboardSidebarPages/quiz/DigitizedQuestionPapersComponents.js/maths/paper1Nov2023/MathematicsP1Nov2023Eng";
import MathLitP2Nov2020
    from "../components/dashboardSidebarPages/quiz/DigitizedQuestionPapersComponents.js/maths-lit/paper2Nov/MathLitP2Nov2020";
import MathLitP1Nov2022
    from "../components/dashboardSidebarPages/quiz/DigitizedQuestionPapersComponents.js/maths-lit/paper1Nov/MathLitP1Nov2022";
import catPaper2_2020
    from "../components/dashboardSidebarPages/quiz/DigitizedQuestionPapersComponents.js/CAT/2020/catPaper2_2020";

// Map filenames to components
const paperComponents = {
    "Mathematics P1 Nov 2020 Eng": MathematicsP1Nov2020Eng,
    "Mathematics P1 Nov 2022 Eng": MathematicsP1Nov2022Eng,
    "Mathematics P2 Nov 2022 Eng": MathematicsP2Nov2022Eng,
    "Mathematics P1 Nov 2023 Eng": MathematicsP1Nov2023Eng,
    "Mathematics P2 Nov 2023 Eng": MathematicsP2Nov2023Eng,
    "Mathematics P1 Nov 2024 Eng": MathematicsP1Nov2024Eng,
    "Mathematics P2 Nov 2024 Eng": MathematicsP2Nov2024Eng,
    "Mathematical Literacy P1 Nov 2022 Eng": MathLitP1Nov2022,
    "Mathematical Literacy P2 Nov 2020 Eng": MathLitP2Nov2020,
    "EnglishFALP12020": EnglishFALP12020,
    "Computer Applications Technology P2 Nov 2022 Eng": catPaper2_2020,
    // Add more filename mappings as needed:
    // "PhysicsP1May2023": PhysicsP1May2023,
    // "ChemistryP2Sep2022": ChemistryP2Sep2022,
};

export const getPaperComponent = (fileName) => {
    return paperComponents[fileName] || null;
};