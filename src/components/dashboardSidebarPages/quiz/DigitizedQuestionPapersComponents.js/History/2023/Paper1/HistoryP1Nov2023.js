import React, { useState, useEffect } from 'react';

const ExamApp = () => {
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [scores, setScores] = useState({});
    const [totalScore, setTotalScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(150 * 60);
    const [showAnswers, setShowAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    // Timer useEffect
    useEffect(() => {
        if (timeLeft <= 0) return;

        const timerId = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timerId);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft]);

    // Format time display
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Questions data
    const questions = {
        sectionA: {
            q1: {
                id: 'q1',
                title: 'QUESTION 1: HOW DID BERLIN BECOME A FOCAL POINT OF COLD WAR TENSION...',
                subQuestions: {
                    '1.1.1': {
                        question: 'Identify in the source the THREE countries that made up the European Advisory Commission.',
                        marks: 3,
                        type: 'text',
                        answer: 'United States, Britain, Soviet Union',
                        keywords: ['united states', 'britain', 'soviet union', 'us', 'uk', 'ussr']
                    },
                    '1.1.2': {
                        question: 'Why, according to the source, was it decided at Yalta in February 1945 to also create a zone for France in Germany?',
                        marks: 1,
                        type: 'text',
                        answer: 'Roosevelt and Churchill were able to convince Stalin to create a zone for France which had suffered three invasions and two defeats at the hands of Germany within seventy years',
                        keywords: ['roosevelt', 'churchill', 'stalin', 'france', 'invasions', 'defeats', 'germany', 'seventy years']
                    },
                    '1.1.3': {
                        question: 'Explain why you think the occupying countries had to ensure that the Germans were not able to build up a military force again.',
                        marks: 2,
                        type: 'text',
                        answer: 'To prevent Germany from attacking its neighbours in the future/prevent expansion in eastern Europe',
                        keywords: ['prevent', 'germany', 'attacking', 'neighbours', 'expansion', 'eastern europe', 'military', 'future']
                    },
                    '1.1.4': {
                        question: 'Comment on the implications of having the city of Berlin in the Soviet zone in the context of Cold War tensions between the USSR and the USA in 1948.',
                        marks: 4,
                        type: 'text',
                        answer: 'The city of Berlin will become a pawn that the Soviet Union would use to settle their differences with the Western Powers',
                        keywords: ['berlin', 'pawn', 'soviet union', 'settle', 'differences', 'western powers', 'cold war', 'tensions']
                    },
                    '1.2.1': {
                        question: 'Define the term blockade in your own words.',
                        marks: 2,
                        type: 'text',
                        answer: 'Sealing/closing off a place to prevent goods or people from entering or leaving',
                        keywords: ['sealing', 'closing', 'prevent', 'goods', 'people', 'entering', 'leaving', 'blockade']
                    },
                    '1.2.2': {
                        question: 'Explain why you think the USA regarded the Berlin Blockade as a clear violation of existing agreements concerning the administration of Berlin.',
                        marks: 4,
                        type: 'text',
                        answer: 'The USA saw the Berlin Blockade by the Soviet Union as a deliberate act of bringing poverty to Berliners',
                        keywords: ['usa', 'berlin blockade', 'violation', 'agreements', 'administration', 'soviet union', 'deliberate', 'poverty', 'berliners']
                    },
                    '1.2.3': {
                        question: 'Quote THREE reasons from the source why the USA was determined to remain as a power in Berlin.',
                        marks: 3,
                        type: 'text',
                        answer: 'regarded the blockade measures as a clear violation of existing agreements, as a matter of established right derived from the defeat and surrender of Germany, confirmed by formal agreements among the principal Allies',
                        keywords: ['blockade', 'violation', 'agreements', 'established right', 'defeat', 'surrender', 'germany', 'formal agreements', 'allies']
                    },
                    '1.2.4': {
                        question: 'State ONE specific obligation, according to the source, which the USA insisted on concerning the physical well-being of the population of its sector in Berlin.',
                        marks: 1,
                        type: 'text',
                        answer: 'in accordance with existing agreements the arrangements for the movement of freight and passenger traffic between the western zones and Berlin be fully restored',
                        keywords: ['movement', 'freight', 'passenger', 'traffic', 'western zones', 'berlin', 'restored', 'agreements']
                    },
                    '1.2.5': {
                        question: 'Comment on why the USA emphasised its willingness to settle any disagreements with the USSR by negotiations.',
                        marks: 4,
                        type: 'text',
                        answer: 'The USA was not prepared to engage in any military conflict with the USSR',
                        keywords: ['usa', 'not prepared', 'military conflict', 'ussr', 'negotiations', 'settle', 'disagreements']
                    },
                    '1.3.1': {
                        question: 'Give TWO reasons, according to the source, why the Soviet Union opposed the introduction of a special currency to be used in the western part of Berlin only.',
                        marks: 2,
                        type: 'text',
                        answer: 'Berlin lies in the centre of the Soviet zone, The interests of the Berlin population do not permit a situation in which Berlin or only in the western sectors of Berlin there shall be introduced special currency',
                        keywords: ['berlin', 'centre', 'soviet zone', 'interests', 'population', 'special currency', 'western sectors']
                    },
                    '1.3.2': {
                        question: 'Explain the concept monetary reform in the context of the Berlin zones in 1948.',
                        marks: 2,
                        type: 'text',
                        answer: 'The introduction of a new financial system (currency) – Deutsche Mark by the western countries in their zones',
                        keywords: ['introduction', 'new', 'financial system', 'currency', 'deutsche mark', 'western countries', 'zones']
                    },
                    '1.3.3': {
                        question: 'Why, according to the source, did the Soviet Command believe that the danger of the disruption of economic activities of the Soviet zone and of Berlin was not eliminated?',
                        marks: 2,
                        type: 'text',
                        answer: 'The United States, Great Britain and France continue to maintain in Berlin their special currency',
                        keywords: ['united states', 'great britain', 'france', 'continue', 'maintain', 'special currency', 'berlin']
                    },
                    '1.3.4': {
                        question: 'Comment on the limitations of this source to a historian researching the division of Berlin.',
                        marks: 4,
                        type: 'text',
                        answer: 'The source only portrays the Soviet Command\'s viewpoint/one-sided',
                        keywords: ['source', 'portrays', 'soviet command', 'viewpoint', 'one-sided', 'biased', 'limitations']
                    },
                    '1.4': {
                        question: 'Comment on how Source 1B differs from Source 1C regarding reasons given by the USA and the Soviet Union for remaining as occupying powers in Berlin in 1948.',
                        marks: 4,
                        type: 'text',
                        answer: 'In Source 1B the USA justifies its occupation of Berlin based on the formal agreements while in Source 1C Berlin lies geographically in the Soviet zone',
                        keywords: ['source 1b', 'usa', 'justifies', 'occupation', 'formal agreements', 'source 1c', 'geographically', 'soviet zone']
                    },
                    '1.5.1': {
                        question: 'Explain the symbolic representation of the three leaders seated next to each other in the context of the Cold War.',
                        marks: 2,
                        type: 'text',
                        answer: 'The USA, Britain and France ruled over Western Berlin/three combined zones of USA, Britain and France formed West Berlin',
                        keywords: ['usa', 'britain', 'france', 'ruled', 'western berlin', 'combined zones', 'west berlin', 'cold war']
                    },
                    '1.5.2': {
                        question: 'Why did Russia (Stalin) want to have a final say in the administration of Berlin?',
                        marks: 2,
                        type: 'text',
                        answer: 'Berlin was located in the Russian zone',
                        keywords: ['berlin', 'located', 'russian zone', 'stalin', 'administration', 'final say']
                    },
                    '1.6': {
                        question: 'Write a paragraph of about EIGHT lines (about 80 words) explaining how Berlin became a focal point of Cold War tension between the Soviet Union (USSR) and the United States of America (USA) in 1948.',
                        marks: 8,
                        type: 'paragraph',
                        answer: 'The European Advisory Commission planned the division of Germany into three zones. At Yalta, Germany was divided into four different zones for each of the victorious powers. The city of Berlin, though located deep into the Soviet zone was also divided and administered by the joint four countries. The governments of the USA, Great Britain and France wrote to complain when the Soviet government blockaded traffic from entering and accessing Berlin. The USA government regarded this blockade as a threat and committed to resist it. The Soviet government was convinced the blockade was caused by the introduction of a special currency by the western powers for their zones and in west Berlin.',
                        keywords: ['european advisory commission', 'division', 'germany', 'yalta', 'zones', 'berlin', 'soviet zone', 'blockade', 'traffic', 'special currency', 'western powers', 'cold war', 'tension']
                    }
                }
            },
            q2: {
                id: 'q2',
                title: 'QUESTION 2: WHAT FACTORS LED TO THE THREE NATIONALIST MOVEMENTS (MPLA, FNLA AND UNITA) BECOMING INVOLVED IN THE ANGOLAN CIVIL WAR IN 1975?',
                subQuestions: {
                    '2.1.1': {
                        question: 'Define the term revolution in your own words.',
                        marks: 2,
                        type: 'text',
                        answer: 'Overthrowing of the government by force',
                        keywords: ['overthrowing', 'government', 'force', 'revolution', 'change']
                    },
                    '2.1.2': {
                        question: 'Identify in the source the THREE nationalist movements that contested the control of Angola after independence.',
                        marks: 3,
                        type: 'text',
                        answer: 'Popular Movement for the Liberation of Angola (MPLA), National Front for the Liberation of Angola (FNLA), National Union for the Total Independence of Angola (UNITA)',
                        keywords: ['mpla', 'fnla', 'unita', 'popular movement', 'national front', 'national union', 'angola', 'liberation']
                    },
                    '2.1.3': {
                        question: 'Name TWO communist countries in the source with which Neto formed close links.',
                        marks: 2,
                        type: 'text',
                        answer: 'Cuba, Soviet Union',
                        keywords: ['cuba', 'soviet union', 'neto', 'communist', 'countries']
                    },
                    '2.1.4': {
                        question: 'What does the execution of Nito Alves\' followers suggest about Neto\'s leadership?',
                        marks: 2,
                        type: 'text',
                        answer: 'Neto was brutal/ruthless',
                        keywords: ['neto', 'brutal', 'ruthless', 'execution', 'nito alves', 'followers', 'leadership']
                    },
                    '2.2.1': {
                        question: 'Why do you think this photograph was taken in December 1975?',
                        marks: 4,
                        type: 'text',
                        answer: 'To consolidate/display power against the other nationalists\' movements',
                        keywords: ['consolidate', 'display', 'power', 'nationalists', 'movements', 'photograph', 'december 1975']
                    },
                    '2.2.2': {
                        question: 'Comment on the implication of the title of the photograph \'Angola\'s Brutal History and the MPLA\'s Role in it\'.',
                        marks: 2,
                        type: 'text',
                        answer: 'MPLA used brutal methods to gain victory and control of Angola',
                        keywords: ['mpla', 'brutal', 'methods', 'victory', 'control', 'angola', 'history', 'role']
                    },
                    '2.3.1': {
                        question: 'Why, according to the source, did the transition from Portuguese rule in Angola turn into a disaster?',
                        marks: 2,
                        type: 'text',
                        answer: 'The withdrawal of the Portuguese abandoned all attempt to control the transition',
                        keywords: ['withdrawal', 'portuguese', 'abandoned', 'control', 'transition', 'disaster']
                    },
                    '2.3.2': {
                        question: 'Explain the term civil war in the context of the contestation of power over Angola.',
                        marks: 2,
                        type: 'text',
                        answer: 'A war in which civilians within Angola fought against each other',
                        keywords: ['war', 'civilians', 'angola', 'fought', 'each other', 'civil war']
                    },
                    '2.3.3': {
                        question: 'Comment on the meaning of the statement, \'But both were determined for reasons of their own prestige …\', in the context of their involvement in the Angolan Civil War.',
                        marks: 4,
                        type: 'text',
                        answer: 'Both the US and the Soviet Union were more concerned about spreading their ideologies of capitalism and communism',
                        keywords: ['us', 'soviet union', 'concerned', 'spreading', 'ideologies', 'capitalism', 'communism', 'prestige']
                    },
                    '2.3.4': {
                        question: 'Explain the usefulness of this source to a historian studying the Angolan Civil War.',
                        marks: 4,
                        type: 'text',
                        answer: 'It is a source taken from a book by a historian, M Meredith',
                        keywords: ['source', 'book', 'historian', 'm meredith', 'useful', 'studying', 'angolan civil war']
                    },
                    '2.4.1': {
                        question: 'Quote evidence from the source that suggests that the MPLA was leaning towards nationalism and socialism.',
                        marks: 2,
                        type: 'text',
                        answer: 'The Popular Movement for the Liberation of Angola (MPLA) led by Agostinho Neto, looked upon politics through nationalist and socialist lenses',
                        keywords: ['popular movement', 'liberation', 'angola', 'mpla', 'agostinho neto', 'nationalist', 'socialist', 'lenses']
                    },
                    '2.4.2': {
                        question: 'Explain what you think is implied by the following in the context of the Angolan Civil War: \'Conflict became ethnicised\'.',
                        marks: 2,
                        type: 'text',
                        answer: 'Each nationalist movement represented different ethnic groups and this led to the outbreak of a civil war',
                        keywords: ['nationalist movement', 'represented', 'ethnic groups', 'outbreak', 'civil war', 'ethnicised']
                    },
                    '2.4.3': {
                        question: 'Why, according to the source, did the Central Intelligence Agency (CIA) support the FNLA?',
                        marks: 1,
                        type: 'text',
                        answer: 'saw it as the least Marxist of the three',
                        keywords: ['cia', 'saw', 'least', 'marxist', 'three', 'support', 'fnla']
                    },
                    '2.4.4': {
                        question: 'Using the information in the source and your own knowledge, comment on why you think South Africa decided to support UNITA.',
                        marks: 4,
                        type: 'text',
                        answer: 'Because UNITA was fighting the MPLA which posed a communist threat to South Africa',
                        keywords: ['unita', 'fighting', 'mpla', 'communist', 'threat', 'south africa', 'support']
                    },
                    '2.4.5': {
                        question: 'Quote TWO pieces of evidence from the source that suggest the MPLA did not improve the lives of the Angolan people.',
                        marks: 2,
                        type: 'text',
                        answer: 'it did little in the countryside other than recruit soldiers, Education, health and other services in the cities languished',
                        keywords: ['little', 'countryside', 'recruit', 'soldiers', 'education', 'health', 'services', 'cities', 'languished']
                    },
                    '2.5': {
                        question: 'Explain how the evidence in Source 2C supports the information in Source 2D regarding the approach followed by the three nationalist movements.',
                        marks: 4,
                        type: 'text',
                        answer: 'In Source 2C the evidence shows that the nationalist movements appealed for support from foreign powers and in Source 2D the information states that each of the nationalist movements received support in their efforts from foreign countries',
                        keywords: ['source 2c', 'evidence', 'nationalist movements', 'appealed', 'support', 'foreign powers', 'source 2d', 'received', 'foreign countries']
                    },
                    '2.6': {
                        question: 'Write a paragraph of about EIGHT lines (about 80 words) explaining the factors that led to the three nationalist movements (MPLA, FNLA and UNITA) becoming involved in the Angolan Civil War in 1975.',
                        marks: 8,
                        type: 'paragraph',
                        answer: 'After the overthrow of the Portuguese leader Caetano, the new leadership was prepared to end colonialism. The Portuguese failed to oversee the transition of power to the Angolans – created a power struggle. Three nationalist movements, the MPLA, UNITA and the FNLA contested the leadership race. Agostinho Neto emerged as the ruler of the country and established a one-party state after the MPLA took over the capital city, Luanda. The MPLA showed a keen interest in Socialism against the FNLA and UNITA. The three nationalist movements sought support from the foreign powers which resulted in the Angolan civil war.',
                        keywords: ['portuguese', 'caetano', 'colonialism', 'transition', 'power struggle', 'mpla', 'unita', 'fnla', 'agostinho neto', 'one-party state', 'luanda', 'socialism', 'foreign powers', 'civil war']
                    }
                }
            },
            q3: {
                id: 'q3',
                title: 'QUESTION 3: WHAT CHALLENGES WERE ENCOUNTERED BY THE CIVIL RIGHTS PROTESTORS WHO PARTICIPATED IN THE FREEDOM RIDES IN THE UNITED STATES OF AMERICA (USA) IN THE 1960s?',
                subQuestions: {
                    '3.1.1': {
                        question: 'How, according to the source, did the Freedom Riders set out to challenge racial discrimination in the USA in 1961?',
                        marks: 2,
                        type: 'text',
                        answer: 'They did so by simply boarding a bus, not as Blacks or Whites restricted by an outmoded system of racial discrimination, but as free and full citizens of a democratic nation',
                        keywords: ['boarding', 'bus', 'blacks', 'whites', 'racial discrimination', 'free', 'citizens', 'democratic nation']
                    },
                    '3.1.2': {
                        question: 'Define the term constitution in your own words.',
                        marks: 2,
                        type: 'text',
                        answer: 'A legal document in which basic laws of the country/organisation are outlined',
                        keywords: ['legal', 'document', 'basic laws', 'country', 'organisation', 'outlined', 'constitution']
                    },
                    '3.1.3': {
                        question: 'Comment on what is meant by the statement, \'They also knew that they might be injured or even killed for trying to exercise that right [of travelling together]\'.',
                        marks: 2,
                        type: 'text',
                        answer: 'The Freedom Riders were determined to continue protesting the segregation regardless of the violent attacks by the racist State and extremists',
                        keywords: ['freedom riders', 'determined', 'continue', 'protesting', 'segregation', 'violent attacks', 'racist', 'state', 'extremists']
                    },
                    '3.1.4': {
                        question: 'Using the information in the source and your own knowledge, explain why President John F Kennedy took immediate action in desegregating the USA.',
                        marks: 4,
                        type: 'text',
                        answer: 'The publicity of the Freedom Rides gave it world (international) attention',
                        keywords: ['publicity', 'freedom rides', 'world', 'international', 'attention', 'kennedy', 'action', 'desegregating']
                    },
                    '3.2.1': {
                        question: 'Explain why you think this newspaper article made front-page headline news.',
                        marks: 2,
                        type: 'text',
                        answer: 'To expose the violent racist mob attack on the Freedom Riders in Alabama in May 1961',
                        keywords: ['expose', 'violent', 'racist', 'mob', 'attack', 'freedom riders', 'alabama', 'may 1961']
                    },
                    '3.2.2': {
                        question: 'Why do you think this article was titled, \'Inhuman!\'?',
                        marks: 4,
                        type: 'text',
                        answer: 'It suggests that the white racists/segregationists who attacked the Freedom Riders were inhumane (lacked empathy) as the Freedom Riders were defenceless',
                        keywords: ['white', 'racists', 'segregationists', 'attacked', 'freedom riders', 'inhumane', 'lacked empathy', 'defenceless']
                    },
                    '3.2.3': {
                        question: 'Comment on why the flames and smoke from the burning bus are labelled, \'The Flames of Hatred!\'.',
                        marks: 2,
                        type: 'text',
                        answer: 'The flames and smoke from the bus reflects the actions of the white mob which was fuelled by hatred to racial integration',
                        keywords: ['flames', 'smoke', 'bus', 'reflects', 'white mob', 'fuelled', 'hatred', 'racial integration']
                    },
                    '3.3.1': {
                        question: 'What, according to the source, motivated Zwerg and his colleagues to get involved in the Freedom Rides?',
                        marks: 1,
                        type: 'text',
                        answer: 'we knew that John Lewis, a member of our organisation, was going to be involved in it',
                        keywords: ['john lewis', 'member', 'organisation', 'involved', 'zwerg', 'colleagues']
                    },
                    '3.3.2': {
                        question: 'Give TWO options, stated by Zwerg, that activists would take if they were jailed for participating in the Freedom Rides.',
                        marks: 2,
                        type: 'text',
                        answer: 'you would go on a hunger strike, you don\'t cop (opt for) a plea',
                        keywords: ['hunger strike', 'cop', 'plea', 'jailed', 'activists', 'options']
                    },
                    '3.3.3': {
                        question: 'Why would a historian consider this source reliable when researching the 1961 Freedom Rides in the USA?',
                        marks: 4,
                        type: 'text',
                        answer: 'Taken from a documentary compiled through interviews by S Nelson, a writer and filmmaker (with first-hand information)',
                        keywords: ['documentary', 'interviews', 's nelson', 'writer', 'filmmaker', 'first-hand', 'information', 'reliable']
                    },
                    '3.4.1': {
                        question: 'Give THREE reasons in the source why the protestors were taken to the hospital after the bus explosion.',
                        marks: 3,
                        type: 'text',
                        answer: 'people were cut by flying glass, for smoke inhalation, half dazed (confused) as a result of the smoke',
                        keywords: ['cut', 'flying glass', 'smoke inhalation', 'dazed', 'confused', 'smoke', 'hospital']
                    },
                    '3.4.2': {
                        question: 'Comment on what is implied by Governor Patterson\'s statement regarding the Freedom Riders, \'Any rioters in this state will not receive police protection\'.',
                        marks: 4,
                        type: 'text',
                        answer: 'The Governor/State did not support the Freedom Riders because they were against integration',
                        keywords: ['governor', 'state', 'not support', 'freedom riders', 'against', 'integration', 'police protection']
                    },
                    '3.4.3': {
                        question: 'Quote evidence from the source which indicates that the hospital did not administer or accept the injured Freedom Riders.',
                        marks: 2,
                        type: 'text',
                        answer: 'the people at the hospital would not do anything for us, the hospital told us to leave',
                        keywords: ['hospital', 'would not', 'do anything', 'told', 'leave', 'injured', 'freedom riders']
                    },
                    '3.4.4': {
                        question: 'Explain the term segregationist in the context of the state of Alabama.',
                        marks: 2,
                        type: 'text',
                        answer: 'A supporter of the policy of racial segregation in all spheres of life of the African American in the State of Alabama',
                        keywords: ['supporter', 'policy', 'racial segregation', 'spheres', 'life', 'african american', 'alabama']
                    },
                    '3.4.5': {
                        question: 'Give TWO pieces of evidence from the source indicating that Governor Patterson was a \'militant segregationist\'.',
                        marks: 2,
                        type: 'text',
                        answer: 'Any rioters in this state will not receive police protection, A militant segregationist, who solicited (asked) Ku Klux Klan support in his election campaign',
                        keywords: ['militant', 'segregationist', 'solicited', 'ku klux klan', 'support', 'election', 'campaign', 'police protection']
                    },
                    '3.5': {
                        question: 'Explain how the evidence in Source 3C is supported by the information in Source 3D regarding the treatment of the Freedom Riders.',
                        marks: 4,
                        type: 'text',
                        answer: 'Source 3C mentions that the civil rights activists heard of the Freedom Riders bus that was burnt but they still went on and in Source 3D their bus exploded and they found themselves injured',
                        keywords: ['source 3c', 'civil rights activists', 'heard', 'bus', 'burnt', 'went on', 'source 3d', 'exploded', 'injured']
                    },
                    '3.6': {
                        question: 'Write a paragraph of about EIGHT lines (about 80 words) explaining the challenges that were encountered by the civil rights protestors who participated in the Freedom Rides in the USA in the 1960s.',
                        marks: 8,
                        type: 'paragraph',
                        answer: 'The Freedom Rides were initiated in order to test the Supreme Court\'s ruling on the desegregation of public facilities in the Deep South. The Southern States did not want to end segregation or adhere to the constitutional laws. Freedom Riders were viciously attacked and jailed by the racist police. The buses carrying the Freedom Riders was burnt by a mob of whites whose aim was to dissuade the protests. Civil Rights activists who were in the burnt bus were refused treatment in hospital. The KKK were organised by the Governor to violently attack and kill the Freedom Riders.',
                        keywords: ['freedom rides', 'supreme court', 'ruling', 'desegregation', 'public facilities', 'deep south', 'southern states', 'segregation', 'constitutional laws', 'attacked', 'jailed', 'racist police', 'buses', 'burnt', 'mob', 'whites', 'refused treatment', 'hospital', 'kkk', 'governor', 'violently attack']
                    }
                }
            }
        },
        sectionB: {
            q4: {
                id: 'q4',
                title: 'QUESTION 4: THE EXTENSION OF THE COLD WAR: CASE STUDY – VIETNAM',
                question: 'The tactics used by the Vietcong were successful in making USA strategies ineffective during the Vietnam War between 1963 and 1975. Critically discuss this statement and use relevant historical evidence to support your line of argument.',
                marks: 50,
                type: 'essay',
                answer: 'The Vietcong employed highly effective guerrilla warfare tactics that neutralized American conventional military strategies. They used hit-and-run tactics, underground tunnel networks, and booby traps that confused and demoralized US troops. The Ho Chi Minh Trail allowed continuous supply from North Vietnam. Operation Rolling Thunder failed to break Vietcong morale, while chemical weapons like Agent Orange and Napalm created international condemnation. The Tet Offensive in 1968 demonstrated Vietcong resilience and turned American public opinion against the war. Search and Destroy missions often killed civilians, creating more Vietcong supporters. Ultimately, Vietnamization showed US failure, leading to withdrawal in 1973 and communist victory in 1975.',
                keywords: ['vietcong', 'guerrilla warfare', 'hit-and-run', 'tunnel networks', 'booby traps', 'ho chi minh trail', 'operation rolling thunder', 'agent orange', 'napalm', 'tet offensive', 'search and destroy', 'vietnamization', 'withdrawal', 'communist victory']
            },
            q5: {
                id: 'q5',
                title: 'QUESTION 5: INDEPENDENT AFRICA: CASE STUDY – THE CONGO',
                question: 'Mobutu Sese Seko\'s political, economic and cultural policies positively transformed the post-independent Congo in the 1960s. Do you agree with the statement? Use relevant evidence to support your line of argument.',
                marks: 50,
                type: 'essay',
                answer: 'While Mobutu brought initial political stability, his policies ultimately failed to positively transform Congo. Politically, he created a one-party dictatorship under MPR, suppressing all opposition and establishing "Mobutuism." Economically, Zaireanization replaced skilled foreigners with unqualified locals, leading to economic collapse, hyperinflation, and dependence on foreign aid. Cultural policies promoted African identity but education remained elitist, serving only urban elites. Corruption and kleptocracy characterized his rule, with national wealth funneled to his inner circle. Infrastructure deteriorated, and social services collapsed. Therefore, I disagree that his policies positively transformed Congo; instead, they led to its deterioration despite initial stability.',
                keywords: ['mobutu', 'political stability', 'one-party dictatorship', 'mpr', 'mobutuism', 'zaireanization', 'economic collapse', 'hyperinflation', 'foreign aid', 'african identity', 'elitist education', 'corruption', 'kleptocracy', 'infrastructure', 'social services', 'deterioration']
            },
            q6: {
                id: 'q6',
                title: 'QUESTION 6: CIVIL SOCIETY PROTESTS FROM THE 1950s TO THE 1970s: THE BLACK POWER MOVEMENT',
                question: 'Explain to what extent the Black Power Movement depended on the use of violent, radical and militant strategies to end discrimination in the USA. Use relevant historical evidence to support your line of argument.',
                marks: 50,
                type: 'essay',
                answer: 'The Black Power Movement significantly depended on militant strategies but also employed constructive community programs. Militant leaders like Malcolm X advocated armed self-defense against police brutality, while the Black Panther Party patrolled streets monitoring police. However, the movement also emphasized black pride, self-reliance, and community development through programs like free breakfast for children, healthcare clinics, and literacy projects. Stokely Carmichael promoted black political control in their communities. The movement\'s radical rhetoric attracted attention and forced national dialogue on racial issues, but its militant image also led to government repression through COINTELPRO. While violence was a component for self-defense, community empowerment and cultural revival were equally important strategies.',
                keywords: ['black power movement', 'militant strategies', 'malcolm x', 'armed self-defense', 'black panther party', 'police brutality', 'black pride', 'self-reliance', 'community programs', 'free breakfast', 'healthcare clinics', 'literacy projects', 'stokely carmichael', 'political control', 'radical rhetoric', 'cointelpro', 'community empowerment', 'cultural revival']
            }
        }
    };

    // Simplified selection logic - choose any 3 questions from any sections
    const selectQuestion = (questionId, section) => {
        if (selectedQuestions.includes(questionId)) {
            setSelectedQuestions(selectedQuestions.filter(id => id !== questionId));
        } else {
            if (selectedQuestions.length < 3) {
                setSelectedQuestions([...selectedQuestions, questionId]);
            }
        }
    };

    const handleAnswerChange = (questionId, subQuestionId, value) => {
        setAnswers({
            ...answers,
            [questionId]: {
                ...answers[questionId],
                [subQuestionId]: value
            }
        });
    };

    // Improved keyword-based similarity calculation
    const calculateSimilarity = (studentAnswer, correctAnswer, keywords) => {
        if (!studentAnswer || studentAnswer.trim() === '') return 0;

        const student = studentAnswer.toLowerCase().trim();
        const correct = correctAnswer.toLowerCase().trim();

        // Exact match
        if (student === correct) return 1;

        // Count keyword matches
        let keywordMatches = 0;
        const studentWords = student.split(/\s+/);

        keywords.forEach(keyword => {
            // Check if keyword is in student answer
            if (student.includes(keyword)) {
                keywordMatches++;
            }
            // Also check for word boundaries
            else if (studentWords.some(word =>
                word.includes(keyword) || keyword.includes(word)
            )) {
                keywordMatches += 0.5;
            }
        });

        // Calculate score based on keyword matches
        const maxKeywords = keywords.length;
        if (maxKeywords === 0) return 0;

        const keywordScore = keywordMatches / maxKeywords;

        // Also consider word overlap
        const studentSet = new Set(studentWords.filter(w => w.length > 3));
        const correctSet = new Set(correct.split(/\s+/).filter(w => w.length > 3));
        let overlap = 0;

        studentSet.forEach(word => {
            if (correctSet.has(word)) overlap++;
        });

        const overlapScore = overlap / Math.max(studentSet.size, correctSet.size, 1);

        // Return the better of the two scores
        return Math.max(keywordScore, overlapScore * 0.7);
    };

    // Function to mark a single question
    const markSingleQuestion = (questionId) => {
        const question = questions.sectionA[questionId] || questions.sectionB[questionId];
        const newScores = { ...scores };

        if (question.type === 'essay') {
            const studentAnswer = answers[questionId]?.main || '';
            const similarity = calculateSimilarity(studentAnswer, question.answer, question.keywords);
            let score = Math.round(similarity * question.marks);

            if (studentAnswer.trim().length > 50) {
                score = Math.max(score, Math.round(question.marks * 0.3));
            }

            newScores[questionId] = { main: score };
        } else {
            newScores[questionId] = {};
            Object.keys(question.subQuestions).forEach(subQId => {
                const subQuestion = question.subQuestions[subQId];
                const studentAnswer = answers[questionId]?.[subQId] || '';

                const similarity = calculateSimilarity(studentAnswer, subQuestion.answer, subQuestion.keywords);
                let score = Math.round(similarity * subQuestion.marks);

                // Minimum score for non-empty answers
                if (studentAnswer.trim().length > 0 && similarity > 0.1) {
                    score = Math.max(score, 1);
                }

                newScores[questionId][subQId] = score;
            });
        }

        setScores(newScores);
        const newTotal = Object.keys(newScores).reduce((total, qId) => {
            const q = questions.sectionA[qId] || questions.sectionB[qId];
            if (q.type === 'essay') {
                return total + (newScores[qId]?.main || 0);
            } else {
                return total + Object.values(newScores[qId] || {}).reduce((sum, score) => sum + score, 0);
            }
        }, 0);
        setTotalScore(newTotal);
    };

    const autoMarkAll = () => {
        const newScores = {};
        let total = 0;

        selectedQuestions.forEach(questionId => {
            const question = questions.sectionA[questionId] || questions.sectionB[questionId];

            if (question.type === 'essay') {
                const studentAnswer = answers[questionId]?.main || '';
                const similarity = calculateSimilarity(studentAnswer, question.answer, question.keywords);
                let score = Math.round(similarity * question.marks);

                if (studentAnswer.trim().length > 50) {
                    score = Math.max(score, Math.round(question.marks * 0.3));
                }

                newScores[questionId] = { main: score };
                total += score;
            } else {
                newScores[questionId] = {};
                Object.keys(question.subQuestions).forEach(subQId => {
                    const subQuestion = question.subQuestions[subQId];
                    const studentAnswer = answers[questionId]?.[subQId] || '';

                    const similarity = calculateSimilarity(studentAnswer, subQuestion.answer, subQuestion.keywords);
                    let score = Math.round(similarity * subQuestion.marks);

                    if (studentAnswer.trim().length > 0 && similarity > 0.1) {
                        score = Math.max(score, 1);
                    }

                    newScores[questionId][subQId] = score;
                    total += score;
                });
            }
        });

        setScores(newScores);
        setTotalScore(total);
        setShowResults(true);
    };

    const resetExam = () => {
        setSelectedQuestions([]);
        setAnswers({});
        setScores({});
        setTotalScore(0);
        setTimeLeft(150 * 60);
        setShowAnswers({});
        setShowResults(false);
    };

    // Function to check answer correctness based on keyword matching
    const checkAnswerCorrectness = (studentAnswer, keywords) => {
        if (!studentAnswer || studentAnswer.trim() === '') return 'incorrect';

        const student = studentAnswer.toLowerCase().trim();
        let keywordMatches = 0;

        keywords.forEach(keyword => {
            if (student.includes(keyword)) {
                keywordMatches++;
            }
        });

        const matchPercentage = keywordMatches / keywords.length;

        if (matchPercentage >= 0.7) return 'correct';
        if (matchPercentage >= 0.4) return 'partial';
        return 'incorrect';
    };

    // Function to get answer status color
    const getAnswerStatusColor = (status) => {
        switch(status) {
            case 'correct': return '#4CAF50'; // Green
            case 'partial': return '#FF9800'; // Orange
            case 'incorrect': return '#F44336'; // Red
            default: return '#9E9E9E'; // Grey
        }
    };

    // Function to toggle showing answer
    const toggleShowAnswer = (questionId, subQuestionId) => {
        setShowAnswers(prev => ({
            ...prev,
            [`${questionId}-${subQuestionId}`]: !prev[`${questionId}-${subQuestionId}`]
        }));
    };

    return (
        <div className="exam-container">
            <header className="exam-header">
                <h1>NATIONAL SENIOR CERTIFICATE - HISTORY P1 - GRADE 12</h1>
                <div className="exam-info">
                    <p>MARKS: 150</p>
                    <p>Select exactly 3 questions</p>
                </div>

                {/* Timer Display */}
                <div className={`timer ${timeLeft < 1800 ? 'warning' : ''} ${timeLeft < 600 ? 'danger' : ''}`}>
                    Time: {formatTime(timeLeft)}
                </div>
            </header>

            <div className="selection-section">
                <div className="section">
                    <h2>SECTION A: SOURCE-BASED QUESTIONS</h2>
                    {Object.keys(questions.sectionA).map(key => (
                        <button
                            key={key}
                            className={`question-select-btn ${selectedQuestions.includes(key) ? 'selected' : ''}`}
                            onClick={() => selectQuestion(key, 'A')}
                            disabled={selectedQuestions.length >= 3 && !selectedQuestions.includes(key)}
                        >
                            {questions.sectionA[key].title}
                            {selectedQuestions.includes(key) && <span className="checkmark"> ✓</span>}
                        </button>
                    ))}
                </div>

                <div className="section">
                    <h2>SECTION B: ESSAY QUESTIONS</h2>
                    {Object.keys(questions.sectionB).map(key => (
                        <button
                            key={key}
                            className={`question-select-btn ${selectedQuestions.includes(key) ? 'selected' : ''}`}
                            onClick={() => selectQuestion(key, 'B')}
                            disabled={selectedQuestions.length >= 3 && !selectedQuestions.includes(key)}
                        >
                            {questions.sectionB[key].title}
                            {selectedQuestions.includes(key) && <span className="checkmark"> ✓</span>}
                        </button>
                    ))}
                </div>
            </div>

            <div className="selected-questions">
                <h3>Selected Questions ({selectedQuestions.length}/3):</h3>
                {selectedQuestions.length > 0 ? (
                    <ul>
                        {selectedQuestions.map(qId => (
                            <li key={qId}>
                                {questions.sectionA[qId]?.title || questions.sectionB[qId]?.title}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No questions selected yet. Please select 3 questions.</p>
                )}
                {selectedQuestions.length === 3 && (
                    <p className="selection-complete">Selection Complete! Answer the questions below.</p>
                )}
            </div>

            {selectedQuestions.length > 0 && (
                <div className="answer-section">
                    {selectedQuestions.map(questionId => {
                        const question = questions.sectionA[questionId] || questions.sectionB[questionId];

                        return (
                            <div key={questionId} className="question-container">
                                <h3>{question.title}</h3>

                                {question.type === 'essay' ? (
                                    <div className="essay-question">
                                        <p><strong>Question:</strong> {question.question}</p>
                                        <p><strong>Marks:</strong> {question.marks}</p>
                                        <textarea
                                            value={answers[questionId]?.main || ''}
                                            onChange={(e) => handleAnswerChange(questionId, 'main', e.target.value)}
                                            placeholder="Write your essay here..."
                                            rows={15}
                                            style={{
                                                borderColor: getAnswerStatusColor(
                                                    checkAnswerCorrectness(answers[questionId]?.main || '', question.keywords)
                                                ),
                                                borderWidth: '2px'
                                            }}
                                        />
                                        <div className="answer-controls">
                                            <button
                                                className="mark-btn"
                                                onClick={() => markSingleQuestion(questionId)}
                                            >
                                                Mark This Answer
                                            </button>
                                            <button
                                                className="show-answer-btn"
                                                onClick={() => toggleShowAnswer(questionId, 'main')}
                                            >
                                                {showAnswers[`${questionId}-main`] ? 'Hide Answer' : 'Show Answer'}
                                            </button>
                                        </div>
                                        {showAnswers[`${questionId}-main`] && (
                                            <div className="correct-answer">
                                                <h4>Memo Answer:</h4>
                                                <p>{question.answer}</p>
                                            </div>
                                        )}
                                        {scores[questionId]?.main !== undefined && (
                                            <div className="score-display">
                                                <strong>Score: {scores[questionId].main}/{question.marks}</strong>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="source-questions">
                                        {Object.keys(question.subQuestions).map(subQId => {
                                            const subQuestion = question.subQuestions[subQId];
                                            const studentAnswer = answers[questionId]?.[subQId] || '';
                                            const correctness = checkAnswerCorrectness(studentAnswer, subQuestion.keywords);
                                            const answerStatusColor = getAnswerStatusColor(correctness);

                                            return (
                                                <div key={subQId} className="sub-question">
                                                    <p><strong>{subQId}:</strong> {subQuestion.question} <em>({subQuestion.marks} marks)</em></p>
                                                    {subQuestion.type === 'paragraph' ? (
                                                        <textarea
                                                            value={studentAnswer}
                                                            onChange={(e) => handleAnswerChange(questionId, subQId, e.target.value)}
                                                            placeholder="Write your paragraph here..."
                                                            rows={4}
                                                            style={{
                                                                borderColor: answerStatusColor,
                                                                borderWidth: '2px',
                                                                backgroundColor: correctness === 'incorrect' ? '#FFEBEE' : 'white'
                                                            }}
                                                        />
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            value={studentAnswer}
                                                            onChange={(e) => handleAnswerChange(questionId, subQId, e.target.value)}
                                                            placeholder="Type your answer here..."
                                                            style={{
                                                                borderColor: answerStatusColor,
                                                                borderWidth: '2px',
                                                                backgroundColor: correctness === 'incorrect' ? '#FFEBEE' : 'white'
                                                            }}
                                                        />
                                                    )}
                                                    <div className="answer-controls">
                                                        <button
                                                            className="mark-btn"
                                                            onClick={() => markSingleQuestion(questionId)}
                                                        >
                                                            Mark This Answer
                                                        </button>
                                                        <button
                                                            className="show-answer-btn"
                                                            onClick={() => toggleShowAnswer(questionId, subQId)}
                                                        >
                                                            {showAnswers[`${questionId}-${subQId}`] ? 'Hide Answer' : 'Show Answer'}
                                                        </button>
                                                    </div>
                                                    {showAnswers[`${questionId}-${subQId}`] && (
                                                        <div className="correct-answer">
                                                            <h4>Memo Answer:</h4>
                                                            <p>{subQuestion.answer}</p>
                                                        </div>
                                                    )}
                                                    {scores[questionId]?.[subQId] !== undefined && (
                                                        <div className="score-display">
                                                            <strong>Score: {scores[questionId][subQId]}/{subQuestion.marks}</strong>
                                                        </div>
                                                    )}
                                                    {studentAnswer && (
                                                        <div className="answer-feedback" style={{ color: answerStatusColor }}>
                                                            {correctness === 'correct' && '✓ Good answer!'}
                                                            {correctness === 'partial' && '⚠ Partially correct'}
                                                            {correctness === 'incorrect' && '✗ Needs improvement'}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="controls">
                <button
                    className="submit-btn"
                    onClick={autoMarkAll}
                    disabled={selectedQuestions.length !== 3}
                >
                    Mark All Questions
                </button>
                <button className="reset-btn" onClick={resetExam}>
                    Reset Exam
                </button>
            </div>

            {showResults && totalScore >= 0 && (
                <div className="results">
                    <h3>Exam Results</h3>
                    <p>Total Score: <strong>{totalScore}/150</strong></p>
                    <p>Percentage: <strong>{((totalScore / 150) * 100).toFixed(1)}%</strong></p>

                    <div className="detailed-scores">
                        <h4>Detailed Scores:</h4>
                        {selectedQuestions.map(questionId => {
                            const question = questions.sectionA[questionId] || questions.sectionB[questionId];
                            const questionScore = question.type === 'essay'
                                ? scores[questionId]?.main || 0
                                : Object.values(scores[questionId] || {}).reduce((a, b) => a + b, 0);

                            return (
                                <div key={questionId} className="score-item">
                                    <p><strong>{question.title}</strong></p>
                                    <p>Score: {questionScore}/{question.marks || 50}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            <style jsx>
                {`
                    /* HistoryExam.css */
                    .exam-container {
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 20px;
                        font-family: 'Arial', sans-serif;
                    }

                    .exam-header {
                        text-align: center;
                        background-color: #2c3e50;
                        color: white;
                        padding: 20px;
                        border-radius: 8px;
                        margin-bottom: 30px;
                        position: relative;
                    }

                    .exam-header h1 {
                        margin: 0;
                        font-size: 24px;
                    }

                    .exam-info {
                        margin-top: 10px;
                        font-size: 14px;
                    }

                    .timer {
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        background-color: #2c3e50;
                        color: white;
                        padding: 10px 15px;
                        border-radius: 6px;
                        font-weight: bold;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                    }

                    .timer.warning {
                        background-color: #f39c12;
                    }

                    .timer.danger {
                        background-color: #e74c3c;
                        animation: pulse 1s infinite;
                    }

                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                        100% { transform: scale(1); }
                    }

                    .selection-section {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 30px;
                        margin-bottom: 30px;
                    }

                    @media (max-width: 768px) {
                        .selection-section {
                            grid-template-columns: 1fr;
                        }
                    }

                    .section {
                        background-color: #f8f9fa;
                        padding: 20px;
                        border-radius: 8px;
                        border: 1px solid #dee2e6;
                    }

                    .section h2 {
                        color: #2c3e50;
                        margin-top: 0;
                        font-size: 18px;
                        border-bottom: 2px solid #3498db;
                        padding-bottom: 10px;
                    }

                    .question-select-btn {
                        display: block;
                        width: 100%;
                        padding: 12px;
                        margin: 8px 0;
                        background-color: #ecf0f1;
                        border: 2px solid #bdc3c7;
                        border-radius: 6px;
                        cursor: pointer;
                        text-align: left;
                        font-size: 14px;
                        transition: all 0.3s;
                        position: relative;
                    }

                    .question-select-btn:hover {
                        background-color: #d6dbdf;
                        border-color: #7f8c8d;
                    }

                    .question-select-btn.selected {
                        background-color: #3498db;
                        color: white;
                        border-color: #2980b9;
                    }

                    .question-select-btn:disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                    }

                    .checkmark {
                        position: absolute;
                        right: 10px;
                        font-weight: bold;
                    }

                    .selected-questions {
                        background-color: #e8f4fc;
                        padding: 15px;
                        border-radius: 6px;
                        margin-bottom: 30px;
                        border-left: 4px solid #3498db;
                    }

                    .selected-questions h3 {
                        margin-top: 0;
                        color: #2c3e50;
                    }

                    .selected-questions ul {
                        list-style-type: none;
                        padding: 0;
                    }

                    .selected-questions li {
                        padding: 8px;
                        background-color: white;
                        margin: 5px 0;
                        border-radius: 4px;
                        border: 1px solid #bdc3c7;
                    }

                    .selection-complete {
                        color: #27ae60;
                        font-weight: bold;
                        margin-top: 10px;
                    }

                    .answer-section {
                        margin-bottom: 30px;
                    }

                    .question-container {
                        background-color: white;
                        padding: 25px;
                        margin-bottom: 25px;
                        border-radius: 8px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        border: 1px solid #dee2e6;
                    }

                    .question-container h3 {
                        color: #2c3e50;
                        margin-top: 0;
                        border-bottom: 2px solid #3498db;
                        padding-bottom: 10px;
                    }

                    .essay-question p {
                        margin: 10px 0;
                    }

                    .essay-question textarea,
                    .sub-question textarea,
                    .sub-question input[type="text"] {
                        width: 100%;
                        padding: 12px;
                        margin: 10px 0;
                        border: 1px solid #bdc3c7;
                        border-radius: 4px;
                        font-size: 14px;
                        font-family: 'Arial', sans-serif;
                        resize: vertical;
                        transition: border-color 0.3s, background-color 0.3s;
                    }

                    .essay-question textarea {
                        min-height: 300px;
                    }

                    .sub-question {
                        margin-bottom: 20px;
                        padding: 15px;
                        background-color: #f8f9fa;
                        border-radius: 6px;
                        border-left: 3px solid #3498db;
                    }

                    .sub-question p {
                        margin-top: 0;
                        margin-bottom: 10px;
                    }

                    .answer-controls {
                        display: flex;
                        gap: 10px;
                        margin: 10px 0;
                    }

                    .mark-btn, .show-answer-btn {
                        padding: 8px 16px;
                        border: none;
                        border-radius: 4px;
                        font-size: 14px;
                        cursor: pointer;
                        transition: all 0.3s;
                    }

                    .mark-btn {
                        background-color: #3498db;
                        color: white;
                    }

                    .mark-btn:hover {
                        background-color: #2980b9;
                    }

                    .mark-btn:disabled {
                        background-color: #bdc3c7;
                        cursor: not-allowed;
                    }

                    .show-answer-btn {
                        background-color: #9b59b6;
                        color: white;
                    }

                    .show-answer-btn:hover {
                        background-color: #8e44ad;
                    }

                    .correct-answer {
                        background-color: #f8f9fa;
                        padding: 15px;
                        border-radius: 6px;
                        margin: 10px 0;
                        border-left: 4px solid #27ae60;
                    }

                    .correct-answer h4 {
                        margin-top: 0;
                        color: #27ae60;
                    }

                    .correct-answer p {
                        margin: 10px 0;
                        font-style: italic;
                        line-height: 1.6;
                    }

                    .score-display {
                        padding: 10px;
                        background-color: #e8f6ef;
                        border-radius: 4px;
                        margin-top: 10px;
                        border-left: 3px solid #27ae60;
                    }

                    .answer-feedback {
                        padding: 8px;
                        border-radius: 4px;
                        margin-top: 5px;
                        font-weight: bold;
                        font-size: 14px;
                    }

                    .controls {
                        display: flex;
                        gap: 15px;
                        margin: 30px 0;
                        justify-content: center;
                    }

                    .submit-btn,
                    .reset-btn {
                        padding: 12px 30px;
                        border: none;
                        border-radius: 6px;
                        font-size: 16px;
                        font-weight: bold;
                        cursor: pointer;
                        transition: all 0.3s;
                    }

                    .submit-btn {
                        background-color: #3498db;
                        color: white;
                    }

                    .submit-btn:hover {
                        background-color: #2980b9;
                    }

                    .submit-btn:disabled {
                        background-color: #bdc3c7;
                        cursor: not-allowed;
                    }

                    .reset-btn {
                        background-color: #e74c3c;
                        color: white;
                    }

                    .reset-btn:hover {
                        background-color: #c0392b;
                    }

                    .results {
                        background-color: #f8f9fa;
                        padding: 25px;
                        border-radius: 8px;
                        margin-top: 30px;
                        border: 2px solid #3498db;
                    }

                    .results h3 {
                        color: #2c3e50;
                        margin-top: 0;
                        border-bottom: 2px solid #3498db;
                        padding-bottom: 10px;
                    }

                    .results p {
                        font-size: 16px;
                        margin: 10px 0;
                    }

                    .detailed-scores {
                        margin-top: 20px;
                        padding: 15px;
                        background-color: white;
                        border-radius: 6px;
                        border: 1px solid #dee2e6;
                    }

                    .detailed-scores h4 {
                        color: #2c3e50;
                        margin-top: 0;
                    }

                    .score-item {
                        padding: 10px;
                        margin: 10px 0;
                        background-color: #f8f9fa;
                        border-radius: 4px;
                        border-left: 3px solid #3498db;
                    }

                    .score-item p {
                        margin: 5px 0;
                    }
                `}
            </style>
        </div>
    );
};

export default ExamApp;