export default function PaperHeader({ title, date, pages, isMemo = false }) {
    return (
        <div style={{
            border: '4px solid black',
            background: 'white',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            color: 'black',
            textAlign: 'center',
            marginBottom: '30px'
        }}>
            {/* Coat of Arms */}
            <div style={{ marginBottom: '20px' }}>
                <img
                    src="/images/coatOfArm.png"
                    alt="SA Coat of Arms"
                    style={{position: 'relative', top: '1px', left: '460px'}}
                />
            </div>

            {/* DBE */}
            <div style={{ marginBottom: '15px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0' }}>basic education</h1>
                <p style={{ fontSize: '14px', fontWeight: 'bold', margin: '5px 0' }}>
                    Department:<br/>
                    Basic Education<br/>
                    REPUBLIC OF SOUTH AFRICA
                </p>
            </div>

            {/* NSC */}
            <div style={{ marginBottom: '15px' }}>
                <div style={{
                    background: 'black',
                    color: 'white',
                    padding: '10px 40px',
                    borderRadius: '30px',
                    display: 'inline-block',
                    fontWeight: 'bold'
                }}>
                    NATIONAL SENIOR CERTIFICATE
                </div>
            </div>

            {/* Grade 12 */}
            <div style={{ marginBottom: '20px' }}>
                <div style={{
                    background: '#a8dadc',
                    color: 'black',
                    padding: '8px 30px',
                    borderRadius: '30px',
                    display: 'inline-block',
                    border: '2px solid black',
                    fontWeight: 'bold'
                }}>
                    GRADE 12
                </div>
            </div>

            {/* Yellow Banner */}
            <div style={{ marginBottom: '20px' }}>
                <div style={{
                    background: '#fff9a6',
                    border: '4px dotted #003087',
                    padding: '15px 40px',
                    borderRadius: '15px',
                    display: 'inline-block'
                }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>{title}</h2>
                    {isMemo && <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '5px 0' }}>MARKING GUIDELINES</p>}
                    <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '0' }}>{date}</p>
                </div>
            </div>

            {/* Marks */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                textAlign: 'left',
                marginBottom: '15px',
                fontWeight: 'bold'
            }}>
                <div>
                    <p>MARKS: 150</p>
                    <p>TIME: 2 hours</p>
                </div>
                <div style={{ textAlign: 'right', fontStyle: 'italic', fontSize: '12px' }}>
                    {isMemo
                        ? `These marking guidelines consist of ${pages} pages.`
                        : `This question paper consists of ${pages} pages.`}
                </div>
            </div>

            {/* Footer */}
            <div style={{
                borderTop: '2px solid black',
                paddingTop: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                fontStyle: 'italic'
            }}>
                <span>Copyright reserved</span>
                <span>Please turn over</span>
            </div>
        </div>
    )
}