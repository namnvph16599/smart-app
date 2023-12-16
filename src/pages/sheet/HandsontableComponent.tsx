import React, { useEffect, useRef, useState } from 'react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import * as XLSX from 'xlsx';
import 'handsontable/dist/handsontable.full.css';
import './style.css'
import HyperFormula from 'hyperformula';

type CellStyle = {
    backgroundColor?: string;
    // Add more style properties as needed
};

type ExcelToHandsontableProps = {
    openTimeline: boolean;
};


type Styles = {
    [cellRef: string]: CellStyle;
};
const ExcelToHandsontable: React.FC<ExcelToHandsontableProps> = ({ openTimeline }) => {
    const [data, setData] = useState<Handsontable.CellValue[][]>([]);

    const [styles, setStyles] = useState<any>();
    const hotTableRef = useRef<HotTable>(null);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            readExcelFile(file);
        }
    };

    const readExcelFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const bstr = e.target.result;
            const workbook = XLSX.read(bstr, { type: 'binary', cellStyles: true });
            processData(workbook);
        };
        reader.readAsBinaryString(file);
    };

    const extractStyles = (worksheet: XLSX.WorkSheet): Styles => {
        const styles: Styles = {};

        if (worksheet['!ref']) {
            const range = XLSX.utils.decode_range(worksheet['!ref']);

            for (let R = range.s.r; R <= range.e.r; ++R) {
                for (let C = range.s.c; C <= range.e.c; ++C) {
                    const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
                    const cell = worksheet[cellRef];

                    if (cell && cell.s) {
                        styles[cellRef] = extractCellStyle(cell.s);
                    }
                }
            }
        }

        return styles;
    };


    const extractCellStyle = (cellStyle: any): CellStyle => {
        const style: CellStyle = {};

        console.log(JSON.stringify(cellStyle));
        if (cellStyle?.bgColor) {

            if (cellStyle.bgColor?.rgb) {
                // Ensure the color is in the correct format for CSS
                let color = cellStyle?.bgColor.rgb;
                if (color.length === 8) { // ARGB format from Excel
                    color = color.slice(2); // Strip the alpha component
                }
                style.backgroundColor = `#${color}`;
            } else if (cellStyle.bgColor.theme) {
                // Handle theme color conversion if needed
                // You might need additional logic here
            }
            console.log(style.backgroundColor); // Log the extracted color
        }

        // Add more style properties as needed

        return style;
    };



    const processData = (workbook: XLSX.WorkBook) => {
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const cellsStyle = extractStyles(worksheet);

        setStyles(cellsStyle);

        setData(jsonData as Handsontable.CellValue[][]);
    };

    const handleSave = () => {
        if (hotTableRef.current) {
            // Access the hotInstance and then call getData
            const hotInstance = hotTableRef.current.hotInstance;
            const currentData = hotInstance?.getData();

            console.log(JSON.stringify(currentData));
        }
    };

    const [isEditingFormula, setIsEditingFormula] = useState(false);
    const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());

    const handleCellClick = (rowIndex: any, columnIndex: any) => {
        if (isEditingFormula) {
            const cellAddress = `${Handsontable.helper.spreadsheetColumnLabel(columnIndex)}${rowIndex + 1}`;
            setSelectedCells(prevSelectedCells => new Set(prevSelectedCells).add(cellAddress));
        }
    };

    const cellProperties = (row: any, col: any) => {
        const cellAddress = `${Handsontable.helper.spreadsheetColumnLabel(col)}${row + 1}`;
        if (selectedCells.has(cellAddress)) {
            return {
                className: 'highlighted-cell'
            };
        }
        return {};
    };

    const [tableSize, setTableSize] = useState({ width: '100%', height: '100%' });

    useEffect(() => {
        function handleResize() {
            // Example: Set width to 80% of window width, but not more than 1200px
            const dynamicWidth = Math.min(openTimeline ? window.innerWidth * 0.8 : window.innerWidth * 0.95);
            // Example: Set height to a fixed value
            const dynamicHeight = 500;

            setTableSize({ width: `${dynamicWidth}px`, height: `${dynamicHeight}px` });
        }

        // Call the function to set initial size
        handleResize();

        // Set up the event listener
        window.addEventListener('resize', handleResize);

        // Clean up the event listener
        return () => window.removeEventListener('resize', handleResize);
    }, [openTimeline]);




    const hyperFormulaInstance = HyperFormula.buildEmpty({});

    return (
        <div id="handsontable-container">

            <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />

            <button onClick={handleSave}>Save Data</button>

            <HotTable
                className="white-background"
                data={data}
                ref={hotTableRef}
                formulas={{
                    engine: hyperFormulaInstance,
                }}

                cells={function (row, col, prop) {
                    const cellProperties = {} as Handsontable.CellProperties;

                    // Encode the current cell's reference
                    const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
                    // Retrieve the style for the current cell
                    const cellStyle = styles[cellRef];

                    // Check if there's a style to be applied
                    if (cellStyle) {

                        cellProperties.renderer = function (instance, td, row, col, prop, value, cellProperties) {
                            // Apply the default text renderer
                            Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties]);
                            //console.log(cellStyle.backgroundColor);
                            td.style.backgroundColor = cellStyle.backgroundColor;
                            // Apply the extracted background color style
                            if (cellStyle.backgroundColor) {
                                td.style.backgroundColor = cellStyle.backgroundColor;
                            }
                            // Add more style applications as needed
                        };
                    }

                    return cellProperties;
                }}
                //cells={cellProperties}
                afterOnCellMouseDown={handleCellClick}
                colHeaders={true}
                rowHeaders={true}
                minSpareRows={0}
                minSpareCols={0}
                //height='auto'
                licenseKey="non-commercial-and-evaluation"
                stretchH="all"
                 width={tableSize.width}
                height={tableSize.height}
            />
        </div>
    );
};

export default ExcelToHandsontable;
