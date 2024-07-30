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
        <h3><span id="categoryChange"></span>{passedData.overlay} for <span class="dateChange"></span></h3>
        <div className="graphData">
          <Graph label={label} graphData={data}/>
          <Table />
        </div>
      </div>
      <ReportFooter />
    </>
  )
}
