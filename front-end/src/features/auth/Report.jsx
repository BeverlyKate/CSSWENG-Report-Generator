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

  console.log(graphContent)

  const [label, setLabel] = useState([])

  const [data, setData] = useState([])
  
  const [tableData, setTableData] = useState([])

  useEffect(()=> {
    assignData()
    console.log("Table Data: "+ tableData)
  }, [])

  async function assignData(){
    if(pageContent.overlay==="IQPM"){
      iqpm()
    }else if(pageContent.overlay==="TDPM") {
      tdpm()  
    }else if(pageContent.overlay==="PTPM") {
      ptpm()
    }else if(pageContent.overlay==="AWDPT"){
      awdpt()
    }else if(pageContent.overlay==="TIQPT"){
      tiqpt ()
    }else{
      tiqpmpt ()
    }
  }

  async function iqpm (){
    var finalArr = []

    let repairItemModel = graphContent.repairItemModel
    let repairTalliedQuantities = graphContent.repairTalliedQuantities

    setLabel(repairItemModel)
    setData(repairTalliedQuantities) 

    //console.log(label.length)

    var i

    for(i=0; i<repairItemModel.length; i++){
      finalArr.push({rowLabel: repairItemModel[i], rowData: repairTalliedQuantities[i]})
    }

    console.log("Current Data: " + finalArr)

    setTableData(finalArr)
  }

  function tdpm () {
    var finalArr = []

    let stringifiedData = graphContent.repairTalliedQuantities

    let cleaned = stringifiedData.split("],[")
    let cleaned2 = cleaned[0].replace(/&quot;/g,"\"")
    let cleaned3 = cleaned2.replace(/[\[\]]/g,"")
    let cleaned4 = cleaned3.replaceAll("},","}+")
    let cleaned5 = cleaned4.split("+")

    let repairTalliedQuantities = []
    let i=0
    for(i=0; i<cleaned5.length; i++){
      repairTalliedQuantities.push(JSON.parse(cleaned5[i]))
    }

    let labelList=[];
    let valueList=[];
  
    let found = false;
    let count = 0;

    let j=0

    for(i=0; i<repairTalliedQuantities.length;i++){
      for(j=0; j<labelList.length; j++){
        if(repairTalliedQuantities[i].repairDefect == labelList[j]){
          found = true;
        }
      }
      count++
      if(count==1 && found == false){
        labelList[i]=repairTalliedQuantities[i].repairDefect
      }

      found=false
      count=0
    }

    for(i=0; i<labelList.length;i++){
      valueList[i]=0
      for(j=0; j<repairTalliedQuantities.length; j++){
        if(labelList[i]==repairTalliedQuantities[j].repairDefect){
          valueList[i]=valueList[i]+repairTalliedQuantities[j].repairDefectQuantity
        }
      }
    }

    const label = labelList
    const data = valueList

    for(i=0; i<j; i++){
      finalArr.push({rowLabel: labelList[i], rowData: valueList[i]})
    }

    setLabel(labelList)
    setData(valueList)

    setTableData(finalArr)
  }

  function ptpm () {
    var finalArr = []

    let repairTalliedQuantities = graphContent.repairTalliedQuantities

    let i=0

    let rowNo = repairTalliedQuantities.length/2
    for(i=0; i<rowNo; i++){
      finalArr.push({rowLabel: repairTalliedQuantities[i][0], rowData: repairTalliedQuantities[i][1]})
    }

    console.log("Hi: " + finalArr)

    setTableData(finalArr)
  }

  function awdpt () {
    var finalArr = []
    let repairTechnician = graphContent.repairTechnician
    let repairAverageWorkingDays = graphContent.repairAverageWorkingDays

    let i = 0

    if(Array.isArray(repairTechnician)){
      for(i=0; i<repairTechnician.length; i++){
        finalArr.push({rowLabel: repairTechnician[i], rowData: repairAverageWorkingDays[i]})
      }
    }else{
      finalArr.push({rowLabel: repairTechnician, rowData: repairAverageWorkingDays})
    }

    setLabel(repairTechnician)
    setData(repairAverageWorkingDays)

    setTableData(finalArr)
  }

  function tiqpt (){
    var finalArr = []

    var concatRepairTechnician=[]
    var repairTechnician = graphContent.repairTechnician
    var repairTalliedQuantities=graphContent.repairTalliedQuantities

    var i = 0

    if(pageContent.technician==="default"){
      let tech1=graphContent.repairTechnician1
      let tech2=graphContent.repairTechnician2
      tech1 = tech1.concat(tech2)

      concatRepairTechnician = [...new Set(tech1)]

      for(i=0; i<concatRepairTechnician.length; i++){
        finalArr.push({rowLabel: concatRepairTechnician[i], rowData: repairTalliedQuantities[i]})
      }
      setLabel(concatRepairTechnician)
    }else{
      finalArr.push({rowLabel: repairTechnician, rowData: repairTalliedQuantities})
      setLabel(repairTechnician)
    }

    setData(repairTalliedQuantities)
    setTableData(finalArr)
  }

  function tiqpmpt () {
    // const repairTechnician = graphContent.repairTechnician
    const repairItemModel = graphContent.repairItemModel
    const repairTalliedQuantities = graphContent.repairTalliedQuantities
    
    var finalArr = [{rowLabel: repairItemModel, rowData: repairTalliedQuantities}]

    setLabel(repairItemModel)
    setData(repairTalliedQuantities)
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
        {pageContent.overlay!=="PTPM" && (<Graph label={label} graphData={data}/>)}
          <Table tableData={tableData} />
        </div>
      </div>
      <ReportFooter />
    </div>
  )
}
