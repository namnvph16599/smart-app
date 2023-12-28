import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import * as XLSX from 'xlsx';
import 'handsontable/dist/handsontable.full.css';
import './style.css'
import HyperFormula from 'hyperformula';
import { Button, Col, Row, Space, Upload, UploadFile } from 'antd';
import { Input } from 'antd';
import _ from 'lodash';
import { useFindSheetsByQuotationAndStageQuery } from '../../graphql/queries/findSheetsByQuotationAndStage.generated';
import { useFindOneTemplateByNameQuery } from '../../graphql/queries/findOneTemplateByName.generated';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/es/upload';

type CellStyle = {
    backgroundColor?: string;
    // Add more style properties as needed
};

type ExcelToHandsontableProps = {
    openTimeline: boolean;
    quoteId:string;
    stage:string;
};

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

    const hotTableRef = useRef<HotTable>(null);

    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
      
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

    const { data: dataTemplate, refetch: refetchTemplate } = useFindOneTemplateByNameQuery({
        variables: {
          name: mapStageToName(stage),
        }
    });


        const { data:sheetTemplate, refetch  } = useFindSheetsByQuotationAndStageQuery({
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


    //const [template, setTemplate] = useState<any>(null);
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

}, [stage]);


useEffect(() => {
  console.log("okk12");
});
    //const template = useMemo(() => dataTemplate?.findOneTemplateByName, [dataTemplate]);

    function createColumnsFromFields(fields: Field[]): any[] {
      return fields.map((field, index) => {
        const columnLetter = columnIndexToLetter(index); 
        const column: any = {
          readOnly: false,
          data: toCamelCase(field.fieldName),
          title: `${field.fieldName} (${columnLetter})`,
          renderer: htmlRenderer,
          type: 'text', // default type
        };

        switch (field.type) {
          case 'number':
            column.type = 'numeric';
            break;
          case 'array':
          case 'dropdownlist':
            column.type = 'dropdown';
            column.source = userNames; // Assuming userNames is available
            break;
          // Handle other types or default case
        }

        return column;
      });
    }

    const template = useMemo(() => dataTemplate?.findOneTemplateByName, [dataTemplate, stage]);

    useEffect(() => {
      const be =  createColumnsFromFields(template?.dynamicFields || []);
      setColumns(be);

    if ((!data || data?.length === 0) && template) {
      if (sheet?.length > 0) {
        const newData = _.cloneDeep(sheet[0]?.dynamicFields);

        const numberOfRows = 100 - newData?.length;
        const emptyRow = columns.reduce((acc: { [x: string]: string; }, column: { data: string | number; }) => {
          acc[column.data] = '';
          return acc;
        }, {});
          const data = Array.from({ length: numberOfRows }, () => ({ ...emptyRow }));
        
        const totalData = [...newData, ...data];
        setData(totalData as Handsontable.CellValue[][]);
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
  }, [data, template, stage, sheet]);


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




    const handleFileChange = (info: UploadChangeParam<UploadFile<any>>) => {
  const file = info.file.originFileObj; // Access the uploaded file
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
    },
  }));

    function composeData(jsonData: any): Array<{ [key: string]: string | number }> {
  const headerRow = jsonData[0];
  const dataWithoutHeader = jsonData.slice(1);

  const composedData = dataWithoutHeader.map((row: { [x: string]: string | number; }) => {
    const composedObject: { [key: string]: string | number } = {};
    columns.forEach((column: { data: string | number; }, index: string | number) => {
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
        
        const thm = composeData(jsonData);
        console.log(thm);
        setData(thm as Handsontable.CellValue[][]);
    };

    const [tableSize, setTableSize] = useState({ width: '100%', height: '100%' });

    useEffect(() => {
        function handleResize() {
            // Example: Set width to 80% of window width, but not more than 1200px
            const dynamicWidth = Math.min(openTimeline ? window.innerWidth * 0.95 : window.innerWidth * 0.95);
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

    const addRows = (numberOfRowsToAdd: number): void => {
        
        const emptyRow = columns.reduce((acc: { [x: string]: string; }, column: { data: string | number; }) => {
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
      newData[row][columns[col].data] = imgHtml;
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

     const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);


const handleCellChange = (changes: any) => {
  
    if (changes) {
      // Deep clone the data array to avoid direct state mutation
      const newData = _.cloneDeep(data);
    
      // Apply changes
      changes.forEach(([row, col, oldValue, newValue]: [number, number, any, any]) => {
       
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
    const newData = _.cloneDeep(data);
    newData[row][col] = newValue; // Update the specific cell
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
    //const result = processFormula(formulaValue);

    // Update the Handsontable data
    const newData = [...data];
    newData[row][columns[col].data] = formulaValue;

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
                            
                            style={{ width: '50px' }}/>  
                           
        </Col>
      <Col span={10} style={{ paddingLeft: '1px' }}>
        <Input className='pb-5px' 
                            width={200}
                            value={selectedCell && data ? (data[selectedCell[0]] && data[selectedCell[0]][selectedCell[1]]) || '' : ''}
                            onChange={handleFormulaChange}
                            onKeyDown={handleKeyDown}

                            onFocus={handleSecondTextboxFocus}
                            placeholder="Select a cell to input formula" />

                            <div style={{ paddingTop: '3px' }}/>
    
        </Col>
        <Col span={11}><div></div></Col>
      <Col span={1} style={{ display: 'flex', justifyContent: 'flex-end' }}><Space style={{paddingBottom:5}}>
      <Upload
        onChange={handleFileChange}
        showUploadList={false} // To hide the file list
        accept=".xlsx, .xls"
       
        
      >
        <Button icon={<UploadOutlined />}>Import</Button>
      </Upload>
    </Space></Col>
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
