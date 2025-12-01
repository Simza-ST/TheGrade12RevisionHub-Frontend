// src/data/economics_p2_2021.js
// Complete Economics Paper 2 (Nov 2021) — question list, types and grading hints
export const questions = [
    // SECTION A (COMPULSORY) — QUESTION 1
    // 1.1 MCQs (2 marks each)
    {
        id: "sectionA",
        type: "section",
        text: "SECTION A (COMPULSORY)"
    },
    {
        id: "q1.1",
        type: "instruction",
        text: "QUESTION 1               30 MARKS- 20 MINUTES\n\n1.1  Various options are provided as possible answers to the following questions. Choose the answer and write only the letter (A–D) next to the question numbers (1.1.1 to 1.1.8) in the ANSWER BOOK, e.g. 1.1.9 D.          (8 x 2)(16)"
    },
    {
        id: "1.1.1",
        text: "The value of skills owned by the entrepreneur and used in the production process is called ... cost.",
        type: "mcq",
        options: ["A. explicit", "B. marginal", "C. implicit", "D. average"],
        correct: "C",
        correctAnswerText: "implicit",
        marks: 2
    },
    {
        id: "1.1.2",
        text: "A situation where it is impossible to increase the welfare of one individual without making another worse off is called … efficiency.",
        type: "mcq",
        options: ["A. allocative", "B. technical", "C. Pareto", "D. market"],
        correct: "C",
        correctAnswerText: "Pareto",
        marks: 2
    },
    {
        id: "1.1.3",
        text: "The demand curve for an oligopolist is …",
        type: "mcq",
        options: ["A. positive sloping", "B. kinked", "C. horizontal", "D. upward sloping"],
        correct: "B",
        correctAnswerText: "kinked",
        marks: 2
    },
    {
        id: "1.1.4",
        text: "Income enjoyed by producers of goods is known as … benefit.",
        type: "mcq",
        options: ["A. private", "B. external", "C. social", "D. public"],
        correct: "A",
        correctAnswerText: "private",
        marks: 2
    },
    {
        id: "1.1.5",
        text: "An inflation rate that excludes items with highly volatile prices is called … inflation.",
        type: "mcq",
        options: ["A. administered", "B. headline", "C. inclusive", "D. core"],
        correct: "D",
        correctAnswerText: "core",
        marks: 2
    },
    {
        id: "1.1.6",
        text: "Religious events are included under … tourism.",
        type: "mcq",
        options: ["A. paleo", "B. cultural", "C. local", "D. eco-"],
        correct: "B",
        correctAnswerText: "cultural",
        marks: 2
    },
    {
        id: "1.1.7",
        text: "The process of converting waste material into economic goods is known as…",
        type: "mcq",
        options: ["A. recycling", "B. re-using", "C. restoring", "D. inventing"],
        correct: "A",
        correctAnswerText: "recycling",
        marks: 2
    },
    {
        id: "1.1.8",
        text: "Public sector intervention that allows businesses to sell their licences to other businesses is called …",
        type: "mcq",
        options: ["A. granting property rights", "B. environmental subsidies", "C. environmental taxes", "D. marketable permits"],
        correct: "D",
        correctAnswerText: "marketable permits",
        marks: 2
    },

    // 1.2 Matching (8 x 1)
    {
        id: "1.2",
        type: "instruction",
        text: "1.2  Choose a description from COLUMN B that matches the item in COLUMN A. Write only the letter (A–I) next to the question number (1.2.1 to 1.2.8) in the ANSWER BOOK, e.g. 1.2.9 J.          (8 x 1)(8)",
        image: "/images/paper2_2021/1.2.png"
    },
    {
        id: "1.2.1",
        text: "Long run",
        type: "short",
        correct: "F",
        correctAnswerText: "All factors of production are variable.",
        marks: 1
    },
    {
        id: "1.2.2",
        text: "Marginal revenue",
        type: "short",
        correct: "G",
        correctAnswerText: "Income received from selling one extra unit of output",
        marks: 1
    },
    {
        id: "1.2.3",
        text: "Duopoly",
        type: "short",
        correct: "I",
        correctAnswerText: "A market structure dominated by two businesses",
        marks: 1
    },
    {
        id: "1.2.4",
        text: "Perfectly elastic demand curve",
        type: "short",
        correct: "H",
        correctAnswerText: "Quantities change without a change in the price",
        marks: 1
    },
    {
        id: "1.2.5",
        text: "Consumer price index",
        type: "short",
        correct: "B",
        correctAnswerText: "Represents the cost of an average basket of goods and services",
        marks: 1
    },
    {
        id: "1.2.6",
        text: "Transit tourists",
        type: "short",
        correct: "D",
        correctAnswerText: "People travelling through South Africa to get to another destination",
        marks: 1
    },
    {
        id: "1.2.7",
        text: "Kyoto Protocol",
        type: "short",
        correct: "A",
        correctAnswerText: "An international agreement aimed at reducing greenhouse gases",
        marks: 1
    },
    {
        id: "1.2.8",
        text: "Biodegradable",
        type: "short",
        correct: "C",
        correctAnswerText: "Products that are eco-friendly and can be absorbed by the environment without harm",
        marks: 1
    },

    // 1.3 Give one term (6 x 1)
    {
        id: "q1.3",
        type: "instruction",
        text: "1.3  Give ONE term for each of the following descriptions. Write only the term next to the question numbers (1.3.1 to 1.3.6) in the ANSWER BOOK. Abbreviations, acronyms and examples will NOT be accepted.          (6 x 1)(6)"
    },
    {
        id: "1.3.1",
        text: "A situation where the market supplies goods that match the needs of the consumers",
        type: "short",
        correctKeywords: ["allocative efficiency", "Allocative efficiency"],
        correctAnswerText: "Allocative efficiency",
        marks: 1
    },
    {
        id: "1.3.2",
        text: "A market structure that consists of many businesses selling differentiated products",
        type: "short",
        correctKeywords: ["monopolistic competition", "Monopolistic competition"],
        correctAnswerText: "Monopolistic competition",
        marks: 1
    },
    {
        id: "1.3.3",
        text: "Goods that are seen to be socially harmful",
        type: "short",
        correctKeywords: ["demerit", "Demerit"],
        correctAnswerText: "Demerit",
        marks: 1
    },
    {
        id: "1.3.4",
        text: "Prices of goods and services that continuously decrease over a long period of time",
        type: "short",
        correctKeywords: ["deflation","Deflation"],
        correctAnswerText: "Deflation",
        marks: 1
    },
    {
        id: "1.3.5",
        text: "Monetary policy approach used by the SARB to keep price changes within 3–6%",
        type: "short",
        correctKeywords: ["inflation targeting", "Inflation targeting"],
        correctAnswerText: "Inflation targeting",
        marks: 1
    },
    {
        id: "1.3.6",
        text: "The variety of plant and animal life within an ecosystem",
        type: "short",
        correctKeywords: ["biodiversity", "Biodiversity"],
        correctAnswerText: "Biodiversity",
        marks: 1
    },

    // SECTION B - QUESTION 2: MICROECONOMICS
    // 2.1
    {
        id: "sectionB",
        type: "section",
        text: "SECTION B"
    },
    {
        id: "q2",
        type: "instruction",
        text: "Answer any TWO of the three questions in this section in the ANSWER BOOK.\n\nQUESTION 2: MICROECONOMICS               40 MARKS- 30 MINUTES\n\n2.1  Answer the following questions."
    },
    {
        id: "2.1.1",
        text: "State any TWO objectives of the competition policy.",
        type: "short",
        correctKeywords: ["prevent monopolies from abusing their power",
            "regulate formation of mergers and acquisitions who wish to exercise market power",
            "to stop firms from using restrictive practices like fixing prices, dividing markets"],
        correctAnswerText:["Prevent monopolies from abusing their power\n",
            "Regulate formation of mergers and acquisitions who wish to exercise market power\n",
            "To stop firms from using restrictive practices like fixing prices, dividing markets"],
        marks: 2
    },
    {
        id: "2.1.2",
        text: "Why is a monopolistic competitive market regarded as a hybrid market structure?",
        type: "short",
        correctKeywords: ["combination of monopoly and perfect competition",],
        correctAnswerText: "It is a combination of monopoly and perfect competition — it shares features of both market structures.",
        marks: 2
    },
    // 2.2 Cartoon (barriers to entry) — insert image placeholder (save diagram to public/images)
    {
        id: "2.2",
        type: "instruction",
        text: "2.2  Study the cartoon below and answer the questions that follow.",
        image: "/images/paper2_2021/2.2.png"
    },
    {
        id: "2.2.1",
        text: "In the above cartoon, identify a barrier to entry used by a monopolistic competitor to increase its market share.",
        type: "short",
        correctKeywords: ["investment capital", "branding"],
        correctAnswerText: "Investment capital/Branding",
        marks: 1
    },
    {
        id: "2.2.2",
        text: "Name the type of monopoly that is characterised by the use of patents.",
        type: "short",
        correctKeywords: ["artificial", "legal"],
        correctAnswerText: "Artificial/legal",
        marks: 1
    },
    {
        id: "2.2.3",
        text: "Briefly describe the term economies of scale.",
        type: "short",
        correctKeywords: ["economies of scale occur when output increases by more than the percentage increase in inputs / when the cost per unit decreases when output expands"],
        correctAnswerText: "Economies of scale occur when output increases by more than the percentage increase in inputs / when the cost per unit decreases when output expands",
        marks: 2
    },
    {
        id: "2.2.4",
        text: "How would barriers to entry influence profits in the market?",
        type: "short",
        correctKeywords: ["new businesses are restricted to enter the market and existing businesses will enjoy economic profit in both short and long run"],
        correctAnswerText: "New businesses are restricted to enter the market and existing businesses will enjoy economic profit in both short and long run",
        marks: 2
    },
    {
        id: "2.2.5",
        text: "Why is it a challenge for monopolies to charge excessively high prices? (2 x 2 marks)",
        type: "short",
        correctKeywords: ["monopoly is limited by the market demand and consumers may stop buying if prices are too high.",
            "consumers have limited budgets therefore monopolies cannot charge excessive prices.",
            "monopolist's product still has to compete for consumers' favour with all other products in the economy.",
            "price increases are sometimes regulated by the government to protect the consumer."
        ],
        correctAnswerText: ["Monopoly is limited by the market demand and consumers may stop buying if prices are too high.\n",
            "Consumers have limited budgets therefore monopolies cannot charge excessive prices.\n",
            "Monopolist's product still has to compete for consumers' favour with all other products in the economy.\n",
            "Price increases are sometimes regulated by the government to protect the consumer."],
        marks: 4
    },

    // 2.3 Graphs question
    {
        id: "2.3",
        type: "instruction",
        text: "2.3  Study the graphs below and answer the questions that follow.",
        image: "/images/paper2_2021/2.3.png"
    },
    {
        id: "2.3.1",
        text: "Identify the quantity where the individual business will maximise profit.",
        type: "short",
        correctKeywords: ["q2"],
        correctAnswerText: "Q2",
        marks: 1
    },
    {
        id: "2.3.2",
        text: "Name the market structure illustrated above.",
        type: "short",
        correctKeywords: ["perfect (competition/market)"],
        correctAnswerText: "Perfect (competition/market)",
        marks: 1
    },
    {
        id: "2.3.3",
        text: "Briefly describe the term economic profit.",
        type: "short",
        correctKeywords: ["occurs when a firm's total revenue exceeds total costs / price (AR) is greater than average cost / the profit made by the business over and above normal profit"],
        correctAnswerText: "Occurs when a firm's total revenue exceeds total costs / price (AR) is greater than average cost / the profit made by the business over and above normal profit",
        marks: 2
    },
    {
        id: "2.3.4",
        text: "Why does the individual business take the price determined by the industry?",
        type: "short",
        correctKeywords: ["an individual firm is very small in relation to the industry and has no influence over the market price.",
            "if individual firms were to charge higher prices they may either lose customers or market share.",
            "when firms charge lower prices, they can incur losses."],
        correctAnswerText: ["An individual firm is very small in relation to the industry and has no influence over the market price.\n",
            "If individual firms were to charge higher prices they may either lose customers or market share.\n",
            "When firms charge lower prices, they can incur losses."],
        marks: 2
    },
    {
        id: "2.3.5",
        text: "How would the entry of new firms in the industry impact the individual business in the long run?",
        type: "short",
        correctKeywords: ["competition will increase as the number of competitors in the market increase.",
            "supply of goods and services will increase leading to lower prices.",
            "lower prices will reduce economic profit and individual business will make normal profit in the long run."],
        correctAnswerText: ["Competition will increase as the number of competitors in the market increase.\n" +
        "Supply of goods and services will increase leading to lower prices.\n" +
        "Lower prices will reduce economic profit and individual business will make normal profit in the long run."],
        marks: 4
    },
    {
        id: "2.4",
        text: "With the aid of a graph, explain the relationship between marginal revenue and the demand curve (AR) of a monopoly.",
        type: "short",
        correctKeywords: ["the marginal revenue curve, with the exception of the first unit, will lie below the dd/AR curve",
            "the demand curve (AR) is negatively sloping, which results in more goods being sold at a lower price, hence the additional revenue (MR) will decrease as well",
            "MR curve intersects the horizontal axis at a point halfway between the origin and the AR curve",
            "the monopolist will always set a price above point A on the AR curve, because marginal revenue will be positive"
        ],
        solutionImage:"/images/paper2_2021/2.4.png",
        correctAnswerText: ["The marginal revenue curve, with the exception of the first unit, will lie below the dd/AR curve\n",
            "The demand curve (AR) is negatively sloping, which results in more goods being sold at a lower price, hence the additional revenue (MR) will decrease as well\n",
            "MR curve intersects the horizontal axis at a point halfway between the origin and the AR curve\n",
            "The monopolist will always set a price above point A on the AR curve, because marginal revenue will be positive\n"],
        marks: 8
    },
    {
        id: "2.5",
        text: "Analyse measures that may be used by government to promote competition in the economy.",
        type: "essay",
        correctKeywords: [
            "monitoring and enforcement of competition policies",
            "national inspectorate",
            "integrate competition policy with national policy objectives",
            "industrial policy",
            "macroeconomic policy",
            "strengthen monopoly laws",
            "anti-competitive conduct",
            "review current practices",
            "reduce red tape",
            "deregulate",
            "equal opportunity",
            "previously disadvantaged people",
            "allow imports",
            "foreign direct investment",
            "promote small businesses",
            "micro enterprises",
            "entrepreneurship",
            "implement competition policy",
            "price fixing",
            "reduce cost of doing business",
            "decrease corporate tax",
            "upgrade infrastructure",
            "skills development",
            "subsidies",
            "fine business for anti-competitive behaviour"
        ],
        correctAnswerText:["Government can promote competition by:\n",
            "initiating a dedicated national inspectorate that deals with the monitoring and enforcement of competition policies\n",
            "integrating competition policy with national policy objectives such as industrial and macroeconomic policies\n",
            "reforming and strengthening monopoly laws directed at anti-competitive conduct\n",
            "reviewing current practices and regulations in corporate governance / reduce red-tape/deregulate to make it easier for new businesses to operate.\n",
            "ensuring that previously disadvantaged people have an equal opportunity to participate in the economy \n",
            "allowing imports to increase competition on local products thereby forcing local business to keep their prices low\n",
            "attracting foreign direct investments to increase competition in local markets \n",
            "promoting small and micro enterprises (entrepreneurship) to increase competition on large businesses and increase supply of goods in the economy \n",
            "implementing the competition policy to reduce anti-competitive behaviour, such as price fixing by oligopolies and monopolies\n",
            "decrease the cost of doing business in South Africa.\n",
            "decrease corporate tax to encourage new businesses to enter the market.\n",
            "upgrade, maintain and provide sufficient infrastructure in which businesses can operate.\n",
            "the government can offer subsidies for skills development to encourage entrepreneurship.\n",
            "government can fine business for anticompetitive behaviour."],
        marks: 8
    },

    // QUESTION 3: CONTEMPORARY ECONOMIC ISSUES
    {
        id: "q3",
        type: "instruction",
        text: "QUESTION 3: CONTEMPORARY ECONOMIC ISSUES               40 MARKS–30 MINUTES\n\n3.1 Answer the following questions."
    },
    {
        id: "3.1.1",
        text: "State any TWO criteria for an activity to be regarded as tourism.",
        type: "short",
        correctKeywords: ["purpose of the visit",
            "no remuneration",
            "minimum of one night",
            "maximum of one year",
            "travelling distance of more than 160 km"],
        correctAnswerText: ["Purpose of the visit.\n",
            "No remuneration.\n",
            "Minimum of one night.\n",
            "Maximum of one year.\n",
            "Travelling distance of more than 160 km."],
        marks: 2
    },
    {
        id: "3.1.2",
        text: "Why is it important to focus on preservation worldwide?",
        type: "short",
        correctKeywords: ["preservation ensures that natural resources are kept intact and can still be used by future generations.",
            "ecological system, heritage site, wetland, birds, flowers, etc. need to be preserved to avoid extinction"],
        correctAnswerText: ["Preservation ensures that natural resources are kept intact and can still be used by future generations.\n",
            "Ecological system, heritage site, wetland, birds, flowers, etc. need to be preserved to avoid extinction."],
        marks: 2
    },
    {
        id: "q3.2",
        type: "instruction",
        text: "3.2  Study the information below and answer the questions that follow",
        image: "/images/paper2_2021/3.2.png"
    },
    {
        id: "3.2.1",
        text: "Name the factor that caused a sharp decrease in tourism sales between January and April 2020.",
        type: "short",
        correctKeywords: ["Covid-19 pandemic","lockdown restrictions"],
        correctAnswerText: "Covid-19 pandemic / lockdown restrictions",
        marks: 1
    },
    {
        id: "3.2.2",
        text: "Give ONE reason why the government imposes tax on tourist activities.",
        type: "short",
        correctKeywords: ["raise revenue","to improve tourist attraction sites", "maintain infrastructure", "recover external costs"],
        correctAnswerText: ["Raise revenue.\n ",
            "To improve tourist attraction sites / Maintain infrastructure.\n",
            "Recover external costs."],
        marks: 1
    },
    {
        id: "3.2.3",
        text: "Briefly describe the term inbound tourist.",
        type: "short",
        correctKeywords: ["tourists from other countries who come to visit South Africa"],
        correctAnswerText: "Tourists from other countries who come to visit South Africa",
        marks: 2
    },
    {
        id: "3.2.4",
        text: "Explain the role played by tourism in infrastructure development in South Africa.",
        type: "essay",
        correctKeywords: [
            "social infrastructure",
            "economic infrastructure",
            "hospitals",
            "public protection services",
            "information services",
            "ports",
            "beaches",
            "roads",
            "transport",
            "communication",
            "energy infrastructure",
            "clean water",
            "refuse removal",
            "basic services",
            "technology improvement"
        ],
        correctAnswerText:["Development of tourism sector leads to improvement of social infrastructure in the form of hospitals, public protection services, information service, etc.\n",
            "Tourism sector also plays an important role in the development of economic infrastructure such as ports, beaches, roads etc., which is shared by residents and visitors alike.\n",
            "Tourism contributes to improvement of technology in the form of transport and communication.\n",
            "Energy infrastructure is needed to operate tourist sites\n",
            "Basic services are required, such as clean water and refuse removal "],
        marks: 6
    },
    {
        id: "3.2.5",
        text: "How does a decline in tourism activities impact on rural communities?",
        type: "essay",
        correctKeywords: [
            "less job opportunities",
            "increased poverty",
            "migration to urban areas",
            "investment decline",
            "reduced demand",
            "hotels",
            "restaurants",
            "tourism-related activities",
            "loss of income"
        ],
        correctAnswerText:["People in rural areas will have less job opportunities thereby increasing poverty levels\n",
            "People in rural areas may be forced to migrate to urban areas in search for jobs \n",
            "Investment in tourism-related activities (restaurants, hotels) will decline due to decreased demand for goods and services"],
        marks: 4
    },

    // 3.3 Hazardous waste cartoon
    {
        id: "3.3",
        type: "instruction",
        text: "3.3  Study the cartoon below and answer the questions that follow.",
        image: "/images/paper2_2021/3.3.png"
    },
    {
        id: "3.3.1",
        text: "Name the type of pollution demonstrated in the above cartoon.",
        type: "short",
        correctKeywords: ["water", "sea"],
        correctAnswerText: "Water / sea",
        marks: 1
    },
    {
        id: "3.3.2",
        text: "Give the international measure that deals with the control of hazardous waste.",
        type: "short",
        correctKeywords: ["basel convention", "basel"],
        correctAnswerText: "Basel Convention",
        marks: 1
    },
    {
        id: "3.3.3",
        text: "Briefly describe the term conservation.",
        type: "short",
        correctKeywords: ["Conservation is a sustainable use and management of the environment to ensure that it can be used by both present and future generations",
            "manage the environment to ensure continuity"],
        correctAnswerText: "Conservation is a sustainable use and management of the environment to ensure that it can be used by both present and future generations / manage the environment to ensure continuity",
        marks: 2
    },
    {
        id: "3.3.4",
        text: "Explain the effect of soil erosion on food security.",
        type: "short",
        correctKeywords: ["land can no longer be cultivated thereby leading to shortage of food supply.",
            "the loss of top soil results in higher production costs and increase in price of food, thereby making food less affordable."],
        correctAnswerText: ["Land can no longer be cultivated thereby leading to shortage of food supply.\n",
            "The loss of top soil results in higher production costs and increase in price of food, thereby making food less affordable."],
        marks: 2
    },
    {
        id: "3.3.5",
        text: "How does human activity negatively affect environmental sustainability?",
        type: "essay",
        correctKeywords: [
            "environmental degradation",
            "depletion of resources",
            "overpopulation",
            "burning forests",
            "destruction of forests",
            "pollution",
            "ozone depletion",
            "global warming",
            "greenhouse gases",
            "deforestation"
        ],
        correctAnswerText:["Human activity causes environmental degradation, which causes the depletion of resources\n",
            "Directly or indirectly overpopulation increases damage to the environment \n",
            "Actions taken by humans such as the burning and destruction of forests damage the environment.\n",
            "Polluting the environment, depletion of the ozone layer, which will lead to global warming"],
        marks: 6
    },

    {
        id: "3.4",
        text: "Briefly discuss the reasons why markets fail to ensure environmental sustainability.",
        type: "essay",
        correctKeywords: [
            "common resource",
            "non-excludability",
            "externalities",
            "lack of ownership",
            "no property rights",
            "pollution costs borne by others",
            "lack of knowledge",
            "carelessness",
            "negligence",
            "ignorance",
            "self-interest",
            "future generations"
        ],
        correctAnswerText:["The environment is a common resource / Non-excludability of the environment: Many parts of the environment are not privately owned and do not have a price, so there is no economic incentive for markets to economise on their use\n",
            "Externalities: \n",
            "Because no one person owns the environment, there is no one to enforce property rights over it\n",
            "When people pollute the environment, for instance, the costs are borne mainly by others\n",
            "Lack of knowledge: People may cause environmental damage without realising it, especially when the effects build up over a long time \n",
            "Carelessness / Negligence / Ignorance:  Consumers and businesses are frequently prepared to continue with various harmful practices and leave future generations to worry about their environmental consequences due to self-interest"],
        marks: 8
    },
    {
        id: "3.5",
        text: "Analyse marketing strategies used to promote tourism in South Africa.",
        type: "essay",
        correctKeywords: [
            "welcome campaign",
            "welcome awards",
            "sho't left campaign",
            "partnerships",
            "computicket",
            "flight centre",
            "tourism indaba",
            "tourism enterprise partnership",
            "small tourism enterprises",
            "job creation",
            "social media",
            "facebook",
            "instagram",
            "twitter",
            "e-visas",
            "domestic tourism",
            "repeat visits"
        ],
        correctAnswerText:["The following marketing strategies have been used to promote tourism:\n",
            "launching the Welcome campaign to make every tourist feel at home and encourage them to return for a repeat visit and tell other about their experience.\n",
            "introducing welcome awards to recognize businesses and individual that improve the quality of tourist offerings.\n",
            "launching the Sho't Left campaign aimed to make travel more accessible and affordable that will encourage South Africans to travel within their country.\n",
            "building a strong partnership between SAT and other organisations such as Computicket Travel and Flight Centre in offering South Africans special deals from flights to accommodation and train trips.\n",
            "showcasing a wide variety of the best tourism products in South Africa and attracts visitors from across the world through the annual Tourism Indaba\n",
            "establishing the Tourism Enterprise Partnership to improve the sustainability of small tourism enterprises to protect and promote job creation as well as transforming the tourism industry.\n",
            "Social Media Platforms such as facebook, Instagram and Twitter are also used by government to promote tourism\n",
            "South Africa has recently launched E-visas which is likely to attract more tourists"],
        marks: 8
    },

    // QUESTION 4
    {
        id: "q4",
        type: "instruction",
        text: "QUESTION 4: MICROECONOMICS AND CONTEMPORARY ECONOMIC ISSUES               40 MARKS–30 MINUTES\n\n4.1 Answer the following questions."
    },
    {
        id: "4.1.1",
        text: "Name any TWO examples of fixed costs.",
        type: "short",
        correctKeywords: ["rent", "salaries", "insurance", "depreciation", "interest","administrative", "interest on capital", "property taxes"],
        correctAnswerText: ["Rent\n" ,
            "Administrative\n" ,
            "Insurance\n" ,
            "Depreciation\n" ,
            "Salaries\n" ,
            "Interest on capital\n" ,
            "Property taxes "],
        marks: 2
    },
    {
        id: "4.1.2",
        text: "How does the Paris Agreement intend to reduce the impact of climate change?",
        type: "essay",
        correctKeywords: [
            "finance available",
            "funding for climate impact",
            "limit temperature increase",
            "less than 2°c",
            "reduce risks threatening food production",
            "increase ability to adapt",
            "adapt to adverse impacts",
            "reduce greenhouse gas emissions",
            "submit strategies",
            "national plans"
        ],
        correctAnswerText:["Making finance available to help countries deal with the impact of climate change. \n",
            "Intensifying the efforts to limit the temperature increases (less than 2°C) to significantly reduce the risks threatening food production. \n",
            "Increasing the ability of countries to adapt to the adverse impacts of climate change.\n",
            "Request countries to submit strategies on how to reduce their greenhouse gas emissions"],
        marks: 6
    },
    {
        id: "4.2",
        type: "instruction",
        text: "4.2  Study the information below and answer the questions that follow.",
        image: "/images/paper2_2021/4.2.png"
    },
    {
        id: "4.2.1",
        text: "Identify ONE World Heritage Site in South Africa in the information above.",
        type: "short",
        correctKeywords: ["robben island"],
        correctAnswerText: "Robben Island",
        marks: 1
    },
    {
        id: "4.2.2",
        text: "Name ONE benefit of tourism for households.",
        type: "short",
        correctKeywords: ["enjoy infrastructure.", "skills development.", "income increases.", "more job opportunities."],
        correctAnswerText: ["Enjoy infrastructure.\n",
            "Skills development.\n",
            "Income increases.\n",
            "More job opportunities."],
        marks: 1
    },
    {
        id: "4.2.3",
        text: "Briefly describe the term indigenous knowledge systems.",
        type: "short",
        correctKeywords: ["local knowledge", "traditional knowledge", "community practices", "indigenous"],
        correctAnswerText: "The practices and ceremonies that are unique to the country's indigenous (local) people / Local knowledge that is unique to a given culture or society / Stories and traditions carried over from one generation to the other",
        marks: 2
    },
    {
        id: "4.2.4",
        text: "How can the depreciation of the rand affect inbound tourism?",
        type: "short",
        correctKeywords: ["cheaper", "boost tourism", "more tourists", "exchange rate", "affordability"],
        correctAnswerText: ["Foreign tourists will spend less of their currency to buy rand on a foreign exchange market.\n",
            "More foreign tourists will visit the country as it will be cheaper for them to buy goods and services in South Africa"],
        marks: 2
    },
    {
        id: "4.2.5",
        text: "Why do tourists visit South Africa as a tourist destination?",
        type: "essay",
        correctKeywords: [
            "authenticity",
            "uniqueness",
            "local culture",
            "diverse culture",
            "friendliness",
            "humility",
            "favourable exchange rate",
            "affordable visit",
            "favourable climate",
            "international events",
            "sporting events",
            "conferences",
            "peaceful political environment",
            "cultural experience",
            "beautiful landscapes"
        ],
        correctAnswerText:["South Africa offer authenticity and uniqueness of the country for tourist to learn how local people live and work.\n",
            "South Africa has a diverse culture for tourist to experience known for its friendliness and humility\n",
            "A favourable exchange rate ensures an affordable visit. \n",
            "South Africa has favourable climatic conditions for tourist to enjoy different activities. \n",
            "South Africa has hosted many international events such as conferences and sporting events \n",
            "Peaceful political transformation of the country to achieve democracy"],
        marks: 6
    },

    // 4.3 Collusion banking sector
    {
        id: "4.3",
        type: "instruction",
        text: "4.3  Study the extract below and answer the questions that follow.",
        image: "/images/paper2_2021/4.3.png"
    },
    {
        id: "4.3.1",
        text: "Identify the institution that is responsible for investigating anti-competitive behaviour.",
        type: "short",
        correctKeywords: ["competition commission"],
        correctAnswerText: "Competition Commission",
        marks: 1
    },
    {
        id: "4.3.2",
        text: "Name the type of collusion explained in the extract above.",
        type: "short",
        correctKeywords: ["overt","formal", "explicit"],
        correctAnswerText: "Overt / formal / explicit",
        marks: 1
    },
    {
        id: "4.3.3",
        text: "Briefly describe the term oligopoly.",
        type: "short",
        correctKeywords: ["a market structure dominated by a few large firms"],
        correctAnswerText: "A market structure dominated by a few large firms",
        marks: 2
    },
    {
        id: "4.3.4",
        text: "How does the existence of monopolies influence the supply of goods and services?",
        type: "short",
        correctKeywords: ["monopolies reduce the number of businesses in an industry reducing the total supply of goods and services.",
            "monopolies may restrict supply of goods and services to charge higher prices."],
        correctAnswerText: ["Monopolies reduce the number of businesses in an industry reducing the total supply of goods and services.\n",
            "Monopolies may restrict supply of goods and services to charge higher prices."],
        marks: 2
    },
    {
        id: "4.3.5",
        text: "What is the impact of price fixing on the market?",
        type: "essay",
        correctKeywords: [
            "higher prices",
            "consumers pay more",
            "penalties",
            "fines",
            "decrease demand",
            "customers fail to afford",
            "temporary high profits",
            "increase supply",
            "unfair competition",
            "market inefficiency"
        ],
        correctAnswerText:["Consumers may end up paying higher prices for goods and services\n",
            "Businesses may be forced to pay penalties if they are found guilty of price fixing \n",
            "Demand for the product may decrease as customers fail to afford the higher prices \n",
            "Businesses may temporarily enjoy high profits which may increase supply of the product"],
        marks: 6
    },

    {
        id: "4.4",
        text: "With the aid of a graph, explain shutdown-point in a perfect market.",
        type: "essay",
        correctKeywords: ["shutdown point", "avc", "price below avc", "min avc", "short-run decision"],
        solutionImage: "/images/paper2_2021/4.4.png",
        correctAnswerText: ["Above Q1, the firm will continue to produce because the price is greater than AVC, which means the business can pay for all its variable costs.\n" ,
            "Below Q1, the firm will stop to produce because the price is less than AVC, which means the firm is no longer able to pay all variable costs.\n" ,
            "Therefore, point A where price (AR) is equal to AVC, is the shutdown point"],
        marks: 8
    },

    {
        id: "4.5",
        text: "Analyse the impact of an increase in population on the environment.",
        type: "essay",
        correctKeywords: [
            "demand for food",
            "pressure on environment",
            "deforestation",
            "infrastructure development",
            "soil erosion",
            "loss of biodiversity",
            "pollution",
            "water pollution",
            "land pollution",
            "waste increase",
            "depletion of raw materials",
            "strain on resources",
            "water shortage",
            "burning of fossil fuels",
            "higher energy demand",
            "air pollution",
            "greenhouse gases"
        ],
        correctAnswerText:["An increase in population will result in:\n",
            "demand for food increasing thereby putting more pressure on the environment. \n",
            "deforestation due to increased demand for infrastructure development. \n",
            "an increased human settlement causing soil erosion and loss of biodiversity \n",
            "increased land and water pollution as more biological and non-biological waste will be introduced to the environment. \n",
            "depletion of raw materials due to increased production of goods and services. \n",
            "resources will be severely strained when population increases e.g. water \n",
            "an increase in the burning of fossil fuels such as coal or petrol due to higher demand for energy"],
        marks: 8
    },

    // SECTION C: choose ONE of Q5 or Q6 — include both so student can answer one
    {
        id: "sectionC",
        type: "section",
        text: "SECTION C"
    },
    {
        id: "",
        type: "instruction",
        text: "Answer any ONE of the two questions in this section in the ANSWER BOOK.\n\nYour answer will be assessed as follows:",
        image: "/images/paper2_2021/sectionC.png"
    },
    {
        id: "5",
        text: "QUESTION 5: MICROECONOMICS           40 MARKS – 40 MINUTES\n\n" +
            "Discuss, in detail, without drawing graphs, state intervention as a consequence of market failures.     (26 marks)\n\n" +
            "How can market inefficiency be reduced by global markets (globalisation)?     (10 marks)",
        type: "essay",
        correctKeywords: ["direct control",
            "laws and regulations",
            "control negative externalities",
            "pollution control",
            "environmental acts",
            "prohibit tobacco advertising",
            "restrict alcohol sales",
            "competition policy",
            "price control",
            "monopoly regulation",
            "levying of taxes",
            "producer subsidies",
            "minimum wages",
            "maximum prices",
            "price ceilings",
            "price floors",
            "redistribution of wealth",
            "progressive income tax",
            "BBBEE",
            "affirmative action",
            "land redistribution",
            "government production",
            "collective goods",
            "merit goods",
            "demerit goods",
            "foreign direct investment",
            "increase supply",
            "reduce monopolies",
            "increase competition",
            "access to information",
            "efficient allocation of resources",
            "comparative advantage",
            "mobility of factors of production",
            "innovation",
            "product quality",
            "consumer choice"],
        correctAnswerText: ["INTRODUCTION\n",
            "When market failure occurs, consequences such as inefficiencies, spill-over effects, imperfect competition and government intervention are likely to prevail\n",
            "BODY: MAIN PART\n",
            "State intervention as a consequence of market failure\n",
            "Direct control\n",
            "The state can pass laws or use existing legislative frameworks to control businesses and industries, individuals who generate negative externalities\n" ,
            "Thus in South Africa, emissions of potentially dangerous chemicals, air and scenic pollution, environmental preservation are controlled through carious Acts regulations \n",
            "Advertising by the tobacco industry is prohibited and alcohol may not be sold on Sundays or to persons under the age of 18 years \n",
            "Imperfect markets\n",
            "The government can deal with imperfect competition by:\n",
            "Formulating or implementing a competition policy to increase the level of competition \n",
            "Using laws on competition to prevent exorbitant prices charged by firms, to ensure that entry to the market is free, prevent harmful collusion and encourage foreign competition which helps to keep prices low \n" ,
            "Granting licences to more business in the case of state monopolies\n",
            "Imposing price controls to decrease prices of goods and services \n",
            "Levying of taxes\n",
            "The government will intervene in the market by levying taxes to recover external costs \n",
            "These taxes will increase the price and will result in a decrease in production of a certain good\n",
            "Levying taxes could be used as a strategy of reducing production and consumption of demerit goods as well as generating revenue for the state\n",
            "Firms and consumers will then be allocating resources in a more efficient way\n",
            "Providing producer subsidies\n",
            "The government provides subsidies to producers to encourage them to produce more goods and services \n",
            "Subsidies increase supply of specific goods and services such as milk, wheat and maize \n",
            "Subsidies lower the cost of producing goods and thus the market price of these goods is lowered, increasing consumption\n",
            "Minimum wages\n" ,
            "A minimum wage is the lowest remuneration that employers are required by law to pay their workers \n",
            "Income for the workers will increase and as a result their standard of living will improve (improve welfare and ensure basic needs are met)\n",
            "If a minimum wage is set above the equilibrium market wage, supply of labour will exceed the demand for labour\n",
            "This will increase the cost of labour, resulting in higher cost of production for businesses\n",
            "Some workers may be retrenched and increase unemployment and while production decreases \n",
            "Minimum wages will lead to more bargaining power of workers \n",
            "Minimum prices\n",
            "The government is obliged to intervene to ensure sufficient supplies of staple food in the market\n",
            "The approach of setting minimum prices or price floors will be used so that it will be worthwhile for producers (to make a comfortable profit) to produce essential goods in desired quantities\n",
            "These are prices that are set above the market price by the government \n",
            "Minimum prices however have unwanted side-effects as they cause a surplus in the market \n",
            "Surplus products become a challenge to dispose as they should rather be sold at lower costs, dumped to other countries which is prohibited by the WTO or be destroyed \n",
            "Maximum prices \n",
            "The government will set a maximum price if the price is deemed to be too high for essential goods (basic goods) \n",
            "The maximum price that is set by the government below the market price is known as a price ceiling or maximum price\n" ,
            "The government will intervene in the market by passing law that suppliers may not charge more than a maximum price\n",
            "The immediate effect of maximum prices in the market is that the quantity supplied drops thus causing shortages \n",
            "Shortages in supply for certain goods in the market will result to the establishment of the 'black markets'\n",
            "Redistribution of wealth\n",
            "The South African government uses a progressive income tax system to redistribute income and wealth\n",
            "Traditional methods such as levying various taxes, provisioning of free services, benefits in kind and cash benefits, are used to reduce the income gap \n",
            "The government can also implement redress methods such as BBBEE, affirmative action, land restitution, land redistribution and property subsidies to redistribute wealth among the population\n",
            "Government involvement in production\n",
            "Subsidising merit goods to increase production \n",
            "Imposing taxes on demerit goods to reduce production \n",
            "Levying income taxes, indirect taxes and wealth taxes to provide community goods free of charge \n",
            " Providing collective goods such as refuse removal, waste disposal and sewerage drainage for a user fee\n",
            "BODY: ADDITIONAL PART\n",
            "How can market inefficiency be reduced by global markets (globalization)?\n",
            "allowing foreign direct investment in the economy to increase supply of goods and services.\n",
            "increasing competition in local market and reducing the existence of monopolies\n",
            "increasing the accessibility of information to both consumers and producers for them to make rational or informed decision.\n" ,
            "ensuring efficiency allocation of resources by allowing countries to specialize in production of goods that they have comparative advantage in. \n",
            "increasing mobility of factors of production between different countries. \n",
            "encouraging businesses to be innovative and produce goods and services of better quality for consumers.\n",
            "increasing consumers' choice on goods and services\n",
            "CONCLUSION\n",
            "Market failure may also result in inefficiencies in the way resources are allocated and used in producing goods and services\n"],
        marks: 40
    },
    {
        id: "6",
        text: "QUESTION 6: CONTEMPORARY ECONOMIC ISSUES          40 MARKS – 40 MINUTES\n\n" +
            "Discuss the consequences of inflation. (26 marks)\n\n" +
            "How does foreign direct investment influence inflation in the economy? (10 marks)",
        type: "essay",
        correctKeywords: ["creditors lose purchasing power",
            "debtors benefit",
            "fixed incomes",
            "real wages fall",
            "income distribution",
            "pensioners",
            "investors and savers",
            "fixed assets lose value",
            "interest rates",
            "taxpayers pay more",
            "bracket creep",
            "industrial unrest",
            "wage demands",
            "violence",
            "exports decrease",
            "import prices fall",
            "balance of payments",
            "unemployment",
            "poverty",
            "redistribution of income",
            "psychological influence",
            "low inflation expectations",
            "high inflation expectations",
            "panic buying",
            "reduced savings",
            "consumer confidence",
            "increase production",
            "aggregate supply",
            "stabilize prices",
            "efficient production techniques",
            "reduce production costs",
            "cost-push inflation",
            "increase competition",
            "strengthen the rand",
            "reduce import costs",
            "improve technology",
            "increase productivity",
            "create employment",
            "stimulate demand",
            "aggregate demand",
            "capital investment",
            "increase real wages"],
        correctAnswerText: ["INTRODUCTION\n",
            "Inflation refers to a sustained and significant increase in the general level of prices over a period of time\n",
            "BODY: MAIN PART\n",
            "Creditors\n",
            "Creditors (lenders) suffer due to price increases because they get money back which has a lower purchasing power, especially if the interest rate has been below the inflation rate / inflation harm creditors as they lose due to a fall in the real value of money \n",
            "Changes in price levels affect debtors and creditors differently at different time periods \n",
            "Debtors\n",
            "Debtors (borrowers) receive money with a high buying power and pay back with money with a lower buying power\n",
            "Borrowers benefit from price increases \n",
            "During periods of rising prices, debtors gain in real terms because the contract was signed in advance and cannot be changed\n" ,
            "Debtors receive the money with a relatively high purchasing power and repay their loans with low purchasing power, unless interest rates are sufficient to prevent the situation\n",
            "Salary and wage earners\n",
            "Price increases affect people negatively because their incomes are relatively fixed\n",
            "Real wages fall sharply during period of high inflation as a result of a decline in capital stock and a shift in relative prices\n",
            "Inflation can impoverish large segments of the population by eroding the real wages\n",
            "Relative wages are the important component of wealth; they constitute the main source of income for many households, especially for the less well-off\n",
            "The behaviour of real wages therefore has a direct bearing on income distribution and the level of poverty\n",
            "This group includes retired people, pensioners and the poor, that will experience the erosion of spending power and eventually earn too little to survive\n",
            "Wage increases are lower than the inflation rate increase\n",
            "Investors and savers\n",
            "Assets with a fixed nominal value have a fixed return and lower purchasing power as prices increase\n",
            "Purchasing power is reduced unless the interest rate is above the inflation rate \n",
            "People who invest in negotiable instruments such as shares, often benefit from inflation, because during periods of inflation, interest rates are increased to encourage savings\n",
            "Investors in assets with flexible market value gain when prices increase, because their assets with a flexible market value increase at least proportionately to the rate of inflation\n",
            "Often, the prices of these assets increase more rapidly than increases in the general price level \n",
            "People save money for long periods with the aim of using these funds to meet future expectations, these savings may be invested as fixed deposits, in the money market, as life policies or in pension funds \n",
            "Tax payers\n",
            "With inflation taxpayers' nominal income rise although their real income remain unchanged, because taxes are levied on the nominal income but not on real income, and this affects the purchasing power of tax payers\n",
            "Taxes are levied on nominal income and not on real income \n",
            "If the income tax brackets remain unchanged, inflation increases the average rate of personal income tax \n",
            "Individuals will have to pay higher taxes even if they are actually no better off than before – bracket creep leads to a redistribution of income from taxpayers to the government \n",
            "Industrial peace\n" ,
            "Wage bargaining is accompanied by strikes and mass action \n",
            "These actions can sometimes spill over into violence which affects society at large\n",
            "Inflation leads to demands for increased wages as trade unions put increasing pressure on employers to raise wages and salaries\n",
            "In extreme situations, in the presence of exceptionally high inflation together with a government that is determined not to yield to wage increase demands (which can push inflation to even higher levels) widespread civil unrest would follow \n",
            "Inflation has an adverse effect on a country's balance of payments \n" ,
            "If a country's rate of inflation is higher than that of its trading partner, the prices of exported goods increase while the prices of imported goods decrease \n",
            "This leads to loss of competitiveness in the export market leading to a decrease in exports \n",
            "Cheaper imports have a negative effect on a country's balance of payments \n" ,
            "The loss of competitiveness can be a result of increased unemployment \n",
            "Unemployment and poverty\n",
            "The effects of inflation are uneven, because it does not benefit anyone and harms most – some less than others\n",
            "Inflation also tends to redistribute income from low income groups to higher income groups\n",
            "This is because people in the low income groups do not have assets than can rise in value faster than the rate of inflation to help them overcome the effects of inflation\n",
            "Powerful groups such as trade unions, large companies and the wealthy people, are able to increase their share of national income at the expense of disadvantaged people such as pensioners, the unemployed and the welfare recipients \n",
            "Psychological influence (2021 EGs)\n",
            "Low inflation expectations\n",
            "limit excessive wage demands by different labour unions because workers do not expect increases in cost of living in the future \n",
            "allow consumers to postpone consumption expenditure thereby reducing pressure on price increases.\n",
            "give households confidence that inflation rate will be low in future and encourage them to save more from the income, thereby controlling excess demand\n",
            "reduce panic buying by consumers when they expect that prices will be stable in the future \n",
            "boost real interest rates which will encourage savings.\n",
            "increase the burden on debtors which discourages them from borrowing money, due to the real interest rate\n",
            "High inflation expectations\n",
            "Excessive wage demands by different labour unions because workers anticipate increases in cost of living in the future will lead to producers increasing prices in order to recover extra costs of production\n",
            "Prompts consumers to engage in panic buying when they expect prices to rise and thereby increasing pressure on price to rise.\n",
            "Make households to save less, thereby leading to excess demand for goods and services\n",
            "Decreases real interest rates which will discourage savings.\n",
            "Reduce the burden on creditors as they will receive their money at higher interest rates\n",
            "BODY: ADDITIONAL PART\n",
            "Foreign direct investment influences inflation in the economy by:\n" ,
            "increasing the production of goods and services which will increase aggregate supply thus stabilizing prices\n",
            "bringing more efficient production techniques that will reduce production costs, slowing down cost push inflation\n",
            "increasing competition in local markets which will keep local prices low\n",
            "strengthening the rand through higher export volumes which helps to reduce the cost of importing production inputs such as crude oil \n",
            "improving technology in production which increases productivity thereby reducing cost push inflation\n",
            "creating more employment opportunities thereby stimulating consumer\n",
            "spending which contributes to demand pull inflation \n",
            "increasing expenditure on capital goods such as machinery and equipment resulting in increased aggregate demand \n",
            "increasing real wages more than domestic investment, leading to cost push inflation\n",
            "CONCLUSION\n",
            "Unacceptably high inflation rates cause hardships among the poor, the unemployed, low-income earners; proper measures to control it have to be put in place "],
        marks: 40
    }
];

// compute total possible marks (exported helper could be used)
export function totalPossibleMarks(list) {
    return list.reduce((sum, q) => sum + (q.marks || 0), 0);
}

export default questions;
