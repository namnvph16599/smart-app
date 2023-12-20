import React, { useEffect, useMemo, useRef, useState } from 'react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import * as XLSX from 'xlsx';
import 'handsontable/dist/handsontable.full.css';
import './style.css'
import HyperFormula from 'hyperformula';
import { useFindOneTemplateQuery } from '../../graphql/queries/findOneTemplate.generated';
import { Button, Col, Row } from 'antd';
import { TimelineQuote } from '../quotation/components';
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

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

interface Field {
  fieldName: string;
  type: string;
}

interface CellCoords {
  row: number;
  col: number;
}

interface ColumnSettings {
  data: string;
  type?: string;
  title: string;
  source?: string[];
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


function columnIndexToLetter(index: number): string {
  let letter = '';
  let currentIndex = index;
  while (currentIndex >= 0) {
    letter = String.fromCharCode('A'.charCodeAt(0) + (currentIndex % 26)) + letter;
    currentIndex = Math.floor(currentIndex / 26) - 1;
  }
  return letter;
}

const htmlRenderer: Handsontable.renderers.BaseRenderer = (instance: Handsontable, td: HTMLTableCellElement, row: number, col: number, prop: string | number, value: any, cellProperties: CellProperties) => {
    Handsontable.renderers.HtmlRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties]);
    td.innerHTML = value; // Set the cell's HTML to the value
  };

const handsontableColumns = template?.dynamicFields?.map((field: Field, index: number) => {
   const columnLetter = columnIndexToLetter(index); 
  const column:any = {  title: `${field.fieldName}  (${columnLetter})`, renderer: htmlRenderer};
 // data: field.fieldName,
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


        const fieldNames = template?.dynamicFields?.map((field: { fieldName: any; }) => field.fieldName) || [];

        // Determine the number of columns based on fieldNames length
        const numberOfColumns = fieldNames.length;

        // Set the number of rows, including the header row
        const numberOfRows = 100;/* your desired number of rows, including the header */;

        // Initialize the data array with fieldNames as the first row
        const data = Array.from({ length: numberOfRows }, (_,) =>
    new Array(numberOfColumns).fill('')
);

        //console.log(JSON.stringify(input1) );

        //console.log(JSON.stringify(data) );
        
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

        //setColumns(columns);
        console.log(jsonData);
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

    const handleCellMouseOver = (event: MouseEvent, coords: Handsontable.CellCoords, TD: HTMLTableCellElement) => {
    if (coords.row < 0 || !hotTableRef.current?.hotInstance) {
        return;
    }

    const hotInstance = hotTableRef.current.hotInstance;
    const index = coords.row;

    for (let i = 0; i < hotInstance.countCols(); i++) {
        if (coords.col >= -1) {
            hotInstance.setCellMeta(index, i, 'className', 'myRow');
        }
    }

        hotInstance.render();
    };

    const handleCellMouseOut = (event: MouseEvent, coords: Handsontable.CellCoords, TD: HTMLTableCellElement) => {
        if (!hotTableRef.current?.hotInstance) {
            return;
        }

        const hotInstance = hotTableRef.current.hotInstance;
        const index = coords.row;

        for (let i = 0; i < hotInstance.countCols(); i++) {
            if (coords.col >= -1) {
                hotInstance.removeCellMeta(index, i, 'className', 'myRow');
            }
        }
    };

    const indexToColumnLetter = (index: number): string => {
    let letter = '';
    let tempIndex = index;
    while (tempIndex >= 0) {
        letter = String.fromCharCode('A'.charCodeAt(0) + (tempIndex % 26)) + letter;
        tempIndex = Math.floor(tempIndex / 26) - 1;
    }
    return letter;
};

const customCellProperties = (row: number, col: number, prop: any) => {
        const cellProperties: Partial<Handsontable.CellProperties> = {};
        if (row === 0) {
            cellProperties.readOnly = true;
            
        }
        return cellProperties;
    };

    const addRows = (numberOfRowsToAdd: number): void => {
        const newData = [...data, ...Array.from({ length: numberOfRowsToAdd }, () => new Array(columns.length).fill(''))];
        setData(newData);
    };

    const afterScrollVertically = (): void => {
        const instance = hotTableRef.current?.hotInstance;
        if (instance && instance.rowIndexMapper.getRenderableIndexes().slice(-1)[0] === data.length - 1) {
            addRows(5); // Add 5 more rows
        }
    };

    const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
    const [cellValue, setCellValue] = useState<string | null>(null);

    const handleAfterSelection = (row: number, column: number) => {
    const instance = hotTableRef.current?.hotInstance;
    if (instance) {
      const value = instance.getDataAtCell(row, column);
      setSelectedCell({ row, col: column });
      setCellValue(value);
    }
  };

  // This method updates the actual data in the Handsontable instance
  // when the formula bar value changes
  const handleFormulaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCellValue(value);

    if (selectedCell) {
      const instance = hotTableRef.current?.hotInstance;
      if (instance) {
        instance.setDataAtCell(selectedCell.row, selectedCell.col, value);
      }
    }
  };

  useEffect(() => {
    const hotInstance = hotTableRef.current?.hotInstance;
    const container = hotInstance?.rootElement;

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    container?.addEventListener('contextmenu', handleContextMenu);

    return () => {
      container?.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);
  

  const insertImage = (file: File, row: number, col: number) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgHtml = `<img src="${e.target?.result}" style="max-width: 100px; max-height: 100px;">`;
      const newData = [...data];
      newData[row][col] = imgHtml;
      setData(newData);
      hotTableRef.current?.hotInstance?.render();
    };
    reader.readAsDataURL(file);
  };

   const hotSettings: Handsontable.GridSettings = {
    columns: columns,
    data: data,
    // ... other settings ...
    contextMenu: {
      items: {
        "insert_image": {
          name: 'Insert image',
          callback: function(key, selections) {
            if (key === 'insert_image' && selections.length > 0) {
              const startRow = selections[0].start.row;
              const startCol = selections[0].start.col;

              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                  insertImage(file, startRow, startCol);
                }
              };
              input.click();
            }
          }
        },
        // ... other context menu items ...
      }
    },
    // ... other settings ...
  };


    const hyperFormulaInstance = HyperFormula.buildEmpty({});

    return (

    <div id="handsontable-container" className="px-32px pb-32px">
    <Row>
      <Col span={20}><input
                            type="text"
                            value={cellValue || ''}
                            onChange={handleFormulaChange}
                            placeholder="Select a cell to edit its content"
                        />
        </Col>
      <Col span={4}><input type="file" title='Import' onChange={handleFileChange} accept=".xlsx, .xls" /></Col>
    </Row>
           
      <Row>
            <HotTable
                className="white-background"
                afterScrollVertically={afterScrollVertically}
                data={data}
                settings={hotSettings}
                columns={columns}
                colHeaders={["A", "1001", "1002", "1003", "1004", "1005"]}
                ref={hotTableRef}
                formulas={{
                    engine: hyperFormulaInstance,
                }}
                manualColumnResize={true}
                manualRowResize={true}
                autoColumnSize={false}
                autoRowSize={true}
                autoWrapRow={true}
                autoWrapCol={true}

                //cells={cellProperties}
                filters={true}
                rowHeaders={true}
                //minSpareRows={0}
                //minSpareCols={0}
                
                //afterOnCellMouseOver={handleCellMouseOver}
                //afterOnCellMouseOut={handleCellMouseOut}
                //afterOnCellMouseDown={handleCellClick}
                //height='auto'
                licenseKey="non-commercial-and-evaluation"
                stretchH="all"
                width={tableSize.width}
                height={tableSize.height}
            />
      </Row>
            
        </div>
    );
};

export default ExcelToHandsontable;
