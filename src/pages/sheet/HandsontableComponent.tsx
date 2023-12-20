import React, { useEffect, useMemo, useRef, useState } from 'react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import * as XLSX from 'xlsx';
import 'handsontable/dist/handsontable.full.css';
import './style.css'
import HyperFormula from 'hyperformula';
import { useFindOneTemplateQuery } from '../../graphql/queries/findOneTemplate.generated';

type CellStyle = {
    backgroundColor?: string;
    // Add more style properties as needed
};

type ExcelToHandsontableProps = {
    openTimeline: boolean;
};

interface Column {
  // Define the properties of your column objects here
  data: string;
  title:string;
  type:string;
}


type Styles = {
    [cellRef: string]: CellStyle;
};
const ExcelToHandsontable: React.FC<ExcelToHandsontableProps> = ({ openTimeline }) => {
    const [data, setData] = useState<Handsontable.CellValue[][]>([]);
    const [columns, setColumns] = useState<Column[]>([]);


    const [styles, setStyles] = useState<any>();
    const hotTableRef = useRef<HotTable>(null);

    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        // Fetch data from the API
        /*fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((apiData) => {
            //setData(apiData);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });*/

        // Fetch user data from the API to populate the dropdown list
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((apiUsers) => {
            setUsers(apiUsers);
        })
        .catch((error) => {
            console.error("Error fetching users:", error);
        });

        
        

  }, []);


  


  
   


  const userNames = users && users.map((user) => user.name);


    /*const columns: Handsontable.ColumnSettings[] = [
        {
        data: "title",
        title: "Title",
        },
        {
        data: "userId",
        title: "User",
        type: "customDropdown", // Use the registered custom cell type
        source: userNames, // Populate the dropdown source with user names
        },
        {
        data: "body",
        title: "Body",
        },
    ];*/


    const { data:dataTemplate, loading: getting } = useFindOneTemplateQuery({
        variables: {
        id: "65804c236a94f3035dc8fe82",
        },
        skip: !"65804c236a94f3035dc8fe82",
    });

    const template = useMemo(() => dataTemplate?.findOneTemplate, [dataTemplate]);


const handsontableColumns = template?.dynamicFields?.map((field: { fieldName: any; type: any; }) => {
  const column:any = { data: field.fieldName, title: field.fieldName};

  switch (field.type) {
    case "text":
      // No specific configuration needed for text
     
      column.type = "text";
      break;
    case "number":
      column.type = "numeric";
      break;
    case "array":
    case "dropdownlist":
      column.type = "dropdown";
      // You would need to fetch the dropdown data from the URL provided
      // For simplicity, let's assume it's already fetched and stored in a variable
      column.source = userNames; // dropdownData should be an array of values
      break;
    default:
      // Handle any other types or default case
  }

  return column;
});



    useEffect(() => {


        const fieldNames = template?.dynamicFields?.map((field: { fieldName: any; }) => field.fieldName);
        const input1 = [fieldNames];

        const numberOfRows = 100;
        const numberOfColumns = 10;
        const data = Array.from({ length: numberOfRows }, () => 
        new Array(numberOfColumns).fill('')
        );

        console.log(JSON.stringify(input1) );

        console.log(JSON.stringify(handsontableColumns) );
        
        setData(data as Handsontable.CellValue[][]);
        setColumns(handsontableColumns);

  }, [template, users]);

 

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
        console.log(JSON.stringify(jsonData));
        
        const headers: string[] = jsonData[0] as string[];

        const columns = headers.map((header: string) => {
            let columnConfig:any = { data: header,
        title: header };

            // Add specific configurations based on header name if needed
            // Example:
            columnConfig.type = 'text';
            if (header === "Price" || header === "Rating") {
                columnConfig.type = 'numeric';
            }

            // Add more conditions for other specific headers if necessary

            return columnConfig;
            });

        setColumns(columns);
        console.log(columns);
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
                columns={columns}
                ref={hotTableRef}
                formulas={{
                    engine: hyperFormulaInstance,
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
