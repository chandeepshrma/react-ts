import {
  AllCommunityModule,
} from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { themeQuartz } from "ag-grid-community";
import { BiCut } from "react-icons/bi";

interface IAgGrid {
  rowData: any[] | undefined,
  colDefs: any[] | undefined,
  isActionRequired?: boolean
}


function AgGrid({rowData, colDefs, isActionRequired = true}: IAgGrid) {
  const gridRows = isActionRequired ? 
  rowData?.map((row)=> {
    return {...row, Action: (<BiCut className="inline-block size-5 shrink-0 align-middle" aria-hidden="true" />)}})
    : rowData;
  return (
    <AgGridProvider modules={[AllCommunityModule]}>
      <div style={{ width: "100%", height: "500px" }}>
        <AgGridReact
          rowData={gridRows}
          columnDefs={colDefs?.concat({field: "Action"})}
          theme={themeQuartz}
        />
      </div>
    </AgGridProvider>
  );
}

export default AgGrid;
