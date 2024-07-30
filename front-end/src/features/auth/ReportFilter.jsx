import { useState } from "react"
import closeIcon from "./close.svg"
import { DateSelect } from "./DateSelect"
import { FormIQPM } from "./FormIQPM"
import { FormTDAndPTPM } from "./FormTDAndPTPM"
import { useNavigate } from "react-router-dom"
import apiClient from "../../app/api/apiClient"

export function ReportFilter({ toggleOverlay, reportName, id }){
    const [dateRange, setDateRange] = useState("")
    const [repairStatus, setRepairStatus] = useState("")
    const [itemCategory, setItemCategory] = useState("default")
    const [modelCategory, setModelCategory] = useState("default")
    const [formData, setFormData] = useState({overlay: id, date: "", status: "", item: ""})
    const navigate = useNavigate()

    function getDate(date) {
        setDateRange(date)
    }

    function getRepairStatus(status) {
        setRepairStatus(status)
    }

    function getItemCategory(item){
        setItemCategory(item)
    }

    function getModelCategory(model){
        setModelCategory(model)
    }

    function generateReport(e) {
        e.preventDefault()

        //var data = this.state.arr.slice()

        if(dateRange === "") return console.log("invalid date")
        
        formData.date = dateRange
        
        //console.log(dateRange)

        if(id == "TDPM" || id == "PTPM"){
            if(repairStatus==="") return console.log("please select status")

            formData.status = repairStatus

            formData.model = modelCategory
        }

        if(itemCategory != "default" && modelCategory != "default") return console.log("Select 1 category only")

        formData.item = itemCategory

        console.log(formData)

        apiClient
        .post(`/${formData.overlay}post`, formData)
        .then(
            
            navigate("/dash/report", {state: formData})
        )
        .catch((error)=>{
            console.error("Can't generate data!", error);
        })

        
    }

    return(
        <div className="overlay-holder">
            <div className="dark-overlay"></div>
            <div className="popup">
                {/* <button 
                    className="on-close" 
                    onClick={() => toggleOverlay("")}
                >
                    
                </button> */}
                <form className ="hello" onSubmit={generateReport}>
                    <div className="popup-body">
                        <div className="popup-header">
                            <div className="popup-text">{reportName}</div>
                            <button className="btn-close" onClick={() => toggleOverlay("")}><img src={closeIcon} alt="close popup"/></button>
                        </div>
                        <div className="popup-subheader">
                            <div className="dashed-line"></div>
                            <div className="popup-text-one">Date range</div>
                            <div className="dashed-line"></div>
                        </div>
                        <DateSelect getDate={getDate}/>
                        <div className="report-specifics-holder">
                            {reportName === "Item Quantity Per Model" && (<FormIQPM getItemCategory={getItemCategory}/>) 
                            || (<FormTDAndPTPM getRepairStatus={getRepairStatus} 
                                                getItemCategory={getItemCategory} 
                                                getModelCategory={getModelCategory}/>)}
                        </div>
                        <button type="submit" className="btn-generate-report">
                            Generate Report
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}