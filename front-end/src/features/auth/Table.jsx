export function Table({ tableData }) {


  return (
    <div>
        <table class="dataTable">
            <tr class="row"> 
                <th class="col">Item Model</th>
                <th class="col">Quantity</th>		
            </tr>
            {tableData.map(data => {
              return(
                <tr >
                  <td>{data.rowLabel}</td>
                  <td>{data.rowData}</td>
                </tr>
              )
            })}
        </table>
        
    </div>
  )
}
