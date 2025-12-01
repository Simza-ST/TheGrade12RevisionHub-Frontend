import React from 'react';

const FormulaSheet = () => {
    return (
        <div className="formula-sheet">
            <h3>GRADE 12 ACCOUNTING FINANCIAL INDICATOR FORMULA SHEET</h3>
            <table className="formula-table">
                <tbody>
                <tr>
                    <td>Gross profit x 100<br />Sales 1</td>
                    <td>Gross profit x 100<br />Cost of sales 1</td>
                </tr>
                <tr>
                    <td>Net profit before tax x 100<br />Sales 1</td>
                    <td>Net profit after tax x 100<br />Sales 1</td>
                </tr>
                <tr>
                    <td>Operating expenses x 100<br />Sales 1</td>
                    <td>Operating profit x 100<br />Sales 1</td>
                </tr>
                <tr>
                    <td>Total assets : Total liabilities</td>
                    <td>Current assets : Current liabilities</td>
                </tr>
                <tr>
                    <td>(Current assets – Inventories) : Current liabilities</td>
                    <td>Non-current liabilities : Shareholders' equity</td>
                </tr>
                <tr>
                    <td>(Trade & other receivables + Cash & cash equivalents) : Current liabilities</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Average trading stock x 365<br />Cost of sales 1</td>
                    <td>Cost of sales<br />Average trading stock</td>
                </tr>
                <tr>
                    <td>Average debtors x 365<br />Credit sales 1</td>
                    <td>Average creditors x 365<br />Cost of sales 1</td>
                </tr>
                <tr>
                    <td>Net income after tax x 100<br />Average shareholders' equity 1</td>
                    <td>Net income after tax x 100<br />Number of issued shares 1<br />(*See note below)</td>
                </tr>
                <tr>
                    <td>Net income before tax + Interest on loans x 100<br />Average shareholders' equity + Average non-current liabilities 1</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Shareholders' equity x 100<br />Number of issued shares 1</td>
                    <td>Dividends for the year x 100<br />Number of issued shares 1</td>
                </tr>
                <tr>
                    <td>Interim dividends x 100<br />Number of issued shares 1</td>
                    <td>Final dividends x 100<br />Number of issued shares 1</td>
                </tr>
                <tr>
                    <td>Dividends per share x 100<br />Earnings per share 1</td>
                    <td>Dividends for the year x 100<br />Net income after tax 1</td>
                </tr>
                <tr>
                    <td colSpan="2">Total fixed costs<br />Selling price per unit – Variable costs per unit</td>
                </tr>
                </tbody>
            </table>
            <p><strong>NOTE:</strong> * In this case, if there is a change in the number of issued shares during a financial year, the weighted-average number of shares is used in practice.</p>
        </div>
    );
};

export default FormulaSheet;