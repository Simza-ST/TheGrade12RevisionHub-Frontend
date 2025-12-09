export const generateExamImage = (type, customData = {}) => {
    const imageTemplates = {
        // Section B Images
        who: {
            bg: '#1a5276',
            title: 'WORLD HEALTH ORGANIZATION',
            subtitle: 'COVID-19 Global Response',
            content: ['• Pandemic Monitoring', '• Travel Guidelines', '• Health Protocols', '• Global Coordination']
        },
        airport: {
            bg: '#2874a6',
            title: 'AIRPORT SECURITY',
            subtitle: 'Restricted Items',
            content: ['✓ Liquids: Max 100ml', '✓ Perfumes: Max 50ml', '✓ Cigarettes: Max 200', '✗ Sharp Objects', '✗ Lighters', '✗ Aerosols over 150ml']
        },
        flight: {
            bg: '#2e86c1',
            title: 'FLIGHT ITINERARY',
            subtitle: 'Asian Tour',
            content: ['JNB → DXB: 08:00-16:00 (8h)', 'DXB → SIN: 22:00-06:00 (8h)', 'SIN → BKK: 12:00-15:00 (3h)', 'Total: 19 hours flying']
        },
        exchange: {
            bg: '#3498db',
            title: 'FOREIGN EXCHANGE',
            subtitle: 'Exchange Rates',
            content: ['1 ZAR = 0.85 INR', '1 ZAR = 2.15 THB', 'Budget: ZAR 25,000', 'INR: 21,250', 'THB: 53,750']
        },

        // Section C Images
        attractions: {
            bg: '#27ae60',
            title: 'WORLD ATTRACTIONS',
            subtitle: 'Visitor Statistics',
            content: ['A: Niagara Falls - 30M', 'B: Venice City - 25M', 'C: Sydney Opera - 10M', 'North America, Europe, Australia']
        },
        giza: {
            bg: '#d35400',
            title: 'GIZA NECROPOLIS',
            subtitle: 'Egypt - Africa',
            content: ['Great Pyramid of Giza', 'Pyramid of Khafre', 'Great Sphinx', 'UNESCO World Heritage Site']
        },
        isimangaliso: {
            bg: '#16a085',
            title: 'iSIMANGALISO WETLAND',
            subtitle: 'KwaZulu Natal - South Africa',
            content: ['Natural Heritage Site', 'UNESCO Protected', 'Marine & Wildlife', 'Proposed Development']
        },
        marketing: {
            bg: '#8e44ad',
            title: 'SOUTH AFRICAN TOURISM',
            subtitle: 'Marketing Campaign',
            content: ['Brand Logo', 'Industry Partnerships', 'Tourism Levy', 'International Promotion']
        },

        // Section D Images
        corporate: {
            bg: '#c0392b',
            title: 'CORPORATE IDENTITY',
            subtitle: 'Business Image',
            content: ['Logo & Branding', 'Employee Conduct', 'Online Presence', 'Customer Service']
        },
        rain: {
            bg: '#2980b9',
            title: 'RAIN INITIATIVE',
            subtitle: 'Corporate Social Investment',
            content: ['Community Support', 'Education Programs', 'Health Projects', 'Sustainable Development']
        },
        handwashing: {
            bg: '#f39c12',
            title: 'HYGIENE PROGRAM',
            subtitle: 'Hand Washing Stations',
            content: ['School Installations', 'Health Promotion', 'Disease Prevention', 'Community Safety']
        },

        // Section E Images
        covid: {
            bg: '#e74c3c',
            title: 'COVID-19 PROTOCOLS',
            subtitle: 'Health & Safety',
            content: ['Social Distancing', 'Mask Wearing', 'Sanitization', 'Health Screening']
        },
        arrivals: {
            bg: '#9b59b6',
            title: 'TOURIST ARRIVALS 2020',
            subtitle: 'South Africa',
            content: ['Jan: 1.2M', 'Feb: 1.1M', 'Mar: 0.9M', 'Apr: 0.1M', 'May: 0.05M', 'Significant Decline']
        },
        recovery: {
            bg: '#1abc9c',
            title: 'TOURISM RECOVERY',
            subtitle: 'Government Partnership',
            content: ['Marketing Campaigns', 'Safety Protocols', 'Financial Support', 'Job Creation']
        },
        thailand: {
            bg: '#e67e22',
            title: 'THAILAND TOURISM',
            subtitle: 'Confidence Restoration',
            content: ['Eat Safe Certification', 'Screening App', 'Health Standards', 'Visitor Safety']
        }
    };

    const template = imageTemplates[type] || {
        bg: '#7f8c8d',
        title: 'EXAM IMAGE',
        subtitle: 'Study this information',
        content: ['Relevant content', 'for exam question']
    };

    // Merge with custom data if provided
    const finalTemplate = { ...template, ...customData };

    return (
        <div style={{
            width: '100%',
            maxWidth: '600px',
            height: '300px',
            backgroundColor: finalTemplate.bg,
            borderRadius: '10px',
            padding: '20px',
            color: 'white',
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            margin: '0 auto',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            border: '2px solid #ddd'
        }}>
            <h3 style={{
                margin: '0 0 10px 0',
                fontSize: '24px',
                fontWeight: 'bold',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}>
                {finalTemplate.title}
            </h3>
            {finalTemplate.subtitle && (
                <p style={{
                    margin: '0 0 20px 0',
                    fontSize: '16px',
                    opacity: 0.9,
                    fontStyle: 'italic'
                }}>
                    {finalTemplate.subtitle}
                </p>
            )}
            <div style={{ lineHeight: '1.8' }}>
                {finalTemplate.content.map((line, index) => (
                    <div key={index} style={{ fontSize: '14px' }}>
                        {line}
                    </div>
                ))}
            </div>
        </div>
    );
};

