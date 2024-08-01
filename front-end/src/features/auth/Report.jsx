import { useState, useEffect } from "react"
import { Graph } from './Graph'
import { Table } from './Table'
import { ReportFooter } from './ReportFooter'
import { useLocation } from "react-router-dom"

import React from 'react'

export default function Report() {
  const location = useLocation()
  const passedData = location.state
  console.log(passedData)

  const graphContent = passedData.data

  const pageContent = passedData.content

  const label = graphContent.repairItemModel

  const data = graphContent.repairTalliedQuantities

  const [tableData, setTableData] = useState([])

  useEffect(()=> {
    assignData()
    console.log(tableData)
  }, [])

  function assignData(){
    var tempArr
    var finalArr = [];
    console.log(label.length)
    const j = label.length
    let i
    for(i=0; i<j; i++){
      finalArr.push({rowLabel: label[i], rowData: data[i]})
    }

    setTableData(finalArr)
  }

  return (
    <div className="Body">
      <div class="ReportBody">
        <h3>
          {(pageContent.category1 !== "default" && pageContent.overlay==="IQPM") && (<span id="categoryChange">{pageContent.category1}</span>)}
          { pageContent.overlay==="IQPM"&& ("Item Quantity") 
            || pageContent.overlay==="TDPM" && ("Top Defects") 
            || pageContent.overlay==="PTPM" && ("Pending Tasks")} for 
          {(pageContent.category1 !== "default" && (pageContent.overlay==="TDPM" || pageContent.overlay==="PTPM")) && (<span id="categoryChange">{pageContent.category1} for</span>) ||
          (pageContent.itemModel !== "default" && (pageContent.overlay==="TDPM" || pageContent.overlay==="PTPM")) && (<span id="categoryChange">{pageContent.itemModel} for</span>)}
          <span class="dateChange">{pageContent.dateFrom}</span>
        </h3>
        <div className="graphData">
        {(pageContent.overlay==="TDPM" || pageContent.overlay==="IQPM") && (<Graph label={label} graphData={data}/>)}
          <Table tableData={tableData}/>
        </div>
      </div>
      <ReportFooter />
    </div>
  )
}
