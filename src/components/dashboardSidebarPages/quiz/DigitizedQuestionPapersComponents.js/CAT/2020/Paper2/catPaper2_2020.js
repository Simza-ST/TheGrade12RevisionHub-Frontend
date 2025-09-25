import React, { useState } from "react";
import { API_BASE_URL, getAuthHeaders } from '../../../../../../../utils/api';
import { useNavigate } from 'react-router-dom';

const CatP2Nov2020 = ({ paperId }) => {
    const navigate = useNavigate();
   /* const paperId = 'cat-p2-nov-2020';*/
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(null);
    const [correctness, setCorrectness] = useState({});
    const [revealedAnswers, setRevealedAnswers] = useState({});
    const [recording, setRecording] = useState(false);
    const [recordError, setRecordError] = useState(null);

    const correctAnswers = {
        'q1.1': 'D',
        'q1.2': 'A',
        'q1.3': 'C',
        'q1.4': 'D',
        'q1.5': 'B',
        'q1.6': 'A',
        'q1.7': 'B',
        'q1.8': 'C',
        'q1.9': 'A',
        'q1.10': 'C',
        'q2.1': 'P',
        'q2.2': 'Q',
        'q2.3': 'H',
        'q2.4': 'A',
        'q2.5': 'S',
        'q2.6': 'R',
        'q2.7': 'N',
        'q2.8': 'T',
        'q2.9': 'E',
        'q2.10': 'F',
        'q3.1': 'True',
        'q3.2': 'False',
        'q3.3': 'True',
        'q3.4': 'True',
        'q3.5': 'False'
    };

    const marksB = {
        'input-4.1.1': 1,
        'input-4.1.2': 2,
        'input-4.1.3': 2,
        'input-4.1.4': 1,
        'input-4.1.5': 2,
        'input-4.1.6': 2,
        'input-4.1.7': 2,
        'input-4.1.8': 1,
        'input-4.2': 2,
        'input-4.3': 1,
        'input-4.4': 2,
        'input-4.5': 2,
        'input-4.6': 2,
        'input-4.7': 1,
        'input-4.8': 2,
        'input-5.1': 1,
        'input-5.2': 2,
        'input-5.3': 2,
        'input-5.4': 1,
        'input-5.5': 2,
        'input-5.6': 2,
        'input-5.7': 1,
        'input-5.8.1': 1,
        'input-5.8.2': 1,
        'input-5.9': 1,
        'input-5.10': 1,
        'input-6.1': 2,
        'input-6.2': 1,
        'input-6.3.1': 2,
        'input-6.3.2': 1,
        'input-6.4': 2,
        'input-6.5': 2,
        'input-7.1': 1,
        'input-7.2': 2,
        'input-7.3': 2,
        'input-7.4': 2,
        'input-7.5': 1,
        'input-7.6': 2,
        'input-8.1': 1,
        'input-8.2': 1,
        'input-8.3': 1,
        'input-8.4': 1,
        'input-8.5': 1,
        'input-8.6': 1,
        'input-8.7': 1,
        'input-8.8': 1,
        'input-8.9': 2,
        'input-8.10': 2,
        'input-8.11': 1,
        'input-8.12': 2
    };

    const marksC = {
        'input-9.1.1': 2,
        'input-9.1.2': 1,
        'input-9.2': 1,
        'input-9.3.1': 1,
        'input-9.3.2': 2,
        'input-9.3.3': 2,
        'input-9.4': 4,
        'input-9.5.1': 2,
        'input-9.5.2': 2,
        'input-9.5.3': 2,
        'input-9.6.1': 2,
        'input-9.6.2': 2,
        'input-9.6.3': 2,
        'input-10.1.1': 2,
        'input-10.1.2': 1,
        'input-10.1.3': 1,
        'input-10.1.4': 1,
        'input-10.1.5': 2,
        'input-10.2.1': 2,
        'input-10.2.2': 2,
        'input-10.2.3': 2,
        'input-10.3.1': 2,
        'input-10.3.2': 2,
        'input-10.4': 2,
        'input-10.5': 2,
        'input-10.6.1': 2,
        'input-10.6.2': 1,
        'input-10.6.3': 1
    };

    const keywordsB = {
        'input-4.1.1': ['application', 'proprietary'],
        'input-4.1.2': ['quality', 'clarity', 'resolution', 'informed'],
        'input-4.1.3': ['older', 'download', 'smaller', 'price', 'weight', 'battery'],
        'input-4.1.4': ['performance', 'noise', 'power', 'weight', 'durable'],
        'input-4.1.5': ['variety', 'compatible', 'power', 'plug', 'play', 'transfer', 'hot', 'small'],
        'input-4.1.6': ['high-definition', 'sound', 'analogue', 'hdmi', 'displayport'],
        'input-4.1.7': ['webcam', 'microphone'],
        'input-4.1.8': ['ram'],
        'input-4.2': ['accessible', 'transport', 'queues', 'crime', 'privacy', 'contact'],
        'input-4.3': ['older', 'format', 'compatibility'],
        'input-4.4': ['upgrading', 'performance', 'steal', 'screen', 'mobility', 'cheaper'],
        'input-4.5': ['driver', 'hardware', 'software', 'diagnose', 'virus', 'power'],
        'input-4.6': ['restart', 'correct', 'offline', 'delete', 'clear', 'paper', 'jam', 'ink', 'cable', 'driver'],
        'input-4.7': ['defragmenter', 'optimize'],
        'input-4.8': ['schedule', 'updates', 'resource', 'off-peak', 'backups'],
        'input-5.1': ['internet', 'access'],
        'input-5.2': ['connect', 'internet', 'network', 'switch', 'server', 'security', 'firewall'],
        'input-5.3': ['speed', 'bandwidth', 'attenuation', 'stable', 'latency', 'newer', 'theft'],
        'input-5.4': ['line', 'speed', 'affected', 'prioritise'],
        'input-5.5': ['saved', 'version', 'accessed', 'storage', 'power', 'simultaneously'],
        'input-5.6': ['security', 'malware', 'privacy', 'performance'],
        'input-5.7': ['removed', 'maintenance', 'hacked', 'typed'],
        'input-5.8.1': ['wi-fi', 'hotspot'],
        'input-5.8.2': ['slow', 'limited', 'limitations'],
        'input-5.9': ['restrict', 'access'],
        'input-5.10': ['vpn', 'remote', 'teamviewer', 'anydesk', 'password'],
        'input-6.1': ['problem', 'guidance', 'information', 'scope', 'collecting', 'applications', 'audience'],
        'input-6.2': ['specific', 'refine', 'operators', 'advanced', 'account'],
        'input-6.3.1': ['countable', 'numeric', 'currencies', 'boolean', 'multiple', 'statistical', 'text'],
        'input-6.3.2': ['charts', 'graphs', 'formatting', 'pivot', 'maps'],
        'input-6.4': ['balanced', 'unreliable', 'incorrect', 'harmful', 'promote'],
        'input-6.5': ['extracted', 'criteria', 'calculations'],
        'input-7.1': ['rude', 'insulting', 'pictures', 'threats', 'inciting', 'unsolicited'],
        'input-7.2': ['breaks', 'speech', 'exercises', 'ergonomically', 'wrist', 'typing'],
        'input-7.3': ['unknown', 'personal', 'links', 'spam', 'public'],
        'input-7.4': ['bugs', 'hacked', 'weather', 'internet'],
        'input-7.5': ['completed', 'profit', 'scammed'],
        'input-7.6': ['limited', 'storage', 'features', 'privacy', 'negative'],
        'input-8.1': ['font', 'format'],
        'input-8.2': ['margin', 'tab', 'indentation', 'header', 'table'],
        'input-8.3': ['sources', 'citation'],
        'input-8.4': ['print', 'area', 'selection', 'preview'],
        'input-8.5': ['paste', 'link'],
        'input-8.6': ['narrow', 'hidden', 'zero'],
        'input-8.7': ['references', 'itself'],
        'input-8.8': ['hlookup', 'transpose', 'xlookup'],
        'input-8.9': ['capture', 'edit', 'formula', 'display', 'restrict'],
        'input-8.10': ['exist', 'spelling', 'criteria'],
        'input-8.11': ['source', 'download', 'inspect'],
        'input-8.12': ['highlights', 'indentation', 'comments', 'completion', 'colour', 'run', 'sheet', 'google']
    };

    const keywordsC = {
        'input-9.1.1': ['lumens', 'lamp', 'picture', 'aspect', 'remote', 'connection', 'inversion', 'refresh', 'zooming', 'throw', 'portability', 'speaker'],
        'input-9.1.2': ['graphics', 'intensive', 'built-in'],
        'input-9.2': ['trackpad', 'touch', 'battery'],
        'input-9.3.1': ['movie', 'media', 'video', 'player', 'browser'],
        'input-9.3.2': ['bandwidth', 'transferred', 'interruptions', 'buffering', 'quality', 'slower'],
        'input-9.3.3': ['expensive', 'data', 'signal', 'buffering'],
        'input-9.4': ['malware', 'antivirus', 'hacking', 'firewall', 'password', 'attacks', 'verify', 'phishing', 'personal', 'links'],
        'input-9.5.1': ['styles', 'headings'],
        'input-9.5.2': ['bookmark', 'page', 'website', 'email', 'document'],
        'input-9.5.3': ['customised', 'retype', 'edit', 'addresses', 'format'],
        'input-9.6.1': ['efficient', 'link', 'feedback', 'summarised', 'green'],
        'input-9.6.2': ['sheets', 'excel', 'numbers'],
        'input-9.6.3': ['separator', 'comma', 'countif', 'countifs', 'greater', 'range'],
        'input-10.1.1': ['satellites', 'calculate', 'triangulate', 'location', 'directions'],
        'input-10.1.2': ['distribution', 'mailing', 'list', 'contact', 'group'],
        'input-10.1.3': ['url', 'shortener'],
        'input-10.1.4': ['report', 'pivot', 'query'],
        'input-10.1.5': ['encryption', 'password', 'firewall', 'offline', 'access'],
        'input-10.2.1': ['distraction', 'addicted', 'risks', 'hacked', 'vulnerable', 'cyberbullying', 'familiar', 'inappropriate', 'emotional', 'privacy', 'negative'],
        'input-10.2.2': ['appropriate', 'unauthorised', 'disrepute', 'private', 'sms', 'permission', 'hours', 'punishment'],
        'input-10.2.3': ['search', 'profiles', 'friends', 'post', 'tags', 'likes', 'location'],
        'input-10.3.1': ['qr', 'bar', 'rfid', 'pin', 'nfc'],
        'input-10.3.2': ['orders', 'feedback', 'central', 'errors', 'handwriting', 'view', 'removed', 'reprinting'],
        'input-10.4': ['real', 'simulated', 'layers', 'head'],
        'input-10.5': ['appliances', 'devices', 'objects', 'connected', 'internet'],
        'input-10.6.1': ['cables', 'close', 'time'],
        'input-10.6.2': ['resolution', 'crop', 'format'],
        'input-10.6.3': ['flash', 'cd', 'dvd', 'hard', 'sd', 'handout']
    };

    const memos = {
        'q1.1': 'D cursor.',
        'q1.2': 'A copper cable.',
        'q1.3': 'C Fingerprint reader',
        'q1.4': 'D restricted user account',
        'q1.5': 'B ), "No")',
        'q1.6': 'A System Restore',
        'q1.7': 'B a loss of user privacy.',
        'q1.8': 'C interference.',
        'q1.9': 'A hyperlinks.',
        'q1.10': 'C Green',
        'q2.1': 'P default value',
        'q2.2': 'Q ransomware',
        'q2.3': 'H OCR',
        'q2.4': 'A VoIP',
        'q2.5': 'S #####',
        'q2.6': 'R LTE',
        'q2.7': 'N extension',
        'q2.8': 'T DPI',
        'q2.9': 'E botnet',
        'q2.10': 'F survey',
        'q3.1': 'True',
        'q3.2': 'False',
        'q3.3': 'True',
        'q3.4': 'True',
        'q3.5': 'False',
        'input-4.1.1': 'Application software (Accept Proprietary software) (1)',
        'input-4.1.2': '(1) Maximum image/video quality of the screen\n(2) Size of the screen does not necessarily indicate the clarity of the image/Large screens do not always have high resolutions\n(3) So that the purchaser can make informed decisions\n(Any two) (2)',
        'input-4.1.3': '(1) Optical drive is older technology and used less frequently for data storage (Backup)\n(2) Music, videos and software are available for download from the internet or shared via social media/flash drives\n(3) Computer can be made smaller/Not enough space to include an optical drive\n(4) To keep the selling price down – one less device\n(5) Can reduce the weight of the computer/Can be made lighter\n(6) Battery can last longer due to one less device/Reduce power requirements\n(Any two) (2)',
        'input-4.1.4': '(1) To improve the overall performance of the computer/Faster data access\n(2) Reduced noise levels\n(3) Reduced power requirements\n(4) Reduced weight improves portability\n(5) Less prone to physical damage/More durable\n(Any one) (1)',
        'input-4.1.5': '(1) Wide variety of devices can be connected via USB\n(2) Compatible with older devices\n(3) Power source for devices\n(4) Enables plug and play technologies/devices\n(5) Supports data transfer\n(6) USB devices can be swopped while the computer is switched on/Hot swopping can be done\n(7) Small size facilitates mobility of devices\n(Any two) (2)',
        'input-4.1.6': 'Does not support high-definition display /Does not support sound/Older analogue technology - not digital\nOther expected port: HDMI /DisplayPort (2)',
        'input-4.1.7': '(1) Webcam\n(2) Microphone (2)',
        'input-4.1.8': 'RAM (1)',
        'input-4.2': '(1) Accessible from any location with internet/Open 24/7\n(2) Save on transport/transaction costs\n(3) No queues/Saves time\n(4) Not exposed to physical crime\n(5) Most banking activities can be done without visiting a bank\n(6) Banking can be done in the privacy of your own environment\n(7) No need for human contact/COVID-19 compliant\n(Any two) (2)',
        'input-4.3': 'Save in an older file format/Use compatibility option (1)',
        'input-4.4': '(1) Design allows for easier upgrading/maintenance/adding more components\n(2) Better performance for graphics processing/gaming\n(3) More difficult to steal\n(4) Can accommodate a larger screen\n(5) No need for mobility\n(6) Cheaper than a similarly configured notebook\n(Any two) (2)',
        'input-4.5': '(1) A new driver/hardware/software/update that was installed is faulty\n(2) To diagnose/resolve/troubleshoot problems\n(3) Virus infection\n(4) After a power failure\n(Any two) (2)',
        'input-4.6': '(1) Restart the printer\n(2) Check that the correct printer was selected\n(3) Switch from offline to online mode\n(4) Delete jobs that may be stuck in the print queue\n(5) Clear printer memory\n(6) Add paper to the printer/Correct the paper size\n(7) Fix paper jam\n(8) Add ink/toner/Check printheads\n(9) Check for faulty printer cable/wireless connection\n(10) Re-install the printer driver\n(Any two) (2)',
        'input-4.7': 'Disk Defragmenter/Optimize Drive (Accept any reference to defragmenting or optimising) (1)',
        'input-4.8': '(1) Schedule/Set time for important programs to get regular updates\n(2) Some resource intensive programs can be scheduled to run during off-peak times\n(3) Schedule housekeeping tasks, e.g. backups, etc.\n(Any two) (2)',
        'input-5.1': 'To provide internet access (Accept Internet Service Provider) (1)',
        'input-5.2': '(1) Connects a computer to the internet/Connects two networks to each other (Accept reference to data)\n(2) Create a network/Has the functionality of a switch\n(3) Offers certain services of a server for network connectivity/It acts as a server\n(4) Provides security to the network, e.g. a firewall\n(Any two) (2)',
        'input-5.3': '(1) Higher speed/bandwidth\n(2) Less attenuation/Less signal loss over a long distance/Less prone to interference\n(3) Usually a more stable connection/Less prone to breakdown\n(4) Lower latency/Less delay/Lower ping\n(5) Newer technologies\n(6) Less prone to cable theft\n(Any two) (2)',
        'input-5.4': 'Line speed is usually not affected (ISP does not prioritise only certain services) (1)',
        'input-5.5': '(1) Changes are saved instantly/automatically/Documents are always updated\n(2) Online software is the latest version/updated\n(3) Documents can be accessed from any computer with internet access\n(4) No local storage is used/Saves hard drive space\n(5) Documents will not be lost if there is a power failure\n(6) Many users can work on a document simultaneously\n(Any two) (2)',
        'input-5.6': '(1) Could introduce security vulnerabilities/malware\n(2) Possible privacy issues\n(3) Could reduce system performance/Slow down the computer\n(Any two) (2)',
        'input-5.7': '(1) The page was removed from the website/Page does not exist\n(2) The website is undergoing maintenance/Website/Server is down\n(3) Website could have been hacked\n(4) URL was typed incorrectly\n(Any one) (1)',
        'input-5.8.1': 'Wi-Fi/Hotspot (1)',
        'input-5.8.2': '(1) Many people connected could slow down the line speed\n(2) Time/Data could be limited\n(3) Possible limitations on sites/services that are available\n(Any one) (1)',
        'input-5.9': 'To restrict unauthorised access to a network/computer (1)',
        'input-5.10': 'Use a VPN/Remote Desktop Connection/Team Viewer/AnyDesk (Accept a reference to using a password to log in to their profile) (1)',
        'input-6.1': '(1) Explain the problem/purpose of research\n(2) Gives guidance for the research\n(3) What information is required\n(4) To determine the scope of the project\n(5) How to go about collecting the information\n(6) How the various applications will be used in the research\n(7) To describe the target audience to present the information to\n(Any two) (2)',
        'input-6.2': '(1) Use specific words or phrases in the search\n(2) Refine the search string using the (+) or (-) operators to include or exclude specific words/phrases\n(3) Use advanced search options of the browser\n(4) Signing into a Google account may improve the search results tailored for you\n(Any one) (1)',
        'input-6.3.1': '(1) Countable results\n(2) Numeric values\n(3) Currencies/Financial values\n(4) Boolean/Yes or No values/Radio buttons/Check boxes\n(5) Multiple choice options\n(6) Statistical values\n(7) Single text values, e.g. names and surnames, etc.\n(Any two) (Accept any actual examples of types or formats, e.g. age, dates, etc.) (2)',
        'input-6.3.2': '(1) Charts/Graphs/Spark Lines\n(2) Conditional formatting\n(3) Pivot tables/Tables\n(4) Add-ins such as Power Maps (3D visualisations)\n(Any one) (1)',
        'input-6.4': '(1) The results would not give a balanced point of view\n(2) It could lead to unreliable/incorrect/harmful/unwise/discriminatory decisions/conclusions\n(3) Findings/recommendations may wrongly promote the interests of a specific group\n(Any two) (2)',
        'input-6.5': '(1) Specific information can be extracted based on certain criteria\n(2) Calculations can be done\n(2)',
        'input-7.1': '(1) Somebody makes rude or insulting posts about you\n(2) The posting of sensitive pictures/videos about you\n(3) Making threats against you or your loved ones\n(4) Inciting third parties to threaten or insult you\n(5) Repeated unsolicited contact/asking questions/making suggestions\n(Any one) (Note to marker: Accept any reasonable response that refers to online bullying, ridiculing or intimidation.) (1)',
        'input-7.2': '(1) Take regular breaks\n(2) Use \'Speech to Text\' software/Use predictive text\n(3) Do appropriate exercises to relieve tension\n(4) Use ergonomically designed keyboards/devices\n(5) Wrist support equipment\n(6) Practice good typing habits/posture that does not strain your wrists\n(Any two) (2)',
        'input-7.3': '(1) Do not respond to unknown e-mail\n(2) Do not give out your personal information via e-mail\n(3) Do not click on any links in unknown/suspicious e-mails\n(4) Use a spam filter/antivirus program\n(5) Do not do personal tasks on public computers, e.g. online banking\n(Any two) (2)',
        'input-7.4': '(1) Software bugs/corruptions could lead to the car not functioning safely\n(2) Cars can be hacked and remotely controlled\n(3) Weather conditions may impair the functioning of the sensors\n(4) No internet/GPS connection could result in inaccurate routes, poor traffic management, etc.\n(Any two) (Notes to marker: Accept any valid response related to problems associated with driverless/self-driving cars. Do not accept any responses relating to mechanical problems/failure.) (2)',
        'input-7.5': '(1) Project that you contributed towards might never be completed\n(2) Product/Business may not return a profit\n(3) Investors could be scammed\n(Any one) (1)',
        'input-7.6': '(1) Limited storage space/Service provider could decrease the storage space\n(2) Limited features/support/access to all services\n(3) Less privacy/Users\' personal details may be shared with third parties\n(Any two) (2)',
        'input-8.1': '(1) Change the font/Change symbols font to text\n(2) Use the Format Painter to replicate the font from where it is correct\n(Any one) (1)',
        'input-8.2': '(1) Margin settings (Accept page width/height)\n(2) Tab settings/Tab stop positions\n(3) Paragraph indentation\n(4) Header/footer margins\n(5) Table/cell/column width\n(Any one) (1)',
        'input-8.3': 'Use the Manage Sources option to insert the reference source/Add a reference source via the Insert Citation option (1)',
        'input-8.4': '(1) Use the Set Print Area option\n(2) Print selection in the print settings\n(3) Select print area in the Page Break Preview\n(Any one) (1)',
        'input-8.5': 'Use the (Paste) link option when pasting the graph/It has a connection/link to the original data/Use the second option on the Paste Special dialogue (1)',
        'input-8.6': 'Column C and D has been set/dragged to a narrow width\nColumn C and D are hidden/Column width set to zero\n(Any one) (1)',
        'input-8.7': 'When a formula references/indexes the cell that it is in/When a formula points to itself (1)',
        'input-8.8': '(1) Change the VLOOKUP to an HLOOKUP\n(2) Transpose the data in the Lookup Table\n(3) Use the XLOOKUP function with the correct parameters\n(Any one) (1)',
        'input-8.9': '(1) To capture/edit data (Accept specific examples)\n(2) To enter a formula/To display the result of a formula\n(3) To display the contents of a field\n(4) To restrict/limit/control what can be entered\n(Any two) (2)',
        'input-8.10': '(1) The Age field does not exist\n(2) Incorrect spelling of the field name, i.e. Age\n(3) Criteria in the query requires a parameter value\n(Any two) (2)',
        'input-8.11': '(1) Use the View Source feature of the web browser/Ctrl+U\n(2) Download the web page from the internet and then open in a text editor/web development tool\n(3) Use the Inspect option/F12\n(Any one) (1)',
        'input-8.12': '(1) Use the text editor (Notepad++) feature that highlights the opening and closing tags to ensure tags are closed where necessary\n(2) Use indentation for different segments\n(3) Use descriptive comments where necessary\n(4) Use the Auto-Completion feature of the HTML editor for tags\n(5) Use colour coding options for reserved words\n(6) Regularly run code in the browser to troubleshoot\n(7) Use the HTML tag sheet\n(8) Ask an expert or ‘google’ the problem\n(Any two) (2)',
        'input-9.1.1': '(1) Lumens/Brightness\n(2) Lamp type\n(3) Lamp life\n(4) Picture quality, e.g. Contrast ratio/Colour depth, etc.\n(5) Aspect ratio\n(6) Remote control\n(7) Connection options/Compatibility with existing devices\n(8) Image inversion/rotation/keystone\n(9) Refresh rates/Response time\n(10) Zooming options/Lens adjustment\n(11) Short or long throw\n(12) Portability/Physical size\n(13) Built-in speaker/microphone, etc.\n(Any two) (2)',
        'input-9.1.2': 'Showing movies is not graphics intensive/Built-in graphics is sufficient for playing video (1)',
        'input-9.2': '(1) Notebook already has a trackpad/touch pad/pointing stick/trackpoint (Accept descriptions)\n(2) Notebook has a touch screen\n(3) External mouse may drain the battery faster\n(Any one) (1)',
        'input-9.3.1': 'Movie/Media/Video player/Browser (Note to marker: Accept any valid example of media players, e.g. VLC media player, iTunes, WinAmp, MediaMonkey, foobar2000, AIMP, etc.) (1)',
        'input-9.3.2': 'The higher the bandwidth the more data can be transferred faster/No interruptions/buffering\nOR\nMovie will be streamed in variable quality/Dependent on bandwidth\nOR\nThe lower the bandwidth the slower the data will be transferred/The movie may not stream continuously/may experience buffering (2)',
        'input-9.3.3': '(1) Expensive because of high data usage/Data limit (Cap) may be depleted very quickly which will increase the data cost\n(2) Weak signal strength could cause buffering of the audio/video\n(2)',
        'input-9.4': 'INTERNET RISK | PREVENTION\n(1) Malware | (1) Install antivirus software, keep antivirus software updated\n(2) Unauthorised access/Hacking | (2) Use a firewall/Activate the firewall/Use a strong password\n(3) Cyber attacks/Vulnerabilities | (3) Verify sender, check safety of websites, change passwords regularly, keep system updated\n(4) Phishing/Social Engineering | (4) Do not give out personal details, do not click on suspicious links\n(Any two internet risks) (Any two ways of preventing attacks) (Notes to marker: Accept only one example of each risk. Preventative measure must be related to the risk. Accept any valid prevention that is well explained) (4)',
        'input-9.5.1': 'Apply appropriate styles to (different levels of) headings (2)',
        'input-9.5.2': '(1) Hyperlink can point to another place on the same page/bookmark\n(2) Hyperlink can point to another page/website/e-mail address/local document (Accept any two locations inside/outside the report)\n(2)',
        'input-9.5.3': '(1) Reports can be automatically customised for many individuals\n(2) You do not have to retype the report to every recipient/Saves time\n(3) Edit recipient list\n(4) No need to type in the addresses of individuals as it will be automatically extracted from a spreadsheet/database\n(5) Format/Design of the merged document can be done at once\n(Any two) (2)',
        'input-9.6.1': '(1) Efficient way to reach a target audience\n(2) No link needs to be sent\n(3) Feedback can be received quickly/within a short time frame\n(4) Feedback can be summarised electronically\n(5) Supports green computing, e.g. saves paper/ink\n(Any two) (2)',
        'input-9.6.2': '(1) (Google) Sheets\n(2) (Microsoft) Excel in Office 365\n(3) Numbers, etc. (Accept any other valid web-based spreadsheet program)\n(Any two) (2)',
        'input-9.6.3': '(1) Missing separator/comma/semi-colon/delimiter\n(2) COUNTIF cannot check if all three ratings in each row are greater than 7/Incorrect function/COUNTIFS not used\n(3) The condition should be greater than 7 only\n(4) Range/s should be a single row at a time\n(Any two) (2)',
        'input-10.1.1': 'GPS is a system that receives information from satellites to calculate/triangulate an exact geographical location/provide directions (2)',
        'input-10.1.2': 'Distribution/Address/Mailing list/Contact/Hangouts/Google/Yahoo group (1)',
        'input-10.1.3': 'URL shortener (1)',
        'input-10.1.4': 'Report (Accept Pivot/Totals query) (1)',
        'input-10.1.5': '(1) Use encryption/password on the file/computer\n(2) Use a firewall on the computer\n(3) Keep the computer offline\n(4) Prevent access to the computer room\n(Any two) (2)',
        'input-10.2.1': '(1) Social media can be a distraction/can waste time\n(2) People may become addicted to social media\n(3) People may be afraid of the risks, e.g. being hacked\n(4) People may feel vulnerable because of cyberbullying/cyberstalking/Not being sure of identity of others that are online\n(5) People may not be familiar/do not know how to use social media\n(6) Social media may promote inappropriate relationships\n(7) May cause emotional distress\n(8) People want to maintain their privacy\n(9) Employers/Family/Friends may view certain past pictures or messages negatively\n(Any two) (2)',
        'input-10.2.2': '(1) Post only appropriate school-related information/Do not post unauthorised school related information\n(2) Do not post information that would bring the school into disrepute/Do not post rude comments on social media\n(3) Do not post private information that could harm/hurt others\n(4) Do not use SMS or incorrect language (slang)\n(5) Obtain permission before posting/tagging pictures of people\n(6) No social media during school hours/No cyberslacking\n(7) Punishment/Repercussions if guidelines are ignored\n(Any two) (2)',
        'input-10.2.3': '(1) Use a search engine to search for names of people\n(2) Search/Check their user profiles on social media\n(3) Contact with friends of people you are searching for/Post on social media for anyone who may know the people\n(4) Check for tags/likes/location information on photos/postings\n(Any two) (2)',
        'input-10.3.1': '(1) QR/Bar codes\n(2) RFID tags\n(3) Enter PIN on keypad\n(4) NFC on smartphones\n(Any two) (2)',
        'input-10.3.2': '(1) Orders and feedback are sent immediately to/from a central system\n(2) Fewer wrong orders/Fewer errors/No illegible handwriting\n(3) Tablet view can be adjusted for people with low vision\n(4) When food items are no longer available, they can automatically be removed from the electronic menu/No reprinting needed\n(Any two) (2)',
        'input-10.4': 'Augmented reality (AR) | Virtual reality (VR)\n(1) AR is the real world in real time | VR is a simulated world\n(2) Layers added to real world/Enhanced reality using technology/Does not require head gear | Extra layers not required/Technology used to create simulation/Requires head gear\n(Note: Marks cannot be allocated for two answers in the same row) (2)',
        'input-10.5': 'All sorts of appliances/devices/objects connected to one another via the internet (2)',
        'input-10.6.1': '(1) No clutter of cables/Easier to manage\n(2) You do not have to be very close to the computer\n(3) Less time consuming as multiple guests will be able to transfer data at the same time\n(Any two) (2)',
        'input-10.6.2': '(1) Reduce resolution of the photographs\n(2) Crop/Snip the pictures\n(3) Change the picture format/Compress picture\n(Any one) (1)',
        'input-10.6.3': 'Flash drive/CD or DVD/External hard drive/SD Card/Handout (1)'
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
                    score: scoreData.total,
                    maxScore: 150
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
        let scoreA = 0;
        let correctnessTemp = {};

        for (let key in correctAnswers) {
            const userAnswer = answers[key];
            if (userAnswer === correctAnswers[key]) {
                scoreA++;
            }
            correctnessTemp[key] = userAnswer === correctAnswers[key];
        }

        let scoreB = 0;
        for (let id in keywordsB) {
            const userAnswer = (answers[id] || '').trim().toLowerCase();
            let matched = 0;
            keywordsB[id].forEach(kw => {
                if (userAnswer.includes(kw.toLowerCase())) matched++;
            });
            scoreB += Math.min(matched, marksB[id]);
            correctnessTemp[id] = matched > 0;
        }

        let scoreC = 0;
        for (let id in keywordsC) {
            const userAnswer = (answers[id] || '').trim().toLowerCase();
            let matched = 0;
            keywordsC[id].forEach(kw => {
                if (userAnswer.includes(kw.toLowerCase())) matched++;
            });
            scoreC += Math.min(matched, marksC[id]);
            correctnessTemp[id] = matched > 0;
        }

        const total = scoreA + scoreB + scoreC;
        const percentage = Math.round((total / 150) * 100);

        setScore({ a: scoreA, b: scoreB, c: scoreC, total, percentage });
        setCorrectness(correctnessTemp);
        setShowResults(true);

        // Record performance
        const scoreData = { total, maxScore: 150 };
        recordPerformance(scoreData);
    };

    const handleRetry = () => {
        setAnswers({});
        setShowResults(false);
        setScore(null);
        setCorrectness({});
        setRevealedAnswers({});
        setRecordError(null);
    };

    const handleExit = () => {
        navigate('/digitized-question-papers');
    };

    const showAnswer = (questionId) => {
        setRevealedAnswers(prev => ({
            ...prev,
            [questionId]: memos[questionId] || "No memo available"
        }));
    };

    const renderRadioGroup = (questionId, options) => (
        <div className="options">
            {options.map(({ value, label }) => (
                <p key={value}>
                    <input
                        type="radio"
                        value={value}
                        checked={answers[questionId] === value}
                        onChange={() => handleChange(questionId, value)}
                        disabled={showResults}
                    /> {label}
                </p>
            ))}
        </div>
    );

    const renderSelect = (questionId, options) => (
        <select
            value={answers[questionId] || ''}
            onChange={(e) => handleChange(questionId, e.target.value)}
            disabled={showResults}
        >
            <option value="">Select</option>
            {options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
    );

    const renderTextarea = (questionId, isWide = true) => {
        const value = answers[questionId] || '';
        const isCorrect = showResults && correctness[questionId];
        const isIncorrect = showResults && value && !correctness[questionId];

        return (
            <div className="input-container">
                <textarea
                    className={`${isWide ? 'wide-input' : ''} 
                        ${isCorrect ? 'correct' : ''} 
                        ${isIncorrect ? 'incorrect' : ''}`}
                    value={value}
                    onChange={(e) => handleChange(questionId, e.target.value)}
                    disabled={showResults}
                />
                {showResults && <span className="status">{correctness[questionId] ? 'Correct' : 'Incorrect'}</span>}
            </div>
        );
    };

    const renderFeedback = (questionId) => {
        if (!showResults) return null;

        return (
            <div>
                <p style={{ color: correctness[questionId] ? 'green' : 'red' }}>
                    Your answer: {answers[questionId] || 'None'} - {correctness[questionId] ? 'Correct' : 'Incorrect'}
                </p>
            </div>
        );
    };

    const renderAnswerSection = (questionId) => {
        if (!showResults) return null;

        const revealed = revealedAnswers[questionId];

        return (
            <div>
                <div className="solution-buttons">
                    <button
                        className="solution-button"
                        onClick={() => showAnswer(questionId)}
                    >
                        View Answer
                    </button>
                </div>
                {revealed && (
                    <div className="revealed-answer">
                        <strong>Correct Answer:</strong> <pre>{revealed}</pre>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="cat-exam">
            <h1>Computer Applications Technology P2 - November 2020</h1>
            <h2>Interactive Quiz</h2>
            <p>This interactive quiz allows you to answer the questions and check your answers immediately for Section A. For Sections B and C, you can read the questions and click to reveal the memo answers for self-checking.</p>

            <h2>SECTION A</h2>
            <h3>QUESTION 1: MULTIPLE-CHOICE QUESTIONS</h3>

            <div className="question" id="question-q1.1">
                <p><strong>1.1</strong> A blinking vertical bar that shows the position of the text being typed in a text editor is called a …</p>
                {renderRadioGroup('q1.1', [
                    { value: 'A', label: 'A highlight.' },
                    { value: 'B', label: 'B border.' },
                    { value: 'C', label: 'C symbol.' },
                    { value: 'D', label: 'D cursor.' }
                ])}
                {renderFeedback('q1.1')}
                {renderAnswerSection('q1.1')}
            </div>

            <div className="question" id="question-q1.2">
                <p><strong>1.2</strong> The communication medium commonly used for an ADSL internet connection is …</p>
                {renderRadioGroup('q1.2', [
                    { value: 'A', label: 'A copper cable.' },
                    { value: 'B', label: 'B radio waves.' },
                    { value: 'C', label: 'C fibre-optic cable.' },
                    { value: 'D', label: 'D sound waves.' }
                ])}
                {renderFeedback('q1.2')}
                {renderAnswerSection('q1.2')}
            </div>

            <div className="question" id="question-q1.3">
                <p><strong>1.3</strong> Which ONE of the following is closely related to biometric security?</p>
                {renderRadioGroup('q1.3', [
                    { value: 'A', label: 'A Firewall' },
                    { value: 'B', label: 'B Password' },
                    { value: 'C', label: 'C Fingerprint reader' },
                    { value: 'D', label: 'D Encryption key' }
                ])}
                {renderFeedback('q1.3')}
                {renderAnswerSection('q1.3')}
            </div>

            <div className="question" id="question-q1.4">
                <p><strong>1.4</strong> A … is a possible reason why a program will not install.</p>
                {renderRadioGroup('q1.4', [
                    { value: 'A', label: 'A slow download speed' },
                    { value: 'B', label: 'B slow start-up process' },
                    { value: 'C', label: 'C change of regional settings' },
                    { value: 'D', label: 'D restricted user account' }
                ])}
                {renderFeedback('q1.4')}
                {renderAnswerSection('q1.4')}
            </div>

            <div className="question" id="question-q1.5">
                <p><strong>1.5</strong> Study the following incomplete nested IF statement: =IF(A1=1, IF(B1=4, "Yes", "No" Which ONE of the following options would complete the statement to display either 'Yes' or 'No' depending on the conditions below?  Yes – if the value in cell A1=1 AND the value in cell B1=4, OR  No – if either one of these conditions are not met</p>
                {renderRadioGroup('q1.5', [
                    { value: 'A', label: 'A ))' },
                    { value: 'B', label: 'B ), "No")' },
                    { value: 'C', label: 'C ), "No"))' },
                    { value: 'D', label: 'D , ""))' }
                ])}
                {renderFeedback('q1.5')}
                {renderAnswerSection('q1.5')}
            </div>

            <div className="question" id="question-q1.6">
                <p><strong>1.6</strong> Which ONE of the following would you use to solve the problem when your computer randomly hangs after a driver update?</p>
                {renderRadioGroup('q1.6', [
                    { value: 'A', label: 'A System Restore' },
                    { value: 'B', label: 'B Disk Cleanup' },
                    { value: 'C', label: 'C System Backup' },
                    { value: 'D', label: 'D Task Scheduler' }
                ])}
                {renderFeedback('q1.6')}
                {renderAnswerSection('q1.6')}
            </div>

            <div className="question" id="question-q1.7">
                <p><strong>1.7</strong> One of the possible constraints (limitations) of big data is …</p>
                {renderRadioGroup('q1.7', [
                    { value: 'A', label: 'A a loss of revenue.' },
                    { value: 'B', label: 'B a loss of user privacy.' },
                    { value: 'C', label: 'C a malware infection.' },
                    { value: 'D', label: 'D available bandwidth.' }
                ])}
                {renderFeedback('q1.7')}
                {renderAnswerSection('q1.7')}
            </div>

            <div className="question" id="question-q1.8">
                <p><strong>1.8</strong> A wireless router could be damaged if it was placed or used next to a microwave oven because of …</p>
                {renderRadioGroup('q1.8', [
                    { value: 'A', label: 'A the heat.' },
                    { value: 'B', label: 'B vibration.' },
                    { value: 'C', label: 'C interference.' },
                    { value: 'D', label: 'D a fire hazard.' }
                ])}
                {renderFeedback('q1.8')}
                {renderAnswerSection('q1.8')}
            </div>

            <div className="question" id="question-q1.9">
                <p><strong>1.9</strong> A bookmark is a feature of a word processor that uses …</p>
                {renderRadioGroup('q1.9', [
                    { value: 'A', label: 'A hyperlinks.' },
                    { value: 'B', label: 'B styles.' },
                    { value: 'C', label: 'C tables.' },
                    { value: 'D', label: 'D sections.' }
                ])}
                {renderFeedback('q1.9')}
                {renderAnswerSection('q1.9')}
            </div>

            <div className="question" id="question-q1.10">
                <p><strong>1.10</strong> Study the following HTML code carefully: <code>&lt;font color="green"&gt;First website&lt;/font&gt;</code> Assume that all the code prior to the line above is correct. Which ONE of the following font colours will be used when displaying the text 'First website' in a browser?</p>
                {renderRadioGroup('q1.10', [
                    { value: 'A', label: 'A Red' },
                    { value: 'B', label: 'B Black' },
                    { value: 'C', label: 'C Green' },
                    { value: 'D', label: 'D Orange' }
                ])}
                {renderFeedback('q1.10')}
                {renderAnswerSection('q1.10')}
            </div>

            <h3>QUESTION 2: MATCHING ITEMS</h3>
            <p>Choose a term/concept from COLUMN B that matches a description in COLUMN A. Write only the letter (A–T) next to the question numbers (2.1 to 2.10) in the ANSWER BOOK, e.g. 2.11 U.</p>
            <table border="1">
                <tr>
                    <th>COLUMN A</th>
                    <th>COLUMN B</th>
                </tr>
                <tr><td>2.1 A field property that automatically inserts a value in a field for each new record in a database table</td>
                    <td>A VoIP<br/>B #NULL<br/>C zombie<br/>D spyware<br/>E botnet<br/>F survey<br/>G ppm<br/>H OCR<br/>I
                        attribute<br/>J interview<br/>K validation rule<br/>L FTP<br/>M Edge<br/>N extension<br/>O
                        HCI<br/>P default value<br/>Q ransomware<br/>R LTE<br/>S #####<br/>T DPI<br/></td></tr>
                <tr><td>2.2 Malware that is often associated with Bitcoin</td><td></td></tr>
                <tr><td>2.3 A technology that is used to produce an editable soft copy from a scanned document</td><td></td></tr>
                <tr><td>2.4 A protocol that is used to enable telephone calls using the internet</td><td></td></tr>
                <tr><td>2.5 A spreadsheet error message that appears when the value in a cell is longer than the cell width</td><td></td></tr>
                <tr><td>2.6 A cellular technology that provides high data transmission speeds</td><td></td></tr>
                <tr><td>2.7 A set of characters added to the end of a file name that identifies the type of file</td><td></td></tr>
                <tr><td>2.8 A unit of measurement for printing resolution</td><td></td></tr>
                <tr><td>2.9 A group of infected computers that can be controlled remotely to attack other computers/networks</td><td></td></tr>
                <tr><td>2.10 A set of questions for research purposes that will be answered electronically by a large group of people</td><td></td></tr>
            </table>

            <div className="question" id="question-q2.1">
                <p><strong>2.1</strong></p>
                {renderSelect('q2.1', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'])}
                {renderFeedback('q2.1')}
                {renderAnswerSection('q2.1')}
            </div>

            <div className="question" id="question-q2.2">
                <p><strong>2.2</strong></p>
                {renderSelect('q2.2', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'])}
                {renderFeedback('q2.2')}
                {renderAnswerSection('q2.2')}
            </div>

            <div className="question" id="question-q2.3">
                <p><strong>2.3</strong></p>
                {renderSelect('q2.3', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'])}
                {renderFeedback('q2.3')}
                {renderAnswerSection('q2.3')}
            </div>

            <div className="question" id="question-q2.4">
                <p><strong>2.4</strong></p>
                {renderSelect('q2.4', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'])}
                {renderFeedback('q2.4')}
                {renderAnswerSection('q2.4')}
            </div>

            <div className="question" id="question-q2.5">
                <p><strong>2.5</strong></p>
                {renderSelect('q2.5', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'])}
                {renderFeedback('q2.5')}
                {renderAnswerSection('q2.5')}
            </div>

            <div className="question" id="question-q2.6">
                <p><strong>2.6</strong></p>
                {renderSelect('q2.6', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'])}
                {renderFeedback('q2.6')}
                {renderAnswerSection('q2.6')}
            </div>

            <div className="question" id="question-q2.7">
                <p><strong>2.7</strong></p>
                {renderSelect('q2.7', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'])}
                {renderFeedback('q2.7')}
                {renderAnswerSection('q2.7')}
            </div>

            <div className="question" id="question-q2.8">
                <p><strong>2.8</strong></p>
                {renderSelect('q2.8', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'])}
                {renderFeedback('q2.8')}
                {renderAnswerSection('q2.8')}
            </div>

            <div className="question" id="question-q2.9">
                <p><strong>2.9</strong></p>
                {renderSelect('q2.9', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'])}
                {renderFeedback('q2.9')}
                {renderAnswerSection('q2.9')}
            </div>

            <div className="question" id="question-q2.10">
                <p><strong>2.10</strong></p>
                {renderSelect('q2.10', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'])}
                {renderFeedback('q2.10')}
                {renderAnswerSection('q2.10')}
            </div>

            <h3>QUESTION 3: TRUE/FALSE ITEMS</h3>

            <div className="question" id="question-q3.1">
                <p><strong>3.1</strong> Grid computing is a system where resources of many computers in different locations are used at the same time to complete a single task.</p>
                {renderRadioGroup('q3.1', [
                    { value: 'True', label: 'True' },
                    { value: 'False', label: 'False' }
                ])}
                {renderFeedback('q3.1')}
                {renderAnswerSection('q3.1')}
            </div>

            <div className="question" id="question-q3.2">
                <p><strong>3.2</strong> A site license allows a company to install only one copy of the software.</p>
                {renderRadioGroup('q3.2', [
                    { value: 'True', label: 'True' },
                    { value: 'False', label: 'False' }
                ])}
                {renderFeedback('q3.2')}
                {renderAnswerSection('q3.2')}
            </div>

            <div className="question" id="question-q3.3">
                <p><strong>3.3</strong> An attachment is a file that can be sent together with an e-mail message.</p>
                {renderRadioGroup('q3.3', [
                    { value: 'True', label: 'True' },
                    { value: 'False', label: 'False' }
                ])}
                {renderFeedback('q3.3')}
                {renderAnswerSection('q3.3')}
            </div>

            <div className="question" id="question-q3.4">
                <p><strong>3.4</strong> The AVERAGE function will give the average of a set of values in a database.</p>
                {renderRadioGroup('q3.4', [
                    { value: 'True', label: 'True' },
                    { value: 'False', label: 'False' }
                ])}
                {renderFeedback('q3.4')}
                {renderAnswerSection('q3.4')}
            </div>

            <div className="question" id="question-q3.5">
                <p><strong>3.5</strong> Information overload is the process of replacing analogue technologies used for broadcasting services with digital technologies.</p>
                {renderRadioGroup('q3.5', [
                    { value: 'True', label: 'True' },
                    { value: 'False', label: 'False' }
                ])}
                {renderFeedback('q3.5')}
                {renderAnswerSection('q3.5')}
            </div>

            <h2>SECTION B</h2>
            <h3>QUESTION 4: SYSTEMS TECHNOLOGIES</h3>
            <div className="question">
                <p><strong>4.1</strong> Study the notebook computer (laptop) specifications in the advertisement below and answer the questions that follow.</p>
                <p>Intel Core i5<br/>15.6" screen (1920 x 1080)<br/>128 GB SSD<br/>3 x USB ports<br/>VGA port<br/>Webcam
                    with microphone<br/>802.11 b/g/n<br/>SD card reader<br/>6-cell battery<br/>Office 365 (1-year
                    licence)<br/></p>

                <p><strong>4.1.1</strong> Which broad software category does Office 365 belong to?</p>
                {renderTextarea('input-4.1.1')}
                {renderAnswerSection('input-4.1.1')}

                <p><strong>4.1.2</strong> Give TWO possible reasons why screen resolution is indicated in addition to screen size in the specifications above.</p>
                {renderTextarea('input-4.1.2')}
                {renderAnswerSection('input-4.1.2')}

                <p><strong>4.1.3</strong> Give TWO reasons why newer models of notebook computers do not have optical drives.</p>
                {renderTextarea('input-4.1.3')}
                {renderAnswerSection('input-4.1.3')}

                <p><strong>4.1.4</strong> Give ONE possible reason why an SSD is specified for this computer instead of a hard drive.</p>
                {renderTextarea('input-4.1.4')}
                {renderAnswerSection('input-4.1.4')}

                <p><strong>4.1.5</strong> Give TWO features of a USB port that make it such a popular choice for connecting peripherals.</p>
                {renderTextarea('input-4.1.5')}
                {renderAnswerSection('input-4.1.5')}

                <p><strong>4.1.6</strong> Discuss why you would not expect to find a VGA port included in the specifications of this notebook computer AND state which other port you would rather expect to find.</p>
                {renderTextarea('input-4.1.6')}
                {renderAnswerSection('input-4.1.6')}

                <p><strong>4.1.7</strong> Name TWO specifications in the advertisement that would make it possible to set up biometric security on this notebook computer.</p>
                {renderTextarea('input-4.1.7')}
                {renderAnswerSection('input-4.1.7')}

                <p><strong>4.1.8</strong> Name an essential specification affecting performance that is NOT listed in this advertisement.</p>
                {renderTextarea('input-4.1.8')}
                {renderAnswerSection('input-4.1.8')}

                <p><strong>4.2</strong> State TWO benefits of using online banking as opposed to physically visiting a bank.</p>
                {renderTextarea('input-4.2')}
                {renderAnswerSection('input-4.2')}

                <p><strong>4.3</strong> Suggest ONE way in which to ensure that documents created in new software versions are compatible with older software versions.</p>
                {renderTextarea('input-4.3')}
                {renderAnswerSection('input-4.3')}

                <p><strong>4.4</strong> Give TWO reasons why you may decide to buy a desktop computer rather than a notebook computer.</p>
                {renderTextarea('input-4.4')}
                {renderAnswerSection('input-4.4')}

                <p><strong>4.5</strong> Give TWO reasons why a computer may prompt a user to start up the operating system, e.g. Windows, in safe mode.</p>
                {renderTextarea('input-4.5')}
                {renderAnswerSection('input-4.5')}

                <p><strong>4.6</strong> A printer does not print the document sent to it, even though it is working, switched on and properly connected. Discuss TWO ways in which to resolve this problem.</p>
                {renderTextarea('input-4.6')}
                {renderAnswerSection('input-4.6')}

                <p><strong>4.7</strong> Name the utility program that rearranges parts of files scattered all over the hard drive, so that they are stored next to each other.</p>
                {renderTextarea('input-4.7')}
                {renderAnswerSection('input-4.7')}

                <p><strong>4.8</strong> Give TWO reasons for using the Task Scheduler utility.</p>
                {renderTextarea('input-4.8')}
                {renderAnswerSection('input-4.8')}
            </div>

            <h3>QUESTION 5: INTERNET AND NETWORK TECHNOLOGIES</h3>
            <div className="question">
                <p><strong>5.1</strong> What is the main purpose of an ISP?</p>
                {renderTextarea('input-5.1')}
                {renderAnswerSection('input-5.1')}

                <p><strong>5.2</strong> State TWO functions of a router as used in a home network.</p>
                {renderTextarea('input-5.2')}
                {renderAnswerSection('input-5.2')}

                <p><strong>5.3</strong> State TWO advantages of a fibre connection over a wired ADSL connection.</p>
                {renderTextarea('input-5.3')}
                {renderAnswerSection('input-5.3')}

                <p><strong>5.4</strong> Why would a user prefer to have an unshaped connection instead of a shaped connection to the internet?</p>
                {renderTextarea('input-5.4')}
                {renderAnswerSection('input-5.4')}

                <p><strong>5.5</strong> State TWO advantages of using a browser-based online application for editing documents rather than a stand-alone application installed on a desktop computer.</p>
                {renderTextarea('input-5.5')}
                {renderAnswerSection('input-5.5')}

                <p><strong>5.6</strong> State TWO disadvantages of using browser plug-ins and extensions.</p>
                {renderTextarea('input-5.6')}
                {renderAnswerSection('input-5.6')}

                <p><strong>5.7</strong> Why would you get a 'Page Not Found' or 'Not Found' error message while trying to access a web page?</p>
                {renderTextarea('input-5.7')}
                {renderAnswerSection('input-5.7')}

                <p><strong>5.8</strong> Many public places often offer free internet access.</p>
                <p><strong>5.8.1</strong> What is this type of connection called?</p>
                {renderTextarea('input-5.8.1')}
                {renderAnswerSection('input-5.8.1')}

                <p><strong>5.8.2</strong> State ONE problem with this kind of free internet connection, other than security risks.</p>
                {renderTextarea('input-5.8.2')}
                {renderAnswerSection('input-5.8.2')}

                <p><strong>5.9</strong> What is the main function of a firewall?</p>
                {renderTextarea('input-5.9')}
                {renderAnswerSection('input-5.9')}

                <p><strong>5.10</strong> How would an employee securely access his/her company network from a remote location?</p>
                {renderTextarea('input-5.10')}
                {renderAnswerSection('input-5.10')}
            </div>

            <h3>QUESTION 6: INFORMATION MANAGEMENT</h3>
            <div className="question">
                <p><strong>6.1</strong> Give TWO reasons why a task definition is necessary when planning the research for your practical assessment task (PAT).</p>
                {renderTextarea('input-6.1')}
                {renderAnswerSection('input-6.1')}

                <p><strong>6.2</strong> Explain how you can avoid getting many different or unrelated results from a web browser when you are searching for a particular topic on the internet.</p>
                {renderTextarea('input-6.2')}
                {renderAnswerSection('input-6.2')}

                <p><strong>6.3</strong> When setting a questionnaire, it is important to consider the expected format of the answers to closed questions as this would assist you in processing and analysing the data.</p>
                <p><strong>6.3.1</strong> Give TWO types/formats of answers that would return values that could be exported to a .csv file.</p>
                {renderTextarea('input-6.3.1')}
                {renderAnswerSection('input-6.3.1')}

                <p><strong>6.3.2</strong> How could this data be presented visually in a spreadsheet?</p>
                {renderTextarea('input-6.3.2')}
                {renderAnswerSection('input-6.3.2')}

                <p><strong>6.4</strong> Explain why it is important that researchers do NOT include biased sources in their research or reports.</p>
                {renderTextarea('input-6.4')}
                {renderAnswerSection('input-6.4')}

                <p><strong>6.5</strong> Give TWO ways in which database queries are helpful when analysing data.</p>
                {renderTextarea('input-6.5')}
                {renderAnswerSection('input-6.5')}
            </div>

            <h3>QUESTION 7: SOCIAL IMPLICATIONS</h3>
            <div className="question">
                <p><strong>7.1</strong> Describe a situation that would qualify as online harassment.</p>
                {renderTextarea('input-7.1')}
                {renderAnswerSection('input-7.1')}

                <p><strong>7.2</strong> Suggest TWO ways in which computer users can prevent RSI to their hands and wrists.</p>
                {renderTextarea('input-7.2')}
                {renderAnswerSection('input-7.2')}

                <p><strong>7.3</strong> State TWO ways in which to avoid becoming a victim of e-mail phishing.</p>
                {renderTextarea('input-7.3')}
                {renderAnswerSection('input-7.3')}

                <p><strong>7.4</strong> Driverless cars/Self-driving cars may become more common in the future. Use your knowledge of computers to discuss TWO potential problems that could be associated with driverless cars/self-driving cars.</p>
                {renderTextarea('input-7.4')}
                {renderAnswerSection('input-7.4')}

                <p><strong>7.5</strong> State ONE disadvantage of crowd funding for a person who invests in a new business.</p>
                {renderTextarea('input-7.5')}
                {renderAnswerSection('input-7.5')}

                <p><strong>7.6</strong> State TWO disadvantages of using free cloud storage services.</p>
                {renderTextarea('input-7.6')}
                {renderAnswerSection('input-7.6')}
            </div>

            <h3>QUESTION 8: SOLUTION DEVELOPMENT</h3>
            <div className="question">
                <p><strong>8.1</strong> You typed the word 'text', but  appeared. How do you ensure that the word 'text' is displayed instead of the symbols?</p>
                {renderTextarea('input-8.1')}
                {renderAnswerSection('input-8.1')}

                <p><strong>8.2</strong> Name ONE setting that can be adjusted by using the ruler of a word processor.</p>
                {renderTextarea('input-8.2')}
                {renderAnswerSection('input-8.2')}

                <p><strong>8.3</strong> What must you do before you can insert an automated citation in a word processing document?</p>
                {renderTextarea('input-8.3')}
                {renderAnswerSection('input-8.3')}

                <p><strong>8.4</strong> Data appears in cells A1:W100 in a spreadsheet. Which spreadsheet option would you use to print only the cell range A1:D10?</p>
                {renderTextarea('input-8.4')}
                {renderAnswerSection('input-8.4')}

                <p><strong>8.5</strong> You wish to paste a graph from a spreadsheet into a word processing document. Which Paste Special option would you use to enable the graph in the word processing document to update when the data in the spreadsheet changes?</p>
                {renderTextarea('input-8.5')}
                {renderAnswerSection('input-8.5')}

                <p><strong>8.6</strong> Why do the letters C and D not appear in the spreadsheet, as shown in the screenshot below?</p>
                <img src="/Screenshot (7).png" alt="" />
                {renderTextarea('input-8.6')}
                {renderAnswerSection('input-8.6')}

                <p><strong>8.7</strong> Explain the concept of a circular reference in a spreadsheet.</p>
                {renderTextarea('input-8.7')}
                {renderAnswerSection('input-8.7')}

                <p><strong>8.8</strong> The LOOKUP function used in cell C5 attempts to display the mark for specific learners from the lookup table (cells E4:I5), as shown in the screenshot below, but the function returns an error message. Suggest ONE way to ensure that the correct marks appear for all listed learners.</p>
                <img src="/Screenshot (77).png" alt="" />
                {renderTextarea('input-8.8')}
                {renderAnswerSection('input-8.8')}

                <p><strong>8.9</strong> Microsoft Access allows you to insert a text box when you design a database form. Give TWO reasons for using a text box in a database form.</p>
                {renderTextarea('input-8.9')}
                {renderAnswerSection('input-8.9')}

                <p><strong>8.10</strong> The following message appeared when you ran a database query: Give TWO reasons why the database requires you to enter a parameter value.</p>
                <img src="/Screenshot (8).png" alt="" />
                {renderTextarea('input-8.10')}
                {renderAnswerSection('input-8.10')}

                <p><strong>8.11</strong> While viewing a web page in the browser, you decide that you would like to examine the HTML code. What would you do to display the HTML code of that web page?</p>
                {renderTextarea('input-8.11')}
                {renderAnswerSection('input-8.11')}

                <p><strong>8.12</strong> Give TWO tips or hints that will help you to prevent errors or that will assist you with troubleshooting when coding in HTML.</p>
                {renderTextarea('input-8.12')}
                {renderAnswerSection('input-8.12')}
            </div>

            <h2>SECTION C</h2>
            <h3>QUESTION 9</h3>
            <div className="question">
                <p><strong>9.1</strong> You will require a notebook computer and a data projector to show the movies in the school hall.</p>
                <p><strong>9.1.1</strong> Name TWO features, other than the resolution, that you will consider when buying a data projector.</p>
                {renderTextarea('input-9.1.1')}
                {renderAnswerSection('input-9.1.1')}

                <p><strong>9.1.2</strong> Explain why it will NOT be necessary for the notebook computer to have a dedicated graphics card for showing movies.</p>
                {renderTextarea('input-9.1.2')}
                {renderAnswerSection('input-9.1.2')}

                <p><strong>9.2</strong> Give ONE reason why you do NOT have to use a mouse with a notebook computer.</p>
                {renderTextarea('input-9.2')}
                {renderAnswerSection('input-9.2')}

                <p><strong>9.3</strong> Instead of downloading all the movies you want to show during the movie night, one of your friends suggested streaming the movies from services like Netflix or YouTube.</p>
                <p><strong>9.3.1</strong> Name the type of software needed to play movies.</p>
                {renderTextarea('input-9.3.1')}
                {renderAnswerSection('input-9.3.1')}

                <p><strong>9.3.2</strong> Explain how bandwidth influences the streaming of movies.</p>
                {renderTextarea('input-9.3.2')}
                {renderAnswerSection('input-9.3.2')}

                <p><strong>9.3.3</strong> Discuss TWO limitations of using a 4G cellular connection to stream a movie.</p>
                {renderTextarea('input-9.3.3')}
                {renderAnswerSection('input-9.3.3')}

                <p><strong>9.4</strong> Identify TWO risks that your notebook computer could be exposed to by being connected to the internet AND suggest a way to prevent harm from EACH risk that you identify.</p>
                {renderTextarea('input-9.4')}
                {renderAnswerSection('input-9.4')}

                <p><strong>9.5</strong> After the movie night, the principal requires you to create a report with main and subheadings.</p>
                <p><strong>9.5.1</strong> What steps must you take before an automatic Table of Contents can be added to a word processing document?</p>
                {renderTextarea('input-9.5.1')}
                {renderAnswerSection('input-9.5.1')}

                <p><strong>9.5.2</strong> The report will be published on a web page. Name TWO possible locations that hyperlinks in the report can point to.</p>
                {renderTextarea('input-9.5.2')}
                {renderAnswerSection('input-9.5.2')}

                <p><strong>9.5.3</strong> You will use the mail merge feature of the word processor to send the report to other teachers. State TWO advantages of using the mail merge feature to create personalised e-mail messages.</p>
                {renderTextarea('input-9.5.3')}
                {renderAnswerSection('input-9.5.3')}

                <p><strong>9.6</strong> To evaluate the success of the movie night, the organisers require the parents to fill in an electronic form that will be published on the school's blog.</p>
                <p><strong>9.6.1</strong> Give TWO benefits for the organisers of publishing the online form on the school's blog.</p>
                {renderTextarea('input-9.6.1')}
                {renderAnswerSection('input-9.6.1')}

                <p><strong>9.6.2</strong> Name TWO web-based spreadsheet programs as opposed to a default spreadsheet program installed on the notebook computer.</p>
                {renderTextarea('input-9.6.2')}
                {renderAnswerSection('input-9.6.2')}

                <p><strong>9.6.3</strong> The data from the electronic form was exported to a spreadsheet. The organisers wish to determine how many parents gave a rating of more than 7 for all three criteria, i.e. Movie rating, Venue rating and Catering rating. Study the screenshot below and explain why the COUNTIF function shown in the address bar of cell E2 does not give the correct answer.</p>
                <img src="/Screenshot (9).png" alt="" />
                {renderTextarea('input-9.6.3')}
                {renderAnswerSection('input-9.6.3')}
            </div>

            <h3>QUESTION 10</h3>
            <div className="question">
                <p><strong>10.1</strong> A link to the invitation will be sent to each former learner. The responses will be captured in a database.</p>
                <p><strong>10.1.1</strong> The GPS coordinates of the venue are included on the invitation. Explain the concept GPS. (Do NOT merely write the acronym in words.)</p>
                {renderTextarea('input-10.1.1')}
                {renderAnswerSection('input-10.1.1')}

                <p><strong>10.1.2</strong> Which e-mail feature can be used to send the link to all the former learners simultaneously?</p>
                {renderTextarea('input-10.1.2')}
                {renderAnswerSection('input-10.1.2')}

                <p><strong>10.1.3</strong> Which type of application can be used to solve the problem of a link address that is very long?</p>
                {renderTextarea('input-10.1.3')}
                {renderAnswerSection('input-10.1.3')}

                <p><strong>10.1.4</strong> Name the database object that could be used to give a printed summary of the number of men and women expected.</p>
                {renderTextarea('input-10.1.4')}
                {renderAnswerSection('input-10.1.4')}

                <p><strong>10.1.5</strong> Give TWO security measures to ensure confidentiality of the data of the guests listed in the database.</p>
                {renderTextarea('input-10.1.5')}
                {renderAnswerSection('input-10.1.5')}

                <p><strong>10.2</strong> Former learners can be located on social media and a social media page will be used to share information regarding the reunion.</p>
                <p><strong>10.2.1</strong> Give TWO reasons why people do NOT want to have social media accounts.</p>
                {renderTextarea('input-10.2.1')}
                {renderAnswerSection('input-10.2.1')}

                <p><strong>10.2.2</strong> State TWO guidelines that could be included in a school policy on the use of social media.</p>
                {renderTextarea('input-10.2.2')}
                {renderAnswerSection('input-10.2.2')}

                <p><strong>10.2.3</strong> Discuss TWO ways in which to locate former learners using social media.</p>
                {renderTextarea('input-10.2.3')}
                {renderAnswerSection('input-10.2.3')}

                <p><strong>10.3</strong> A dinner, followed by a dance, will be held for the former learners.</p>
                <p><strong>10.3.1</strong> Name TWO technologies that can be used to identify and allow the guests to enter the dance, other than biometric technology.</p>
                {renderTextarea('input-10.3.1')}
                {renderAnswerSection('input-10.3.1')}

                <p><strong>10.3.2</strong> The guests will be able to choose food from a menu app that is installed on a tablet. Give TWO reasons why managing the meal choices from a menu app is easier than managing it from a printed menu.</p>
                {renderTextarea('input-10.3.2')}
                {renderAnswerSection('input-10.3.2')}

                <p><strong>10.4</strong> The guests will use augmented reality (AR) apps for entertainment. State TWO ways in which augmented reality (AR) differs from virtual reality (VR).</p>
                {renderTextarea('input-10.4')}
                {renderAnswerSection('input-10.4')}

                <p><strong>10.5</strong> There will be a presentation on the use of the Internet of Things (IoT) at the school. Explain the concept Internet of Things (IoT).</p>
                {renderTextarea('input-10.5')}
                {renderAnswerSection('input-10.5')}

                <p><strong>10.6</strong> The guests will take photographs with their smartphones.</p>
                <p><strong>10.6.1</strong> Photographs will be transferred from the guests' smartphones to a notebook computer using Bluetooth. State TWO advantages of transferring the photographs wirelessly from the smartphones to a notebook computer instead of using a USB cable to transfer the photographs.</p>
                {renderTextarea('input-10.6.1')}
                {renderAnswerSection('input-10.6.1')}

                <p><strong>10.6.2</strong> All the photographs of the reunion will be included in a PowerPoint presentation. What can you do to reduce the file size of the PowerPoint presentation without compressing it?</p>
                {renderTextarea('input-10.6.2')}
                {renderAnswerSection('input-10.6.2')}

                <p><strong>10.6.3</strong> The PowerPoint presentation will be uploaded to the cloud. How can this presentation be made available to former learners who do not have access to the internet?</p>
                {renderTextarea('input-10.6.3')}
                {renderAnswerSection('input-10.6.3')}
            </div>

            <div className="submission-section">
                <button
                    className="submit-button"
                    onClick={submitAnswers}
                    disabled={showResults || recording}
                >
                    {recording ? 'Submitting...' : 'Submit Answers'}
                </button>

                {score && (
                    <div className="score-display">
                        <h3>Your Scores:</h3>
                        <p>Section A: {score.a} out of 25</p>
                        <p>Section B: {score.b} out of 75</p>
                        <p>Section C: {score.c} out of 50</p>
                        <p><strong>Total Score: {score.total} out of 150 ({score.percentage}%)</strong></p>
                        {score.percentage >= 50 ? (
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

                h1, h2, h3 {
                    color: #333;
                }

                .question {
                    margin-bottom: 20px;
                }

                .options {
                    margin-left: 20px;
                }

                textarea {
                    width: 100%;
                    height: 100px;
                    margin-bottom: 10px;
                    border-radius: 5px;
                    border: 2px solid #f5d792;
                    transition: border-color 0.3s;
                }

                .correct {
                    border-color: green;
                }

                .incorrect {
                    border-color: red;
                }

                .status {
                    display: block;
                    font-weight: bold;
                    margin-bottom: 20px;
                }

                .correct + .status {
                    color: green;
                }

                .incorrect + .status {
                    color: red;
                }

                .wide-input {
                    width: 100%;
                    max-width: 400px;
                }

                .solution-buttons {
                    display: flex;
                    gap: 10px;
                    margin-top: 8px;
                }

                .solution-button {
                    padding: 6px 12px;
                    background-color: #3498db;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 14px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                .solution-button:hover {
                    background-color: #2980b9;
                }

                .revealed-answer {
                    margin-top: 8px;
                    padding: 10px;
                    background-color: #e9f7ef;
                    border-left: 4px solid #28a745;
                    border-radius: 4px;
                    font-size: 14px;
                    white-space: pre-wrap;
                }

                .submit-button {
                    background-color: #2196F3;
                    color: white;
                    padding: 12px 24px;
                    border: none;
                    border-radius: 4px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    margin: 20px 0;
                    display: block;
                    width: 200px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .submit-button:hover:not(:disabled) {
                    background-color: #0b7dda;
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

                .score-display h3 {
                    margin: 0 0 10px 0;
                    font-size: 24px;
                    color: #333;
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
            `}</style>
        </div>
    );
};

export default CatP2Nov2020;