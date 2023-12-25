import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
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
import { Input } from 'antd';
import _ from 'lodash';
import { useFindSheetsByQuotationAndStageQuery } from '../../graphql/queries/findSheetsByQuotationAndStage.generated';
import { useFindOneTemplateByNameQuery } from '../../graphql/queries/findOneTemplateByName.generated';

type CellStyle = {
    backgroundColor?: string;
    // Add more style properties as needed
};

type ExcelToHandsontableProps = {
    openTimeline: boolean;
    quoteId:string;
    stage:string;
};

interface ChangeEvent {
        changes: Handsontable.CellChange[] | null;
        source: Handsontable.ChangeSource;
    }

    
type Column = {
  data: string;
  title: string;
  type: string;
  renderer?: any; // Define more specific type if available
  source?: string[]; // For dropdown columns
};

interface Field {
  fieldName: string;
  type: string;
}

type DataRow = {
  [key: string]: Handsontable.CellValue;
};

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

export interface ExcelToHandsontableRef {
  getData: () => any;
  resetData: () => any;
}

const ExcelToHandsontable = forwardRef<ExcelToHandsontableRef, ExcelToHandsontableProps>((props, ref) => {
    const [data, setData] = useState<Handsontable.CellValue[][]>([]);
    const [columns, setColumns] = useState<Column[]>([]);
    const { openTimeline, quoteId, stage } = props;

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

    const stageMappings: Record<number, string> = {
      0:'working_recap',
      1: 'initial_volumes',
      2: 'admin_check',
      3: 'pre_class',
      4: 'phasing',
      5: 'pack_copy',
      6: 'template',
    };

    function mapStageToName(stage: any): string {
      return stageMappings[stage] || 'unknown_stage';
    }

    const { data: dataTemplate, loading: getting, refetch: refetchTemplate } = useFindOneTemplateByNameQuery({
        variables: {
          name: mapStageToName(stage),
        }
    });

      /*const { data: dataTemplate, loading: getting, refetch: refetchTemplate } = useFindOneTemplateQuery({
        variables: {
          id: "65804c236a94f3035dc8fe82",
        }
    });*/

    useEffect(() => {
  const fetchData = async () => {
    try {
      await refetchTemplate({
        name: mapStageToName(stage),
        // Add other variables as needed
      });
    } catch (error) {
      console.error("Error refetching data:", error);
    }
  };

  fetchData();
}, [stage, quoteId, refetchTemplate, dataTemplate]);

    const template = useMemo(() => dataTemplate?.findOneTemplateByName, [dataTemplate]);

    useEffect(() => {
        const handsontableColumns1 = template?.dynamicFields?.map((field: Field, index: number) => {
          const columnLetter = columnIndexToLetter(index); 
          const column:any = { readOnly: false, data: toCamelCase(field.fieldName) , title: `${field.fieldName}  (${columnLetter})`, renderer: htmlRenderer};
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
          column.readOnly= false;
          return column;
        });

        if (Array.isArray(handsontableColumns1)) {
        setColumns(handsontableColumns1);
        }

     }, [dataTemplate, columns]);


    const { data:sheetTemplate, loading: gettingSheet, refetch  } = useFindSheetsByQuotationAndStageQuery({
        variables: {
          quoteId:quoteId,
          stage:stage.toString()
        },
    });

    useEffect(() => {
    refetch({
      quoteId: quoteId,
      stage: stage.toString(),
    });
  }, [stage, quoteId, refetch]);

    const sheet = useMemo(() => sheetTemplate?.findSheetsByQuotationAndStage, [sheetTemplate]);


  


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


  function toCamelCase(input: string): string {
    return input
        // Trim leading/trailing spaces and convert to lowercase
        .trim().toLowerCase()
        // Split by spaces
        .split(' ')
        // Filter out empty strings (in case of multiple consecutive spaces)
        .filter(word => word)
        // Convert the first letter of each word (except the first) to uppercase
        .map((word, index) => 
            index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
        )
        // Join the words without spaces
        .join('');
}


const handsontableColumns = template?.dynamicFields?.map((field: Field, index: number) => {
   const columnLetter = columnIndexToLetter(index); 
  const column:any = {  readOnly: false, data: toCamelCase(field.fieldName) , title: `${field.fieldName}  (${columnLetter})`, renderer: htmlRenderer};
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
      column.source = userNames; // dropdownData should be an array of values
      break;
    default:
      // Handle any other types or default case
  }
  column.readOnly= false;
  return column;
});

  
     

    useEffect(() => {
  if ((!data || data?.length === 0) && template) {
    if (sheet?.length > 0) {
      const newData = _.cloneDeep(sheet[0]?.dynamicFields);
      setData(newData as Handsontable.CellValue[][]);
    } else {
      const numberOfRows = 100;

      const emptyRow = columns.reduce((acc: { [x: string]: string; }, column: { data: string | number; }) => {
        acc[column.data] = '';
        return acc;
      }, {});
        const data = Array.from({ length: numberOfRows }, () => ({ ...emptyRow }));
        setData(data as Handsontable.CellValue[][]);
              
    }
  }
}, [data, template, stage, sheet, columns]);

    

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

 const hasNonEmptyValue = (row: (string | number | null)[]): boolean => {
  return row.some(value => value !== '' && value !== null);
};

    const transformData = (handsontableData: Handsontable.CellValue[][]) => {
      const columnNames = columns.map((column: { data: any; }) => column.data);

      const initData =  handsontableData.map(row => {
        const rowData: DataRow = {};
        row.forEach((cell, index) => {
          const columnName = columnNames[index];
          rowData[columnName] = cell;
        });
        return rowData;
      });

    

  // Filter out records with at least one non-empty value
      const filteredData = initData.filter(item => hasNonEmptyValue(Object.values(item)));
      return filteredData;

      };

  useImperativeHandle(ref, () => ({
    getData: () => {

      const rawHandsontableData = hotTableRef.current?.hotInstance?.getData() || [];
      return {
        id:sheet[0]?.id,
        data: transformData(rawHandsontableData),
      };
    },
    resetData: () => {
      
      setData([]);
      setColumns([]);
      
    },
  }));

    function composeData(jsonData: any): Array<{ [key: string]: string | number }> {
  const headerRow = jsonData[0];
  const dataWithoutHeader = jsonData.slice(1);

  const composedData = dataWithoutHeader.map((row: { [x: string]: string | number; }) => {
    const composedObject: { [key: string]: string | number } = {};
    handsontableColumns.forEach((column: { data: string | number; }, index: string | number) => {
      composedObject[column.data] = row[index];
    });
    return composedObject;
  });

  return composedData;
}


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
        const thm = composeData(jsonData);
        console.log(thm);
        setData(thm as Handsontable.CellValue[][]);
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
        
        const emptyRow = handsontableColumns.reduce((acc: { [x: string]: string; }, column: { data: string | number; }) => {
        acc[column.data] = '';
        return acc;
      }, {});

        const addedData = Array.from({ length: numberOfRowsToAdd }, () => ({ ...emptyRow }));
        const newData =[...data, ...addedData];
        
        setData(newData);
    };

    const afterScrollVertically = (): void => {
        const instance = hotTableRef.current?.hotInstance;
        if (instance && instance.rowIndexMapper.getRenderableIndexes().slice(-1)[0] === data.length - 1) {
            addRows(5); // Add 5 more rows
        }
    };

    

  // This method updates the actual data in the Handsontable instance
  // when the formula bar value changes
 

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

      //console.log(JSON.stringify(newData));
      //const item = newData[row];
      //item[col] =imgHtml;
      newData[row][handsontableColumns[col].data] = imgHtml;
      setData(newData);
      hotTableRef.current?.hotInstance?.render();
    };
    reader.readAsDataURL(file);
  };

   


   const [cellPosition, setCellPosition] = useState<string>('');
    const [cellValue, setCellValue] = useState<any>(''); // Replace 'any' with a more specific type if possible

    const columnIndexToLetter1 = (columnIndex: number): string => {
    let letter = '';
    let tempIndex = columnIndex + 1; // Adjust because spreadsheet columns start at 1

    while (tempIndex > 0) {
        let mod = (tempIndex - 1) % 26;
        letter = String.fromCharCode(65 + mod) + letter;
        tempIndex = Math.floor((tempIndex - mod) / 26);
    }

    return letter;
};


    // Event handler for cell selection
    const handleCellSelection = (
    row: number, column: number, row2: number, column2: number, 
    selectionLayerLevel: number
) => {
    const columnLetter = columnIndexToLetter1(column);
    const newPosition = `${columnLetter}${row + 1}`;
    const newValue = data[row][column];

    setHighlightedCell([row, column]);

    setSelectedCell([row, column]);
    setCellPosition(newPosition);
    setCellValue(newValue);
};



   const handleCellChange1 = (
        changes: Handsontable.CellChange[] | null, 
        source: Handsontable.ChangeSource
    ) => {
        if (changes && changes.length > 0) {
            // Check if the source is one of the user-initiated actions (adjust as per your requirement)
            if (source === 'edit') {  // or other relevant sources
                const [, , , newValue] = changes[0];
                setCellValue(newValue as string);  // Update value with the new value
            }
        }
    };


     const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

    
/*
const handleFormulaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCellValue(event.target.value);
    // Don't update the Handsontable data here; let the debounced function or enter key handle it
};*/



const handleCellChange = (changes: any) => {
  
    if (changes) {
      // Deep clone the data array to avoid direct state mutation
      const newData = _.cloneDeep(data);
      console.log(" thiet tinh33");

      // Apply changes
      changes.forEach(([row, col, oldValue, newValue]: [number, number, any, any]) => {
        //newData[row][col] = newValue;
        console.log(row);
        console.log(col);
        newData[row][col] = newValue;
      });

      // Update state
      setData(newData);
    }
  };

  const handleFormulaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const newValue = event.target.value;

  if (selectedCell) {
    const [row, col] = selectedCell;
    console.log(JSON.stringify(selectedCell));
    const newData = _.cloneDeep(data);
    newData[row][handsontableColumns[col].data] = newValue; // Update the specific cell
    setData(newData); // Set the new data
  }
};


const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  // Check if the Enter key is pressed
  if (event.key === 'Enter' && selectedCell) {
    const [row, col] = selectedCell;
    const inputElement = event.target as HTMLInputElement;
    const formulaValue = inputElement.value;

    // Process the formula
    const result = processFormula(formulaValue);

    // Update the Handsontable data
    const newData = [...data];
    newData[row][col] = result;
    setData(newData);

    // Move the focus out of the current cell
    // Option 1: Move to the next cell (if required)
    // navigateToNextCell(row, col); // Implement this as per your requirement

    // Option 2: Simply blur the input to remove focus
    inputElement.blur();

    // Optionally, clear the textbox or perform other actions
    // inputElement.value = '';
  }
};

// Implement a function to process the formula
// This is a placeholder function, you'll need to implement the logic based on your requirements
const processFormula = (formula: string): any => {
  // Example: Simple arithmetic evaluation
  try {
    // Evaluate the formula
    // Caution: This is a simple example and has security implications. 
    // In a real-world application, you should use a proper library to safely evaluate formulas.
    return eval(formula);
  } catch (error) {
    console.error("Error processing formula", error);
    return formula; // Return the original formula in case of an error
  }
};



// add new

const [highlightedCell, setHighlightedCell] = useState<[number, number] | null>(null);
  
 const columnLabelToIndex = useCallback((label: string): number => {
    let column = 0;
    for (let i = 0; i < label.length; i++) {
      column *= 26;
      column += label.charCodeAt(i) - 'A'.charCodeAt(0) + 1;
    }
    return column - 1; // Convert to zero-based index
  }, []);

  const parseCellPosition = useCallback((position: string): [number, number] | null => {
    const match = position.match(/^([A-Z]+)(\d+)$/);
    if (match) {
      const col = columnLabelToIndex(match[1]);
      const row = parseInt(match[2], 10) - 1; // Convert to zero-based index
      return [row, col];
    }
    return null;
  }, [columnLabelToIndex]);

  const handleSecondTextboxFocus = useCallback(() => {
    const parsedPosition = parseCellPosition(cellPosition);
    if (parsedPosition) {
      setHighlightedCell(parsedPosition);
    } else {
      setHighlightedCell(null);
    }
  }, [cellPosition, parseCellPosition]);

  useEffect(() => {
  // Check if hotInstance is available before calling render
  if (highlightedCell && hotTableRef.current && hotTableRef.current.hotInstance) {
    hotTableRef.current.hotInstance.render();
  }
}, [highlightedCell]);



  useEffect(() => {
    if (hotTableRef.current && hotTableRef.current.hotInstance) {
      hotTableRef.current.hotInstance.render();
    }
  }, [highlightedCell]);



    const hotSettings: Handsontable.GridSettings = {
    columns:columns,
    data: data,
    cells: function (row, col, prop) {
    // Typecast the empty object to Handsontable.CellProperties
    const cellProperties = {} as Handsontable.CellProperties;

    if (highlightedCell && row === highlightedCell[0] && col === highlightedCell[1]) {
      cellProperties.renderer = (instance, td, row, col, prop, value, cellProps) => {
        Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, cellProps]);
        //td.style.background = '#ffcccc'; // Apply highlighting style
        td.style.border = '1px solid blue';
      };
    }

    return cellProperties;
  },
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

    <div id="handsontable-container" className="px-5px pb-32px">
    <Row>
        <Col span={1}>
        <Input value={cellPosition || ''} className='pb-5px pr-6px'
                            
                            style={{ paddingRight: '10px' }}/>  
                           
        </Col>
      <Col span={10} style={{ paddingLeft: '6px' }}>
        <Input className='pb-5px' 
                            width={200}
                            value={selectedCell && data ? (data[selectedCell[0]] && data[selectedCell[0]][selectedCell[1]]) || '' : ''}
                            onChange={handleFormulaChange}
                            onKeyDown={handleKeyDown}

                            onFocus={handleSecondTextboxFocus}
                            placeholder="Select a cell to input formula" />

                            <div style={{ paddingTop: '3px' }}/>
    
        </Col>
        <Col span={8}><div></div></Col>
      <Col span={4}><input type="file" title='Import' onChange={handleFileChange} accept=".xlsx, .xls" /></Col>
    </Row>
           
      <Row>
            <HotTable
                className="white-background"
                afterScrollVertically={afterScrollVertically}
                data={data}
                settings={hotSettings}
                afterSelectionEnd={handleCellSelection}
                afterChange={handleCellChange}
                

                columns={columns}
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
});

export default ExcelToHandsontable;
