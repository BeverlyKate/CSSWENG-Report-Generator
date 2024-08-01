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

  function assignData(){
    var tempArr
    var finalArr = []

    if(pageContent.overlay=="IQPM"){
      setLabel(graphContent.repairItemModel)
      setData(graphContent.repairTalliedQuantities) 

      console.log(label.length)

      let i

      for(i=0; i<label.length; i++){
        finalArr.push({rowLabel: graphContent.repairItemModel[i], rowData: graphContent.repairTalliedQuantities[i]})
      }

      setTableData(finalArr)

    }else if(pageContent.overlay=="TDPM") {
      // let repairItemModel = graphContent.repairItemModel.split(",")
		  // let repairDefect = graphContent.repairDefect.split(",")

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
    }else if(pageContent.overlay=="PTPM") {
      let repairTalliedQuantities = graphContent.repairTalliedQuantities

      let i=0

      let rowNo = repairTalliedQuantities.length/2
      for(i=0; i<rowNo; i++){
        finalArr.push({rowLabel: repairTalliedQuantities[i][0], rowData: repairTalliedQuantities[i][1]})
      }

      console.log("Hi: " + finalArr)

      setTableData(finalArr)
    }else if(pageContent.overlay==="AWDPT"){
      setLabel(graphContent.repairTechnician)
      setData(graphContent.repairAverageWorkingDays)

      console.log("Label Length: " + label.length)

      console.log("array content: " + graphContent)

      let i = 0

      for(i=0; i<label.length; i++){
        finalArr.push({rowLabel: graphContent.repairTechnician[i], rowData: graphContent.repairAverageWorkingDays[i]})
      }

      setTableData(finalArr)
    }else if(pageContent.overlay=="TIQPT"){
      let tech
      if(graphContent.repairTechnician===""){
        let tech1=graphContent.repairTechnician1
        let tech2=graphContent.repairTechnician2
        tech1 = tech1.concat(tech2)

        tech = [...new Set(tech1)]
      }else{
        tech = graphContent.repairTechnician
        console.log("Tech name: "+ tech)
      }
        
      setLabel(tech)
      setData(graphContent.repairTalliedQuantities)

      console.log(label)
      console.log(graphContent.repairTechnician2)

      console.log(graphContent.repairTalliedQuantities)

      //console.log("Label Length: " + label.length)

      console.log("array content: " + graphContent)

      let i = 0

      if(graphContent.repairTechnician===""){
        for(i=0; i<tech.length; i++){
          finalArr.push({rowLabel: tech[i], rowData: graphContent.repairTalliedQuantities[i]})
        }
      }else{
        finalArr.push({rowLabel: graphContent.repairTechnician, rowData: graphContent.repairTalliedQuantities})
      }

      setTableData(finalArr)
    }else{
      const repairTechnician = graphContent.repairTechnician
      const repairItemModel = graphContent.repairItemModel
		  const repairTalliedQuantities = graphContent.repairTalliedQuantities

      // let i=0

      finalArr.push({rowLabel: repairItemModel, rowData: repairTalliedQuantities})
      // for(i=0; i<repairItemModel.length; i++){
        
      // }

      setLabel(repairItemModel)
      setData(repairTalliedQuantities)
      setTableData(finalArr)
    }
    

    // setTableData(finalArr)
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
