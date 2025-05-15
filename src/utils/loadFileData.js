import * as XLSX from 'xlsx';

const filledCell = (cell) => {
    return cell !== '' && cell != null;
};

export const loadFileData = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                // Extract base64 data (remove "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," prefix)
                const base64Data = e.target.result.split(',')[1];
                const workbook = XLSX.read(base64Data, { type: 'base64' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];

                // Convert sheet to JSON to filter blank rows
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false, defval: '' });
                // Filter out blank rows
                const filteredData = jsonData.filter((row) => row.some(filledCell));

                // Heuristic to find the header row
                const headerRowIndex = filteredData.findIndex(
                    (row, index) => row.filter(filledCell).length >= (filteredData[index + 1]?.filter(filledCell).length || 0)
                );
                const finalHeaderIndex = headerRowIndex === -1 || headerRowIndex > 25 ? 0 : headerRowIndex;

                // Convert filtered JSON back to CSV
                const csvSheet = XLSX.utils.aoa_to_sheet(filteredData.slice(finalHeaderIndex));
                const csv = XLSX.utils.sheet_to_csv(csvSheet, { header: 1 });

                resolve(csv);
            } catch (error) {
                console.error('Error processing XLSX file:', error);
                reject('');
            }
        };
        reader.onerror = () => reject('');
        reader.readAsDataURL(file); // Reads as base64
    });
};