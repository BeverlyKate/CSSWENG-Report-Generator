export function Table({ tableData }) {
  return (
    <div>
        <table class="dataTable">
            <tr class="row"> 
                <th class="col">Item Model</th>
                <th class="col">Quantity</th>		
            </tr>
            {tableData.map(input => {
              return(
                <tr >
                  <td>{input.rowLabel}</td>
                  <td>{input.rowData}</td>
                </tr>
              )
            })}
        </table>
        
    </div>
  )
}
