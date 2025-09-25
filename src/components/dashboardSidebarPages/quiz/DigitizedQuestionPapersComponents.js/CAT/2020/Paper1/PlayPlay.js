import React, { useState } from "react";
import { API_BASE_URL, getAuthHeaders } from '../../../../../../../utils/api'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';

const CatP1Nov2020 = () => {
    const navigate = useNavigate();
    const paperId = 'cat-p1-nov-2020'; // Define a unique paper ID
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [feedbacks, setFeedbacks] = useState({});
    const [totalScore, setTotalScore] = useState(0);
    const [recording, setRecording] = useState(false);
    const [recordError, setRecordError] = useState(null);

    const markingGuidelines = {
        '1_1': { maxMarks: 3, criteria: [
                { text: 'Picture width changed to 21 cm ✓', check: (answer) => answer.toLowerCase().includes('21 cm') },
                { text: 'Picture positioned over top edge and across width of page ✓', check: (answer) => answer.toLowerCase().includes('top edge') && answer.toLowerCase().includes('width') },
                { text: 'All empty paragraphs below picture removed ✓', check: (answer) => answer.toLowerCase().includes('removed') && answer.toLowerCase().includes('paragraphs') }
            ]},
        '1_2': { maxMarks: 4, criteria: [
                { text: 'Strikethrough removed from whole heading ✓', check: (answer) => answer.toLowerCase().includes('strikethrough') && answer.toLowerCase().includes('removed') },
                { text: 'Character spacing expanded ✓ by 1.5 pt ✓', check: (answer) => answer.toLowerCase().includes('1.5 pt') && answer.toLowerCase().includes('expanded') },
                { text: 'Heading horizontally centred ✓', check: (answer) => answer.toLowerCase().includes('centred') }
            ]},
        '1_3': { maxMarks: 4, criteria: [
                { text: 'Website source added ✓', check: (answer) => answer.toLowerCase().includes('website') },
                { text: "Author 'Nina Sen' added ✓", check: (answer) => answer.toLowerCase().includes('nina sen') },
                { text: "Year '2012', Month 'September' OR 09 OR 9, Day '6' ✓", check: (answer) => answer.toLowerCase().includes('2012') && (answer.toLowerCase().includes('september') || answer.toLowerCase().includes('09') || answer.toLowerCase().includes('9')) && answer.toLowerCase().includes('6') },
                { text: 'Added in the appropriate places ✓', check: (answer) => answer.toLowerCase().includes('appropriate') }
            ]},
        '1_4': { maxMarks: 2, criteria: [
                { text: 'Nonbreaking spaces replaced with a single normal space ✓', check: (answer) => answer.toLowerCase().includes('nonbreaking') && answer.toLowerCase().includes('replaced') },
                { text: 'All 14 occurrences of nonbreaking spaces replaced ✓', check: (answer) => answer.toLowerCase().includes('14') && answer.toLowerCase().includes('occurrences') }
            ]},
        '1_5': { maxMarks: 3, criteria: [
                { text: 'First line indent ✓', check: (answer) => answer.toLowerCase().includes('first line indent') },
                { text: 'Left or hanging indent set at 2 cm ✓', check: (answer) => answer.toLowerCase().includes('2 cm') && (answer.toLowerCase().includes('left') || answer.toLowerCase().includes('hanging')) },
                { text: 'Right indent set at exactly 14 cm on ruler ✓', check: (answer) => answer.toLowerCase().includes('14 cm') && answer.toLowerCase().includes('right indent') }
            ]},
        '1_6': { maxMarks: 3, criteria: [
                { text: 'Paragraph spacing after changed to 8 pt ✓', check: (answer) => answer.toLowerCase().includes('8 pt') && answer.toLowerCase().includes('spacing') },
                { text: "Line spacing set to 'Multiple' ✓", check: (answer) => answer.toLowerCase().includes('multiple') },
                { text: 'At 1.4 ✓', check: (answer) => answer.toLowerCase().includes('1.4') }
            ]},
        '1_7': { maxMarks: 1, criteria: [
                { text: "'Page break before' selected on text 'Insert here' ✓", check: (answer) => answer.toLowerCase().includes('page break') && answer.toLowerCase().includes('insert here') }
            ]},
        '1_8': { maxMarks: 3, criteria: [
                { text: 'File 1Structure inserted ✓', check: (answer) => answer.toLowerCase().includes('1structure') && answer.toLowerCase().includes('inserted') },
                { text: 'As icon ✓', check: (answer) => answer.toLowerCase().includes('icon') },
                { text: 'Icon named as 1Structure ✓', check: (answer) => answer.toLowerCase().includes('named') && answer.toLowerCase().includes('1structure') }
            ]},
        '1_9': { maxMarks: 3, criteria: [
                { text: "Picture 'cropped' to remove only text below ✓", check: (answer) => answer.toLowerCase().includes('cropped') && answer.toLowerCase().includes('text below') },
                { text: 'Caption label changed to Structure ✓', check: (answer) => answer.toLowerCase().includes('structure') && answer.toLowerCase().includes('caption') },
                { text: 'Caption label numbering changed to a, b, c, … ✓', check: (answer) => answer.toLowerCase().includes('a, b, c') }
            ]},
        '1_10': { maxMarks: 3, criteria: [
                { text: 'Text watermark inserted ✓', check: (answer) => answer.toLowerCase().includes('watermark') && answer.toLowerCase().includes('inserted') },
                { text: 'Text \'Ancient\' ✓', check: (answer) => answer.toLowerCase().includes('ancient') },
                { text: 'Watermark displays only on first page ✓', check: (answer) => answer.toLowerCase().includes('first page') }
            ]},
        '2_1': { maxMarks: 2, criteria: [
                { text: 'Exam number inserted in \'Author\' form control ✓', check: (answer) => answer.toLowerCase().includes('exam number') && answer.toLowerCase().includes('author') },
                { text: 'Abstract form control removed ✓', check: (answer) => answer.toLowerCase().includes('abstract') && answer.toLowerCase().includes('removed') }
            ]},
        '2_2': { maxMarks: 1, criteria: [
                { text: 'Page borders removed from document ✓', check: (answer) => answer.toLowerCase().includes('page borders') && answer.toLowerCase().includes('removed') }
            ]},
        '2_3': { maxMarks: 3, criteria: [
                { text: 'Two \'Heading 2\' style headings changed to \'Heading 1\' style headings ✓', check: (answer) => answer.toLowerCase().includes('heading 2') && answer.toLowerCase().includes('heading 1') },
                { text: 'Table of Contents inserted ✓', check: (answer) => answer.toLowerCase().includes('table of contents') && answer.toLowerCase().includes('inserted') },
                { text: 'Table of Contents options set to \'Title\' style level 1 and \'Heading 1\' style level 2 ✓', check: (answer) => answer.toLowerCase().includes('title') && answer.toLowerCase().includes('heading 1') }
            ]},
        '2_4': { maxMarks: 3, criteria: [
                { text: 'Any automatic page numbering inserted ✓', check: (answer) => answer.toLowerCase().includes('page numbering') },
                { text: 'Page numbers inserted anywhere in the left page margin ✓', check: (answer) => answer.toLowerCase().includes('left') && answer.toLowerCase().includes('margin') },
                { text: 'Page after Table of Contents page numbered as \'Page 1\' ✓', check: (answer) => answer.toLowerCase().includes('page 1') && answer.toLowerCase().includes('table of contents') }
            ]},
        '2_5': { maxMarks: 5, criteria: [
                { text: 'Table converted to text ✓ with tabs at 4 cm ✓', check: (answer) => answer.toLowerCase().includes('converted') && answer.toLowerCase().includes('4 cm') },
                { text: 'Hanging indent set to tab position ✓', check: (answer) => answer.toLowerCase().includes('hanging indent') },
                { text: 'Text alignment set to justify ✓', check: (answer) => answer.toLowerCase().includes('justify') },
                { text: 'Any solid paragraph border inserted ✓', check: (answer) => answer.toLowerCase().includes('border') }
            ]},
        '2_6': { maxMarks: 2, criteria: [
                { text: 'Citation displays only author ✓', check: (answer) => answer.toLowerCase().includes('author') && !answer.toLowerCase().includes('year') },
                { text: 'Page number \'p. 433\' inserted ✓', check: (answer) => answer.toLowerCase().includes('433') }
            ]},
        '2_7': { maxMarks: 3, criteria: [
                { text: 'Picture background removed ✓', check: (answer) => answer.toLowerCase().includes('background') && answer.toLowerCase().includes('removed') },
                { text: 'Text wrapping set to \'Tight\'/\'Through\' ✓', check: (answer) => answer.toLowerCase().includes('tight') || answer.toLowerCase().includes('through') },
                { text: 'Picture moved to approximate correct position ✓', check: (answer) => answer.toLowerCase().includes('moved') && answer.toLowerCase().includes('position') }
            ]},
        '2_8': { maxMarks: 2, criteria: [
                { text: 'Cross reference to \'ForEver\' bookmark inserted ✓', check: (answer) => answer.toLowerCase().includes('forever') && answer.toLowerCase().includes('cross reference') },
                { text: 'Only page number displays ✓', check: (answer) => answer.toLowerCase().includes('page number') }
            ]},
        '3_1': { maxMarks: 2, criteria: [
                { text: 'Cells A1:I1 merged and centred ✓', check: (answer) => answer.toLowerCase().includes('merged') && answer.toLowerCase().includes('centred') },
                { text: 'Font size increased to 13 (All text) ✓', check: (answer) => answer.toLowerCase().includes('13') && answer.toLowerCase().includes('font size') }
            ]},
        '3_2': { maxMarks: 2, criteria: [
                { text: 'MONTH function ✓ (A3)', check: (answer) => answer.toLowerCase().includes('month') && answer.toLowerCase().includes('a3') },
                { text: 'Cell format changed to \'General\'/\'Text\' OR \'Number\' with zero decimals ✓', check: (answer) => answer.toLowerCase().includes('format') && (answer.toLowerCase().includes('general') || answer.toLowerCase().includes('text') || answer.toLowerCase().includes('number')) }
            ]},
        '3_3': { maxMarks: 3, criteria: [
                { text: 'AVERAGE function ✓', check: (answer) => answer.toLowerCase().includes('average') },
                { text: 'Range: H8:H19 ✓', check: (answer) => answer.toLowerCase().includes('h8:h19') },
                { text: 'Cell formatted to show no decimal places ✓', check: (answer) => answer.toLowerCase().includes('decimal') && answer.toLowerCase().includes('no') }
            ]},
        '3_4': { maxMarks: 3, criteria: [
                { text: 'Criteria range: B8:B19 ✓', check: (answer) => answer.toLowerCase().includes('b8:b19') },
                { text: 'Criteria: "Peak" ✓', check: (answer) => answer.toLowerCase().includes('peak') },
                { text: 'Sum range: G8:G19 ✓', check: (answer) => answer.toLowerCase().includes('g8:g19') }
            ]},
        '3_5': { maxMarks: 7, criteria: [
                { text: '=IF function in cell I8 ✓', check: (answer) => answer.toLowerCase().includes('if') && answer.toLowerCase().includes('i8') },
                { text: 'SUM function ✓', check: (answer) => answer.toLowerCase().includes('sum') },
                { text: 'Range (C8:G8) ✓', check: (answer) => answer.toLowerCase().includes('c8:g8') },
                { text: '=H8 ✓', check: (answer) => answer.toLowerCase().includes('h8') },
                { text: 'Correct output ("Correct") if true ✓', check: (answer) => answer.toLowerCase().includes('correct') },
                { text: 'Correct output ("Error") if false ✓', check: (answer) => answer.toLowerCase().includes('error') },
                { text: 'Formula copied to rest of cells ✓', check: (answer) => answer.toLowerCase().includes('copied') }
            ]},
        '3_6': { maxMarks: 3, criteria: [
                { text: 'Conditional formatting applied to range C8:G19 ✓', check: (answer) => answer.toLowerCase().includes('c8:g19') && answer.toLowerCase().includes('conditional') },
                { text: 'To check for below average ✓', check: (answer) => answer.toLowerCase().includes('below average') },
                { text: 'Filled with any colour ✓', check: (answer) => answer.toLowerCase().includes('colour') }
            ]},
        '3_7': { maxMarks: 7, criteria: [
                { text: 'Chart type for 2015 data changed ✓ to column ✓', check: (answer) => answer.toLowerCase().includes('2015') && answer.toLowerCase().includes('column') },
                { text: 'Legend series \'Year\' changed to \'2018\' ✓', check: (answer) => answer.toLowerCase().includes('2018') && answer.toLowerCase().includes('legend') },
                { text: 'Legend appears to the right of the chart ✓', check: (answer) => answer.toLowerCase().includes('right') && answer.toLowerCase().includes('legend') },
                { text: '1000 separator applied to vertical axis ✓', check: (answer) => answer.toLowerCase().includes('1000') && answer.toLowerCase().includes('separator') },
                { text: 'Markers inserted ✓ on 2019 data only ✓', check: (answer) => answer.toLowerCase().includes('2019') && answer.toLowerCase().includes('markers') }
            ]},
        '4_1': { maxMarks: 2, criteria: [
                { text: 'Page orientation set to landscape ✓', check: (answer) => answer.toLowerCase().includes('landscape') },
                { text: 'Row 2 set to repeat at top of each page ✓', check: (answer) => answer.toLowerCase().includes('row 2') && answer.toLowerCase().includes('repeat') }
            ]},
        '4_2': { maxMarks: 5, criteria: [
                { text: 'Determine the position of the @ ✓ in cell C3 with FIND/SEARCH function ✓', check: (answer) => (answer.toLowerCase().includes('find') || answer.toLowerCase().includes('search')) && answer.toLowerCase().includes('c3') },
                { text: 'Determine the length of string ✓ in cell C3 with LEN function', check: (answer) => answer.toLowerCase().includes('len') && answer.toLowerCase().includes('c3') },
                { text: 'Extract text AFTER ✓ the "@" with MID/RIGHT function ✓', check: (answer) => (answer.toLowerCase().includes('mid') || answer.toLowerCase().includes('right')) && answer.toLowerCase().includes('@') }
            ]},
        '4_3': { maxMarks: 5, criteria: [
                { text: 'VLOOKUP OR XLOOKUP function ✓', check: (answer) => answer.toLowerCase().includes('vlookup') || answer.toLowerCase().includes('xlookup') },
                { text: 'Lookup value: E4 ✓', check: (answer) => answer.toLowerCase().includes('e4') },
                { text: 'Table array: Code_Kode!A2:C43 ✓', check: (answer) => answer.toLowerCase().includes('code_kode') && answer.toLowerCase().includes('a2:c43') },
                { text: 'Column index number 2 ✓', check: (answer) => answer.toLowerCase().includes('2') },
                { text: 'Range lookup set to FALSE ✓', check: (answer) => answer.toLowerCase().includes('false') }
            ]},
        '4_4': { maxMarks: 3, criteria: [
                { text: 'DATEDIF function ✓', check: (answer) => answer.toLowerCase().includes('datedif') },
                { text: 'Start date: G5 ✓', check: (answer) => answer.toLowerCase().includes('g5') },
                { text: 'End date: TODAY() ✓', check: (answer) => answer.toLowerCase().includes('today') }
            ]},
        '4_5': { maxMarks: 4, criteria: [
                { text: 'Nested IF function ✓', check: (answer) => answer.toLowerCase().includes('if') && answer.toLowerCase().includes('nested') },
                { text: 'Condition 1: H14 < 60 ✓', check: (answer) => answer.toLowerCase().includes('h14') && answer.toLowerCase().includes('< 60') },
                { text: 'Condition 2: F14 = "Giza" ✓', check: (answer) => answer.toLowerCase().includes('f14') && answer.toLowerCase().includes('giza') },
                { text: 'Output "Yes" or "No" ✓', check: (answer) => answer.toLowerCase().includes('yes') && answer.toLowerCase().includes('no') }
            ]},
        '5_1_1': { maxMarks: 1, criteria: [
                { text: 'Indexed property of TSurname set to Yes (Duplicates OK) ✓', check: (answer) => answer.toLowerCase().includes('tsurname') && answer.toLowerCase().includes('duplicates') }
            ]},
        '5_1_2': { maxMarks: 1, criteria: [
                { text: 'TBirthDate format set to Short Date ✓', check: (answer) => answer.toLowerCase().includes('tbirthdate') && answer.toLowerCase().includes('short date') }
            ]},
        '5_1_3': { maxMarks: 1, criteria: [
                { text: 'TAge decimal places set to 0 ✓', check: (answer) => answer.toLowerCase().includes('tage') && answer.toLowerCase().includes('0') }
            ]},
        '5_1_4': { maxMarks: 2, criteria: [
                { text: 'Validation rule added for @ sign ✓', check: (answer) => answer.toLowerCase().includes('@') && answer.toLowerCase().includes('validation') },
                { text: 'Applied to EContact field ✓', check: (answer) => answer.toLowerCase().includes('econtact') }
            ]},
        '5_1_5': { maxMarks: 1, criteria: [
                { text: 'TType field size set to 50 ✓', check: (answer) => answer.toLowerCase().includes('ttype') && answer.toLowerCase().includes('50') }
            ]},
        '5_1_6': { maxMarks: 2, criteria: [
                { text: 'Input mask set to ".LLL" ✓', check: (answer) => answer.toLowerCase().includes('.lll') },
                { text: 'Full stop displays ✓', check: (answer) => answer.toLowerCase().includes('full stop') }
            ]},
        '5_1_7': { maxMarks: 1, criteria: [
                { text: 'PyramidCode content centred ✓', check: (answer) => answer.toLowerCase().includes('pyramidcode') && answer.toLowerCase().includes('centred') }
            ]},
        '5_1_8': { maxMarks: 2, criteria: [
                { text: 'Combo box created for PyramidSite ✓', check: (answer) => answer.toLowerCase().includes('pyramidsite') && answer.toLowerCase().includes('combo box') },
                { text: 'Based on tblSites ✓', check: (answer) => answer.toLowerCase().includes('tblsites') }
            ]},
        '5_1_9': { maxMarks: 2, criteria: [
                { text: '5Andrews picture inserted ✓', check: (answer) => answer.toLowerCase().includes('5andrews') && answer.toLowerCase().includes('inserted') },
                { text: 'For Andrews Peter ✓', check: (answer) => answer.toLowerCase().includes('andrews peter') }
            ]},
        '5_2': { maxMarks: 4, criteria: [
                { text: 'Fields reordered to TSurname, TName, EContact, TPhoto ✓', check: (answer) => answer.toLowerCase().includes('tsurname') && answer.toLowerCase().includes('tname') && answer.toLowerCase().includes('econtact') && answer.toLowerCase().includes('tphoto') },
                { text: 'Exam number in form header ✓', check: (answer) => answer.toLowerCase().includes('exam number') && answer.toLowerCase().includes('header') },
                { text: 'Date field added ✓', check: (answer) => answer.toLowerCase().includes('date') && answer.toLowerCase().includes('added') },
                { text: 'EContact shaded ✓', check: (answer) => answer.toLowerCase().includes('econtact') && answer.toLowerCase().includes('shaded') }
            ]},
        '5_3': { maxMarks: 2, criteria: [
                { text: 'Query modified to count Giza pyramids ✓', check: (answer) => answer.toLowerCase().includes('giza') && answer.toLowerCase().includes('count') },
                { text: 'Correct total displayed ✓', check: (answer) => answer.toLowerCase().includes('total') }
            ]},
        '5_4': { maxMarks: 5, criteria: [
                { text: 'Sorted by Surname then Name ✓', check: (answer) => answer.toLowerCase().includes('surname') && answer.toLowerCase().includes('name') },
                { text: 'Filter for birth < 1960 ✓', check: (answer) => answer.toLowerCase().includes('< 1960') },
                { text: 'Filter for domain org or edu ✓', check: (answer) => answer.toLowerCase().includes('org') && answer.toLowerCase().includes('edu') },
                { text: 'Payable field with 15% discount ✓', check: (answer) => answer.toLowerCase().includes('payable') && answer.toLowerCase().includes('15%') }
            ]},
        '5_5': { maxMarks: 5, criteria: [
                { text: 'Report based on tblVisitors ✓', check: (answer) => answer.toLowerCase().includes('tblvisitors') },
                { text: 'Fields Pyramid, Name, Surname, VisitorsCost ✓', check: (answer) => answer.toLowerCase().includes('pyramid') && answer.toLowerCase().includes('name') && answer.toLowerCase().includes('surname') && answer.toLowerCase().includes('visitorscost') },
                { text: 'Grouped by Pyramid ✓', check: (answer) => answer.toLowerCase().includes('grouped') },
                { text: 'Maximum amount calculated ✓', check: (answer) => answer.toLowerCase().includes('maximum') && answer.toLowerCase().includes('calculated') },
                { text: 'Currency format applied ✓', check: (answer) => answer.toLowerCase().includes('currency') }
            ]},
        '6_1_1': { maxMarks: 1, criteria: [
                { text: 'Text centered with <center> tags ✓', check: (answer) => answer.toLowerCase().includes('<center>') }
            ]},
        '6_1_2': { maxMarks: 2, criteria: [
                { text: 'Heading 1 style applied ✓', check: (answer) => answer.toLowerCase().includes('h1') },
                { text: 'Font set to Papyrus ✓', check: (answer) => answer.toLowerCase().includes('papyrus') }
            ]},
        '6_1_3': { maxMarks: 2, criteria: [
                { text: '6Group.jpg inserted ✓', check: (answer) => answer.toLowerCase().includes('6group.jpg') },
                { text: 'Below first paragraph ✓', check: (answer) => answer.toLowerCase().includes('below') && answer.toLowerCase().includes('paragraph') }
            ]},
        '6_1_4': { maxMarks: 2, criteria: [
                { text: 'Link modified to www.crystal.com ✓', check: (answer) => answer.toLowerCase().includes('www.crystal.com') },
                { text: 'Opens in browser ✓', check: (answer) => answer.toLowerCase().includes('open') }
            ]},
        '6_2': { maxMarks: 5, criteria: [
                { text: 'Font size 6 and bold applied ✓', check: (answer) => answer.toLowerCase().includes('font size="6"') && answer.toLowerCase().includes('bold') },
                { text: 'Horizontal rule inserted ✓', check: (answer) => answer.toLowerCase().includes('hr') },
                { text: 'Table with Burlywood bgcolor ✓', check: (answer) => answer.toLowerCase().includes('burlywood') },
                { text: 'Unordered list with circle type ✓', check: (answer) => answer.toLowerCase().includes('circle') },
                { text: 'Three list items added ✓', check: (answer) => answer.toLowerCase().includes('li') && answer.toLowerCase().includes('3') }
            ]},
        '7_1_1': { maxMarks: 2, criteria: [
                { text: 'Data copied from Chart A1:B6 to Data A2:F3 ✓', check: (answer) => answer.toLowerCase().includes('chart') && answer.toLowerCase().includes('data') && answer.toLowerCase().includes('a2:f3') },
                { text: 'Correct format maintained ✓', check: (answer) => answer.toLowerCase().includes('format') }
            ]},
        '7_1_2': { maxMarks: 5, criteria: [
                { text: 'Chart type changed to bar ✓', check: (answer) => answer.toLowerCase().includes('bar') },
                { text: 'Data labels added ✓', check: (answer) => answer.toLowerCase().includes('labels') },
                { text: 'Title updated ✓', check: (answer) => answer.toLowerCase().includes('title') },
                { text: 'Legend removed ✓', check: (answer) => answer.toLowerCase().includes('legend') && answer.toLowerCase().includes('removed') },
                { text: 'Gridlines added ✓', check: (answer) => answer.toLowerCase().includes('gridlines') }
            ]},
        '7_1_3': { maxMarks: 1, criteria: [
                { text: 'Chart saved as 7Chart.jpg ✓', check: (answer) => answer.toLowerCase().includes('7chart.jpg') }
            ]},
        '7_1_4': { maxMarks: 2, criteria: [
                { text: 'COUNTIF function used ✓', check: (answer) => answer.toLowerCase().includes('countif') },
                { text: 'Condition > R14 000 ✓', check: (answer) => answer.toLowerCase().includes('> r14 000') }
            ]},
        '7_1_5': { maxMarks: 3, criteria: [
                { text: 'Validation list corrected ✓', check: (answer) => answer.toLowerCase().includes('corrected') },
                { text: 'Rule updated ✓', check: (answer) => answer.toLowerCase().includes('updated') },
                { text: 'Invalid data circled ✓', check: (answer) => answer.toLowerCase().includes('circled') }
            ]},
        '7_2_1': { maxMarks: 4, criteria: [
                { text: '7Mail as data source ✓', check: (answer) => answer.toLowerCase().includes('7mail') },
                { text: 'Filtered for edu domain ✓', check: (answer) => answer.toLowerCase().includes('edu') },
                { text: 'Filtered for birth > 1960 ✓', check: (answer) => answer.toLowerCase().includes('> 1960') },
                { text: 'Name field merged ✓', check: (answer) => answer.toLowerCase().includes('name') && answer.toLowerCase().includes('merged') }
            ]},
        '7_2_2': { maxMarks: 1, criteria: [
                { text: 'Mail merge completed and saved as 7InvitationMerge ✓', check: (answer) => answer.toLowerCase().includes('7invitationmerge') }
            ]}
    };

    const handleChange = (id, value) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    const recordPerformance = async (scoreData) => {
        setRecording(true);
        setRecordError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/user/record`, {
                method: 'POST',
                headers: {
                    ...getAuthHeaders(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    paperId: paperId,
                    score: scoreData.score,
                    maxScore: scoreData.maxScore
                })
            });

            let errorMessage = 'Failed to record performance';

            if (!response.ok) {
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (jsonErr) {
                    // Fallback to text if JSON parsing fails
                    const errorText = await response.text();
                    errorMessage = errorText || errorMessage;
                }
                throw new Error(errorMessage);
            }

            // If response is ok, parse JSON if content exists
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                await response.json();
            } else {
                await response.text(); // Consume the response to avoid issues
            }

            console.log('Performance recorded successfully');
        } catch (err) {
            setRecordError(err.message);
            console.error('Recording error:', err);
        } finally {
            setRecording(false);
        }
    };

    const submitAnswers = () => {
        let newFeedbacks = {};
        let score = 0;
        let totalPossible = 0;

        for (let q in markingGuidelines) {
            const answer = answers[q] || '';
            let qScore = 0;
            let qFeedback = '';
            let correctAnswers = '';

            markingGuidelines[q].criteria.forEach(criterion => {
                if (criterion.check(answer)) {
                    qScore++;
                    qFeedback += criterion.text + '<br>';
                }
                correctAnswers += criterion.text.replace('✓', '') + '<br>';
            });

            newFeedbacks[q] = `Score: ${qScore}/${markingGuidelines[q].maxMarks}<br>Feedback: ${qFeedback}<br>Correct Answers: ${correctAnswers}`;
            score += qScore;
            totalPossible += markingGuidelines[q].maxMarks;
        }

        setFeedbacks(newFeedbacks);
        setTotalScore(score);
        setShowResults(true);

        // Record performance
        const scoreData = {
            score: score,
            maxScore: totalPossible
        };
        recordPerformance(scoreData);
    };

    const renderTextarea = (questionId) => {
        return (
            <textarea
                id={`answer_${questionId}`}
                value={answers[questionId] || ''}
                onChange={(e) => handleChange(questionId, e.target.value)}
                disabled={showResults}
                placeholder={`Enter your answer for ${questionId}`}
            ></textarea>
        );
    };

    const renderFeedback = (questionId) => {
        if (!showResults) return null;

        return (
            <div className="feedback" dangerouslySetInnerHTML={{ __html: feedbacks[questionId] }}></div>
        );
    };

    const handleRetry = () => {
        setAnswers({});
        setShowResults(false);
        setFeedbacks({});
        setTotalScore(0);
        setRecordError(null);
    };

    const handleExit = () => {
        navigate('/digitized-question-papers'); // Adjust path as needed
    };

    return (
        <div className="cat-exam">
            <h1>Computer Applications Technology P1 November 2020</h1>

            {/* Rest of the component remains the same */}

            <div className="submission-section">
                <button
                    className="submit-button"
                    onClick={submitAnswers}
                    disabled={showResults || recording}
                >
                    {recording ? 'Submitting...' : 'Submit Answers'}
                </button>

                {showResults && (
                    <div className="score-display">
                        <h3>Total Score: {totalScore}/180</h3>
                        {totalScore >= 90 ? (
                            <p className="pass">Excellent work! You've passed!</p>
                        ) : (
                            <p className="fail">Keep practicing! You'll improve!</p>
                        )}
                        {recordError && <p className="error">Error: {recordError}</p>}
                        <div className="action-buttons">
                            <button
                                className="retry-button"
                                onClick={handleRetry}
                            >
                                Retry Exam
                            </button>
                            <button
                                className="exit-button"
                                onClick={handleExit}
                            >
                                Exit
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Styles remain the same */}
        </div>
    );
};

export default CatP1Nov2020;