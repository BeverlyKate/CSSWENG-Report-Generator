import { useState } from "react"
import { Graph } from './Graph'
import { Table } from './Table'
import { ReportFooter } from './ReportFooter'
import { useLocation } from "react-router-dom"

import React from 'react'

export default function Report() {
  const location = useLocation()
  const passedData = location.state
  console.log(location)

  const [label, setLabels] = useState(['Sample 1', 'Sample 2', 'Sample 3', 'Sample 4', 'Sample 5'])

  const [data, setData] = useState([10, 20, 40, 3, 7])

  return (
    <>
      <div class="ReportBody">
        <h3>
          {(passedData.item !== "default" && passedData.overlay==="IQPM") && (<span id="categoryChange">{passedData.item}</span>)}
          { passedData.overlay==="IQPM"&& ("Item Quantity") 
            || passedData.overlay==="TDPM" && ("Top Defects") 
            || passedData.overlay==="PTPM" && ("Pending Tasks")} for 
          {(passedData.item !== "default" && (passedData.overlay==="TDPM" || passedData.overlay==="PTPM")) && (<span id="categoryChange">{passedData.item} for</span>) ||
          (passedData.model !== "default" && (passedData.overlay==="TDPM" || passedData.overlay==="PTPM")) && (<span id="categoryChange">{passedData.model} for</span>)}
          <span class="dateChange">{passedData.date}</span>
        </h3>
        <div className="graphData">
          <Graph label={label} graphData={data}/>
          <Table />
        </div>
      </div>
      <ReportFooter />
    </>
  )
}
