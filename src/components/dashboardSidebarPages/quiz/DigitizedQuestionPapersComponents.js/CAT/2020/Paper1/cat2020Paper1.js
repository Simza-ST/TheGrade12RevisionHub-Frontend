import React, { useState } from "react";
import { API_BASE_URL, getAuthHeaders } from '../../../../../../../utils/api';
import { useNavigate } from 'react-router-dom';

const CatP1Nov2020 = ({ paperId }) => {
    const navigate = useNavigate();
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
            const authHeaders = getAuthHeaders();
            if (!authHeaders.Authorization) {
                throw new Error('No authentication token found');
            }

            console.log('Sending score data:', scoreData);
            console.log('Auth Headers:', authHeaders);

            const response = await fetch(`${API_BASE_URL}/user/record`, {
                method: 'POST',
                headers: {
                    ...authHeaders,
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
                console.log('Response Status:', response.status);
                const errorText = await response.text();
                console.log('Response Text:', errorText);
                try {
                    const errorData = JSON.parse(errorText);
                    errorMessage = errorData.message || errorMessage;
                } catch {
                    errorMessage = errorText || errorMessage;
                }
                throw new Error(errorMessage);
            }

            const text = await response.text();
            let result = null;
            if (text) {
                try {
                    result = JSON.parse(text);
                } catch {
                    console.log('Response is not JSON:', text);
                }
            }
            console.log('Performance recorded:', result || 'success');

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

            <h2>INSTRUCTIONS AND INFORMATION</h2>
            <p>Owing to the nature of this practical examination, it is important to note that, even if you complete the examination early, you will NOT be permitted to leave the examination room until all the administrative functions associated with the examination have been finalised. During the examination, the normal rules regarding leaving the examination room apply.</p>
            <p>If you are working on the network, or the data files have been preloaded, you must follow the instructions provided by the invigilator/educator. Alternatively, the invigilator will give you a CD/DVD/flash drive containing all the files needed for the examination. If a CD/DVD/flash drive has been issued to you, you must write your examination number and centre number on the CD/DVD/flash drive.</p>
            <p>At the end of the examination, you must hand in the CD/DVD/flash drive given to you by the invigilator with ALL your answer files saved onto the CD/DVD/flash drive, OR you should make sure that ALL the answer files are saved on the network/computer as explained to you by the invigilator/educator.</p>
            <p>Make absolutely sure that all files can be read. Do NOT save unnecessary files/folders and do NOT hand in duplicate answer files/folders. Do NOT delete any original files that you did not work on.</p>
            <p>The information sheet that has been provided with the question paper MUST BE COMPLETED AFTER THE THREE-HOUR EXAMINATION SESSION. Hand it to the invigilator at the end of the examination.</p>
            <p>A copy of the master files will be available from the invigilator. Should there be any problems with a file, you may request another copy from the invigilator.</p>
            <p>This question paper consists of SEVEN questions. Answer ALL the questions.</p>
            <p>Read through each question before answering or solving the problem. Do NOT do more than is required by the question.</p>
            <p>Read the question carefully as accuracy will be taken into account.</p>
            <p>Ensure that you save each document using the file name given in the question paper. Save your work at regular intervals as a precaution against possible power failures.</p>
            <p>You may NOT use any resource material.</p>
            <p>Ensure that the regional settings are set to South Africa and that date and time settings, number settings and currency settings are correctly set.</p>
            <p>In all questions involving word processing, you should set the language to English (South Africa). The paper size is assumed to be A4 Portrait, unless instructed otherwise. Use centimetres as the unit of measurement.</p>
            <p>Formulae and/or functions must be used for ALL calculations in questions involving spreadsheets. Use absolute cell references only where necessary to ensure that formulae are correct when you copy them to other cells in a spreadsheet.</p>
            <p>NOTE: All formulae and/or functions should be inserted in such a manner that the correct results will still be obtained even if changes are made to the existing data.</p>
            <p>You may NOT use a word processing program such as Word to answer the HTML question.</p>
            <p>The examination folder/CD/DVD/flash drive that you receive with this question paper contains the files listed below. Ensure that you have all the files before you begin with this examination.</p>

            <table border="1">
                <tr><th>File Name</th><th>Type</th></tr>
                <tr><td>1Pyramids</td><td>Word processing file</td></tr>
                <tr><td>1Structure</td><td>Word processing file</td></tr>
                <tr><td>2Building</td><td>Word processing file</td></tr>
                <tr><td>3Tourists</td><td>Spreadsheet</td></tr>
                <tr><td>4Visitors</td><td>Spreadsheet</td></tr>
                <tr><td>5Andrews</td><td>Image</td></tr>
                <tr><td>5Egypt</td><td>Database</td></tr>
                <tr><td>6_1NatGeo</td><td>HTML file</td></tr>
                <tr><td>6_2Facts</td><td>HTML file</td></tr>
                <tr><td>6Group</td><td>Image</td></tr>
                <tr><td>7Invitation</td><td>Word processing file</td></tr>
                <tr><td>7Mail</td><td>Database</td></tr>
                <tr><td>7Years</td><td>Spreadsheet</td></tr>
            </table>

            <h2>SCENARIO</h2>
            <p>The pyramids at Giza, Egypt, is one of the Seven Wonders of the Ancient World.</p>
            <p>You are required to assist with documents about the pyramids.</p>

            <h2>QUESTION 1: WORD PROCESSING</h2>
            <p>Open the 1Pyramids word processing document that contains information about the pyramids and insert your examination number in the header or the footer.</p>

            <div className="question-section">
                <h3>1.1</h3>
                <p>Change the picture found at the top of the first page as follows:</p>
                <ul>
                    <li>Set the width of the picture to 21 cm.</li>
                    <li>Move the picture to the top edge of the page so that it extends over the top, left and right margins of the page, as shown below.</li>
                    <li>Remove all the empty paragraphs below the picture.</li>
                </ul>
                <img src="Screenshot 2025-08-25 093807.png" alt="Amazing facts about pyramids" />
                {renderTextarea('1_1')}
                {renderFeedback('1_1')}
            </div>

            <div className="question-section">
                <h3>1.2</h3>
                <p>Edit the heading 'Amazing Facts about the Great Pyramids of Giza' below the picture as follows:</p>
                <ul>
                    <li>Remove the strikethrough.</li>
                    <li>Expand the character spacing by 1.5 pt.</li>
                    <li>Centre the heading.</li>
                </ul>
                {renderTextarea('1_2')}
                {renderFeedback('1_2')}
            </div>

            <div className="question-section">
                <h3>1.3</h3>
                <p>Use the author and the date given in the text below the heading 'Amazing Facts about the Great Pyramids of Giza' to add a website source in the APA style to the document.</p>
                {renderTextarea('1_3')}
                {renderFeedback('1_3')}
            </div>

            <div className="question-section">
                <h3>1.4</h3>
                <p>Use a word processing feature to replace all the nonbreaking spaces in the document with normal spaces.</p>
                <p>Ensure that only ONE normal space appears in the place of a nonbreaking space.</p>
                {renderTextarea('1_4')}
                {renderFeedback('1_4')}
            </div>

            <div className="question-section">
                <h3>1.5</h3>
                <p>Change the indentation settings on the ruler of the paragraph that starts with 'One of …' as follows:</p>
                <ul>
                    <li>Set the first line indent to 2 cm.</li>
                    <li>Set the right indent to 14 cm.</li>
                </ul>
                {renderTextarea('1_5')}
                {renderFeedback('1_5')}
            </div>

            <div className="question-section">
                <h3>1.6</h3>
                <p>Change the line and paragraph spacing of the second paragraph that starts with 'The grand …' as follows:</p>
                <ul>
                    <li>Set the paragraph spacing after to 8 pt.</li>
                    <li>Set the line spacing to multiple at 1.4.</li>
                </ul>
                {renderTextarea('1_6')}
                {renderFeedback('1_6')}
            </div>

            <div className="question-section">
                <h3>1.7</h3>
                <p>Use a paragraph setting to ensure that the heading 'Insert here' will always appear as the first line of a new page.</p>
                {renderTextarea('1_7')}
                {renderFeedback('1_7')}
            </div>

            <div className="question-section">
                <h3>1.8</h3>
                <p>Find the heading 'Insert here'.</p>
                <p>Insert the 1Structure word processing document found in your examination folder below the heading so that it appears as an icon.</p>
                {renderTextarea('1_8')}
                {renderFeedback('1_8')}
            </div>

            <div className="question-section">
                <h3>1.9</h3>
                <p>Find the picture below the heading 'Dimensions' and do the following:</p>
                <ul>
                    <li>Format the picture so that the text below the picture does not display.</li>
                    <li>Change the caption 'Dimensions of the Great Pyramid' so that the caption label displays as 'Structure'.</li>
                    <li>Set the caption label numbering to the a,b,c, … numbering format.</li>
                </ul>
                {renderTextarea('1_9')}
                {renderFeedback('1_9')}
            </div>

            <div className="question-section">
                <h3>1.10</h3>
                <p>Insert a text watermark as follows:</p>
                <ul>
                    <li>Use the text 'Ancient'.</li>
                    <li>Display the watermark only on the first page.</li>
                </ul>
                {renderTextarea('1_10')}
                {renderFeedback('1_10')}
            </div>

            <p>Save and close the 1Pyramids document.</p>

            <h2>QUESTION 2: WORD PROCESSING</h2>
            <p>Open the 2Building word processing document, which contains information about the mysteries of the pyramids, and insert your examination number in the header or the footer.</p>

            <div className="question-section">
                <h3>2.1</h3>
                <p>Edit the cover page as follows:</p>
                <ul>
                    <li>Carry out the instruction in the Author form control.</li>
                    <li>Remove the Abstract form control.</li>
                </ul>
                {renderTextarea('2_1')}
                {renderFeedback('2_1')}
            </div>

            <div className="question-section">
                <h3>2.2</h3>
                <p>Remove page borders from the document.</p>
                {renderTextarea('2_2')}
                {renderFeedback('2_2')}
            </div>

            <div className="question-section">
                <h3>2.3</h3>
                <p>Use Styles and insert a table of contents on the second page as follows:</p>
                <ul>
                    <li>Change ALL headings formatted with the 'Heading 2' style to the 'Heading 1' style.</li>
                    <li>Insert a two-level table of contents by setting the 'Title' style as level 1 and the 'Heading 1' style as level 2.</li>
                </ul>
                {renderTextarea('2_3')}
                {renderFeedback('2_3')}
            </div>

            <div className="question-section">
                <h3>2.4</h3>
                <p>Insert automatic page numbering of your choice in the Page Margins position on the left side of the page.</p>
                <p>The page number after the Table of Contents page must start as 'Page 1'.</p>
                {renderTextarea('2_4')}
                {renderFeedback('2_4')}
            </div>

            <div className="question-section">
                <h3>2.5</h3>
                <p>Find the table below the heading 'The overall precision of the Great Pyramid is breathtaking' and convert the table to text to display as follows:</p>
                <img src="Screenshot 2025-08-25 093858.png" alt="info" />
                <p>Take note of the following:</p>
                <ul>
                    <li>The tab setting is set at 4 cm.</li>
                    <li>The indent settings</li>
                    <li>The alignment</li>
                    <li>The paragraph border</li>
                </ul>
                {renderTextarea('2_5')}
                {renderFeedback('2_5')}
            </div>

            <div className="question-section">
                <h3>2.6</h3>
                <p>Find the citation to the source 'Hancock' and edit the citation to display only the author's name and the page number as 433. The source must NOT be changed.</p>
                {renderTextarea('2_6')}
                {renderFeedback('2_6')}
            </div>

            <div className="question-section">
                <h3>2.7</h3>
                <p>Find the picture of the pyramids at the top of the last page and format the picture to display as shown below.</p>
                <p>NOTE: The text surrounding the outline of the pyramids may display differently.</p>
                <img src="Screenshot 2025-08-25 093917.png" alt="Robert Bauval reference" />
                {renderTextarea('2_7')}
                {renderFeedback('2_7')}
            </div>

            <div className="question-section">
                <h3>2.8</h3>
                <p>Insert a cross reference on the text 'Reference' to the bookmark 'ForEver'.</p>
                <p>Display only the page number.</p>
                {renderTextarea('2_8')}
                {renderFeedback('2_8')}
            </div>

            <p>Save and close the 2Building document.</p>

            <h2>QUESTION 3: SPREADSHEET</h2>
            <p>NOTE:</p>
            <ul>
                <li>Use formulae and/or functions for ALL calculations in the spreadsheet.</li>
                <li>Use absolute cell references ONLY where necessary to ensure that formulae are correct when you copy them to other cells in the same column (copy down).</li>
                <li>Insert formulae and/or functions in such a manner that the correct results will still be obtained even if changes are made to the existing data.</li>
                <li>Should you need to use building blocks, use the allocated space in the spreadsheet.</li>
            </ul>
            <p>Open the 3Tourists spreadsheet which contains data about the number of tourists to Egypt.</p>
            <p>Work in the Data worksheet.</p>

            <div className="question-section">
                <h3>3.1</h3>
                <p>Format row 1 as follows:</p>
                <ul>
                    <li>Merge and centre cells A1:I1.</li>
                    <li>Increase the font size of the text to 13.</li>
                </ul>
                {renderTextarea('3_1')}
                {renderFeedback('3_1')}
            </div>

            <div className="question-section">
                <h3>3.2</h3>
                <p>Insert an appropriate date function in cell C3 to extract the month from the date in cell A3. Ensure that the number of the month displays correctly.</p>
                {renderTextarea('3_2')}
                {renderFeedback('3_2')}
            </div>

            <div className="question-section">
                <h3>3.3</h3>
                <p>Enter a function in cell C4 to determine the average number of tourists who visited Egypt (column H) per month.</p>
                <p>Format the answer to NO decimal places.</p>
                {renderTextarea('3_3')}
                {renderFeedback('3_3')}
            </div>

            <div className="question-section">
                <h3>3.4</h3>
                <p>The peak tourist season in Egypt is from October to May and the off-peak season is from June to September.</p>
                <p>Use the SUMIF function in cell C5 to determine the total number of tourists who visited Egypt during the peak season (column B) in 2019 (column G).</p>
                {renderTextarea('3_4')}
                {renderFeedback('3_4')}
            </div>

            <div className="question-section">
                <h3>3.5</h3>
                <p>The totals in column H should calculate the total number of tourists per month from 2015 to 2019; however, this does not happen as expected for all the months.</p>
                <p>Insert a formula in cell I8 to display the text 'Correct' if the total in column H corresponds with the total number of tourists from 2015 to 2019, or else the text 'Error' must display.</p>
                <p>Copy the formula down to the other cells.</p>
                {renderTextarea('3_5')}
                {renderFeedback('3_5')}
            </div>

            <div className="question-section">
                <h3>3.6</h3>
                <p>Use a spreadsheet feature to apply a fill colour of your choice to the cell range C8:G19 when the number of tourists is lower than the average for the five years (2015 to 2019).</p>
                {renderTextarea('3_6')}
                {renderFeedback('3_6')}
            </div>

            <div className="question-section">
                <h3>3.7</h3>
                <p>Edit the chart to appear as follows:</p>
                <img src="Screenshot 2025-08-25 094004.png" alt="Tourist spreadsheet" />
                {renderTextarea('3_7')}
                {renderFeedback('3_7')}
            </div>

            <p>Save and close the 3Tourists spreadsheet.</p>

            <h2>QUESTION 4: SPREADSHEET</h2>
            <p>NOTE:</p>
            <ul>
                <li>Use formulae and/or functions for ALL calculations in the spreadsheet.</li>
                <li>Use absolute cell references ONLY where necessary to ensure that formulae are correct when you copy them to other cells in the same column (copy down).</li>
                <li>Insert formulae and/or functions in such a manner that the correct results will still be obtained even if changes are made to the existing data.</li>
                <li>Should you need to use building blocks, use the allocated space in the spreadsheet.</li>
            </ul>
            <p>Open the 4Visitors spreadsheet which contains data about visitors to the pyramids.</p>
            <p>Work in the Pyr_Pir worksheet.</p>

            <div className="question-section">
                <h3>4.1</h3>
                <p>Format the worksheet as follows:</p>
                <ul>
                    <li>Change the page orientation to landscape.</li>
                    <li>Ensure that row 2 will be repeated at the top of each page when you print the worksheet.</li>
                </ul>
                {renderTextarea('4_1')}
                {renderFeedback('4_1')}
            </div>

            <div className="question-section">
                <h3>4.2</h3>
                <p>Use a combination of text functions in cell D3 to extract ONLY the text after the '@' sign from the e-mail address in column C.</p>
                <p>Example: If the e-mail address is zulul@in.com, then ONLY in.com must display.</p>
                {renderTextarea('4_2')}
                {renderFeedback('4_2')}
            </div>

            <div className="question-section">
                <h3>4.3</h3>
                <p>Use an appropriate lookup function in cell F4 to determine the location of the pyramid in row 4 by using the code in column E and the lookup table in the Code_Kode worksheet.</p>
                <p>Ensure that this function will return the correct results if copied to the other cells in column F.</p>
                <p>NOTE: Do NOT copy the function to the other cells.</p>
                {renderTextarea('4_3')}
                {renderFeedback('4_3')}
            </div>

            <div className="question-section">
                <h3>4.4</h3>
                <p>Use a formula in cell H5 to determine the age of 'Gabriel Wilmar' in completed years by using the date of birth in column G and the current date.</p>
                {renderTextarea('4_4')}
                {renderFeedback('4_4')}
            </div>

            <div className="question-section">
                <h3>4.5</h3>
                <p>Insert a nested IF function (formula) in cell I14 to display 'Yes' if a visitor is under the age of 60 (column H) AND visited Giza (column F), or else 'No' must display.</p>
                {renderTextarea('4_5')}
                {renderFeedback('4_5')}
            </div>

            <p>Save and close the 4Visitors spreadsheet.</p>

            <h2>QUESTION 5: DATABASE</h2>
            <p>A database was created to store data about tourists and the pyramids they choose to visit.</p>
            <p>Open the 5Egypt database.</p>

            <div className="question-section">
                <h3>5.1.1</h3>
                <p>Change the tbl5_1 table as follows:</p>
                <p>Change the Indexed field property of the TSurname field to allow for duplicate values.</p>
                {renderTextarea('5_1_1')}
                {renderFeedback('5_1_1')}
            </div>

            <div className="question-section">
                <h3>5.1.2</h3>
                <p>Display the date in the TBirthDate field in the Short Date format.</p>
                {renderTextarea('5_1_2')}
                {renderFeedback('5_1_2')}
            </div>

            <div className="question-section">
                <h3>5.1.3</h3>
                <p>Change the TAge field properties to display the age without decimals.</p>
                {renderTextarea('5_1_3')}
                {renderFeedback('5_1_3')}
            </div>

            <div className="question-section">
                <h3>5.1.4</h3>
                <p>Set the field properties of the EContact field so that the user can only enter text that contains an '@' sign.</p>
                {renderTextarea('5_1_4')}
                {renderFeedback('5_1_4')}
            </div>

            <div className="question-section">
                <h3>5.1.5</h3>
                <p>Set the TType field to an appropriate field size.</p>
                {renderTextarea('5_1_5')}
                {renderFeedback('5_1_5')}
            </div>

            <div className="question-section">
                <h3>5.1.6</h3>
                <p>Create an input mask for the user to enter data in the following format:</p>
                <ul>
                    <li>Lowercase letters</li>
                    <li>The first character is a full stop (.), followed by</li>
                    <li>TWO compulsory letters, followed by</li>
                    <li>ONE optional letter</li>
                </ul>
                <p>NOTE: The full stop must display when a record is selected.</p>
                {renderTextarea('5_1_6')}
                {renderFeedback('5_1_6')}
            </div>

            <div className="question-section">
                <h3>5.1.7</h3>
                <p>Centre the content of the PyramidCode field.</p>
                {renderTextarea('5_1_7')}
                {renderFeedback('5_1_7')}
            </div>

            <div className="question-section">
                <h3>5.1.8</h3>
                <p>Create a combo box for the PyramidSite field by using the tblSites table.</p>
                {renderTextarea('5_1_8')}
                {renderFeedback('5_1_8')}
            </div>

            <div className="question-section">
                <h3>5.1.9</h3>
                <p>Switch to Datasheet View.</p>
                <p>Insert the 5Andrews picture found in your examination folder in the TPhoto field for the traveller 'Andrews Peter'.</p>
                {renderTextarea('5_1_9')}
                {renderFeedback('5_1_9')}
            </div>

            <p>Save and close the tbl5_1 table.</p>

            <div className="question-section">
                <h3>5.2</h3>
                <p>Open the form called frm5_2 in Design View and do the following:</p>
                <ul>
                    <li>Change the order of the fields to TSurname, TName, EContact, TPhoto.</li>
                    <li>Replace the heading in the form header with your examination number.</li>
                    <li>Insert the Date field in the form header.</li>
                    <li>Shade the EContact field to any light colour of your choice.</li>
                </ul>
                {renderTextarea('5_2')}
                {renderFeedback('5_2')}
            </div>

            <p>Save and close the frm5_2 form.</p>

            <div className="question-section">
                <h3>5.3</h3>
                <p>Open the qry5_3 query in Design View.</p>
                <p>Modify the query so that it displays the total number of pyramids at the Giza site.</p>
                {renderTextarea('5_3')}
                {renderFeedback('5_3')}
            </div>

            <p>Save and close the qry5_3 query.</p>

            <div className="question-section">
                <h3>5.4</h3>
                <p>Open the qry5_4 query in Design View and do the following:</p>
                <ul>
                    <li>Sort the query first according to the Surname field and then according to the Name field.</li>
                    <li>Display the records of those visitors who were born before 1960 and whose domain type is 'org' or 'edu'.</li>
                    <li>Tourists receive a 15% discount on the visitors' cost (VisitorsCost). Insert a calculated field called Payable to determine the amount payable after the discount has been deducted.</li>
                </ul>
                {renderTextarea('5_4')}
                {renderFeedback('5_4')}
            </div>

            <p>Save and close the qry5_4 query.</p>

            <div className="question-section">
                <h3>5.5</h3>
                <p>Create a report named rpt5_5, based on the tblVisitors table, to display the records as follows:</p>
                <img src="Screenshot 2025-08-25 094126.png" alt="records" />
                <p>Take note of the following:</p>
                <ul>
                    <li>The fields that display</li>
                    <li>Grouping</li>
                    <li>A calculation</li>
                    <li>The format of the VisitorsCost field</li>
                </ul>
                {renderTextarea('5_5')}
                {renderFeedback('5_5')}
            </div>

            <p>Save and close the rpt5_5 report.</p>

            <p>Save and close the 5Egypt database.</p>

            <h2>QUESTION 6: WEB DESIGN (HTML)</h2>
            <p>NOTE:</p>
            <ul>
                <li>An HTML tag sheet has been attached for reference.</li>
                <li>All files needed to complete this question are found in the examination folder.</li>
            </ul>
            <p>ONE mark will be allocated for the correct use of tags, triangular brackets and correct nesting for both the web pages.</p>

            <img src="Screenshot 2025-08-25 094310.png" alt="pyramids" />

            <div className="question-section">
                <h4>6.1.1</h4>
                <p>Insert HTML tags to centre the text that starts with 'PYRAMIDS …' and ends with '… other features'.</p>
                {renderTextarea('6_1_1')}
                {renderFeedback('6_1_1')}
            </div>

            <div className="question-section">
                <h4>6.1.2</h4>
                <p>Locate the heading 'PYRAMIDS' and format it as follows:</p>
                <ul>
                    <li>Apply the 'Heading 1' style to this heading.</li>
                    <li>Set the font of this heading to 'Papyrus'.</li>
                </ul>
                {renderTextarea('6_1_2')}
                {renderFeedback('6_1_2')}
            </div>

            <div className="question-section">
                <h4>6.1.3</h4>
                <p>Insert the image 6Group.jpg below the first paragraph that ends with the text '… complex mortuary temple'.</p>
                {renderTextarea('6_1_3')}
                {renderFeedback('6_1_3')}
            </div>

            <div className="question-section">
                <h4>6.1.4</h4>
                <p>An attempt was made to create a link on the heading 'The Future of the Pyramids' to the website 'www.crystal.com'.</p>
                <p>Modify the link so that the website 'www.crystal.com' will open in the web browser.</p>
                <p>NOTE: Do NOT click on the link.</p>
                {renderTextarea('6_1_4')}
                {renderFeedback('6_1_4')}
            </div>

            <p>Save and close the 6_1NatGeo web page.</p>

            <div className="question-section">
                <h3>6.2</h3>
                <p>Open the incomplete 6_2Facts web page in a web browser and also in a text/HTML editor (NOT a word processing program such as Word).</p>
                <p>HINT: Use tags given in the attached HTML tag sheet.</p>
                <p>Complete the web page to appear as follows:</p>
                <img src="Screenshot 2025-08-25 094342.png" alt="Egyptian pyramids facts" />
                {renderTextarea('6_2')}
                {renderFeedback('6_2')}
            </div>

            <p>Save and close the 6_2Facts web page.</p>

            <h2>QUESTION 7: GENERAL</h2>
            <p>References to pyramids are found in many other places.</p>

            <div className="question-section">
                <h4>7.1.1</h4>
                <p>Copy the data from cells A1:B6 in the Chart worksheet to cells A2:F3 in the Data worksheet.</p>
                <p>The copied data in the Data worksheet must appear as follows:</p>
                <img src="Screenshot 2025-08-25 100403.png" alt="table" />
                {renderTextarea('7_1_1')}
                {renderFeedback('7_1_1')}
            </div>

            <div className="question-section">
                <h4>7.1.2</h4>
                <p>Work in the Chart worksheet. Modify the chart to display as follows:</p>
                <img src="Screenshot 2025-08-25 094427.png" alt="tourist count" />
                {renderTextarea('7_1_2')}
                {renderFeedback('7_1_2')}
            </div>

            <div className="question-section">
                <h4>7.1.3</h4>
                <p>Save the pyramid chart as a 7Chart.jpg image file in your examination folder.</p>
                {renderTextarea('7_1_3')}
                {renderFeedback('7_1_3')}
            </div>

            <div className="question-section">
                <h4>7.1.4</h4>
                <p>A named range has already been created for the amounts in column F.</p>
                <p>Insert a function in cell J3 that uses the named range to determine how many of the amounts in the named range are greater than R14 000.</p>
                {renderTextarea('7_1_4')}
                {renderFeedback('7_1_4')}
            </div>

            <div className="question-section">
                <h4>7.1.5</h4>
                <p>A validation rule has been set on cells E2:E194 to obtain data from the list in cells M4:M9. However, there are errors and omissions in the validation list (cells M4:M9), which cause data in column E to be invalid.</p>
                <p>Correct the Validation List AND update the Validation Rule so that the data in column E becomes valid.</p>
                <p>HINT: To identify the invalid data in column E, use the Circle Invalid Data option from the Data Validation icon in the Data Tools group.</p>
                {renderTextarea('7_1_5')}
                {renderFeedback('7_1_5')}
            </div>

            <p>Save and close the 7Years spreadsheet.</p>

            <div className="question-section">
                <h4>7.2.1</h4>
                <ul>
                    <li>Use the 7Mail database as a data source for the 7Invitation mail merge document.</li>
                    <li>Edit the data source recipient list to include ONLY the data of those visitors who have an edu domain type AND who are born after 1960.</li>
                    <li>Replace the text &lt;&lt;Name&gt;&gt; with the merged field Name.</li>
                    <li>Add a field in the footer of the document to show the date and time when the document is opened.</li>
                </ul>
                {renderTextarea('7_2_1')}
                {renderFeedback('7_2_1')}
            </div>

            <div className="question-section">
                <h4>7.2.2</h4>
                <p>Complete the mail merge and save the merged document as 7InvitationMerge.</p>
                {renderTextarea('7_2_2')}
                {renderFeedback('7_2_2')}
            </div>

            <p>Save the 7Invitation document.</p>

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

            <style jsx>{`
                .cat-exam {
                    font-family: 'Arial', sans-serif;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0,0,0,0.1);
                }

                h1 {
                    text-align: center;
                }

                h2 {
                    color: navy;
                }

                h3 {
                    color: darkblue;
                }

                .question-section {
                    margin-bottom: 20px;
                }

                textarea {
                    width: 100%;
                    max-width: 600px;
                    height: 100px;
                    margin-top: 10px;
                    border: 2px solid #f5d792;
                    border-radius: 5px;
                    padding: 10px;
                    font-size: 12px;
                    font-family: Arial, sans-serif;
                }

                .feedback {
                    margin-top: 10px;
                    padding: 10px;
                    border: 1px solid #ccc;
                }

                .correct {
                    color: green;
                }

                .incorrect {
                    color: red;
                }

                .submit-button {
                    padding: 10px 20px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    cursor: pointer;
                }

                .submit-button:hover:not(:disabled) {
                    background-color: #45a049;
                }

                .submit-button:disabled {
                    background-color: #bbbbbb;
                    cursor: not-allowed;
                }

                .score-display {
                    margin-top: 20px;
                    padding: 20px;
                    border-radius: 8px;
                    background-color: #f9f9f9;
                    border: 1px solid #ddd;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    text-align: center;
                }

                .pass {
                    color: #4CAF50;
                    font-weight: bold;
                    margin-top: 10px;
                }

                .fail {
                    color: #f44336;
                    font-weight: bold;
                    margin-top: 10px;
                }

                .error {
                    color: #f44336;
                    margin-top: 10px;
                    font-weight: bold;
                }

                .action-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    margin-top: 20px;
                }

                .retry-button, .exit-button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-weight: bold;
                }

                .retry-button {
                    background-color: #4CAF50;
                    color: white;
                }

                .retry-button:hover {
                    background-color: #3e8e41;
                }

                .exit-button {
                    background-color: #f44336;
                    color: white;
                }

                .exit-button:hover {
                    background-color: #d32f2f;
                }

                table {
                    border-collapse: collapse;
                    width: 100%;
                    margin-bottom: 20px;
                }

                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }

                th {
                    background-color: #f2f2f2;
                }

                img {
                    max-width: 100%;
                    height: auto;
                }
            `}</style>
        </div>
    );
};

export default CatP1Nov2020;